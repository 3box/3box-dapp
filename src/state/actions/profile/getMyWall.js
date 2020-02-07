import {
  store,
} from '../../store';
import {
  fetchCommenters,
} from './helpers';
import {
  myProfileWall,
} from '../../../utils/constants';

const updateMyWall = async () => {
  const wallThread = await store.getState().myData.wallThread;
  const wallPosts = await wallThread.getPosts();

  await fetchCommenters(wallPosts);

  store.dispatch({
    type: 'MY_WALL_POSTS_UPDATE',
    wallPosts,
  });
};

const getMyWall = async () => {
  try {
    const space = await store.getState().myData.followingSpace;
    // check to see if user has disabled wall
    const isWallDisabled = space.public ? await space.public.get('isWallDisabled') : false;

    let wallThread;
    let wallPosts;
    if (!isWallDisabled) {
      wallThread = await space.joinThread(myProfileWall, {});

      wallPosts = await wallThread.getPosts();
      await fetchCommenters(wallPosts);
      wallThread.onUpdate(() => updateMyWall());
    }

    store.dispatch({
      type: 'MY_WALL_UPDATE',
      wallPosts,
      wallThread,
      isWallDisabled,
    });
  } catch (error) {
    console.error(error);
  }

  store.dispatch({
    type: 'UI_WALL_LOADING',
    isFetchingWall: false,
  });
};

export default getMyWall;