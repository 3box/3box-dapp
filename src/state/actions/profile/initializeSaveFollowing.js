import {
  store,
} from '../../store';

import {
  getFollowingProfiles,
} from '../../../utils/funcs';

const initializeSaveFollowing = (address, fromFollow) => async (dispatch) => {
  try {
    let usersFollowing = store.getState().myData.following;
    console.log('store.getState().myData.followingThread', store.getState().myData.followingThread);

    if (!store.getState().myData.followingThread) {
      // open following space and get following
      const followingSpace = await store.getState().myData.box.openSpace('Following');
      const myAddress = store.getState().userState.currentAddress;

      const opts = {
        members: true,
        firstModerator: myAddress,
        // firstModerator: followingSpace.DID || myAddress,
      };

      const followingThread = await followingSpace.joinThread('followingList', opts);
      const followingList = await followingThread.getPosts();
      usersFollowing = await getFollowingProfiles(followingList);

      console.log('initializesave', followingList);

      dispatch({
        type: 'MY_FOLLOWING_UPDATE',
        following: usersFollowing,
        followingList,
        followingThread,
      });
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