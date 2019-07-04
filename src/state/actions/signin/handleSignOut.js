import {
  store,
} from '../../store';
import * as routes from '../../../utils/routes';
import history from '../../../utils/history';

const handleSignOut = () => async (dispatch) => {
  if (store.getState().userState.isLoggedIn) {
    if (store.getState().myData.box) store.getState().myData.box.logout();
    dispatch({
      type: 'USER_SIGN_OUT',
      isLoggedIn: false,
      hasSignedOut: true,
    });
    dispatch({
      type: 'UI_SIGN_OUT',
      onSyncFinished: false,
    });
    dispatch({
      type: 'MY_DATA_SIGNOUT',
    });
  }
  history.push(routes.LANDING);
};

export default handleSignOut;