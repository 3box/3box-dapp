import Box from '3box';

import {
  store,
} from '../../store';
import {
  getFollowingProfiles,
} from '../../../utils/funcs';

const getMyFollowing = address => async (dispatch) => {
  try {
    const myAddress = address || store.getState().userState.currentAddress;
    const followingList = await Box.getThread('Following', 'followingList', myAddress, true);

    // const followingSpace = await store.getState().myData.box.openSpace('Following');
    // const opts = {
    //   members: true,
    //   firstModerator: followingSpace.DID || myAddress,
    // };
    // const followingThread = await followingSpace.joinThread('followingList', opts);
    // const followingList = await followingThread.getPosts();

    console.log('getMyfollowingList', followingList);

    if (!followingList) return null;

    const following = await getFollowingProfiles(followingList);

    dispatch({
      type: 'MY_FOLLOWING_UPDATE',
      following,
      followingList,
    });

    return following;
  } catch (error) {
    console.log(error);
  }
};

export default getMyFollowing;