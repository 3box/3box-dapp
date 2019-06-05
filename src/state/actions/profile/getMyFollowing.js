import Box from '3box';

import {
  getFollowingProfiles,
} from '../../../utils/funcs';

const getMyFollowing = () => async (dispatch) => {
  try {
    const profiles = await Box.getThread('Following', 'followingList');

    if (!profiles) return null;

    const following = await getFollowingProfiles(profiles);

    dispatch({
      type: 'MY_FOLLOWING_UPDATE',
      following,
    });

    return following;
  } catch (error) {
    console.error(error);
  }
};

export default getMyFollowing;