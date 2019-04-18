const checkWeb3 = () => async (dispatch) => {
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
    type: 'USER_CHECK_WEB3',
    hasWeb3: typeof window.web3 !== 'undefined', // eslint-disable-line no-undef
    showDownloadBanner: typeof window.web3 === 'undefined', // eslint-disable-line no-undef
    currentWallet,
  });
  dispatch({
    type: 'UI_HANDLE_MOBILE_WALLET_REQUIRED_MODAL',
    mobileWalletRequiredModal: (typeof window.web3 === 'undefined' && typeof window.ethereum === 'undefined'), // eslint-disable-line no-undef
  });
};

export default checkWeb3;