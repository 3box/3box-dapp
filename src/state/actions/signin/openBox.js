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

  const {
    currentAddress,
    web3Obj,
    hasSignedOut,
  } = store.getState().userState;

  const consentGiven = () => {
    if (fromSignIn && !fromFollowButton) history.push(`/${currentAddress}/${routes.ACTIVITY}`);
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
  if (!hasSignedOut) {
    // initialize onSyncDone process
    dispatch({
      type: 'UI_APP_SYNC',
      onSyncFinished: false,
      isSyncing: false,
    });
  }

  try {
    const opts = {
      consentCallback: consentGiven,
    };

    const box = await Box // eslint-disable-line no-undef
      .openBox(
        currentAddress,
        web3Obj.currentProvider, // eslint-disable-line no-undef
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
    if (!hasSignedOut) {
      // start onSyncDone loading animation
      dispatch({
        type: 'UI_APP_SYNC',
        onSyncFinished: false,
        isSyncing: true,
      });
    }

    const memberSince = await box.public.get('memberSince');

    box.onSyncDone(() => {
      let publicActivity;
      let privateActivity;

      try {
        publicActivity = box.public.log || [];
      } catch (error) {
        console.error(error);
      }
      
      try {
        privateActivity = box.private.log || [];
      } catch (error) {
        console.error(error);
      }

      if ((!privateActivity || !privateActivity.length) && (!publicActivity || !publicActivity.length)) {
        dispatch({
          type: 'UI_HANDLE_ONBOARDING_MODAL',
          onBoardingModal: true,
        });
        const date = Date.now();
        const dateJoined = new Date(date);
        const memberSinceDate = `${(dateJoined.getMonth() + 1)}/${dateJoined.getDate()}/${dateJoined.getFullYear()}`;
        store.getState().myData.box.public.set('memberSince', dateJoined.toString());
        dispatch({
          type: 'MY_MEMBERSINCE_UPDATE',
          memberSince: memberSinceDate,
        });
        history.push(`/${currentAddress}/${routes.EDIT}`);
      } else if (!memberSince && (privateActivity.length || publicActivity.length)) {
        box.public.set('memberSince', 'Alpha');
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