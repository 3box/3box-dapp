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
        otherEns: action.otherEns,
      };

    case 'OTHER_PROFILE_UPDATE_VERIFIED_FOLLOWING':
      return {
        ...state,
        otherGithub: action.otherGithub,
        otherTwitter: action.otherTwitter,
        otherCollectiblesGallery: action.otherCollectiblesGallery,
        otherFollowing: action.otherFollowing,
      };

    case 'OTHER_ACTIVITY_UPDATE':
      return {
        ...state,
        otherProfileActivity: action.otherProfileActivity,
      };

    case 'OTHER_WALL_UPDATE':
      return {
        ...state,
        otherWallPosts: action.otherWallPosts,
        otherWallProfiles: action.otherWallProfiles,
        isOtherWallDisabled: action.isOtherWallDisabled,
      };

    case 'OTHER_WALL_THREAD_UPDATE':
      return {
        ...state,
        otherWallPosts: action.otherWallPosts,
        otherWallProfiles: action.otherWallProfiles,
        otherWallThread: action.otherWallThread,
      };

    case 'OTHER_WALL_POSTS_UPDATE':
      return {
        ...state,
        otherWallPosts: action.otherWallPosts,
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

    case 'OTHER_ADDRESS_TO_FOLLOW':
      return {
        ...state,
        otherAddressToFollow: action.otherAddressToFollow,
      };

    default:
      return state;
  }
};

export default otherProfileReducer;