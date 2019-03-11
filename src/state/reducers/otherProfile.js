const otherProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOADING_OTHER_PROFILE':
      return {
        ...state,
        isLoadingOtherProfile: action.isLoadingOtherProfile,
      };

    case 'GET_OTHER_PROFILE':
      return {
        ...state,
        otherGithub: action.otherGithub,
        otherTwitter: action.otherTwitter,
        otherDescription: action.otherDescription,
        otherLocation: action.otherLocation,
        otherWebsite: action.otherWebsite,
        otherMemberSince: action.otherMemberSince,
        otherJob: action.otherJob,
        otherSchool: action.otherSchool,
        otherDegree: action.otherDegree,
        otherMajor: action.otherMajor,
        otherYear: action.otherYear,
        otherEmployer: action.otherEmployer,
        otherCoverPhoto: action.otherCoverPhoto,
        otherImage: action.otherImage,
        otherName: action.otherName,
        otherEmoji: action.otherEmoji,
        otherStatus: action.otherStatus,
        otherCollectiblesGallery: action.otherCollectiblesGallery,
      };

    case 'GET_PUBLIC_PROFILE_ACTIVITY':
      return {
        ...state,
        otherProfileActivity: action.otherProfileActivity,
      };

    case 'UPDATE_PUBLIC_PROFILE_FAVORITE_COLLECTIBLES':
      return {
        ...state,
        otherCollectiblesFavorites: action.otherCollectiblesFavorites,
      };

    case 'UPDATE_OTHER_PROFILE':
      return {
        ...state,
        otherProfileAddress: action.otherProfileAddress,
      };

    default:
      return state;
  }
};

export default otherProfileReducer;