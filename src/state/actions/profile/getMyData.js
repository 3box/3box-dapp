import {
  store,
} from '../../store';
import {
  startPollFlag,
  pollNetworkAndAddress,
} from '../../../utils/address';

import getVerifiedPrivateEmail from './getVerifiedPrivateEmail';
import getVerifiedPublicGithub from './getVerifiedPublicGithub';
import getVerifiedPublicTwitter from './getVerifiedPublicTwitter';
import getMyMemberSince from './getMyMemberSince';
import getMyDID from './getMyDID';
import getMyProfileValue from './getMyProfileValue';
import getMyFollowing from './getMyFollowing';
import getCollectibles from './getCollectibles';
import getActivity from './getActivity';
import convert3BoxToSpaces from '../spaces/convert3BoxToSpaces';
import getMySpacesData from '../spaces/getMySpacesData';

const getMyData = async () => {
  const {
    currentAddress,
  } = store.getState().userState;

  store.dispatch({
    type: 'UI_SPACES_LOADING',
    isSpacesLoading: true,
  });
  startPollFlag();
  pollNetworkAndAddress(); // Start polling for address change

  try {
    getVerifiedPublicGithub(); // eslint-disable-line
    getVerifiedPublicTwitter(); // eslint-disable-line
    getVerifiedPrivateEmail(); // eslint-disable-line
    getMyMemberSince(); // eslint-disable-line
    getMyDID(); // eslint-disable-line
    getMyProfileValue('public', 'name'); // eslint-disable-line
    getMyProfileValue('public', 'description'); // eslint-disable-line
    getMyProfileValue('public', 'image'); // eslint-disable-line
    getMyProfileValue('public', 'coverPhoto'); // eslint-disable-line
    getMyProfileValue('public', 'location'); // eslint-disable-line
    getMyProfileValue('public', 'website'); // eslint-disable-line
    getMyProfileValue('public', 'employer'); // eslint-disable-line
    getMyProfileValue('public', 'job'); // eslint-disable-line
    getMyProfileValue('public', 'school'); // eslint-disable-line
    getMyProfileValue('public', 'degree'); // eslint-disable-line
    getMyProfileValue('public', 'major'); // eslint-disable-line
    getMyProfileValue('public', 'year'); // eslint-disable-line
    getMyProfileValue('public', 'emoji'); // eslint-disable-line
    getMyProfileValue('private', 'birthday'); // eslint-disable-line

    await getMyFollowing(); // eslint-disable-line
    await getCollectibles(currentAddress); // eslint-disable-line
    await convert3BoxToSpaces(); // eslint-disable-line
    await getMySpacesData(currentAddress); // eslint-disable-line

    getActivity(); // eslint-disable-line
  } catch (err) {
    console.error(err);
  }
};

export default getMyData;