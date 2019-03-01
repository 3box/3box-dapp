import _ from 'lodash';
import {
  store,
} from './store';
import * as routes from '../utils/routes';
import history from '../history';
import {
  getContract,
  imageElFor,
  getPublicProfile,
  updateFeed,
  addDataType,
  addPublicOrPrivateDataType,
} from '../utils/funcs';

export const checkWeb3Wallet = () => async (dispatch) => {
  const cp = typeof window.web3 !== 'undefined' ? window.web3.currentProvider : null; // eslint-disable-line no-undef

  let isToshi;
  let isCipher;
  let isMetaMask;
  let currentWallet;

  if (cp) {
    isToshi = !!cp.isToshi;
    isCipher = !!cp.isCipher;
    isMetaMask = !!cp.isMetaMask;

    if (isToshi) {
      currentWallet = 'isToshi';
    } else if (isCipher) {
      currentWallet = 'isCipher';
    } else if (isMetaMask) {
      currentWallet = 'isMetaMask';
    }
  }

  dispatch({
    type: 'CHECK_WALLET',
    hasWallet: typeof window.web3 !== 'undefined', // eslint-disable-line no-undef
    showDownloadBanner: typeof window.web3 === 'undefined', // eslint-disable-line no-undef
    mobileWalletRequiredModal: typeof window.web3 === 'undefined', // eslint-disable-line no-undef
    currentWallet,
  });
};

export const accountsPromise = new Promise((resolve, reject) => {
  try {
    if (window.web3) {
      window.web3.eth.getAccounts((e, accountsFound) => { // eslint-disable-line no-undef
        if (e != null) {
          reject(e);
        } else {
          resolve(accountsFound);
        }
      });
    } else {
      console.error('You must have web3 to continue');
    }
  } catch (err) {
    console.error(err);
  }
});

