import {
  store,
} from '../../store';

const getVerifiedPublicGithub = () => async (dispatch) => {
  try {
    const verifiedGithub = await store.getState().threeBox.box.verified.github();

    dispatch({
      type: 'GET_VERIFIED_PUBLIC_GITHUB',
      verifiedGithub: verifiedGithub.username,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getVerifiedPublicGithub;