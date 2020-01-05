import {
  store,
} from '../../store';

const getVerifiedPublicTwitter = async () => {
  try {
    const verifiedTwitter = await store.getState().myData.box.verified.twitter();

    store.dispatch({
      type: 'MY_VERIFIED_TWITTER_UPDATE',
      verifiedTwitter: verifiedTwitter && verifiedTwitter.username,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getVerifiedPublicTwitter;