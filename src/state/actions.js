import {
  address,
} from '../utils/address';

import {
  store,
} from './store';

import history from '../history';

export const checkForMetaMask = () => async (dispatch) => {
  const cp = typeof web3 !== 'undefined' ? web3.currentProvider : null; // eslint-disable-line no-undef

  const isToshi = cp ? !!cp.isToshi : false;
  const isCipher = cp ? !!cp.isCipher : false;
  const isMetaMask = cp ? !!cp.isMetaMask : false;
  let currentWallet;

  if (isToshi) {
    currentWallet = 'isToshi';
  } else if (isCipher) {
    currentWallet = 'isCipher';
  } else if (isMetaMask) {
    currentWallet = 'isMetaMask';
  }

  const accountsPromise = typeof web3 !== 'undefined' ?
    new Promise((resolve, reject) => {
      web3.eth.getAccounts((e, accounts) => { // eslint-disable-line no-undef
        if (e != null) {
          reject(e);
        } else {
          resolve(accounts);
        }
      });
    }) :
    null;

  const accounts = await accountsPromise; // eslint-disable-line no-undef
  const isSignedIntoWallet = typeof web3 !== 'undefined' && !!accounts.length > 0;

  await dispatch({
    type: 'CHECK_WALLET',
    hasWallet: typeof web3 !== 'undefined',
    currentWallet,
    isSignedIntoWallet,
  });
};

