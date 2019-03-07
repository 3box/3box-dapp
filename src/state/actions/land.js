import {
  store,
} from '../../store';

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
