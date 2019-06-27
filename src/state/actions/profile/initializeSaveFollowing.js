import {
  store,
} from '../../store';

import {
  getFollowingProfiles,
} from '../../../utils/funcs';

const initializeSaveFollowing = (address, fromFollow) => async (dispatch) => {
  try {
    // open following space and get following
    const followingSpace = await store.getState().myData.box.openSpace('Following');
    const myAddress = store.getState().userState.currentAddress;

    const opts = {
      members: true,
      firstModerator: followingSpace.DID || myAddress,
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

    if (following.length === 0 && fromFollow) {
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