import {
  store,
} from '../../store';

const postAndUpdateWall = (isOtherProfile, comment) => async (dispatch) => {
  let wallToUpdate;
  if (isOtherProfile) {
    wallToUpdate = await store.getState().otherProfile.otherWallThread;
  } else {
    wallToUpdate = await store.getState().myData.wallThread;
  }

  await wallToUpdate.post(comment);
  const wallPosts = await wallToUpdate.getPosts();

  if (isOtherProfile) {
    dispatch({
      type: 'OTHER_WALL_POSTS_UPDATE',
      otherWallPosts: wallPosts,
    });
  } else {
    dispatch({
      type: 'MY_WALL_POSTS_UPDATE',
      wallPosts,
    });
  }
};

export default postAndUpdateWall;