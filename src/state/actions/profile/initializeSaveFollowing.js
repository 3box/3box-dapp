import {
  store,
} from '../../store';

import {
  subscribeFollowing,
  getThread,
} from './helpers';

const initializeSaveFollowing = (address, fromFollow) => async (dispatch) => {
  try {
    const usersFollowing = store.getState().myData.following;

    if (!store.getState().myData.followingThread) {
      const followingThread = await getThread();
      console.log('initfollowing', followingThread);
      subscribeFollowing(followingThread);
    }

    if (usersFollowing.length === 0 && fromFollow) {
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