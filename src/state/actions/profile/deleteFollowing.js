import {
  store,
} from '../../store';

import {
  getFollowingThreadAndPosts,
} from './helpers';

const deleteFollowing = otherProfileAddress => async (dispatch) => {
  try {
    const {
      followingList,
      followingThread,
    } = store.getState().myData;
    const {
      currentAddress,
    } = store.getState().userState;

    let postId;
    followingList.forEach((user) => {
      if (user.message.identifier[1].value === otherProfileAddress) {
        postId = user.postId;
      }
    });

    if (!followingThread) await getFollowingThreadAndPosts(currentAddress);

    await store.getState().myData.followingThread.deletePost(postId);
    console.log('deletedpostId', postId);
  } catch (error) {
    console.error(error);
  }
};

export default deleteFollowing;