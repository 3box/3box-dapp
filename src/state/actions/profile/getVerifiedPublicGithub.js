import {
  store,
} from '../../store';

const getVerifiedPublicGithub = async () => {
  try {
    const verifiedGithub = await store.getState().myData.box.verified.github();

    store.dispatch({
      type: 'MY_VERIFIED_GITHUB_UPDATE',
      verifiedGithub: verifiedGithub && verifiedGithub.username,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getVerifiedPublicGithub;