export const threeBoxReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHECK_WALLET':
      return {
        ...state,
        hasWallet: action.hasWallet,
        downloadBanner: action.downloadBanner,
        currentWallet: action.currentWallet,
        mobileWalletRequiredModal: action.mobileWalletRequiredModal,
      };

    case 'UPDATE_ADDRESSES':
      return {
        ...state,
        isSignedIntoWallet: action.isSignedIntoWallet,
        isLoggedIn: action.isLoggedIn,
        accountAddress: action.accountAddress,
        allowAccessModal: action.allowAccessModal,
      };

    case 'UPDATE_NETWORK':
      return {
        ...state,
        currentNetwork: action.currentNetwork,
        prevNetwork: action.prevNetwork,
        prevPrevNetwork: action.prevPrevNetwork,
      };

    case 'SIGN_IN_UP':
      return {
        ...state,
        box: action.box,
        ifFetchingThreeBox: false,
        showErrorModal: false,
        errorMessage: '',
        name: action.name,
        github: action.github,
        image: action.image,
        email: action.email,
        feedByAddress: action.feedByAddress,
        isLoggedIn: action.isLoggedIn,
      };

    case 'LOADING_ACTIVITY':
      return {
        ...state,
        ifFetchingActivity: true,
      };

    case 'UPDATE_ACTIVITY':
      return {
        ...state,
        feedByAddress: action.feedByAddress,
        ifFetchingActivity: false,
        isLoggedIn: action.isLoggedIn,
      };

    case 'FAILED_LOADING_ACTIVITY':
      return {
        ...state,
        feedByAddress: [],
        ifFetchingActivity: false,
      };

    case 'UPDATE_THREEBOX':
      return {
        ...state,
        box: action.box,
        ifFetchingThreeBox: false,
        isLoggedIn: action.isLoggedIn,
      };

    case 'GET_PUBLIC_NAME':
      return {
        ...state,
        name: action.name,
      };

    case 'GET_PUBLIC_GITHUB':
      return {
        ...state,
        github: action.github,
      };

    case 'GET_PUBLIC_DESCRIPTION':
      return {
        ...state,
        description: action.description,
      };

    case 'GET_PUBLIC_LOCATION':
      return {
        ...state,
        location: action.location,
      };

    case 'GET_PUBLIC_WEBSITE':
      return {
        ...state,
        website: action.website,
      };

    case 'GET_PUBLIC_EMPLOYER':
      return {
        ...state,
        employer: action.employer,
      };

    case 'GET_PUBLIC_JOB':
      return {
        ...state,
        job: action.job,
      };

    case 'GET_PUBLIC_SCHOOL':
      return {
        ...state,
        school: action.school,
      };

    case 'GET_PUBLIC_DEGREE':
      return {
        ...state,
        degree: action.degree,
      };

    case 'GET_PUBLIC_MAJOR':
      return {
        ...state,
        major: action.major,
      };

    case 'GET_PUBLIC_YEAR':
      return {
        ...state,
        year: action.year,
      };

    case 'GET_PUBLIC_IMAGE':
      return {
        ...state,
        image: action.image,
      };

    case 'GET_PUBLIC_COVERPHOTO':
      return {
        ...state,
        coverPhoto: action.coverPhoto,
      };

    case 'GET_PUBLIC_EMOJI':
      return {
        ...state,
        emoji: action.emoji,
      };

    case 'GET_PUBLIC_STATUS':
      return {
        ...state,
        status: action.status,
      };

    case 'GET_PRIVATE_EMAIL':
      return {
        ...state,
        email: action.email,
      };

    case 'GET_PRIVATE_BIRTHDAY':
      return {
        ...state,
        birthday: action.birthday,
      };

    case 'GET_PUBLIC_MEMBERSINCE':
      return {
        ...state,
        memberSince: action.memberSince,
      };

    case 'HANDLE_SIGNOUT':
      return {
        ...state,
        isLoggedIn: false,
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
      };

      // MODALS
    case 'HANDLE_CONSENT_MODAL':
      return {
        ...state,
        provideConsent: action.provideConsent,
      };

    case 'LOADING_3BOX':
      return {
        ...state,
        provideConsent: false,
        ifFetchingThreeBox: true,
      };

    case 'FAILED_LOADING_3BOX':
      return {
        ...state,
        ifFetchingThreeBox: false,
        showErrorModal: true,
        provideConsent: false,
        errorMessage: action.errorMessage,
      };

    case 'REQUIRE_METAMASK':
      return {
        ...state,
        alertRequireMetaMask: action.alertRequireMetaMask,
      };

    case 'CLOSE_ERROR_MODAL':
      return {
        ...state,
        errorMessage: '',
        showErrorModal: false,
      };

    case 'OPEN_ERROR_MODAL':
      return {
        ...state,
        errorMessage: '',
        showErrorModal: true,
      };

    case 'DIFFERENT_NETWORK':
      return {
        ...state,
        currentNetwork: action.currentNetwork,
        prevNetwork: action.prevNetwork,
        prevPrevNetwork: action.prevPrevNetwork,
        showDifferentNetworkModal: action.showDifferentNetworkModal,
        onBoardingModal: false,
        onBoardingModal2: false,
        ifFetchingThreeBox: false,
      };

    case 'HANDLE_LOGGEDOUT_MODAL':
      return {
        ...state,
        loggedOutModal: action.loggedOutModal,
        ifFetchingThreeBox: false,
        onBoardingModal: false,
        onBoardingModal2: false,
      };

    case 'HANDLE_SWITCHED_ADDRESS_MODAL':
      return {
        ...state,
        switchedAddressModal: action.switchedAddressModal,
        ifFetchingThreeBox: false,
        onBoardingModal: false,
        onBoardingModal2: false,
        prevAddress: action.prevAddress,
      };

    case 'HANDLE_SIGNIN_MODAL':
      return {
        ...state,
        signInModal: action.signInModal,
      };

    case 'HANDLE_SWITCHED_NETWORK_MODAL':
      return {
        ...state,
        showDifferentNetworkModal: action.showDifferentNetworkModal,
      };

    case 'HANDLE_ONBOARDING_MODAL':
      return {
        ...state,
        onBoardingModal: action.onBoardingModal,
      };

    case 'HANDLE_ONBOARDING_MODAL2':
      return {
        ...state,
        onBoardingModal: action.onBoardingModal,
        onBoardingModalTwo: action.onBoardingModalTwo,
      };

    case 'HANDLE_REQUIRE_LOGIN_MODAL':
      return {
        ...state,
        signInToWalletModal: action.signInToWalletModal,
      };

    case 'HANDLE_WALLET_LOGIN_DETECTED_MODAL':
      return {
        ...state,
        isSignedIntoWallet: action.isSignedIntoWallet,
        hasWallet: action.hasWallet,
      };

    case 'HANDLE_MOBILE_WALLET_REQUIRED_MODAL':
      return {
        ...state,
        mobileWalletRequiredModal: action.mobileWalletRequiredModal,
      };

    case 'HANDLE_ACCESS_MODAL':
      return {
        ...state,
        allowAccessModal: action.allowAccessModal,
        directLogin: action.directLogin,
      };

    case 'HANDLE_DENIED_ACCESS_MODAL':
      return {
        ...state,
        accessDeniedModal: action.accessDeniedModal,
        allowAccessModal: action.allowAccessModal,
      };

    case 'HANDLE_DOWNLOAD_BANNER':
      return {
        ...state,
        downloadBanner: action.downloadBanner,
      };

    case 'PREVIOUS_ROUTE':
      return {
        ...state,
        previousRoute: action.previousRoute,
      };

    default:
      return state;
  }
};

export default threeBoxReducer;