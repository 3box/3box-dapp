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

    // open following space and get following
    const followingSpace = await store.getState().myData.box.openSpace('Following');
    const opts = {
      membersOnly: true,
    };
    const thread = await followingSpace.joinThread('followingList', opts);
    console.log('thisthread', thread);
    const followingList = await thread.getPosts();
    const following = await getFollowingProfiles(followingList);

    dispatch({
      type: 'MY_FOLLOWING_UPDATE',
      following,
    });

    if (following.length === 0) {
      console.log('firstFollowing');
      dispatch({
        type: 'UI_HANDLE_WARN_PUBLIC_FOLLOWING',
        showFollowingPublicModal: true,
      });
    }

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
  
      await thread.post(contact);
    } else {
      // delete thread post
      console.log('unfollow user');
    }

    const updatedFollowingList = await thread.getPosts();
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