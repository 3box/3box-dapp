import {
  store,
} from '../../store';
import {
  getFollowingProfiles,
} from '../../../utils/funcs';

export const deleteDuplicate = async (duplicates, myAddress) => {
  // if logged in, delete duplicate from thread
  try {
    console.log('duplicates', duplicates);
    const {
      box,
    } = store.getState().myData;
    if (box && duplicates.length > 0) {
      const deleteCalls = [];
      const followingSpace = await box.openSpace('Following');
      const opts = {
        members: true,
        firstModerator: followingSpace.DID || myAddress,
      };
      const followingThread = await followingSpace.joinThread('followingList', opts);
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

export const subscribeFollowing = async () => {
  try {
    const followingSpace = await store.getState().myData.box.openSpace('Following');
    const myAddress = store.getState().userState.currentAddress;
    console.log('hitsubscription');
    const opts = {
      members: true,
      firstModerator: myAddress,
      // firstModerator: followingSpace.DID || myAddress,
    };

    const followingThread = await followingSpace.joinThread('followingList', opts);
    // followingThread.onUpdate((posts) => {
    //   console.log('threadposts', posts);
    //   if (posts) getFollowingProfiles(posts);
    // });
    console.log('postsposts', followingThread);
    const posts = await followingThread.onUpdate();
    console.log('actualposts', posts);
    // const updatedFollowingList = await followingThread.getPosts();
    // const updatedFollowing = await getFollowingProfiles(updatedFollowingList);
  } catch (error) {
    console.log('Error subscribing', error);
  }
};