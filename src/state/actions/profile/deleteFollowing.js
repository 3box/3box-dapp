import {
  store,
} from '../../store';

import {
  getFollowingThreadAndPosts,
} from './helpers';

const deleteFollowing = async (otherProfileAddress) => {
  try {
    const {
      followingList,
      followingThread,
    } = store.getState().myData;
    const {
      currentAddress,
    } = store.getState().userState;

    let postIdToDelete;
    followingList.forEach((user) => {
      if (user.message.identifier[1].value === otherProfileAddress) {
        postIdToDelete = user.postId;
      }
    });

    if (!followingThread) await getFollowingThreadAndPosts(currentAddress);

    const deleted = await store.getState().myData.followingThread.deletePost(postIdToDelete);
  } catch (error) {
    console.error(error);
  }
};

export default deleteFollowing;