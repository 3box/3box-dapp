import Box from '3box';

import {
  store,
} from '../../store';
import {
  getFollowingProfiles,
} from '../../../utils/funcs';
import {
  followingSpaceName,
  followingThreadName,
} from '../../../utils/constants';

const getPublicFollowing = async (address) => {
  try {
    const myAddress = address || store.getState().userState.currentAddress;

    const followingList = await Box.getThread(followingSpaceName, followingThreadName, myAddress, true);
    if (!followingList) return null;

    const following = await getFollowingProfiles(followingList);

    store.dispatch({
      type: 'MY_FOLLOWING_LIST_UPDATE',
      following,
      followingList,
    });

    return following;
  } catch (error) {
    return console.error(error);
  }
};

export default getPublicFollowing;