import Box from '3box';

import {
  store,
} from '../../store';
import * as routes from '../../../utils/routes';
import history from '../../../utils/history';
import {
  startPollFlag,
  pollNetworkAndAddress,
} from '../../../utils/address';
// import getActivity from '../profile/getActivity/getActivity';
import getCollectibles from '../profile/getCollectibles';
import getGeneralProfile from '../profile/getGeneralProfile';
import fetchEns from '../utils';
import SimpleID from 'simpleid-js-sdk';

const simple = new SimpleID({
  appOrigin: window.location.origin,
  appName: "App Name",
  appId: "YOUR APP ID HERE",
  useSimpledIdWidget: false,
  network: 'mainnet'
});

const openBox = (fromSignIn, fromFollowButton) => async (dispatch) => {
  const {
    currentAddress,
    web3Obj,
    hasSignedOut,
  } = store.getState().userState;

  const {
    otherProfileAddress,
  } = store.getState().otherProfile;

  dispatch({
    type: 'UI_HANDLE_CONSENT_MODAL',
    provideConsent: true,
    showSignInBanner: false,
  });

  const consentCallback = () => {
    const redirectToHome = (fromSignIn && !fromFollowButton) ||
      (otherProfileAddress === currentAddress);

    if (redirectToHome) {
      history.push(`/${currentAddress}/${routes.directToHome()}`);
    }

    startPollFlag();
    pollNetworkAndAddress(); // Start polling for address change
    getGeneralProfile(currentAddress);
    getCollectibles(currentAddress); // need box object for collectiblesFavorites
    // getActivity(); // need box object for 3box activity

    dispatch({
      type: 'UI_3BOX_LOADING',
      provideConsent: false,
      isFetchingThreeBox: true,
    });
    dispatch({
      type: 'UI_PROFILE_LOADING',
      isFetchingActivity: true,
      isFetchingWall: true,
      isFetchingCollectibles: true,
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
    const box = await Box.openBox(currentAddress, web3Obj.currentProvider, {
      consentCallback,
    });
    const ens = await fetchEns(currentAddress, web3Obj);

    dispatch({
      type: 'USER_LOGIN_UPDATE',
      isLoggedIn: true,
    });
    dispatch({
      type: 'MY_BOX_UPDATE',
      box,
      ens,
      threeId: box._3id.DID,
    });
    dispatch({
      type: 'UI_3BOX_FETCHING',
      isFetchingThreeBox: false,
      // onOtherProfilePage: false,
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

    box.onSyncDone(async () => {
      const memberSince = await box.public.get('memberSince');
      let publicActivity;
      let privateActivity;

      try {
        publicActivity = await box.public.log() || [];
      } catch (error) {
        console.error(error);
      }

      try {
        privateActivity = await box.private.log() || [];
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
      } else if (!memberSince && ((privateActivity && privateActivity.length) || (publicActivity && publicActivity.length))) {
        box.public.set('memberSince', 'Alpha');
      }

      dispatch({
        type: 'USER_LOGIN_UPDATE',
        isLoggedIn: true,
      });
      dispatch({
        type: 'UI_3BOX_FETCHING',
        isFetchingThreeBox: false,
      });
      dispatch({
        type: 'UI_APP_SYNC',
        onSyncFinished: true,
        isSyncing: true,
      });
    });

    const userData = simple.getUserData()
    if(userData && userData.wallet) {
      //Don't do anything here for now
    } else {
      //Need to pass eth addr (and email if wanted)
      const userInfo = {
        address: currentAddress
      }
      console.log("Passing data to simpleid")
      const simpleid = await simple.passUserInfo(userInfo)
      console.log(simpleid)
    }
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