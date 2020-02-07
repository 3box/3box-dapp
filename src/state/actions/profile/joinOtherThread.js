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

const updateOtherWall = async () => {
  const {
    otherWallThread,
  } = await store.getState().otherProfile;
  const otherWallPosts = await otherWallThread.getPosts();
  const otherWallProfiles = await fetchCommenters(otherWallPosts);

  store.dispatch({
    type: 'OTHER_WALL_POSTS_UPDATE',
    otherWallPosts,
    otherWallProfiles,
  });
};

const joinOtherThread = async () => {
  store.dispatch({
    type: 'UI_WALL_OTHER_LOADING',
    isFetchingOtherWall: true,
  });

  try {
    const box = await store.getState().myData.box;
    const space = await box.openSpace(followingSpaceName);

    const {
      otherProfileAddress,
    } = store.getState().otherProfile;
    const opts = {
      firstModerator: otherProfileAddress,
    };

    const otherWallThread = await space.joinThread(myProfileWall, opts);
    const otherWallPosts = await otherWallThread.getPosts();
    const otherWallProfiles = await fetchCommenters(otherWallPosts);

    otherWallThread.onUpdate(() => updateOtherWall());

    store.dispatch({
      type: 'OTHER_WALL_THREAD_UPDATE',
      otherWallPosts,
      otherWallThread,
      otherWallProfiles,
    });
  } catch (error) {
    console.error(error);
  }

  store.dispatch({
    type: 'UI_OTHER_WALL_LOADING',
    isFetchingOtherWall: false,
  });
};

export default joinOtherThread;