import {
  store,
} from '../../store';
import * as routes from '../../../utils/routes';
import history from '../../../utils/history';

export const handleSignOut = () => async (dispatch) => {
  if (store.getState().userState.isLoggedIn) {
    if (store.getState().myData.box) store.getState().myData.box.logout();
    dispatch({
      type: 'SIGNOUT_USERSTATE',
      isLoggedIn: false,
      hasSignedOut: true,
    });
    dispatch({
      type: 'SIGNOUT_UISTATE',
      onSyncFinished: false,
    });
    dispatch({
      type: 'SIGNOUT_MYDATA',
      birthday: '',
      name: '',
      github: '',
      image: [],
      email: '',
      feedByAddress: [],
      box: {},
      description: '',
      location: '',
      website: '',
      employer: '',
      job: '',
      school: '',
      degree: '',
      major: '',
      year: '',
      coverPhoto: [],
      emoji: '',
      status: '',
    });
  }
  history.push(routes.LANDING);
};

export default handleSignOut;