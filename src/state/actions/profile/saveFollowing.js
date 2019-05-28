import Box from '3box';

import {
  store,
} from '../../store';

const saveFollowing = otherProfileAddress => async (dispatch) => {
  try {
    const profile = await Box.getProfile(otherProfileAddress);
    console.log('gotprofile', profile);
    const followingSpace = await store.getState().myData.box.openSpace('Follow');
    console.log('followingSpace', followingSpace);
    const thread = await followingSpace.joinThread('follow');
    console.log('thisthread', thread);
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

    const saved = await thread.post(contact);
    console.log('saved', saved);

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