import useDefaultWallet from './useDefaultWallet';
import pickWallet from './pickWallet';

const injectWeb3 = (directLogin, chooseWallet) => async (dispatch) => {
  const defaultWallet = window.localStorage.getItem('defaultWallet'); // eslint-disable-line no-undef
  if (defaultWallet && !chooseWallet) {
    await useDefaultWallet(defaultWallet, directLogin, dispatch);
  } else {
    await pickWallet(directLogin, dispatch);
  }
};

export default injectWeb3;