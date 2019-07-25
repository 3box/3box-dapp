import {
  store,
} from '../../store';
import * as routes from '../../../utils/routes';
import history from '../../../utils/history';

const handleSignOutFunc = () => {
  const {
    userState: {
      isLoggedIn,
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

    store.dispatch({
      type: 'USER_SIGN_OUT',
    });

    store.dispatch({
      type: 'UI_SIGN_OUT',
      onSyncFinished: false,
    });

    store.dispatch({
      type: 'SPACES_SIGN_OUT',
    });

    store.dispatch({
      type: 'MY_DATA_SIGNOUT',
    });
  }
  history.push(routes.LANDING);
};

export default handleSignOutFunc;