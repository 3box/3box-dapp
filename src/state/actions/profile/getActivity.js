import {
  store,
} from '../../store';
import {
  getContract,
  imageElFor,
  getPublicProfile,
  updateFeed,
  addDataType,
  addPublicOrPrivateDataType,
} from '../../../utils/funcs';

const getActivity = publicProfileAddress => async (dispatch) => {
  try {
    dispatch({
      type: 'LOADING_ACTIVITY',
    });

    let activity;
    if (store.getState().threeBox.currentNetwork) {
      activity = await ThreeBoxActivity.get( // eslint-disable-line no-undef
        publicProfileAddress || store.getState().threeBox.currentAddress,
        store.getState().threeBox.currentNetwork.toLowerCase(),
      );
    } else {
      activity = await ThreeBoxActivity.get( // eslint-disable-line no-undef
        publicProfileAddress || store.getState().threeBox.currentAddress,
      );
    }

    // add datatype to each row
    const categorizedActivity = addDataType(activity);

    let feed;
    let emailProof;
    // sort and merge feed
    if (publicProfileAddress) {
      feed = categorizedActivity.internal
        .concat(categorizedActivity.txs)
        .concat(categorizedActivity.token);
    } else {
      // get 3box logs
      const unFilteredPublicActivity = await store.getState().threeBox.box.public.log;
      const privateActivity = await store.getState().threeBox.box.private.log;
      emailProof = await store.getState().threeBox.box.private._genDbKey('proof_email');

      // remove ethereum_proof & proof_did & memberSince
      const publicActivity = unFilteredPublicActivity
        .filter(item => (item.key !== 'ethereum_proof' &&
          item.key !== 'proof_did' &&
          item.key !== 'collectiblesFavorites' &&
          item.key !== 'memberSince'));

      // assign public or private data type
      const categorizedPublicActivity = addPublicOrPrivateDataType(publicActivity, 'Public');
      const categorizedPrivateActivity = addPublicOrPrivateDataType(privateActivity, 'Private');

      feed = categorizedActivity.internal
        .concat(categorizedActivity.txs)
        .concat(categorizedActivity.token)
        .concat(categorizedPublicActivity)
        .concat(categorizedPrivateActivity);
    }

    // if timestamp is undefined, give it the timestamp of the previous entry
    feed.map((item, i) => {
      const feedItem = item;
      if (!feedItem.timeStamp) {
        const deletedTime = parseInt(feed[i - 1].timeStamp, 10) + 1;
        feedItem.timeStamp = deletedTime.toString();
      }
      if (!publicProfileAddress && feedItem.key === emailProof) {
        feedItem.key = 'proof_email';
      }

      return feedItem;
    });

    feed.sort((a, b) => b.timeStamp - a.timeStamp);

    // order feed chronologically and by currentAddress
    const feedByAddress = [];
    feed.forEach((item) => {
      let othersAddress;

      // check if to or from is counterparty's address
      if (publicProfileAddress) {
        othersAddress = item.from.toLowerCase() ===
          store.getState().threeBox.publicProfileAddress.toLowerCase() ?
          item.to :
          item.from;
      } else {
        othersAddress = (item.from && item.from.toLowerCase()) ===
          store.getState().threeBox.currentAddress.toLowerCase() ?
          item.to :
          item.from;
      }

      // group feed by 3box or counterparty address activity
      if (feedByAddress.length > 0 &&
        Object.keys(feedByAddress[feedByAddress.length - 1])[0] === othersAddress) {
        feedByAddress[feedByAddress.length - 1][othersAddress].push(item);
      } else if (feedByAddress.length > 0 && Object.keys(feedByAddress[feedByAddress.length - 1])[0] === 'threeBox' && (item.dataType === 'Public' || item.dataType === 'Private')) {
        feedByAddress[feedByAddress.length - 1].threeBox.push(item);
      } else if (item.dataType === 'Public' || item.dataType === 'Private') {
        feedByAddress.push({
          threeBox: [item],
        });
      } else {
        feedByAddress.push({
          [othersAddress]: [item],
        });
      }
    });

    const checkedAddresses = {};
    const addressData = {};
    const isContract = {};
    let counter = 0;

    // if there is no feed length, move on to next step
    if (feedByAddress.length === 0) updateFeed(publicProfileAddress, feedByAddress, addressData, isContract);

    // get contract and 3box profile metadata
    await feedByAddress.map(async (txGroup) => {
      const otherAddress = Object.keys(txGroup)[0];
      let metaData = {};
      let contractData;
      let contractArray = [];
      let name;
      let image;

      if (otherAddress === 'threeBox') {
        counter += 1;
        if (counter === feedByAddress.length) updateFeed(publicProfileAddress, feedByAddress, addressData, isContract);
        return;
      }

      if (!checkedAddresses[otherAddress]) {
        checkedAddresses[otherAddress] = true;
        try {
          web3.eth.getCode(otherAddress, (err, code) => { // eslint-disable-line no-undef
            if (err) {
              addressData[otherAddress] = false;
              counter += 1;
              if (counter === feedByAddress.length) updateFeed(publicProfileAddress, feedByAddress, addressData, isContract);
              return console.error(err);
            }

            if (code !== '0x' && typeof code !== 'undefined') { // then address is contract
              isContract[otherAddress] = true;
              getContract(otherAddress)
                .then((data) => {
                  if (data.status === '1') {
                    contractData = JSON.parse(data.result);
                    contractArray = imageElFor(otherAddress);
                    addressData[otherAddress] = {
                      contractImg: contractArray[0],
                      contractDetails: contractArray[1],
                      contractData,
                    };
                    counter += 1;
                  } else {
                    addressData[otherAddress] = false;
                    counter += 1;
                  }
                  if (counter === feedByAddress.length) updateFeed(publicProfileAddress, feedByAddress, addressData, isContract);
                })
                .catch((error) => {
                  addressData[otherAddress] = false;
                  counter += 1;
                  if (counter === feedByAddress.length) updateFeed(publicProfileAddress, feedByAddress, addressData, isContract);
                  return console.log(error);
                });
            } else { // look for 3box metadata
              const graphqlQueryObject = `
                {
                  profile(id: "${otherAddress}") {
                    name
                    image
                  }
                }
                `;
              getPublicProfile(graphqlQueryObject).then((profile) => {
                metaData = profile;
                name = metaData && metaData.profile && metaData.profile.name;
                image = metaData && metaData.profile && metaData.profile.image;
                addressData[otherAddress] = {
                  name,
                  image,
                };
                counter += 1;
                if (counter === feedByAddress.length) updateFeed(publicProfileAddress, feedByAddress, addressData, isContract);
              }).catch((error) => {
                addressData[otherAddress] = false;
                counter += 1;
                if (counter === feedByAddress.length) updateFeed(publicProfileAddress, feedByAddress, addressData, isContract);
                return console.error(error);
              });
            }
          });
        } catch (err) {
          console.error(err);
          addressData[otherAddress] = false;
          counter += 1;
          if (counter === feedByAddress.length) updateFeed(publicProfileAddress, feedByAddress, addressData, isContract);
        }
      } else {
        counter += 1;
        if (counter === feedByAddress.length) updateFeed(publicProfileAddress, feedByAddress, addressData, isContract);
      }
    });
  } catch (err) {
    dispatch({
      type: 'FAILED_LOADING_ACTIVITY',
      feedByAddress: [],
      ifFetchingActivity: false,
      errorMessage: err,
      showErrorModal: true,
      provideConsent: false,
    });
  }
};

export default getActivity;