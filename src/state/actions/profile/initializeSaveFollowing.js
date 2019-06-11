import {
  store,
} from '../../store';

import {
  getFollowingProfiles,
} from '../../../utils/funcs';

const initializeSaveFollowing = () => async (dispatch) => {
  try {
    // open following space and get following
    const followingSpace = await store.getState().myData.box.openSpace('Following');
    const opts = {
      membersOnly: true,
    };
    const followingThread = await followingSpace.joinThread('followingList', opts);
    const followingList = await followingThread.getPosts();
    const following = await getFollowingProfiles(followingList);

    dispatch({
      type: 'MY_FOLLOWING_UPDATE',
      following,
      followingList,
      followingThread,
    });

    if (following.length === 0) {
      dispatch({
        type: 'UI_HANDLE_WARN_PUBLIC_FOLLOWING',
        showFollowingPublicModal: true,
      });
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
  }
};

export default initializeSaveFollowing;