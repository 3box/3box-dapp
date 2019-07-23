import useDefaultWallet from './useDefaultWallet';
import pickWallet from './pickWallet';

const injectWeb3 = (directLogin, chooseWallet, outsideLoginWallet) => async (dispatch) => {
  const defaultWallet = outsideLoginWallet || window.localStorage.getItem('defaultWallet'); // eslint-disable-line no-undef
  if (outsideLoginWallet || (defaultWallet && !chooseWallet)) {
    await useDefaultWallet(defaultWallet, directLogin, dispatch);
  } else if (chooseWallet) {
    await pickWallet(directLogin, dispatch);
  }
};

export default injectWeb3;