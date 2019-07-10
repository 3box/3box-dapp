import getPublicProfile from './getPublicProfile';

const getOtherProfileHeaders = profileAddress => async (dispatch) => {
  try {
    const graphqlQueryObject = `
    {
      profile(id: "${profileAddress}") {
        name
        image
      }
    }
    `;
    const publicProfile = await getPublicProfile(graphqlQueryObject);
    dispatch({
      type: 'OTHER_PROFILE_UPDATE',
      otherImage: [{
        '@type': 'ImageObject',
        contentUrl: {
          '/': publicProfile.profile.image,
        },
      }],
      otherName: publicProfile.profile.name,
    });
  } catch (error) {
    console.log(error);
  }
};

export default getOtherProfileHeaders;