import Box from '3box';

const getOtherProfile = profileAddress => async (dispatch) => {
  try {
    dispatch({
      type: 'OTHER_PROFILE_LOADING',
      isLoadingOtherProfile: true,
    });

    const publicProfile = await Box.getProfile(profileAddress); // eslint-disable-line no-undef
    const publicVerifiedAccounts = Object.entries(publicProfile).length > 0 ?
      await Box.getVerifiedAccounts(publicProfile) : { // eslint-disable-line no-undef
        github: null,
        twitter: null,
      };

    dispatch({
      type: 'OTHER_PROFILE_UPDATE',
      otherGithub: publicVerifiedAccounts.github && publicVerifiedAccounts.github.username,
      otherTwitter: publicVerifiedAccounts.twitter && publicVerifiedAccounts.twitter.username,
      otherDescription: publicProfile.description,
      otherLocation: publicProfile.location,
      otherWebsite: publicProfile.website,
      otherMemberSince: publicProfile.memberSince,
      otherJob: publicProfile.job,
      otherSchool: publicProfile.school,
      otherDegree: publicProfile.degree,
      otherMajor: publicProfile.major,
      otherYear: publicProfile.year,
      otherEmployer: publicProfile.employer,
      otherCoverPhoto: publicProfile.coverPhoto,
      otherImage: publicProfile.image,
      otherName: publicProfile.name,
      otherEmoji: publicProfile.emoji,
      otherStatus: publicProfile.status,
      otherCollectiblesGallery: publicProfile.collectiblesFavorites,
    });

    dispatch({
      type: 'OTHER_PROFILE_LOADING',
      isLoadingOtherProfile: false,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getOtherProfile;