import {
  store,
} from '../../store';

const getVerifiedPublicTwitter = () => async (dispatch) => {
  try {
    const verifiedTwitter = await store.getState().threeBox.box.verified.twitter();

    dispatch({
      type: 'GET_VERIFIED_PUBLIC_TWITTER',
      verifiedTwitter: verifiedTwitter.username,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getVerifiedPublicTwitter;