// inject for breaking change
export const requestAccess = directLogin => async (dispatch) => {
  let accounts = [];

  if (window.ethereum) { // eslint-disable-line no-undef
    try {
      window.web3 = new Web3(ethereum); // eslint-disable-line no-undef
      dispatch({
        type: 'HANDLE_ACCESS_MODAL',
        allowAccessModal: true,
        directLogin,
      });

      accounts = await window.ethereum.enable(); // eslint-disable-line no-undef
      accounts = !accounts ? await accountsPromise : accounts;
      window.localStorage.setItem('userEthAddress', accounts[0]);

      dispatch({
        type: 'UPDATE_ADDRESSES',
        isSignedIntoWallet: accounts && (accounts.length > 0 || store.getState().threeBox.currentWallet === 'isToshi'),
        isLoggedIn: accounts && Box.isLoggedIn(accounts[0]), // eslint-disable-line no-undef
        accountAddress: accounts[0],
        allowAccessModal: false,
        currentAddress: accounts[0],
      });
    } catch (error) {
      console.error(error);
      history.push(routes.LANDING);
      dispatch({
        type: 'HANDLE_DENIED_ACCESS_MODAL',
        accessDeniedModal: true,
        allowAccessModal: false,
        isSignedIntoWallet: accounts && (accounts.length > 0 || store.getState().threeBox.currentWallet === 'isToshi'),
      });
    }
  } else if (window.web3) { // eslint-disable-line no-undef
    window.web3 = new Web3(web3.currentProvider); // eslint-disable-line no-undef

    accounts = window.web3.eth.accounts; // eslint-disable-line no-undef
    window.localStorage.setItem('userEthAddress', accounts[0]);

    dispatch({
      type: 'UPDATE_ADDRESSES',
      isSignedIntoWallet: accounts && (accounts.length > 0 || store.getState().threeBox.currentWallet === 'isToshi'),
      isLoggedIn: accounts && Box.isLoggedIn(accounts[0]), // eslint-disable-line no-undef
      currentAddress: accounts[0],
    });
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
};

// if has web3 wallet
export const checkNetwork = () => async (dispatch) => {
  const checkNetworkFunc = new Promise((resolve) => {
    window.web3.version.getNetwork((err, netId) => { // eslint-disable-line no-undef
      switch (netId) {
        case '1':
          resolve('Main');
          break;
        case '2':
          resolve('Morder');
          break;
        case '3':
          resolve('Ropsten');
          break;
        case '4':
          resolve('Rinkeby');
          break;
        case '42':
          resolve('Kovan');
          break;
        default:
          resolve('Unknown');
      }
    });
  });

  // // check network, compatible with old & new v of MetaMask
  let currentNetwork;
  if (window.web3.eth.net) { // eslint-disable-line no-undef
    await window.web3.eth.net.getNetworkType() // eslint-disable-line no-undef
      .then((network) => {
        currentNetwork = network;
      });
  } else {
    await checkNetworkFunc.then((network) => {
      currentNetwork = network;
    });
  }

  const prevPrevNetwork = window.localStorage.getItem('prevNetwork'); // eslint-disable-line no-undef
  const prevNetwork = window.localStorage.getItem('currentNetwork'); // eslint-disable-line no-undef
  const shouldShowSwitchNetwork = window.localStorage.getItem('shouldShowSwitchNetwork'); // eslint-disable-line no-undef
  window.localStorage.setItem('prevPrevNetwork', prevPrevNetwork); // eslint-disable-line no-undef
  window.localStorage.setItem('prevNetwork', prevNetwork); // eslint-disable-line no-undef
  window.localStorage.setItem('currentNetwork', currentNetwork); // eslint-disable-line no-undef

  if (prevNetwork && (prevNetwork !== currentNetwork) && store.getState().threeBox.isLoggedIn && shouldShowSwitchNetwork === 'true') {
    window.localStorage.setItem('shouldShowSwitchNetwork', false); // eslint-disable-line no-undef
    dispatch({
      type: 'DIFFERENT_NETWORK',
      showDifferentNetworkModal: true,
      currentNetwork,
      prevNetwork,
      prevPrevNetwork,
    });
  } else {
    window.localStorage.setItem('shouldShowSwitchNetwork', true); // eslint-disable-line no-undef
    dispatch({
      type: 'UPDATE_NETWORK',
      currentNetwork,
      prevNetwork,
      prevPrevNetwork,
    });
  }
};

export const getBox = fromSignIn => async (dispatch) => {
  dispatch({
    type: 'HANDLE_CONSENT_MODAL',
    provideConsent: true,
    showSignInBanner: false,
  });

  const consentGiven = () => {
    if (fromSignIn) history.push(`/${store.getState().threeBox.currentAddress || store.getState().threeBox.accountAddress}/${routes.ACTIVITY}`);
    dispatch({
      type: 'LOADING_3BOX',
    });
    dispatch({
      type: 'LOADING_ACTIVITY',
    });
  };

  // onSyncDone only happens on first openBox so only run
  // this when a user hasn't signed out and signed back in again
  if (!store.getState().threeBox.hasSignedOut) {
    // initialize onSyncDone process
    dispatch({
      type: 'APP_SYNC',
      onSyncFinished: false,
      isSyncing: false,
    });
  }

  const opts = {
    consentCallback: consentGiven,
  };

  try {
    const box = await Box // eslint-disable-line no-undef
      .openBox(
        store.getState().threeBox.accountAddress || store.getState().threeBox.currentAddress,
        window.web3.currentProvider, // eslint-disable-line no-undef
        opts,
      );

    dispatch({
      type: 'UPDATE_THREEBOX',
      ifFetchingThreeBox: false,
      isLoggedIn: true,
      box,
    });

    // onSyncDone only happens on first openBox so only run
    // this when a user hasn't signed out and signed back in again
    if (!store.getState().threeBox.hasSignedOut) {
      // start onSyncDone loading animation
      dispatch({
        type: 'APP_SYNC',
        onSyncFinished: false,
        isSyncing: true,
      });
    }

    const memberSince = await store.getState().threeBox.box.public.get('memberSince');

    box.onSyncDone(() => {
      const publicActivity = store.getState().threeBox.box.public.log;
      const privateActivity = store.getState().threeBox.box.private.log;

      if (!privateActivity.length && !publicActivity.length) {
        dispatch({
          type: 'HANDLE_ONBOARDING_MODAL',
          onBoardingModal: true,
        });
        const date = Date.now();
        const dateJoined = new Date(date);
        const memberSinceDate = `${(dateJoined.getMonth() + 1)}/${dateJoined.getDate()}/${dateJoined.getFullYear()}`;
        store.getState().threeBox.box.public.set('memberSince', dateJoined);
        dispatch({
          type: 'GET_PUBLIC_MEMBERSINCE',
          memberSince: memberSinceDate,
        });
        history.push(`/${store.getState().threeBox.currentAddress}/${routes.EDIT}`);
      } else if (!memberSince && (privateActivity.length || publicActivity.length)) {
        store.getState().threeBox.box.public.set('memberSince', 'Alpha');
      }

      dispatch({
        type: 'UPDATE_THREEBOX',
        ifFetchingThreeBox: false,
        isLoggedIn: true,
        box,
      });

      // call data with new box object from onSyncDone
      dispatch({
        type: 'APP_SYNC',
        onSyncFinished: true,
        isSyncing: true,
      });
    });
  } catch (err) {
    history.push(routes.LANDING);
    dispatch({
      type: 'FAILED_LOADING_3BOX',
      errorMessage: err,
      showErrorModal: true,
      provideConsent: false,
    });
  }
};

export const getActivity = publicProfileAddress => async (dispatch) => {
  try {
    dispatch({
      type: 'LOADING_ACTIVITY',
    });

    // get activity from the profile page's address
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

export const getProfile = profileAddress => async (dispatch) => {
  try {
    dispatch({
      type: 'LOADING_PUBLIC_PROFILE',
      isLoadingPublicProfile: true,
    });

    const publicProfile = await Box.getProfile(profileAddress); // eslint-disable-line no-undef
    const publicVerifiedAccounts = Object.entries(publicProfile).length > 0 ?
      await Box.getVerifiedAccounts(publicProfile) : { // eslint-disable-line no-undef
        github: null,
        twitter: null,
      };

    dispatch({
      type: 'GET_PUBLIC_PROFILE',
      publicGithub: publicVerifiedAccounts.github && publicVerifiedAccounts.github.username,
      publicTwitter: publicVerifiedAccounts.twitter && publicVerifiedAccounts.twitter.username,
      publicDescription: publicProfile.description,
      publicLocation: publicProfile.location,
      publicWebsite: publicProfile.website,
      publicMemberSince: publicProfile.memberSince,
      publicJob: publicProfile.job,
      publicSchool: publicProfile.school,
      publicDegree: publicProfile.degree,
      publicMajor: publicProfile.major,
      publicYear: publicProfile.year,
      publicEmployer: publicProfile.employer,
      publicCoverPhoto: publicProfile.coverPhoto,
      publicImage: publicProfile.image,
      publicName: publicProfile.name,
      publicEmoji: publicProfile.emoji,
      publicStatus: publicProfile.status,
      publicCollectiblesGallery: publicProfile.collectiblesFavorites,
    });

    dispatch({
      type: 'LOADING_PUBLIC_PROFILE',
      isLoadingPublicProfile: false,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getProfileData = (type, key) => async (dispatch) => {
  try {
    const keyUppercase = key.toUpperCase();
    const keyToAdd = await store.getState().threeBox.box[type].get(key);
    const typeUppercase = type.toUpperCase();

    dispatch({
      type: `GET_${typeUppercase}_${keyUppercase}`,
      [key]: keyToAdd,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCollectibles = (address, onPublicProfile) => async (dispatch) => {
  try {
    const res = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&order_by=current_price&order_direction=asc`);
    const data = await res.json();
    const collection = data.assets;
    const collectiblesFavoritesToRender = [];

    if (onPublicProfile) {
      dispatch({
        type: 'GET_PUBLIC_COLLECTIBLES',
        publicCollectiblesGallery: collection,
      });
    } else {
      const collectiblesFavorites = store.getState().threeBox.collectiblesFavorites;

      if (collectiblesFavorites && collectiblesFavorites.length > 0) {
        for (let i = collection.length - 1; i >= 0; i -= 1) {
          const colAddress = collection[i].asset_contract.address;
          const tokenId = collection[i].token_id;
          collectiblesFavorites.map((col) => {
            if (colAddress === col.address &&
              tokenId === col.token_id) {
              collectiblesFavoritesToRender.push(collection.splice(i, 1)[0]);
            }
          });
        }
      }

      collectiblesFavoritesToRender.reverse();

      dispatch({
        type: 'GET_MY_COLLECTIBLES',
        collection,
      });
      dispatch({
        type: 'GET_PUBLIC_COLLECTIBLESFAVORITES',
        collectiblesFavorites,
        collectiblesFavoritesToRender,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getPublicDID = () => async (dispatch) => {
  try {
    const did = await store.getState().threeBox.box.verified.DID();

    dispatch({
      type: 'GET_PUBLIC_DID',
      did,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getPublicMemberSince = () => async (dispatch) => {
  const date = await store.getState().threeBox.box.public.get('memberSince');

  let memberSince;
  let memberSinceDate;

  if (date === 'Alpha') {
    memberSinceDate = date;
  } else if (date) {
    memberSince = new Date(date);
    memberSinceDate = `${(memberSince.getMonth() + 1)}/${memberSince.getDate()}/${memberSince.getFullYear()}`;
  }

  dispatch({
    type: 'GET_PUBLIC_MEMBERSINCE',
    memberSince: memberSinceDate,
  });
};

export const getVerifiedPublicGithub = () => async (dispatch) => {
  try {
    const verifiedGithub = await store.getState().threeBox.box.verified.github();

    dispatch({
      type: 'GET_VERIFIED_PUBLIC_GITHUB',
      verifiedGithub: verifiedGithub.username,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getVerifiedPublicTwitter = () => async (dispatch) => {
  try {
    const verifiedTwitter = await store.getState().threeBox.box.verified.twitter();

    dispatch({
      type: 'GET_VERIFIED_PUBLIC_TWITTER',
      verifiedTwitter: verifiedTwitter.username,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getVerifiedPrivateEmail = () => async (dispatch) => {
  try {
    const verifiedEmail = await store.getState().threeBox.box.verified.email();

    dispatch({
      type: 'GET_VERIFIED_PRIVATE_EMAIL',
      verifiedEmail: verifiedEmail.email_address,
    });
  } catch (error) {
    console.error(error);
  }
};

export const handleSignOut = () => async (dispatch) => {
  if (store.getState().threeBox.isLoggedIn) {
    if (store.getState().threeBox.box) store.getState().threeBox.box.logout();
    dispatch({
      type: 'HANDLE_SIGNOUT',
      isLoggedIn: false,
    });
  }
  history.push(routes.LANDING);
};

export const copyToClipBoard = (type, message) => async (dispatch) => {
  try {
    const textArea = document.createElement('textarea');

    if (type === 'did') {
      textArea.value = message;
    } else if (type === 'profile') {
      textArea.value = `https://www.3box.io/${store.getState().threeBox.currentAddress}`;
    }

    document.body.appendChild(textArea);
    textArea.focus({
      preventScroll: true,
    });
    textArea.select();
    document.execCommand('copy');

    setTimeout(() => {
      dispatch({
        type: 'COPY_SUCCESSFUL',
        copySuccessful: true,
      });
    }, 1);
    setTimeout(() => {
      dispatch({
        type: 'COPY_SUCCESSFUL',
        copySuccessful: false,
      });
    }, 2000);

    document.body.removeChild(textArea);
  } catch (err) {
    console.error('Unable to copy', err);
  }
};