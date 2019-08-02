const myDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'MY_BOX_UPDATE':
      return {
        ...state,
        box: action.box,
      };

    case 'MY_FEED_UPDATE':
      return {
        ...state,
        feedByAddress: action.feedByAddress,
      };

    case 'MY_NAME_UPDATE':
      return {
        ...state,
        name: action.name,
      };

    case 'MY_VERIFIED_GITHUB_UPDATE':
      return {
        ...state,
        verifiedGithub: action.verifiedGithub,
      };

    case 'MY_VERIFIED_TWITTER_UPDATE':
      return {
        ...state,
        verifiedTwitter: action.verifiedTwitter,
      };

    case 'MY_VERIFIED_EMAIL_UPDATE':
      return {
        ...state,
        verifiedEmail: action.verifiedEmail,
      };

    case 'MY_DESCRIPTION_UPDATE':
      return {
        ...state,
        description: action.description,
      };

    case 'MY_LOCATION_UPDATE':
      return {
        ...state,
        location: action.location,
      };

    case 'MY_WEBSITE_UPDATE':
      return {
        ...state,
        website: action.website,
      };

    case 'MY_EMPLOYER_UPDATE':
      return {
        ...state,
        employer: action.employer,
      };

    case 'MY_JOB_UPDATE':
      return {
        ...state,
        job: action.job,
      };

    case 'MY_SCHOOL_UPDATE':
      return {
        ...state,
        school: action.school,
      };

    case 'MY_DEGREE_UPDATE':
      return {
        ...state,
        degree: action.degree,
      };

    case 'MY_MAJOR_UPDATE':
      return {
        ...state,
        major: action.major,
      };

    case 'MY_YEAR_UPDATE':
      return {
        ...state,
        year: action.year,
      };

    case 'MY_IMAGE_UPDATE':
      return {
        ...state,
        image: action.image,
      };

    case 'MY_COVERPHOTO_UPDATE':
      return {
        ...state,
        coverPhoto: action.coverPhoto,
      };

    case 'MY_EMOJI_UPDATE':
      return {
        ...state,
        emoji: action.emoji,
      };

    case 'MY_COLLECTIBLESFAVORITES_UPDATE':
      return {
        ...state,
        collectiblesFavorites: action.collectiblesFavorites,
        collectiblesFavoritesToRender: action.collectiblesFavoritesToRender,
      };

    case 'MY_STATUS_UPDATE':
      return {
        ...state,
        status: action.status,
      };

    case 'MY_BIRTHDAY_UPDATE':
      return {
        ...state,
        birthday: action.birthday,
      };

    case 'MY_MEMBERSINCE_UPDATE':
      return {
        ...state,
        memberSince: action.memberSince,
      };

    case 'MY_DID_UPDATE':
      return {
        ...state,
        did: action.did,
      };

    case 'MY_COLLECTIBLES_UPDATE':
      return {
        ...state,
        collection: action.collection,
      };

    case 'MY_FOLLOWING_UPDATE':
      return {
        ...state,
        following: action.following,
          followingList: action.followingList,
          followingThread: action.followingThread,
      };

    case 'MY_FOLLOWING_LIST_UPDATE':
      return {
        ...state,
        following: action.following,
        followingList: action.followingList,
      };

    case 'MY_FOLLOWING_THREAD_UPDATE':
      return {
        ...state,
        followingThread: action.followingThread,
      };

    case 'MY_DATA_SIGNOUT':
      return {};

    default:
      return state;
  }
};

export default myDataReducer;