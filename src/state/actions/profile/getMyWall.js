import {
  store,
} from '../../store';
import {
  fetchCommenters,
} from './helpers';
import {
  followingSpaceName,
  myProfileWall,
} from '../../../utils/constants';

const updateMyWall = async () => {
  const wallThread = await store.getState().myData.wallThread;
  const wallPosts = await wallThread.getPosts();
  const wallProfiles = await fetchCommenters(wallPosts);

  store.dispatch({
    type: 'MY_WALL_POSTS_UPDATE',
    wallPosts,
    wallProfiles,
  });
};

const getMyWall = () => async (dispatch) => {
  try {
    const box = await store.getState().myData.box;
    const space = await box.openSpace(followingSpaceName);
    console.log('getMyWallSpace', space);
    // check to see if user has disabled wall
    const isWallDisabled = space.public ? await space.public.get('isWallDisabled') : false;
    console.log('isWallDisabledingetmywall', isWallDisabled);

    let wallThread;
    let wallPosts;
    let wallProfiles;
    // if (!isWallDisabled && space.public) {
    if (!isWallDisabled) {
      console.log('infetchthread');
      const myAddress = store.getState().userState.currentAddress;
      const opts = {
        firstModerator: myAddress,
      };
      console.log('1getMyWall');
      wallThread = await space.joinThread(myProfileWall, opts);

      console.log('wallThreadinGetMyWall', wallThread);
      wallPosts = await wallThread.getPosts();
      console.log('2getMyWall', wallPosts);
      wallProfiles = await fetchCommenters(wallPosts);
      console.log('3getMyWall', wallProfiles);
      wallThread.onUpdate(() => updateMyWall());
    }

    dispatch({
      type: 'MY_WALL_UPDATE',
      wallPosts,
      wallThread,
      wallProfiles,
      isWallDisabled,
    });
  } catch (error) {
    console.error(error);
  }

  dispatch({
    type: 'UI_WALL_LOADING',
    isFetchingWall: false,
  });
};

export default getMyWall;