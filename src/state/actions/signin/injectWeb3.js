import useOutsideLogin from './useOutsideLogin';
import pickWallet from './pickWallet';

const injectWeb3 = (
  directLogin,
  chooseWallet,
  outsideLoginWallet,
  shouldSignOut,
) => async (dispatch) => {
  if (chooseWallet || !outsideLoginWallet) {
    await pickWallet(directLogin, dispatch, shouldSignOut, chooseWallet);
  } else {
    await useOutsideLogin(outsideLoginWallet, directLogin, dispatch);
  }
};

export default injectWeb3;