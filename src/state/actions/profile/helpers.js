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
    console.error('Error deleting duplicate Following entries', error);
  }
};


export const getPosts = async (followingThread) => {
  try {
    const followingList = await followingThread.getPosts();
    console.log('getpostupdatedFollowingList', followingList);

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
    if (duplicates.length > 0) deleteDuplicate(duplicates, followingThread);

    const updatedFollowing = await getFollowingProfiles(updatedFollowingList);

    store.dispatch({
      type: 'MY_FOLLOWING_LIST_UPDATE',
      following: updatedFollowing,
      followingList: updatedFollowingList,
    });
  } catch (error) {
    console.error('Error getting Following posts', error);
  }
};

export const getFollowingThreadAndPosts = async (myAddress) => {
  try {
    const followingSpace = await store.getState().myData.box.openSpace('Following');
    const opts = {
      members: true,
      firstModerator: myAddress,
    };
    const followingThread = await followingSpace.joinThread('followingList', opts);
    store.dispatch({
      type: 'MY_FOLLOWING_THREAD_UPDATE',
      followingThread,
    });
    console.log('getMyFollowingThread', followingThread);

    followingThread.onUpdate(() => getPosts(followingThread));
    getPosts(followingThread);
  } catch (error) {
    console.log('Error getting thread', error);
  }
};

export const formatContact = (proofDid, otherProfileAddress) => {
  const contact = {
    '@context': 'http://schema.org/',
    '@type': 'Person',
    identifier: [{
      '@type': 'PropertyValue',
      name: 'DID',
      value: `did:3:${proofDid}`,
    },
    {
      '@type': 'PropertyValue',
      name: 'Ethereum',
      PropertyID: 'chainId_1',
      value: otherProfileAddress,
    },
    ],
  };

  return contact;
};