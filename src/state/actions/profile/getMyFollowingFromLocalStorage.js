import Box from '3box';

import {
  getFollowingProfiles,
} from '../../../utils/funcs';

const getMyFollowingFromLocalStorage = () => async (dispatch) => {
  try {
    const followingList = await Box.getThread('Following', 'followingList');

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

export default getMyFollowingFromLocalStorage;