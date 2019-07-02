import {
  store,
} from '../../store';
import {
  getFollowingProfiles,
} from '../../../utils/funcs';

export const deleteDuplicate = async (duplicates, followingThread) => {
  // if logged in, delete duplicate from thread
  try {
    if (duplicates.length > 0) {
      const deleteCalls = [];
      duplicates.forEach((duplicate) => {
        const promise = followingThread.deletePost(duplicate);
        deleteCalls.push(promise);
      });
      if (deleteCalls.length === 0) return null;
      const deletePromises = Promise.all(deleteCalls);
      await deletePromises;
    }
  } catch (error) {
    console.log('Error deleting duplicate following entries', error);
  }
};

const getPosts = async (followingThread) => {
  console.log('inGETPOSTS');
  const updatedFollowingList = await followingThread.getPosts();
  const updatedFollowing = await getFollowingProfiles(updatedFollowingList);

  store.dispatch({
    type: 'MY_FOLLOWING_UPDATE',
    following: updatedFollowing,
    followingList: updatedFollowingList,
    followingThread,
  });
};

export const subscribeFollowing = async (followingThread) => {
  try {
    followingThread.onUpdate(() => getPosts(followingThread));
  } catch (error) {
    console.log('Error subscribing', error);
  }
};

export const getThread = async (myAddress) => {
  console.log('ingetthread');
  const followingSpace = await store.getState().myData.box.openSpace('Following');
  const opts = {
    members: true,
    firstModerator: myAddress,
  };
  const followingThread = await followingSpace.joinThread('followingList', opts);
  return followingThread;
}