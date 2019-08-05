import {
  store,
} from '../../store';

const clearReduxState = () => {
  store.dispatch({
    type: 'USER_SIGN_OUT',
  });

  store.dispatch({
    type: 'SPACES_SIGN_OUT',
  });

  store.dispatch({
    type: 'MY_DATA_SIGNOUT',
  });
};

export default clearReduxState;