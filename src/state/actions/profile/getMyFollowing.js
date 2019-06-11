import Box from '3box';

import {
  store,
} from '../../store';
import {
  getFollowingProfiles,
} from '../../../utils/funcs';

const getMyFollowing = () => async (dispatch) => {
  try {
    const myAddress = store.getState().userState.currentAddress;
    const followingList = await Box.getThread('Following', 'followingList', myAddress, true);

    if (!followingList) return null;

    const following = await getFollowingProfiles(followingList);

    dispatch({
      type: 'MY_FOLLOWING_UPDATE',
      following,
      followingList,
    });

    return following;
  } catch (error) {
    console.error(error);
  }
};

export default getMyFollowing;