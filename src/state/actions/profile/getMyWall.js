import Box from '3box';
import resolve from 'did-resolver';

import {
  store,
} from '../../store';
import {
  followingSpaceName,
  myProfileWall,
} from '../../../utils/constants';

const fetchCommenters = async (uniqueUsers) => {
  const profiles = {};
  const fetchProfile = async (did) => await Box.getProfile(did);
  const fetchAllProfiles = async () => await Promise.all(uniqueUsers.map(did => fetchProfile(did)));
  const profilesArray = await fetchAllProfiles();

  const getEthAddr = async (did) => await resolve(did);
  const getAllEthAddr = async () => await Promise.all(uniqueUsers.map(did => getEthAddr(did)));
  const ethAddrArray = await getAllEthAddr();

  profilesArray.forEach((user, i) => {
    const ethAddr = ethAddrArray[i].publicKey[2].ethereumAddress;
    user.ethAddr = ethAddr;
    user.profileURL = `https://3box.io/${ethAddr}`;
    profiles[uniqueUsers[i]] = user;
  });

  return profiles;
};

const updateMyWall = async () => {
  const wallThread = await store.getState().myData.wallThread;
  const wallPosts = await wallThread.getPosts();
  store.dispatch({
    type: 'MY_WALL_POSTS_UPDATE',
    wallPosts,
  });
};

const getMyWall = () => async (dispatch) => {
  try {
    const box = await store.getState().myData.box;
    const space = await box.openSpace(followingSpaceName);
    const myAddress = store.getState().userState.currentAddress;
    const opts = {
      firstModerator: myAddress,
    };
    const wallThread = await space.joinThread(myProfileWall, opts);
    const wallPosts = await wallThread.getPosts();
    const uniqueUsers = [...new Set(wallPosts.map((x) => x.author))];

    const wallProfiles = await fetchCommenters(uniqueUsers);

    wallThread.onUpdate(() => updateMyWall());

    dispatch({
      type: 'MY_WALL_UPDATE',
      wallPosts,
      wallThread,
      wallProfiles
    });
  } catch (error) {
    console.error(error);
  }
};

export default getMyWall;