import {
  store,
} from '../../store';

const deleteDuplicate = async (duplicates, myAddress) => {
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

export default deleteDuplicate;