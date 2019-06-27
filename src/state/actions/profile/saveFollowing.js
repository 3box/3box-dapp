import Box from '3box';

import {
  store,
} from '../../store';

import {
  checkFollowing,
  getFollowingProfiles,
} from '../../../utils/funcs';

const saveFollowing = (otherProfileAddress, unfollow) => async (dispatch) => {
  try {
    // get user to follows DID
    const profile = await Box.getProfile(otherProfileAddress);

    const {
      followingList,
      followingThread,
    } = store.getState().myData;

    const {
      currentAddress,
    } = store.getState().userState;

    console.log('followingList', followingList);

    if (!unfollow) {
      // if following, don't save following
      const isFollowing = await checkFollowing(followingList, otherProfileAddress);
      console.log('isFollowing', isFollowing);
      if (isFollowing || currentAddress === otherProfileAddress) return;
      const contact = {
        '@context': 'http://schema.org/',
        '@type': 'Person',
        identifier: [{
          '@type': 'PropertyValue',
          name: 'DID',
          value: `did:3:${profile.proof_did}`,
        },
        {
          '@type': 'PropertyValue',
          name: 'Ethereum',
          PropertyID: 'chainId_1',
          value: otherProfileAddress,
        },
        ],
      };

      const didsave = await followingThread.post(contact);
      console.log('didsave', didsave);
    } else {
      // remove user from following list
      let postId;
      followingList.forEach((user) => {
        if (user.message.identifier[1].value === otherProfileAddress) {
          postId = user.postId;
        }
      });
      await followingThread.deletePost(postId);
    }

    const updatedFollowingList = await followingThread.getPosts();
    const updatedFollowing = await getFollowingProfiles(updatedFollowingList);

    dispatch({
      type: 'MY_FOLLOWING_UPDATE',
      following: updatedFollowing,
    });
  } catch (error) {
    console.error(error);
  }
};

export default saveFollowing;