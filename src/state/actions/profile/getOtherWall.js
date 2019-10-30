import Box from '3box';
import registerResolver from '3id-resolver';

import {
  fetchCommenters,
} from './helpers';
import {
  followingSpaceName,
  myProfileWall,
} from '../../../utils/constants';

const getOtherWall = (profileAddress) => async (dispatch) => {
  dispatch({
    type: 'UI_WALL_OTHER_LOADING',
    isFetchingOtherWall: true,
  });

  // get ipfs instance for did-resolver
  const IPFS = await Box.getIPFS();
  registerResolver(IPFS);

  let otherWallPosts;
  let otherWallProfiles;
  // check if admin has that space first, if not, thread is empty
  const spaces = await Box.listSpaces(profileAddress);
  if (spaces.includes(followingSpaceName)) {
    otherWallPosts = await Box.getThread(followingSpaceName, myProfileWall, profileAddress, false, {});
    otherWallProfiles = await fetchCommenters(otherWallPosts);
  }

  dispatch({
    type: 'OTHER_WALL_UPDATE',
    otherWallPosts,
    otherWallProfiles,
  });

  dispatch({
    type: 'UI_WALL_OTHER_LOADING',
    isFetchingOtherWall: false,
  });
};

export default getOtherWall;