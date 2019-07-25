import useDefaultWallet from './useDefaultWallet';
import pickWallet from './pickWallet';
import {
  store,
} from '../../store';

const {
  userState: {
    isMobile,
  },
} = store.getState();

const injectWeb3 = (
  directLogin,
  chooseWallet,
  outsideLoginWallet,
  shouldSignOut,
) => async (dispatch) => {
  const defaultWallet = outsideLoginWallet || window.localStorage.getItem('defaultWallet'); // eslint-disable-line no-undef
  if ((chooseWallet || !defaultWallet) && !isMobile) {
    await pickWallet(directLogin, dispatch, shouldSignOut);
  } else {
    await useDefaultWallet(defaultWallet, directLogin, dispatch);
  }
};

export default injectWeb3;