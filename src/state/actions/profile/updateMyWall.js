import {
  store,
} from '../../store';

const updateMyWall = () => async (dispatch) => {
  const wallThread = await store.getState().myData.wallThread;
  const wallPosts = await wallThread.getPosts();
  dispatch({
    type: 'MY_WALL_POSTS_UPDATE',
    wallPosts,
  });
};

export default updateMyWall;