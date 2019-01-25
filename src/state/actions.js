// import Box from '3box';

import {
  store,
} from './store';
import * as routes from '../utils/routes';
import history from '../history';

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
  let accounts;

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
        isSignedIntoWallet: accounts.length > 0 || store.getState().threeBox.currentWallet === 'isToshi',
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
        isSignedIntoWallet: accounts.length > 0 || store.getState().threeBox.currentWallet === 'isToshi',
      });
    }
  } else if (window.web3) { // eslint-disable-line no-undef
    window.web3 = new Web3(web3.currentProvider); // eslint-disable-line no-undef

    accounts = await accountsPromise;
    window.localStorage.setItem('userEthAddress', accounts[0]);

    dispatch({
      type: 'UPDATE_ADDRESSES',
      isSignedIntoWallet: accounts.length > 0 || store.getState().threeBox.currentWallet === 'isToshi',
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

    let activity;

    if (publicProfileAddress) {
      activity = await ThreeBoxActivity.get(publicProfileAddress); // eslint-disable-line no-undef
    } else {
      activity = await ThreeBoxActivity.get(store.getState().threeBox.currentAddress); // eslint-disable-line no-undef
    }

    // add datatype
    activity.internal = activity.internal.map(object => Object.assign({
      dataType: 'Internal',
    }, object));
    activity.txs = activity.txs.map(object => Object.assign({
      dataType: 'Txs',
    }, object));
    activity.token = activity.token.map(object => Object.assign({
      dataType: 'Token',
    }, object));

    let feed;

    if (publicProfileAddress) {
      feed = activity.internal
        .concat(activity.txs)
        .concat(activity.token);
    } else {
      let publicActivity = await store.getState().threeBox.box.public.log;
      let privateActivity = await store.getState().threeBox.box.private.log;

      publicActivity = publicActivity.map((object) => {
        object.timeStamp = object.timeStamp && object.timeStamp.toString().substring(0, 10);
        return Object.assign({
          dataType: 'Public',
        }, object);
      });
      privateActivity = privateActivity.map((object) => {
        object.timeStamp = object.timeStamp && object.timeStamp.toString().substring(0, 10);
        return Object.assign({
          dataType: 'Private',
        }, object);
      });

      feed = activity.internal
        .concat(activity.txs)
        .concat(activity.token)
        .concat(publicActivity)
        .concat(privateActivity);
    }

    // if timestamp is undefined, give it the timestamp of the previous entry
    feed.map((item, i) => {
      const feedItem = item;
      if (!feedItem.timeStamp) {
        const deletedTime = parseInt(feed[i - 1].timeStamp, 10) + 1;
        feedItem.timeStamp = deletedTime.toString();
      }
      return feedItem;
    });

    feed.sort((a, b) => b.timeStamp - a.timeStamp);

    // order feed chronologically and by currentAddress
    const feedByAddress = [];
    feed.forEach((item) => {
      const othersAddress = item.from === store.getState().threeBox.currentAddress ? item.to : item.from;
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

    if (publicProfileAddress) {
      dispatch({
        type: 'GET_PUBLIC_PROFILE_ACTIVITY',
        publicProfileActivity: feedByAddress,
        ifFetchingActivity: false,
      });
    } else {
      dispatch({
        type: 'UPDATE_ACTIVITY',
        feedByAddress,
        ifFetchingActivity: false,
        isLoggedIn: true,
      });
    }
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