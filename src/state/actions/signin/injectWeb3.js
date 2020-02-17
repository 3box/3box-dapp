import useDefaultWallet from './useDefaultWallet';
import pickWallet from './pickWallet';

const injectWeb3 = (
  directLogin,
  chooseWallet,
  outsideLoginWallet,
  shouldSignOut,
) => async (dispatch) => {
  // const defaultWallet = outsideLoginWallet || window.localStorage.getItem('defaultWallet'); // eslint-disable-line no-undef
  // const isDefaultWalletConnect = defaultWallet && defaultWallet.toLowerCase() === 'walletconnect';
  // if (chooseWallet || !defaultWallet || isDefaultWalletConnect) {
  if (chooseWallet || !outsideLoginWallet) {
    await pickWallet(directLogin, dispatch, shouldSignOut, chooseWallet);
  } else {
    await useDefaultWallet(outsideLoginWallet, directLogin, dispatch);
  }
};

export default injectWeb3;