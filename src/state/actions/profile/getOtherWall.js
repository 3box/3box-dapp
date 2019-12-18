import Box from '3box';
import registerResolver from '3id-resolver';

import {
  fetchCommenters,
} from './helpers';
import {
  followingSpaceName,
  myProfileWall,
} from '../../../utils/constants';
import {
  store,
} from '../../store';

const getOtherWall = async (profileAddress) => {
  store.dispatch({
    type: 'UI_WALL_OTHER_LOADING',
    isFetchingOtherWall: true,
  });

  // get ipfs instance for did-resolver
  const IPFS = await Box.getIPFS();
  registerResolver(IPFS);

  let otherWallPosts;
  let otherWallProfiles;
  let isOtherWallDisabled;
  // check if admin has that space first, if not, thread is empty
  const spaces = await Box.listSpaces(profileAddress);
  if (spaces.includes(followingSpaceName)) {
    const space = await Box.getSpace(profileAddress, followingSpaceName);
    isOtherWallDisabled = space.isWallDisabled;
    otherWallPosts = await Box.getThread(followingSpaceName, myProfileWall, profileAddress, false, {});
    otherWallProfiles = await fetchCommenters(otherWallPosts);
  }

  store.dispatch({
    type: 'OTHER_WALL_UPDATE',
    otherWallPosts,
    otherWallProfiles,
    isOtherWallDisabled: !!isOtherWallDisabled,
  });

  store.dispatch({
    type: 'UI_WALL_OTHER_LOADING',
    isFetchingOtherWall: false,
  });
};

export default getOtherWall;