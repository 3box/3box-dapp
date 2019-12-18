import {
  store,
} from '../../store';

import getVerifiedPrivateEmail from './getVerifiedPrivateEmail';
import getVerifiedPublicGithub from './getVerifiedPublicGithub';
import getVerifiedPublicTwitter from './getVerifiedPublicTwitter';
import getMyMemberSince from './getMyMemberSince';
import getMyDID from './getMyDID';
import getMyProfileValue from './getMyProfileValue';
import getMyFollowing from './getMyFollowing';
import getCollectibles from './getCollectibles';
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

    try {
      getCollectibles(currentAddress);
    } catch (error) {
      console.error(error);
    }
  }

  try {
    getVerifiedPublicGithub();
    getVerifiedPublicTwitter();
    getVerifiedPrivateEmail();
    getMyMemberSince();
    getMyDID();
    getMyProfileValue('public', 'name');
    getMyProfileValue('public', 'description');
    getMyProfileValue('public', 'image');
    getMyProfileValue('public', 'coverPhoto');
    getMyProfileValue('public', 'location');
    getMyProfileValue('public', 'website');
    getMyProfileValue('public', 'employer');
    getMyProfileValue('public', 'job');
    getMyProfileValue('public', 'school');
    getMyProfileValue('public', 'degree');
    getMyProfileValue('public', 'major');
    getMyProfileValue('public', 'year');
    getMyProfileValue('public', 'emoji');
    getMyProfileValue('private', 'birthday');

    try {
      await openFollowingSpace();
      getMyFollowing();
      getMyWall();
    } catch (error) {
      console.error(error);
    }

    try {
      await convert3BoxToSpaces();
      await getMySpacesData(currentAddress);
    } catch (error) {
      console.error(error);
    }
  } catch (err) {
    console.error(err);
  }
};

export default getMyData;