const otherProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'OTHER_PROFILE_LOADING':
      return {
        ...state,
        isLoadingOtherProfile: action.isLoadingOtherProfile,
      };

    case 'OTHER_PROFILE_UPDATE':
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
        otherFollowing: action.otherFollowing,
      };

    case 'OTHER_ACTIVITY_UPDATE':
      return {
        ...state,
        otherProfileActivity: action.otherProfileActivity,
      };

    case 'OTHER_FAVORITE_COLLECTIBLES_UPDATE':
      return {
        ...state,
        otherCollectiblesFavorites: action.otherCollectiblesFavorites,
      };

    case 'OTHER_ADDRESS_UPDATE':
      return {
        ...state,
        otherProfileAddress: action.otherProfileAddress,
      };

    case 'OTHER_MUTUAL_FOLLOWING':
      return {
        ...state,
        otherMutualFollowing: action.otherMutualFollowing,
      };

    default:
      return state;
  }
};

export default otherProfileReducer;