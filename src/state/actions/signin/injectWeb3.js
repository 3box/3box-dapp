import useDefaultWallet from './useDefaultWallet';
import pickWallet from './pickWallet';

const injectWeb3 = (
  directLogin,
  chooseWallet,
  outsideLoginWallet,
  shouldSignOut,
) => async (dispatch) => {
  const defaultWallet = outsideLoginWallet || window.localStorage.getItem('defaultWallet'); // eslint-disable-line no-undef
  const isDefaultWalletConnect = defaultWallet.toLowerCase() === 'walletconnect';

  if (chooseWallet || !defaultWallet || isDefaultWalletConnect) {
    await pickWallet(directLogin, dispatch, shouldSignOut);
  } else {
    await useDefaultWallet(defaultWallet, directLogin, dispatch);
  }
};

export default injectWeb3;