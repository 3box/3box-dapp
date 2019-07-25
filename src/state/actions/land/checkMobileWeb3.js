const checkMobileWeb3 = () => async (dispatch) => {
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
      currentWallet = 'Toshi';
    } else if (isCipher) {
      currentWallet = 'Cipher';
    } else if (isMetaMask) {
      currentWallet = 'MetaMask';
    }
  }

  let isMobile;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
    dispatch({
      type: 'UI_HANDLE_MOBILE_WALLET_REQUIRED_MODAL',
      mobileWalletRequiredModal: (typeof window.web3 === 'undefined' && typeof window.ethereum === 'undefined'), // eslint-disable-line no-undef
    });
  }

  dispatch({
    type: 'USER_CHECK_WEB3',
    currentWallet,
    isMobile,
  });
};

export default checkMobileWeb3;