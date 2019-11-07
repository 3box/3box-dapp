import {
  store,
} from '../../store';
import {
  fetchCommenters,
} from './helpers';

const postAndUpdateWall = (isOtherProfile, commentOrId, isDelete) => async (dispatch) => {
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
  const wallProfiles = await fetchCommenters(wallPosts);

  if (isOtherProfile) {
    dispatch({
      type: 'OTHER_WALL_POSTS_UPDATE',
      otherWallPosts: wallPosts,
      otherWallProfiles: wallProfiles,
    });
  } else {
    dispatch({
      type: 'MY_WALL_POSTS_UPDATE',
      wallPosts,
      wallProfiles,
    });
  }
};

export default postAndUpdateWall;