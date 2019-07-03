import Box from '3box';

import {
  store,
} from '../../store';

import {
  checkFollowing,
} from '../../../utils/funcs';

import {
  formatContact,
  getFollowingThreadAndPosts,
} from './helpers';

const saveFollowing = (otherProfileAddress, fromWarningModal) => async (dispatch) => {
  try {
    console.log('insavefollowing');
    const {
      followingList,
      followingThread,
    } = store.getState().myData;
    const {
      currentAddress,
    } = store.getState().userState;

    const isFollowing = checkFollowing(followingList, otherProfileAddress);
    const isMe = currentAddress === otherProfileAddress;
    if (isFollowing || isMe) return;

    if (!followingThread) await getFollowingThreadAndPosts(currentAddress);

    // if no followers, warn that following is public
    if ((!store.getState().myData.following || store.getState().myData.following.length === 0) && !fromWarningModal) {
      dispatch({
        type: 'UI_HANDLE_WARN_PUBLIC_FOLLOWING',
        showFollowingPublicModal: true,
      });
      dispatch({
        type: 'OTHER_ADDRESS_TO_FOLLOW',
        otherAddressToFollow: otherProfileAddress,
      });
      return;
    }

    console.log('saveHere');
    // get user-to-follow's DID
    const profile = await Box.getProfile(otherProfileAddress);
    const contact = formatContact(profile.proof_did, otherProfileAddress);

    console.log('savingThread', store.getState().myData.followingThread);
    const saved = await store.getState().myData.followingThread.post(contact);
    console.log('savingfollower', saved);
  } catch (error) {
    console.error(error);
  }
};

export default saveFollowing;