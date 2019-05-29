import {
  store,
} from '../../store';

const getVerifiedPublicGithub = () => async (dispatch) => {
  try {
    console.log('in github')
    const verifiedGithub = await store.getState().myData.box.verified.github();

    dispatch({
      type: 'MY_VERIFIED_GITHUB_UPDATE',
      verifiedGithub: verifiedGithub.username,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getVerifiedPublicGithub;