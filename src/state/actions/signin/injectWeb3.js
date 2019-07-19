import useDefaultWallet from './useDefaultWallet';
import pickWallet from './pickWallet';

const injectWeb3 = directLogin => async (dispatch) => {
  const defaultWallet = window.localStorage.getItem('web3Provider'); // eslint-disable-line no-undef

  if (defaultWallet) {
    await useDefaultWallet(defaultWallet, directLogin, dispatch);
  } else {
    await pickWallet(directLogin, dispatch);
  }
};

export default injectWeb3;