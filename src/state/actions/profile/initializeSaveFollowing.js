import {
  store,
} from '../../store';

import {
  getFollowingProfiles,
} from '../../../utils/funcs';

const initializeSaveFollowing = address => async (dispatch) => {
  try {
    // open following space and get following
    const followingSpace = await store.getState().myData.box.openSpace('Following');
    const opts = {
      members: true,
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
      dispatch({
        type: 'OTHER_ADDRESS_TO_FOLLOW',
        otherAddressToFollow: address,
      });
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
  }
};

export default initializeSaveFollowing; 