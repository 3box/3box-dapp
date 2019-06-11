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

    console.log('myfollowingList', followingList);
    console.log('myfollowingThread', followingThread);

    if (!unfollow) {
      // if following, don't save following
      const isFollowing = checkFollowing(followingList, otherProfileAddress);
      if (isFollowing) return;

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

      await followingThread.post(contact);
    } else {
      // remove user from following list
      let postId;
      console.log('followingList2', followingList);
      followingList.forEach((user) => {
        if (user.message.identifier[1].value === otherProfileAddress) {
          postId = user.postId;
        }
      });
      console.log('postal', postId);
      await followingThread.deletePost(postId);
    }

    const updatedFollowingList = await followingThread.getPosts();
    console.log('updatedFollowingList', updatedFollowingList);
    const updatedFollowing = await getFollowingProfiles(updatedFollowingList);
    console.log('updatedFollowing', updatedFollowing);

    dispatch({
      type: 'MY_FOLLOWING_UPDATE',
      following: updatedFollowing,
    });
  } catch (error) {
    console.error(error);
  }
};

export default saveFollowing;