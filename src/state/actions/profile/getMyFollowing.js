import {
  store,
} from '../../store';

import {
  getFollowingThreadAndPosts,
} from './helpers';

const getMyFollowing = () => async (/* dispatch */) => {
  try {
    const myAddress = store.getState().userState.currentAddress;
    console.log('inGetMyFollowing', myAddress);
    await getFollowingThreadAndPosts(myAddress);
  } catch (error) {
    console.log(error);
  }
};

export default getMyFollowing;