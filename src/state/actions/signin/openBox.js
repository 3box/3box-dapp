import {
  store,
} from '../../store';
import * as routes from '../../../utils/routes';
import history from '../../../history';

const openBox = fromSignIn => async (dispatch) => {
  dispatch({
    type: 'HANDLE_CONSENT_MODAL',
    provideConsent: true,
    showSignInBanner: false,
  });

  const consentGiven = () => {
    if (fromSignIn) history.push(`/${store.getState().threeBox.currentAddress || store.getState().threeBox.accountAddress}/${routes.ACTIVITY}`);
    dispatch({
      type: 'LOADING_3BOX',
    });
    dispatch({
      type: 'LOADING_ACTIVITY',
    });
  };

  // onSyncDone only happens on first openBox so only run
  // this when a user hasn't signed out and signed back in again
  if (!store.getState().threeBox.hasSignedOut) {
    // initialize onSyncDone process
    dispatch({
      type: 'APP_SYNC',
      onSyncFinished: false,
      isSyncing: false,
    });
  }

  const opts = {
    consentCallback: consentGiven,
  };

  try {
    const box = await Box // eslint-disable-line no-undef
      .openBox(
        store.getState().threeBox.accountAddress || store.getState().threeBox.currentAddress,
        window.web3.currentProvider, // eslint-disable-line no-undef
        opts,
      );

    dispatch({
      type: 'UPDATE_THREEBOX',
      ifFetchingThreeBox: false,
      isLoggedIn: true,
      box,
    });

    // onSyncDone only happens on first openBox so only run
    // this when a user hasn't signed out and signed back in again
    if (!store.getState().threeBox.hasSignedOut) {
      // start onSyncDone loading animation
      dispatch({
        type: 'APP_SYNC',
        onSyncFinished: false,
        isSyncing: true,
      });
    }

    const memberSince = await store.getState().threeBox.box.public.get('memberSince');

    box.onSyncDone(() => {
      const publicActivity = store.getState().threeBox.box.public.log;
      const privateActivity = store.getState().threeBox.box.private.log;

      if (!privateActivity.length && !publicActivity.length) {
        dispatch({
          type: 'HANDLE_ONBOARDING_MODAL',
          onBoardingModal: true,
        });
        const date = Date.now();
        const dateJoined = new Date(date);
        const memberSinceDate = `${(dateJoined.getMonth() + 1)}/${dateJoined.getDate()}/${dateJoined.getFullYear()}`;
        store.getState().threeBox.box.public.set('memberSince', dateJoined);
        dispatch({
          type: 'GET_PUBLIC_MEMBERSINCE',
          memberSince: memberSinceDate,
        });
        history.push(`/${store.getState().threeBox.currentAddress}/${routes.EDIT}`);
      } else if (!memberSince && (privateActivity.length || publicActivity.length)) {
        store.getState().threeBox.box.public.set('memberSince', 'Alpha');
      }

      dispatch({
        type: 'UPDATE_THREEBOX',
        ifFetchingThreeBox: false,
        isLoggedIn: true,
        box,
      });

      // call data with new box object from onSyncDone
      dispatch({
        type: 'APP_SYNC',
        onSyncFinished: true,
        isSyncing: true,
      });
    });
  } catch (err) {
    history.push(routes.LANDING);
    dispatch({
      type: 'FAILED_LOADING_3BOX',
      errorMessage: err,
      showErrorModal: true,
      provideConsent: false,
    });
  }
};

export default openBox;