export const checkNetworkAndAddress = () => async (dispatch) => {
  const checkNetwork = new Promise((resolve) => {
    window.web3.version.getNetwork((err, netId) => {
      switch (netId) {
        case '1':
          resolve('Mainnet');
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

  // check network, compatible with old & new v of MetaMask
  let currentNetwork;
  if (web3.eth.net) { // eslint-disable-line no-undef
    await web3.eth.net.getNetworkType() // eslint-disable-line no-undef
      .then((network) => {
        currentNetwork = network;
      });
  } else {
    await checkNetwork.then((network) => {
      currentNetwork = network;
    });
  }

  window.localStorage.setItem('prevPrevNetwork', window.localStorage.prevNetwork);
  window.localStorage.setItem('prevNetwork', window.localStorage.currentNetwork);
  window.localStorage.setItem('currentNetwork', currentNetwork);
  // window.localStorage.setItem('switch', true);

  const prevNetwork = window.localStorage.prevNetwork;
  const prevPrevNetwork = window.localStorage.prevPrevNetwork;
  
  if (prevNetwork && (prevNetwork !== currentNetwork)) {
    await dispatch({
      type: 'DIFFERENT_NETWORK',
      currentNetwork,
      prevNetwork,
      prevPrevNetwork,
    });
  }

  await dispatch({
    type: 'CHECK_NETWORK_AND_ADDRESS',
    currentNetwork,
  });
};

export const closeDifferentNetwork = () => (dispatch) => {
  dispatch({
    type: 'CLOSE_DIFFERENT_NETWORK_MODAL',
    showDifferentNetworkModal: false,
  });
};

export const requireMetaMask = () => (dispatch) => {
  dispatch({
    type: 'REQUIRE_METAMASK',
    alertRequireMetaMask: true,
  });
};

export const closeRequireMetaMask = () => (dispatch) => {
  dispatch({
    type: 'REQUIRE_METAMASK',
    alertRequireMetaMask: false,
  });
};

export const signInUp = () => async (dispatch) => {
  let box;

  dispatch({
    type: 'PROVIDE_CONSENT',
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
    const returnedBox = await ThreeBox // eslint-disable-line no-undef
      .openBox(address, web3.currentProvider, opts); // eslint-disable-line no-undef
    box = await returnedBox;
    const name = await box.public.get('name');
    const github = await box.public.get('github');
    const image = await box.public.get('image');
    const email = await box.private.get('email');

    const returnedActivity = await ThreeBoxActivity.get(address); // eslint-disable-line no-undef
    const activity = await returnedActivity;

    activity.internal = activity.internal.map(object => Object.assign({
      dataType: 'Internal',
    }, object));
    activity.txs = activity.txs.map(object => Object.assign({
      dataType: 'Txs',
    }, object));
    activity.token = activity.token.map(object => Object.assign({
      dataType: 'Token',
    }, object));

    let publicActivity = await box.public.log;
    publicActivity = publicActivity.map((object) => {
      object.timeStamp = object.timeStamp && object.timeStamp.toString().substring(0, 10);
      return Object.assign({
        dataType: 'Public',
      }, object);
    });

    let privateActivity = await box.private.log;
    privateActivity = privateActivity.map((object) => {
      object.timeStamp = object.timeStamp && object.timeStamp.toString().substring(0, 10);
      return Object.assign({
        dataType: 'Private',
      }, object);
    });

    const feed = activity.internal.concat(activity.txs).concat(activity.token).concat(publicActivity).concat(privateActivity);
    feed.sort((a, b) => b.timeStamp - a.timeStamp);

    // order feed chronologically and by address
    const feedByAddress = [];
    feed.forEach((item) => {
      const othersAddress = item.from === address ? item.to : item.from;
      if (feedByAddress.length > 0 && Object.keys(feedByAddress[feedByAddress.length - 1])[0] === othersAddress) {
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

    dispatch({
      type: 'SIGN_IN_UP',
      box,
      ifFetchingThreeBox: false,
      errorMessage: '',
      showErrorModal: false,
      name,
      github,
      image,
      email,
      feedByAddress,
      switched: false,
    });
    history.push('/Profile');
  } catch (err) {
    dispatch({
      type: 'FAILED_LOADING_3BOX',
      errorMessage: err.message,
      showErrorModal: true,
      provideConsent: false,
    });
  }
};

export const openBox = () => async (dispatch) => {
  dispatch({
    type: 'LOADING_ACTIVITY',
  });
  dispatch({
    type: 'LOADING_3BOX',
  });
  const returnedBox = await ThreeBox // eslint-disable-line no-undef
    .openBox(address, web3.currentProvider); // eslint-disable-line no-undef
  const box = await returnedBox;

  dispatch({
    type: 'GET_THREEBOX',
    ifFetchingThreeBox: false,
    box,
    switched: false,
  });
};

export const getPublicName = () => async (dispatch) => {
  const returnedName = await store.getState().threeBox.box.public.get('name');
  const name = await returnedName;

  dispatch({
    type: 'GET_PUBLIC_NAME',
    name,
  });
};

export const getPublicGithub = () => async (dispatch) => {
  const returnedGithub = await store.getState().threeBox.box.public.get('github');
  const github = await returnedGithub;
  dispatch({
    type: 'GET_PUBLIC_GITHUB',
    github,
  });
};

export const getPublicImage = () => async (dispatch) => {
  const returnedImage = await store.getState().threeBox.box.public.get('image');
  const image = await returnedImage;
  dispatch({
    type: 'GET_PUBLIC_IMAGE',
    image,
  });
};

export const getPrivateEmail = () => async (dispatch) => {
  const returnedEmail = await store.getState().threeBox.box.private.get('email');
  const email = await returnedEmail;
  dispatch({
    type: 'GET_PRIVATE_EMAIL',
    email,
  });
};

export const getActivity = () => async (dispatch) => {
  try {
    const returnedActivity = await ThreeBoxActivity.get(address); // eslint-disable-line no-undef
    const activity = await returnedActivity;

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
    publicActivity = publicActivity.map((object) => {
      object.timeStamp = object.timeStamp && object.timeStamp.toString().substring(0, 10);
      return Object.assign({
        dataType: 'Public',
      }, object);
    });

    let privateActivity = await store.getState().threeBox.box.private.log;
    privateActivity = privateActivity.map((object) => {
      object.timeStamp = object.timeStamp && object.timeStamp.toString().substring(0, 10);
      return Object.assign({
        dataType: 'Private',
      }, object);
    });

    const feed = activity.internal.concat(activity.txs).concat(activity.token).concat(publicActivity).concat(privateActivity);
    feed.sort((a, b) => b.timeStamp - a.timeStamp);

    // order feed chronologically and by address
    const feedByAddress = [];
    feed.forEach((item) => {
      const othersAddress = item.from === address ? item.to : item.from;
      if (feedByAddress.length > 0 && Object.keys(feedByAddress[feedByAddress.length - 1])[0] === othersAddress) {
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

    dispatch({
      type: 'GET_ACTIVITY',
      feedByAddress,
      ifFetchingActivity: false,
    });
  } catch (err) {
    dispatch({
      type: 'FAILED_LOADING_ACTIVITY',
      feedByAddress: [],
      ifFetchingActivity: false,
    });
  }
};

export const closeErrorModal = () => async (dispatch) => {
  dispatch({
    type: 'CLOSE_ERROR_MODAL',
    errorMessage: '',
    showErrorModal: false,
  });
};

export const openErrorModal = () => async (dispatch) => {
  dispatch({
    type: 'OPEN_ERROR_MODAL',
    errorMessage: '',
    showErrorModal: true,
  });
};

export const handleSignInModal = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_SIGNIN_MODAL',
    errorMessage: '',
    signInModal: !store.getState().threeBox.signInModal,
  });
};

export const closeConsentModal = () => async (dispatch) => {
  dispatch({
    type: 'CLOSE_CONSENT_MODAL',
    provideConsent: false,
  });
};

export const showLoggedOutModal = () => async (dispatch) => {
  dispatch({
    type: 'SHOW_LOGGEDOUT_MODAL',
    loggedOutModal: !store.getState().threeBox.loggedOutModal,
  });
};

export const showSwitchedAddressModal = () => async (dispatch) => {
  dispatch({
    type: 'SHOW_SWITCHED_ADDRESS_MODAL',
    switchedAddressModal: !store.getState().threeBox.switchedAddressModal,
  });
};

export const proceedWithSwitchedAddress = () => async (dispatch) => {
  dispatch({
    type: 'PROCEED_WITH_SWITCHED_ADDRESS',
    switch: false,
    showDifferentNetworkModal: false,
  });
};
