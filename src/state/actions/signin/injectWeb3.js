import useDefaultWallet from './useDefaultWallet';
import pickWallet from './pickWallet';

const injectWeb3 = (
  directLogin,
  chooseWallet,
  outsideLoginWallet,
  shouldSignOut,
) => async (dispatch) => {
  const defaultWallet = outsideLoginWallet || window.localStorage.getItem('defaultWallet'); // eslint-disable-line no-undef
  console.log('ininject');
  if (chooseWallet || !defaultWallet) {
    await pickWallet(directLogin, dispatch, shouldSignOut);
  } else {
    await useDefaultWallet(defaultWallet, directLogin, dispatch);
  }
};

export default injectWeb3;