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


const followingSpaceTasks = async () => {
  try {
    await openFollowingSpace();
    getMyFollowing();
    getMyWall();
  } catch (error) {
    console.error(error);
  }
};

const spacesDataTasks = async (currentAddress) => {
  try {
    await convert3BoxToSpaces();
    getMySpacesData(currentAddress);
  } catch (error) {
    console.error(error);
  }
};

const getMyData = async (fromOnSyncDone) => {
  const {
    currentAddress,
  } = store.getState().userState;

  store.dispatch({
    type: 'UI_SPACES_LOADING',
    isSpacesLoading: true,
  });

  try {
    if (!fromOnSyncDone) getActivity();
  } catch (error) {
    console.error(error);
  }

  try {
    getVerifiedPublicGithub();
    getVerifiedPublicTwitter();
    getVerifiedPrivateEmail();
    getMyDID();
  } catch (error) {
    console.error(error);
  }

  try {
    followingSpaceTasks();
  } catch (error) {
    console.error(error);
  }

  try {
    spacesDataTasks(currentAddress);
  } catch (error) {
    console.error(error);
  }
};

export default getMyData;