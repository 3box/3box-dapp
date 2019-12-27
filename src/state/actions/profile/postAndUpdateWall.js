import {
  store,
} from '../../store';
import {
  fetchCommenters,
} from './helpers';

const postAndUpdateWall = async (isOtherProfile, commentOrId, isDelete) => {
  let wallToUpdate;
  if (isOtherProfile) {
    wallToUpdate = await store.getState().otherProfile.otherWallThread;
  } else {
    wallToUpdate = await store.getState().myData.wallThread;
  }

  let action;
  if (isDelete) {
    action = 'deletePost';
  } else {
    action = 'post';
  }

  await wallToUpdate[action](commentOrId);
  const wallPosts = await wallToUpdate.getPosts();
  await fetchCommenters(wallPosts);

  if (isOtherProfile) {
    store.dispatch({
      type: 'OTHER_WALL_POSTS_UPDATE',
      otherWallPosts: wallPosts,
    });
  } else {
    store.dispatch({
      type: 'MY_WALL_POSTS_UPDATE',
      wallPosts,
    });
  }
};

export default postAndUpdateWall;