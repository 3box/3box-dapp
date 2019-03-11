import Box from '3box';

const getOtherProfile = profileAddress => async (dispatch) => {
  try {
    dispatch({
      type: 'LOADING_PUBLIC_PROFILE',
      isLoadingPublicProfile: true,
    });

    const publicProfile = await Box.getProfile(profileAddress); // eslint-disable-line no-undef
    const publicVerifiedAccounts = Object.entries(publicProfile).length > 0 ?
      await Box.getVerifiedAccounts(publicProfile) : { // eslint-disable-line no-undef
        github: null,
        twitter: null,
      };

    dispatch({
      type: 'GET_PUBLIC_PROFILE',
      publicGithub: publicVerifiedAccounts.github && publicVerifiedAccounts.github.username,
      publicTwitter: publicVerifiedAccounts.twitter && publicVerifiedAccounts.twitter.username,
      publicDescription: publicProfile.description,
      publicLocation: publicProfile.location,
      publicWebsite: publicProfile.website,
      publicMemberSince: publicProfile.memberSince,
      publicJob: publicProfile.job,
      publicSchool: publicProfile.school,
      publicDegree: publicProfile.degree,
      publicMajor: publicProfile.major,
      publicYear: publicProfile.year,
      publicEmployer: publicProfile.employer,
      publicCoverPhoto: publicProfile.coverPhoto,
      publicImage: publicProfile.image,
      publicName: publicProfile.name,
      publicEmoji: publicProfile.emoji,
      publicStatus: publicProfile.status,
      publicCollectiblesGallery: publicProfile.collectiblesFavorites,
    });

    dispatch({
      type: 'LOADING_PUBLIC_PROFILE',
      isLoadingPublicProfile: false,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getOtherProfile;