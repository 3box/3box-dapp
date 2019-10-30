import {
  store,
} from '../../store';
import {
  fetchCommenters,
} from './helpers';

const postAndUpdateWall = (isOtherProfile, comment) => async (dispatch) => {
  let wallToUpdate;
  if (isOtherProfile) {
    wallToUpdate = await store.getState().otherProfile.otherWallThread;
  } else {
    wallToUpdate = await store.getState().myData.wallThread;
  }

  await wallToUpdate.post(comment);
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