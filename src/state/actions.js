import {
  address,
} from '../utils/address';

import {
  store,
} from './store';

import {
  checkForOnBoarding,
} from '../utils/utils';

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
    downloadBanner: typeof window.web3 === 'undefined', // eslint-disable-line no-undef
    mobileWalletRequiredModal: typeof window.web3 === 'undefined', // eslint-disable-line no-undef
    currentWallet,
  });
};

// inject for breaking change
export const requestAccess = directLogin => async (dispatch) => {
  let accounts;
  const accountsPromise = new Promise((resolve, reject) => {
    window.web3.eth.getAccounts((e, accountsFound) => { // eslint-disable-line no-undef
      if (e != null) {
        reject(e);
      } else {
        resolve(accountsFound);
      }
    });
  });

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

      dispatch({
        type: 'UPDATE_ADDRESSES',
        isSignedIntoWallet: accounts.length > 0 || store.getState().threeBox.currentWallet === 'isToshi',
        isLoggedIn: accounts && Box.isLoggedIn(accounts[0]), // eslint-disable-line no-undef
        accountAddress: accounts[0],
        allowAccessModal: false,
      });
    } catch (error) {
      history.push(routes.LANDING);
      dispatch({
        type: 'HANDLE_DENIED_ACCESS_MODAL',
        accessDeniedModal: true,
        allowAccessModal: false,
      });
    }
  } else if (window.web3) { // eslint-disable-line no-undef
    window.web3 = new Web3(web3.currentProvider); // eslint-disable-line no-undef

    accounts = await accountsPromise;

    dispatch({
      type: 'UPDATE_ADDRESSES',
      isSignedIntoWallet: accounts.length > 0 || store.getState().threeBox.currentWallet === 'isToshi',
      isLoggedIn: accounts && Box.isLoggedIn(accounts[0]), // eslint-disable-line no-undef
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

export const signInGetBox = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_CONSENT_MODAL',
    provideConsent: true,
  });

  const consentGiven = () => {
    history.push(routes.PROFILE);
    dispatch({
      type: 'LOADING_3BOX',
    });
  };

  const opts = {
    consentCallback: consentGiven,
  };

  try {
    const box = await Box // eslint-disable-line no-undef
      .openBox(
        store.getState().threeBox.accountAddress || address,
        window.web3.currentProvider, // eslint-disable-line no-undef
        opts,
      );

    dispatch({
      type: 'UPDATE_THREEBOX',
      ifFetchingThreeBox: false,
      isLoggedIn: true,
      box,
    });

    box.onSyncDone(() => {
      // const feed = store.getState().threeBox.feedByAddress;
      // checkForOnBoarding(dispatch, feed);
      dispatch({
        type: 'UPDATE_THREEBOX',
        ifFetchingThreeBox: false,
        isLoggedIn: true,
        box,
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

export const profileGetBox = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_CONSENT_MODAL',
    provideConsent: true,
  });

  const consentGiven = () => {
    dispatch({
      type: 'LOADING_3BOX',
    });
  };

  const opts = {
    consentCallback: consentGiven,
  };

  try {
    const box = await Box // eslint-disable-line no-undef
      .openBox(
        store.getState().threeBox.accountAddress || address,
        window.web3.currentProvider, // eslint-disable-line no-undef
        opts,
      );

    dispatch({
      type: 'UPDATE_THREEBOX',
      ifFetchingThreeBox: false,
      box,
      isLoggedIn: true,
    });

    box.onSyncDone(() => {
      // const feed = store.getState().threeBox.feedByAddress;
      // checkForOnBoarding(dispatch, feed);
      dispatch({
        type: 'UPDATE_THREEBOX',
        ifFetchingThreeBox: false,
        isLoggedIn: true,
        box,
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

export const getPublicName = () => async (dispatch) => {
  const name = await store.getState().threeBox.box.public.get('name');

  dispatch({
    type: 'GET_PUBLIC_NAME',
    name,
  });
};

export const getPublicGithub = () => async (dispatch) => {
  const github = await store.getState().threeBox.box.public.get('github');

  dispatch({
    type: 'GET_PUBLIC_GITHUB',
    github,
  });
};

export const getPublicDescription = () => async (dispatch) => {
  const description = await store.getState().threeBox.box.public.get('description');

  dispatch({
    type: 'GET_PUBLIC_DESCRIPTION',
    description,
  });
};

export const getPublicLocation = () => async (dispatch) => {
  const location = await store.getState().threeBox.box.public.get('location');

  dispatch({
    type: 'GET_PUBLIC_LOCATION',
    location,
  });
};

export const getPublicWebsite = () => async (dispatch) => {
  const website = await store.getState().threeBox.box.public.get('website');

  dispatch({
    type: 'GET_PUBLIC_WEBSITE',
    website,
  });
};

export const getPublicEmployer = () => async (dispatch) => {
  const employer = await store.getState().threeBox.box.public.get('employer');

  dispatch({
    type: 'GET_PUBLIC_EMPLOYER',
    employer,
  });
};

export const getPublicJob = () => async (dispatch) => {
  const job = await store.getState().threeBox.box.public.get('job');

  dispatch({
    type: 'GET_PUBLIC_JOB',
    job,
  });
};

export const getPublicSchool = () => async (dispatch) => {
  const school = await store.getState().threeBox.box.public.get('school');

  dispatch({
    type: 'GET_PUBLIC_SCHOOL',
    school,
  });
};

export const getPublicDegree = () => async (dispatch) => {
  const degree = await store.getState().threeBox.box.public.get('degree');

  dispatch({
    type: 'GET_PUBLIC_DEGREE',
    degree,
  });
};

export const getPublicImage = () => async (dispatch) => {
  const image = await store.getState().threeBox.box.public.get('image');

  dispatch({
    type: 'GET_PUBLIC_IMAGE',
    image,
  });
};

export const getPublicCoverPhoto = () => async (dispatch) => {
  const coverPhoto = await store.getState().threeBox.box.public.get('coverPhoto');

  dispatch({
    type: 'GET_PUBLIC_COVERPHOTO',
    coverPhoto,
  });
};

export const getPublicEmoji = () => async (dispatch) => {
  const emoji = await store.getState().threeBox.box.public.get('emoji');

  dispatch({
    type: 'GET_PUBLIC_EMOJI',
    emoji,
  });
};

export const getPublicSubject = () => async (dispatch) => {
  const major = await store.getState().threeBox.box.public.get('major');

  dispatch({
    type: 'GET_PUBLIC_MAJOR',
    major,
  });
};

export const getPublicYear = () => async (dispatch) => {
  const year = await store.getState().threeBox.box.public.get('year');

  dispatch({
    type: 'GET_PUBLIC_YEAR',
    year,
  });
};

export const getPrivateEmail = () => async (dispatch) => {
  const email = await store.getState().threeBox.box.private.get('email');

  dispatch({
    type: 'GET_PRIVATE_EMAIL',
    email,
  });
};

export const getPrivateBirthday = () => async (dispatch) => {
  const birthday = await store.getState().threeBox.box.private.get('birthday');

  dispatch({
    type: 'GET_PRIVATE_BIRTHDAY',
    birthday,
  });
};

export const getPublicStatus = () => async (dispatch) => {
  const status = await store.getState().threeBox.box.public.get('status');

  dispatch({
    type: 'GET_PUBLIC_STATUS',
    status,
  });
};

export const getActivity = () => async (dispatch) => {
  try {
    const activity = await ThreeBoxActivity.get(address); // eslint-disable-line no-undef

    // add datatype to each datum
    activity.internal = activity.internal.map(object => Object.assign({
      dataType: 'Internal',
    }, object));
    activity.txs = activity.txs.map(object => Object.assign({
      dataType: 'Txs',
    }, object));
    activity.token = activity.token.map(object => Object.assign({
      dataType: 'Token',
    }, object));

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

    const feed = activity.internal
      .concat(activity.txs)
      .concat(activity.token)
      .concat(publicActivity)
      .concat(privateActivity);

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

    // order feed chronologically and by address
    const feedByAddress = [];
    feed.forEach((item) => {
      const othersAddress = item.from === address ? item.to : item.from;
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

    checkForOnBoarding(dispatch, feedByAddress);

    dispatch({
      type: 'UPDATE_ACTIVITY',
      feedByAddress,
      ifFetchingActivity: false,
      isLoggedIn: true,
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

export const handleSignOut = () => async (dispatch) => {
  if (store.getState().threeBox.isLoggedIn) {
    store.getState().threeBox.box.logout();
    dispatch({
      type: 'HANDLE_SIGNOUT',
      isLoggedIn: false,
    });
  }
  history.push(routes.LANDING);
};