import ThreeBoxActivity from '3box-activity';
import Web3 from 'web3';

import {
  store,
} from '../../../store';
import {
  graphqlQueryObject,
} from '../../../../utils/funcs';
import getPublicProfileAndENS from '../getPublicProfileAndENS';
import {
  addTimeStamp,
  getMyFeed,
  groupByAddress,
  addDataType,
  imageElFor,
  updateFeed,
  getContract,
} from './helpers';

const getActivity = async (otherProfileAddress) => {
  try {
    const {
      currentWallet,
      currentNetwork,
    } = store.getState().userState;
    const isWalletConnect = currentWallet === 'WalletConnect';
    const reduxWeb3 = store.getState().userState.web3Obj;
    const web3Obj = isWalletConnect ? window.web3 || Web3 : reduxWeb3 || window.web3 || Web3;

    if (otherProfileAddress) {
      store.dispatch({
        type: 'UI_FEED_OTHER_LOADING',
        isFetchingOtherActivity: true,
      });
    } else {
      store.dispatch({
        type: 'UI_FEED_LOADING',
        isFetchingActivity: true,
      });
    }

    // get Eth network activity
    const activity = await ThreeBoxActivity.get(
      otherProfileAddress || store.getState().userState.currentAddress,
      currentNetwork && currentNetwork.toLowerCase(),
    );

    // add datatype to each row
    const categorizedActivity = addDataType(activity);

    // sort and merge feed
    let feed;
    let emailProof;
    if (otherProfileAddress) {
      feed = categorizedActivity.internal
        .concat(categorizedActivity.txs)
        .concat(categorizedActivity.token);
    } else {
      try {
        const {
          updatedFeed,
          updatedEmailProof,
        } = await getMyFeed(categorizedActivity);
        feed = updatedFeed;
        emailProof = updatedEmailProof;
      } catch (error) {
        console.log(error);
      }
    }

    // if timestamp is undefined, give it the timestamp of the previous entry
    feed = addTimeStamp(feed, otherProfileAddress, emailProof);

    // order feed chronologically
    feed.sort((a, b) => b.timeStamp - a.timeStamp);

    // group feed by address
    const feedByAddress = await groupByAddress(feed, otherProfileAddress);

    const addressData = {};
    const isContract = {};
    const checkedAddresses = {};
    let counter = 0;

    // if there is no feed length, move on to next step
    if (feedByAddress.length === 0) {
      updateFeed(otherProfileAddress, feedByAddress, addressData, isContract);
      return;
    }

    // get contract and 3box profile metadata
    await feedByAddress.forEach(async (txGroup) => {
      const otherAddress = Object.keys(txGroup)[0];
      let metaData = {};
      let contractData;
      let contractArray = [];

      if (otherAddress === 'threeBox') {
        counter += 1;
        if (counter === feedByAddress.length) {
          updateFeed(otherProfileAddress, feedByAddress, addressData, isContract);
        }
        return;
      }

      if (!checkedAddresses[otherAddress]) {
        try {
          checkedAddresses[otherAddress] = true;

          web3Obj.eth.getCode(otherAddress, async (err, code) => {
            if (err) {
              console.error(err);
            } else if (code !== '0x' && typeof code !== 'undefined') { // then address is contract
              isContract[otherAddress] = true;
              const data = await getContract(otherAddress);
              // const ensName = await fetchEns(otherAddress);
              if (data && data.status === '1') {
                contractData = JSON.parse(data.result);
                contractArray = imageElFor(otherAddress);
                addressData[otherAddress] = {
                  contractImg: contractArray[0],
                  contractDetails: contractArray[1],
                  contractData,
                  isContract: true,
                  // ensName,
                };
              } else {
                addressData[otherAddress] = false;
              }
            } else { // look for 3box metadata
              const profile = await getPublicProfileAndENS(graphqlQueryObject(otherAddress), otherAddress);
              metaData = profile;
              addressData[otherAddress] = {
                name: metaData && metaData.profile && metaData.profile.name,
                image: metaData && metaData.profile && metaData.profile.image,
                ensName: metaData && metaData.profile && metaData.profile.ensName,
              };
            }

            counter += 1;
            if (counter === feedByAddress.length) {
              updateFeed(otherProfileAddress, feedByAddress, addressData, isContract);
            }
          });
        } catch (err) {
          console.error(err);
          addressData[otherAddress] = false;
          counter += 1;
          if (counter === feedByAddress.length) updateFeed(otherProfileAddress, feedByAddress, addressData, isContract);
        }
      } else {
        counter += 1;
        if (counter === feedByAddress.length) updateFeed(otherProfileAddress, feedByAddress, addressData, isContract);
      }
    });
  } catch (err) {
    store.dispatch({
      type: 'UI_FEED_FAILED',
      isFetchingActivity: false,
      errorMessage: err,
      provideConsent: false,
    });
    store.dispatch({
      type: 'MY_FEED_UPDATE',
      feedByAddress: [],
    });
  }
};

export default getActivity;