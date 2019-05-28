import Box from '3box';

import {
  store,
} from '../../store';

import {
  checkFollowing,
  getFollowingProfiles,
} from '../../../utils/funcs';

const saveFollowing = otherProfileAddress => async (dispatch) => {
  try {
    const profile = await Box.getProfile(otherProfileAddress);
    const followingSpace = await store.getState().myData.box.openSpace('Follow');
    const thread = await followingSpace.joinThread('follow');

    const followingList = await thread.getPosts();
    const isFollowing = checkFollowing(followingList, otherProfileAddress);

    const following = await getFollowingProfiles(followingList);
    dispatch({
      type: 'MY_FOLLOWING_UPDATE',
      following,
    });

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

    // add user to following redux state so that follow button switches
    // dispatch({
    //   type: 'MY_FOLLOWING_UPDATE',
    //   following,
    // });

    // return following;
  } catch (error) {
    console.error(error);
  }
};

export default saveFollowing;