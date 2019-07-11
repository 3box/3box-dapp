import Box from '3box';

import {
  store,
} from '../../store';
import * as routes from '../../../utils/routes';
import history from '../../../utils/history';

const openBox = (fromSignIn, fromFollowButton) => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_CONSENT_MODAL',
    provideConsent: true,
    showSignInBanner: false,
  });

  const consentGiven = () => {
    if (fromSignIn && !fromFollowButton) history.push(`/${store.getState().userState.currentAddress || store.getState().userState.accountAddress}/${routes.ACTIVITY}`);
    dispatch({
      type: 'UI_3BOX_LOADING',
      provideConsent: false,
      isFetchingThreeBox: true,
    });
    dispatch({
      type: 'UI_FEED_LOADING',
      isFetchingActivity: true,
    });
  };

  // onSyncDone only happens on first openBox so only run
  // this when a user hasn't signed out and signed back in again
  if (!store.getState().userState.hasSignedOut) {
    // initialize onSyncDone process
    dispatch({
      type: 'UI_APP_SYNC',
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
        store.getState().userState.accountAddress || store.getState().userState.currentAddress,
        window.web3.currentProvider, // eslint-disable-line no-undef
        opts,
      );

    dispatch({
      type: 'USER_LOGIN_UPDATE',
      isLoggedIn: true,
    });
    dispatch({
      type: 'MY_BOX_UPDATE',
      box,
    });
    dispatch({
      type: 'UI_3BOX_FETCHING',
      isFetchingThreeBox: false,
    });

    // onSyncDone only happens on first openBox so only run
    // this when a user hasn't signed out and signed back in again
    if (!store.getState().userState.hasSignedOut) {
      // start onSyncDone loading animation
      dispatch({
        type: 'UI_APP_SYNC',
        onSyncFinished: false,
        isSyncing: true,
      });
    }

    const memberSince = await store.getState().myData.box.public.get('memberSince');

    box.onSyncDone(() => {
      let publicActivity;
      let privateActivity;

      try {
        publicActivity = store.getState().myData.box.public.log;
      } catch (error) {
        console.error(error);
      }
      console.log('publicActivitypublicActivity', publicActivity);
      try {
        privateActivity = store.getState().myData.box.private.log;
      } catch (error) {
        console.error(error);
      }

      if (!privateActivity.length && !publicActivity.length) {
        dispatch({
          type: 'UI_HANDLE_ONBOARDING_MODAL',
          onBoardingModal: true,
        });
        const date = Date.now();
        const dateJoined = new Date(date);
        const memberSinceDate = `${(dateJoined.getMonth() + 1)}/${dateJoined.getDate()}/${dateJoined.getFullYear()}`;
        store.getState().myData.box.public.set('memberSince', dateJoined);
        dispatch({
          type: 'MY_MEMBERSINCE_UPDATE',
          memberSince: memberSinceDate,
        });
        history.push(`/${store.getState().userState.currentAddress}/${routes.EDIT}`);
      } else if (!memberSince && (privateActivity.length || publicActivity.length)) {
        store.getState().myData.box.public.set('memberSince', 'Alpha');
      }

      if ((!privateActivity || !privateActivity.length) && (!publicActivity || !publicActivity.length)) {
        dispatch({
          type: 'USER_LOGIN_UPDATE',
          isLoggedIn: true,
        });
        dispatch({
          type: 'MY_BOX_UPDATE',
          box,
        });
        dispatch({
          type: 'UI_3BOX_FETCHING',
          isFetchingThreeBox: false,
        });

        // call data with new box object from onSyncDone
        dispatch({
          type: 'UI_APP_SYNC',
          onSyncFinished: true,
          isSyncing: true,
        });
      }
    });
  } catch (err) {
    history.push(routes.LANDING);
    dispatch({
      type: 'UI_3BOX_FAILED',
      errorMessage: err,
      showErrorModal: true,
      provideConsent: false,
    });
  }
};

export default openBox;