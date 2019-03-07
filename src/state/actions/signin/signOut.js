import {
  store,
} from '../../store';
import * as routes from '../../../utils/routes';
import history from '../../../utils/history';

export const handleSignOut = () => async (dispatch) => {
  if (store.getState().threeBox.isLoggedIn) {
    if (store.getState().threeBox.box) store.getState().threeBox.box.logout();
    dispatch({
      type: 'HANDLE_SIGNOUT',
      isLoggedIn: false,
    });
  }
  history.push(routes.LANDING);
};

export default handleSignOut;