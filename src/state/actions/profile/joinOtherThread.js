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
  const wallPosts = await otherWallThread.getPosts();
  store.dispatch({
    type: 'OTHER_WALL_POSTS_UPDATE',
    wallPosts,
  });
};

const joinOtherThread = () => async (dispatch) => {
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
    const uniqueUsers = [...new Set(otherWallPosts.map((x) => x.author))];

    const otherWallProfiles = await fetchCommenters(uniqueUsers);

    otherWallThread.onUpdate(() => updateOtherWall());

    dispatch({
      type: 'OTHER_WALL_THREAD_UPDATE',
      otherWallPosts,
      otherWallThread,
      otherWallProfiles,
    });

    dispatch({
      type: 'UI_WALL_LOADING',
      isFetchingWall: false,
    });
  } catch (error) {
    console.error(error);
  }
};

export default joinOtherThread;