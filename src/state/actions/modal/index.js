import {
  store,
} from '../../store';

export const requireMetaMaskModal = () => (dispatch) => {
  dispatch({
    type: 'UI_REQUIRE_METAMASK_MODAL',
    alertRequireMetaMask: true,
  });
};

export const closeRequireMetaMaskModal = () => (dispatch) => {
  dispatch({
    type: 'UI_REQUIRE_METAMASK_MODAL',
    alertRequireMetaMask: false,
  });
};

export const closeErrorModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_CLOSE_ERROR_MODAL',
    errorMessage: '',
    showErrorModal: false,
  });
};

export const handleCollectiblesModal = (selectedCollectible, isFavorite) => async (dispatch) => {
  let orderedCollectible;

  if (selectedCollectible) {
    const stringTraits = [];
    const intTraits = [];
    orderedCollectible = selectedCollectible;

    selectedCollectible.traits.forEach((trait) => {
      if (typeof trait.value === 'string') {
        stringTraits.push(trait);
      } else {
        intTraits.push(trait);
      }
    });

    orderedCollectible.orderedTraits = stringTraits.concat(intTraits);
    dispatch({
      type: 'UI_HANDLE_COLLECTIBLES_MODAL',
      showCollectiblesModal: !store.getState().uiState.showCollectiblesModal,
      selectedCollectible: orderedCollectible,
      isFavorite,
    });
  } else {
    dispatch({
      type: 'UI_CLOSE_COLLECTIBLES_MODAL',
      showCollectiblesModal: false,
    });
    setTimeout(() => {
      dispatch({
        type: 'UI_RESET_SELECTED_COLLECTIBLE',
        selectedCollectible: undefined,
        isFavorite: undefined,
      });
    }, 300);
  }
};

export const handleSignInModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_SIGNIN_MODAL',
    errorMessage: store.getState().uiState.errorMessage,
    signInModal: !store.getState().uiState.signInModal,
  });
};

export const handleConsentModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_CONSENT_MODAL',
    provideConsent: false,
  });
};

export const handleLoggedOutModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_LOGGEDOUT_MODAL',
    loggedOutModal: !store.getState().uiState.loggedOutModal,
  });
};

export const handleSwitchedAddressModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_SWITCHED_ADDRESS_MODAL',
    switchedAddressModal: !store.getState().uiState.switchedAddressModal,
  });
};

export const handleSwitchedNetworkModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_SWITCHED_NETWORK_MODAL',
    showDifferentNetworkModal: false,
  });
};

export const handleGithubVerificationModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_GITHUB_MODAL',
    showGithubVerificationModal: !store.getState().uiState.showGithubVerificationModal,
  });
};

export const handleTwitterVerificationModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_TWITTER_MODAL',
    showTwitterVerificationModal: !store.getState().uiState.showTwitterVerificationModal,
  });
};

export const handleEmailVerificationModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_EMAIL_MODAL',
    showEmailVerificationModal: !store.getState().uiState.showEmailVerificationModal,
  });
};

export const handleOnboardingModal = mobile => async (dispatch) => {
  if (mobile) {
    dispatch({
      type: 'UI_HANDLE_ONBOARDING_MODAL2',
      onBoardingModal: false,
    });
  } else {
    dispatch({
      type: 'UI_HANDLE_ONBOARDING_MODAL2',
      onBoardingModalTwo: !store.getState().uiState.onBoardingModalTwo,
      onBoardingModal: false,
    });
  }
};

export const handleRequireWalletLoginModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_REQUIRE_LOGIN_MODAL',
    signInToWalletModal: !store.getState().uiState.signInToWalletModal,
  });
};

export const handleMobileWalletModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_MOBILE_WALLET_REQUIRED_MODAL',
    mobileWalletRequiredModal: !store.getState().uiState.mobileWalletRequiredModal,
  });
};

export const handleAccessModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_ACCESS_MODAL',
    allowAccessModal: !store.getState().uiState.allowAccessModal,
  });
};

export const handleDeniedAccessModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_DENIED_ACCESS_MODAL',
    accessDeniedModal: !store.getState().uiState.accessDeniedModal,
  });
};

export const handleDownloadMetaMaskBanner = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_DOWNLOAD_BANNER',
    showDownloadBanner: !store.getState().uiState.showDownloadBanner,
  });
};

export const handleSignInBanner = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_SIGNIN_BANNER',
    showSignInBanner: !store.getState().uiState.showSignInBanner,
  });
};