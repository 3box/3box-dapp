import {
  store,
} from '../../store';
import * as routes from '../../../utils/routes';
import history from '../../../utils/history';

const handleSignOut = () => async (dispatch) => {
  const {
    isLoggedIn,
    pollId,
  } = store.getState().userState;
  const {
    box,
  } = store.getState().myData;

  if (isLoggedIn) {
    if (box) box.logout();
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

    clearTimeout(pollId);
  }
  history.push(routes.LANDING);
};

export default handleSignOut;