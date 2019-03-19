const uiStateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UI_3BOX_LOADING':
      return {
        ...state,
        provideConsent: action.provideConsent,
        isFetchingThreeBox: action.isFetchingThreeBox,
      };

    case 'UI_FEED_LOADING':
      return {
        ...state,
        isFetchingActivity: action.isFetchingActivity,
      };

    case 'UI_FEED_FAILED':
      return {
        ...state,
        isFetchingActivity: action.isFetchingActivity,
        provideConsent: action.provideConsent,
        errorMessage: action.errorMessage,
      };

    case 'UI_APP_SYNC':
      return {
        ...state,
        isSyncing: action.isSyncing,
        onSyncFinished: action.onSyncFinished,
      };

    case 'UI_3BOX_FAILED':
      return {
        ...state,
        isFetchingThreeBox: false,
        showErrorModal: true,
        provideConsent: false,
        errorMessage: action.errorMessage,
      };

      // MODALS & BANNERS
    case 'UI_HANDLE_SIGNIN_BANNER':
      return {
        ...state,
        showSignInBanner: action.showSignInBanner,
      };

    case 'UI_HANDLE_CONSENT_MODAL':
      return {
        ...state,
        provideConsent: action.provideConsent,
        showSignInBanner: action.showSignInBanner,
        showInfoBanner: action.showInfoBanner,
      };

    case 'UI_REQUIRE_METAMASK_MODAL':
      return {
        ...state,
        alertRequireMetaMask: action.alertRequireMetaMask,
      };

    case 'UI_CLOSE_ERROR_MODAL':
      return {
        ...state,
        errorMessage: '',
        showErrorModal: false,
      };

    case 'UI_HANDLE_DIFFERENT_NETWORK_MODAL':
      return {
        ...state,
        showDifferentNetworkModal: action.showDifferentNetworkModal,
        onBoardingModal: action.onBoardingModal,
        onBoardingModal2: action.onBoardingModal2,
        isFetchingThreeBox: action.isFetchingThreeBox,
      };

    case 'UI_HANDLE_LOGGEDOUT_MODAL':
      return {
        ...state,
        loggedOutModal: action.loggedOutModal,
        isFetchingThreeBox: false,
        onBoardingModal: false,
        onBoardingModal2: false,
      };

    case 'UI_HANDLE_SWITCHED_ADDRESS_MODAL':
      return {
        ...state,
        switchedAddressModal: action.switchedAddressModal,
        isFetchingThreeBox: false,
        onBoardingModal: false,
        onBoardingModal2: false,
        prevAddress: action.prevAddress,
      };

    case 'UI_3BOX_FETCHING':
      return {
        ...state,
        isFetchingThreeBox: action.isFetchingThreeBox,
      };

    case 'UI_HANDLE_SIGNIN_MODAL':
      return {
        ...state,
        signInModal: action.signInModal,
      };

    case 'UI_HANDLE_SWITCHED_NETWORK_MODAL':
      return {
        ...state,
        showDifferentNetworkModal: action.showDifferentNetworkModal,
      };

    case 'UI_HANDLE_ONBOARDING_MODAL':
      return {
        ...state,
        onBoardingModal: action.onBoardingModal,
      };

    case 'UI_SPACES_LOADING':
      return {
        ...state,
        isSpacesLoading: action.isSpacesLoading,
      };

    case 'UI_SPACE_OPENED':
      return {
        ...state,
        spacesOpened: action.spacesOpened,
        showSpaceOpenedModal: action.showSpaceOpenedModal,
      };

    case 'UI_HANDLE_SPACE_OPENED_MODAL':
      return {
        ...state,
        showSpaceOpenedModal: action.showSpaceOpenedModal,
      };

    case 'UI_HANDLE_ONBOARDING_MODAL2':
      return {
        ...state,
        onBoardingModal: action.onBoardingModal,
        onBoardingModalTwo: action.onBoardingModalTwo,
      };

    case 'UI_HANDLE_REQUIRE_LOGIN_MODAL':
      return {
        ...state,
        signInToWalletModal: action.signInToWalletModal,
      };

    case 'UI_HANDLE_MOBILE_WALLET_REQUIRED_MODAL':
      return {
        ...state,
        mobileWalletRequiredModal: action.mobileWalletRequiredModal,
      };

    case 'UI_HANDLE_GITHUB_MODAL':
      return {
        ...state,
        showGithubVerificationModal: action.showGithubVerificationModal,
      };

    case 'UI_HANDLE_TWITTER_MODAL':
      return {
        ...state,
        showTwitterVerificationModal: action.showTwitterVerificationModal,
      };

    case 'UI_HANDLE_EMAIL_MODAL':
      return {
        ...state,
        showEmailVerificationModal: action.showEmailVerificationModal,
      };

    case 'UI_HANDLE_ACCESS_MODAL':
      return {
        ...state,
        allowAccessModal: action.allowAccessModal,
        directLogin: action.directLogin,
      };

    case 'UI_HANDLE_COLLECTIBLES_MODAL':
      return {
        ...state,
        showCollectiblesModal: action.showCollectiblesModal,
        selectedCollectible: action.selectedCollectible,
        isFavorite: action.isFavorite,
      };
    case 'UI_CLOSE_COLLECTIBLES_MODAL':
      return {
        ...state,
        showCollectiblesModal: action.showCollectiblesModal,
      };
    case 'UI_RESET_SELECTED_COLLECTIBLE':
      return {
        ...state,
        selectedCollectible: action.selectedCollectible,
        isFavorite: action.isFavorite,
      };

    case 'UI_HANDLE_DENIED_ACCESS_MODAL':
      return {
        ...state,
        accessDeniedModal: action.accessDeniedModal,
        allowAccessModal: action.allowAccessModal,
      };

    case 'UI_HANDLE_INFO_BANNER':
      return {
        ...state,
        showInfoBanner: action.showInfoBanner,
      };

    case 'UI_ROUTE_UPDATE':
      return {
        ...state,
        currentRoute: action.currentRoute,
      };

    case 'UI_ON_OTHER_PROFILE':
      return {
        ...state,
        onOtherProfilePage: action.onOtherProfilePage,
      };

    case 'UI_COPY_SUCCESSFUL':
      return {
        ...state,
        copySuccessful: action.copySuccessful,
      };

    case 'UI_HANDLE_SPACES_VIEW_MODAL':
      return {
        ...state,
        showSpaceDataItemModal: action.showSpaceDataItemModal,
        spaceItem: action.spaceItem,
      };

    case 'UI_SIGN_OUT':
      return {
        ...state,
        onSyncFinished: action.onSyncFinished,
      };

    default:
      return state;
  }
};

export default uiStateReducer;