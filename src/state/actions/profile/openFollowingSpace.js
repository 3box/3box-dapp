import {
  store,
} from '../../store';

import {
  followingSpaceName,
} from '../../../utils/constants';

const openFollowingSpace = () => async ( /* dispatch */ ) => {
  try {
    const followingSpace = await store.getState().myData.box.openSpace(followingSpaceName);
    store.dispatch({
      type: 'MY_FOLLOWING_SPACE_OPEN',
      followingSpace,
    });
  } catch (error) {
    console.error(error);
  }
};

export default openFollowingSpace;