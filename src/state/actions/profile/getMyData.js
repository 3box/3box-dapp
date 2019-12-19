import {
  store,
} from '../../store';
import getVerifiedPrivateEmail from './getVerifiedPrivateEmail';
import getVerifiedPublicGithub from './getVerifiedPublicGithub';
import getVerifiedPublicTwitter from './getVerifiedPublicTwitter';
import getMyDID from './getMyDID';
import getMyFollowing from './getMyFollowing';
import getActivity from './getActivity/getActivity';
import openFollowingSpace from './openFollowingSpace';
import getMyWall from './getMyWall';
import convert3BoxToSpaces from '../spaces/convert3BoxToSpaces';
import getMySpacesData from '../spaces/getMySpacesData';

const getMyData = async (fromOnSyncDone) => {
  const {
    currentAddress,
  } = store.getState().userState;

  store.dispatch({
    type: 'UI_SPACES_LOADING',
    isSpacesLoading: true,
  });

  if (!fromOnSyncDone) {
    try {
      getActivity();
    } catch (error) {
      console.error(error);
    }
  }

  try {
    getVerifiedPublicGithub();
    getVerifiedPublicTwitter();
    getVerifiedPrivateEmail();
    getMyDID();
  } catch (err) {
    console.error(err);
  }

  try {
    await openFollowingSpace();
    getMyFollowing();
    getMyWall();
  } catch (error) {
    console.error(error);
  }

  try {
    await convert3BoxToSpaces();
    getMySpacesData(currentAddress);
  } catch (error) {
    console.error(error);
  }
};

export default getMyData;