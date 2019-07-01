import Box from '3box';

import {
  store,
} from '../../store';
import {
  getFollowingProfiles,
} from '../../../utils/funcs';
import deleteDuplicate from './helpers';

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

    // if logged in, delete duplicate from thread
    deleteDuplicate(duplicates, myAddress);
    // try {
    //   const {
    //     box,
    //   } = store.getState().myData;
    //   if (box && duplicates.length > 0) {
    //     const deleteCalls = [];
    //     const followingSpace = await box.openSpace('Following');
    //     const opts = {
    //       members: true,
    //       firstModerator: followingSpace.DID || myAddress,
    //     };
    //     const followingThread = await followingSpace.joinThread('followingList', opts);
    //     duplicates.forEach((duplicate) => {
    //       const promise = followingThread.deletePost(duplicate);
    //       deleteCalls.push(promise);
    //     });
    //     if (deleteCalls.length === 0) return null;
    //     const deletePromises = Promise.all(deleteCalls);
    //     await deletePromises;
    //   }
    // } catch (error) {
    //   console.log('Error deleting duplicate following entries', error);
    // }

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