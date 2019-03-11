const uiStateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOADING_3BOX':
      return {
        ...state,
        provideConsent: action.provideConsent,
        isFetchingThreeBox: action.isFetchingThreeBox,
      };

    case 'LOADING_ACTIVITY':
      return {
        ...state,
        isFetchingActivity: true,
      };

    case 'UPDATE_ACTIVITY_UISTATE':
      return {
        ...state,
        isFetchingActivity: action.isFetchingActivity,
      };

    case 'FAILED_LOADING_ACTIVITY':
      return {
        ...state,
        isFetchingActivity: action.isFetchingActivity,
        provideConsent: action.provideConsent,
        errorMessage: action.errorMessage,
      };

    case 'UPDATE_OTHER_ACTIVITY_UI':
      return {
        ...state,
        isFetchingActivity: action.isFetchingActivity,
      };

    case 'APP_SYNC':
      return {
        ...state,
        isSyncing: action.isSyncing,
        onSyncFinished: action.onSyncFinished,
      };

    case 'FAILED_LOADING_3BOX':
      return {
        ...state,
        isFetchingThreeBox: false,
        showErrorModal: true,
        provideConsent: false,
        errorMessage: action.errorMessage,
      };

      // MODALS & BANNERS
    case 'HANDLE_SIGNIN_BANNER':
      return {
        ...state,
        showSignInBanner: action.showSignInBanner,
      };

    case 'HANDLE_CONSENT_MODAL':
      return {
        ...state,
        provideConsent: action.provideConsent,
        showSignInBanner: action.showSignInBanner,
        showInfoBanner: action.showInfoBanner,
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

    case 'HANDLE_DIFFERENT_NETWORK_MODAL':
      return {
        ...state,
        showDifferentNetworkModal: action.showDifferentNetworkModal,
        onBoardingModal: action.onBoardingModal,
        onBoardingModal2: action.onBoardingModal2,
        isFetchingThreeBox: action.isFetchingThreeBox,
      };

    case 'HANDLE_LOGGEDOUT_MODAL':
      return {
        ...state,
        loggedOutModal: action.loggedOutModal,
        isFetchingThreeBox: false,
        onBoardingModal: false,
        onBoardingModal2: false,
      };

    case 'HANDLE_SWITCHED_ADDRESS_MODAL':
      return {
        ...state,
        switchedAddressModal: action.switchedAddressModal,
        isFetchingThreeBox: false,
        onBoardingModal: false,
        onBoardingModal2: false,
        prevAddress: action.prevAddress,
      };

    case 'IS_FETCHING_THREEBOX':
      return {
        ...state,
        isFetchingThreeBox: action.isFetchingThreeBox,
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

    case 'HANDLE_MOBILE_WALLET_REQUIRED_MODAL':
      return {
        ...state,
        mobileWalletRequiredModal: action.mobileWalletRequiredModal,
      };

    case 'HANDLE_GITHUB_MODAL':
      return {
        ...state,
        showGithubVerificationModal: action.showGithubVerificationModal,
      };

    case 'HANDLE_TWITTER_MODAL':
      return {
        ...state,
        showTwitterVerificationModal: action.showTwitterVerificationModal,
      };

    case 'HANDLE_EMAIL_MODAL':
      return {
        ...state,
        showEmailVerificationModal: action.showEmailVerificationModal,
      };

    case 'HANDLE_ACCESS_MODAL':
      return {
        ...state,
        allowAccessModal: action.allowAccessModal,
        directLogin: action.directLogin,
      };

    case 'HANDLE_COLLECTIBLES_MODAL':
      return {
        ...state,
        showCollectiblesModal: action.showCollectiblesModal,
        selectedCollectible: action.selectedCollectible,
        isFavorite: action.isFavorite,
      };
    case 'CLOSE_COLLECTIBLES_MODAL':
      return {
        ...state,
        showCollectiblesModal: action.showCollectiblesModal,
      };
    case 'RESET_SELECTED_COLLECTIBLE':
      return {
        ...state,
        selectedCollectible: action.selectedCollectible,
        isFavorite: action.isFavorite,
      };

    case 'HANDLE_DENIED_ACCESS_MODAL':
      return {
        ...state,
        accessDeniedModal: action.accessDeniedModal,
        allowAccessModal: action.allowAccessModal,
      };

    case 'HANDLE_INFO_BANNER':
      return {
        ...state,
        showInfoBanner: action.showInfoBanner,
      };

    case 'UPDATE_ROUTE':
      return {
        ...state,
        currentRoute: action.currentRoute,
      };

    case 'ON_OTHER_PROFILE':
      return {
        ...state,
        onOtherProfilePage: action.onOtherProfilePage,
      };

    case 'COPY_SUCCESSFUL':
      return {
        ...state,
        copySuccessful: action.copySuccessful,
      };

    case 'SIGNOUT_UISTATE':
      return {
        ...state,
        onSyncFinished: action.onSyncFinished,
      };

    default:
      return state;
  }
};

export default uiStateReducer;