import {
  store,
} from '../../store';
import * as routes from '../../../utils/routes';
import history from '../../../utils/history';

const handleSignOut = (signInAgain) => async (dispatch) => {
  const {
    userState: {
      isLoggedIn,
      currentWallet,
    },
    myData: {
      box,
    },
  } = store.getState();

  if (isLoggedIn) {
    if (box) box.logout();
    window.localStorage.removeItem('defaultWallet');
    window.localStorage.removeItem('userEthAddress');
    window.localStorage.removeItem('prevNetwork');
    window.localStorage.removeItem('prevPrevNetwork');
    window.localStorage.removeItem('currentNetwork');
    window.localStorage.removeItem('shouldShowSwitchNetwork');

    dispatch({
      type: 'USER_SIGN_OUT',
    });

    dispatch({
      type: 'UI_SIGN_OUT',
      onSyncFinished: false,
    });

    dispatch({
      type: 'SPACES_SIGN_OUT',
    });

    dispatch({
      type: 'MY_DATA_SIGNOUT',
    });
  }
  
  let route;
  if (signInAgain) {
    route = `${routes.LOGIN}?wallet=${currentWallet}`;
  } else {
    route = routes.LANDING;
  }
  history.push(route);
};

export default handleSignOut;