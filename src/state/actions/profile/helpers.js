import Box from '3box';
import resolve from 'did-resolver';

import {
  store,
} from '../../store';
import {
  getFollowingProfiles,
} from '../../../utils/funcs';
import {
  followingSpaceName,
  followingThreadName,
} from '../../../utils/constants';

export const deleteDuplicate = async (duplicates, followingThread) => {
  // if logged in, delete duplicate from thread
  try {
    if (duplicates.length > 0) {
      const deleteCalls = [];
      duplicates.forEach((duplicate) => {
        const promise = followingThread.deletePost(duplicate);
        deleteCalls.push(promise);
      });
      if (deleteCalls.length === 0) return null;
      const deletePromises = Promise.all(deleteCalls);
      await deletePromises;
    }
  } catch (error) {
    console.error('Error deleting duplicate Following entries', error);
  }
};

export const getPosts = async (followingThread) => {
  try {
    const followingList = await followingThread.getPosts();
    // remove duplicates from interface
    const userInList = {};
    const duplicates = [];
    const updatedFollowingList = followingList.filter((user) => {
      if (userInList[user.message.identifier[0].value]) {
        duplicates.push(user.postId);
        return false;
      }
      userInList[user.message.identifier[0].value] = true;
      return true;
    });
    // if (duplicates.length > 0) deleteDuplicate(duplicates, followingThread);

    const updatedFollowing = await getFollowingProfiles(updatedFollowingList);
    store.dispatch({
      type: 'MY_FOLLOWING_LIST_UPDATE',
      following: updatedFollowing,
      followingList: updatedFollowingList,
    });
  } catch (error) {
    console.error('Error getting Following posts', error);
  }
};

export const getFollowingThreadAndPosts = async (myAddress) => {
  try {
    store.dispatch({
      type: 'UI_FOLLOWING_LOADING',
      isLoadingMyFollowing: true,
    });

    const followingSpace = await store.getState().myData.box.openSpace(followingSpaceName);
    const opts = {
      members: true,
    };
    const followingThread = await followingSpace.joinThread(followingThreadName, opts);
    store.dispatch({
      type: 'MY_FOLLOWING_THREAD_UPDATE',
      followingThread,
    });
    store.dispatch({
      type: 'UI_FOLLOWING_LOADING',
      isLoadingMyFollowing: false,
    });

    await getPosts(followingThread);
    followingThread.onUpdate(() => getPosts(followingThread));
  } catch (error) {
    console.error('Error getting thread', error);
  }
};

export const formatContact = (proofDid, otherProfileAddress) => {
  const contact = {
    '@context': 'http://schema.org/',
    '@type': 'Person',
    identifier: [{
        '@type': 'PropertyValue',
        name: 'DID',
        value: `did:3:${proofDid}`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Ethereum',
        PropertyID: 'chainId_1',
        value: otherProfileAddress,
      },
    ],
  };

  return contact;
};

export const fetchCommenters = async (posts) => {
  const uniqueUsers = [...new Set(posts.map((x) => x.author))];
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