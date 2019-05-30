import Box from '3box';

import {
  getFollowingProfiles,
} from '../../../utils/funcs';

const getMyFollowingFromLocalStorage = () => async (dispatch) => {
  try {
    const profiles = await Box.getThread('Follow', 'follow');

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

export default getMyFollowingFromLocalStorage;