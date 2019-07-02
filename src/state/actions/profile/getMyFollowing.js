import Box from '3box';

import {
  store,
} from '../../store';
import {
  getFollowingProfiles,
} from '../../../utils/funcs';
import {
  deleteDuplicate,
  subscribeFollowing,
} from './helpers';

const getMyFollowing = address => async (dispatch) => {
  try {
    const myAddress = address || store.getState().userState.currentAddress;
    const followingList = await Box.getThread('Following', 'followingList', myAddress, true);
    console.log('getMyFollowingList', followingList);

    if (!followingList) return null;

    // remove duplicates from interface
    const userInList = {};
    const duplicates = [];
    const updatedFollowingList = followingList.filter((user) => {
      if (userInList[user.message.identifier[0].value]) {
        duplicates.push(user.postId);
        return false;
      }
      userInList[user.message.identifier[0].value] = true;
      return true;
    });

    subscribeFollowing();
    // if logged in, delete duplicate from thread
    deleteDuplicate(duplicates, myAddress);

    const following = await getFollowingProfiles(updatedFollowingList);

    dispatch({
      type: 'MY_FOLLOWING_UPDATE',
      following,
      followingList: updatedFollowingList,
    });

    return following;
  } catch (error) {
    console.log(error);
  }
};

export default getMyFollowing;