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

const getPublicFollowing = address => async (dispatch) => {
  try {
    const myAddress = address || store.getState().userState.currentAddress;

    // const config = await Box.getConfig(myAddress);
    const followingList = await Box.getThread(followingSpaceName, followingThreadName, myAddress, true);
    console.log('followingListPUBLIC', followingList)
    if (!followingList) return null;

    const following = await getFollowingProfiles(followingList);

    dispatch({
      type: 'MY_FOLLOWING_LIST_UPDATE',
      following,
      followingList,
    });

    return following;
  } catch (error) {
    console.log(error);
  }
};

export default getPublicFollowing;