const myDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_BOX':
      return {
        ...state,
        box: action.box,
      };

    case 'UPDATE_MY_ACTIVITY_FEED':
      return {
        ...state,
        feedByAddress: action.feedByAddress,
      };

    case 'GET_MY_PUBLIC_NAME':
      return {
        ...state,
        name: action.name,
      };

    case 'GET_MY_PUBLIC_GITHUB':
      return {
        ...state,
        github: action.github,
      };

    case 'GET_MY_PUBLIC_COLLECTIBLES':
      return {
        ...state,
        publicCollectibles: action.publicCollectibles,
      };

    case 'GET_MY_VERIFIED_PUBLIC_GITHUB':
      return {
        ...state,
        verifiedGithub: action.verifiedGithub,
      };

    case 'GET_MY_VERIFIED_PUBLIC_TWITTER':
      return {
        ...state,
        verifiedTwitter: action.verifiedTwitter,
      };

    case 'GET_MY_VERIFIED_PRIVATE_EMAIL':
      return {
        ...state,
        verifiedEmail: action.verifiedEmail,
      };

    case 'GET_MY_PUBLIC_DESCRIPTION':
      return {
        ...state,
        description: action.description,
      };

    case 'GET_MY_PUBLIC_LOCATION':
      return {
        ...state,
        location: action.location,
      };

    case 'GET_MY_PUBLIC_WEBSITE':
      return {
        ...state,
        website: action.website,
      };

    case 'GET_MY_PUBLIC_EMPLOYER':
      return {
        ...state,
        employer: action.employer,
      };

    case 'GET_MY_PUBLIC_JOB':
      return {
        ...state,
        job: action.job,
      };

    case 'GET_MY_PUBLIC_SCHOOL':
      return {
        ...state,
        school: action.school,
      };

    case 'GET_MY_PUBLIC_DEGREE':
      return {
        ...state,
        degree: action.degree,
      };

    case 'GET_MY_PUBLIC_MAJOR':
      return {
        ...state,
        major: action.major,
      };

    case 'GET_MY_PUBLIC_YEAR':
      return {
        ...state,
        year: action.year,
      };

    case 'GET_MY_PUBLIC_IMAGE':
      return {
        ...state,
        image: action.image,
      };

    case 'GET_MY_PUBLIC_COVERPHOTO':
      return {
        ...state,
        coverPhoto: action.coverPhoto,
      };

    case 'GET_MY_PUBLIC_EMOJI':
      return {
        ...state,
        emoji: action.emoji,
      };

    case 'GET_MY_PUBLIC_COLLECTIBLESFAVORITES':
      return {
        ...state,
        collectiblesFavorites: action.collectiblesFavorites,
        collectiblesFavoritesToRender: action.collectiblesFavoritesToRender,
      };

    case 'GET_MY_PUBLIC_STATUS':
      return {
        ...state,
        status: action.status,
      };

    case 'GET_MY_PRIVATE_EMAIL':
      return {
        ...state,
        email: action.email,
      };

    case 'GET_MY_PRIVATE_BIRTHDAY':
      return {
        ...state,
        birthday: action.birthday,
      };

    case 'GET_MY_PUBLIC_MEMBERSINCE':
      return {
        ...state,
        memberSince: action.memberSince,
      };

    case 'GET_MY_PUBLIC_DID':
      return {
        ...state,
        did: action.did,
      };

    case 'GET_MY_COLLECTIBLES':
      return {
        ...state,
        collection: action.collection,
      };

    case 'SIGNOUT_MYDATA':
      return {
        ...state,
        birthday: '',
        name: '',
        github: '',
        image: [],
        email: '',
        feedByAddress: [],
        box: {},
        description: '',
        location: '',
        website: '',
        employer: '',
        job: '',
        school: '',
        degree: '',
        major: '',
        year: '',
        coverPhoto: [],
        emoji: '',
        status: '',
        verifiedGithub: '',
        verifiedTwitter: '',
        verifiedEmail: '',
      };

    default:
      return state;
  }
};

export default myDataReducer;