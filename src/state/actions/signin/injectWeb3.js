import useDefaultWallet from './useDefaultWallet';
import pickWallet from './pickWallet';
import {
  checkIsMobile,
} from '../../../utils/funcs';

const injectWeb3 = (
  directLogin,
  chooseWallet,
  outsideLoginWallet,
  shouldSignOut,
) => async (dispatch) => {
  const defaultWallet = outsideLoginWallet || window.localStorage.getItem('defaultWallet'); // eslint-disable-line no-undef
  const isMobile = checkIsMobile();
  if ((chooseWallet || !defaultWallet) && !isMobile) {
    await pickWallet(directLogin, dispatch, shouldSignOut);
  } else {
    await useDefaultWallet(defaultWallet, directLogin, dispatch);
  }
};

export default injectWeb3;