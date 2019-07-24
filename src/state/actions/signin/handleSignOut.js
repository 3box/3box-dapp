import {
  store,
} from '../../store';
import * as routes from '../../../utils/routes';
import history from '../../../utils/history';

const handleSignOut = () => async (dispatch) => {
  const {
    isLoggedIn,
  } = store.getState().userState;
  const {
    box,
  } = store.getState().myData;
  console.log('insignout');
  if (isLoggedIn) {
    if (box) box.logout();
    dispatch({
      type: 'USER_SIGN_OUT',
      isLoggedIn: false,
      hasSignedOut: true,
      shouldPoll: false,
      web3Obj: null,
      usingInjectedAddress: false,
      currentAddress: undefined,
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
  }
  history.push(routes.LANDING);
};

export default handleSignOut;