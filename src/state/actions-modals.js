import {
  store,
} from './store';

export const requireMetaMaskModal = () => (dispatch) => {
  dispatch({
    type: 'REQUIRE_METAMASK',
    alertRequireMetaMask: true,
  });
};

export const closeRequireMetaMaskModal = () => (dispatch) => {
  dispatch({
    type: 'REQUIRE_METAMASK',
    alertRequireMetaMask: false,
  });
};

export const closeErrorModal = () => async (dispatch) => {
  dispatch({
    type: 'CLOSE_ERROR_MODAL',
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
      type: 'HANDLE_COLLECTIBLES_MODAL',
      showCollectiblesModal: !store.getState().threeBox.showCollectiblesModal,
      selectedCollectible: orderedCollectible,
      isFavorite,
    });
  } else {
    dispatch({
      type: 'CLOSE_COLLECTIBLES_MODAL',
      showCollectiblesModal: false,
    });
    setTimeout(() => {
      dispatch({
        type: 'RESET_SELECTED_COLLECTIBLE',
        selectedCollectible: undefined,
        isFavorite: undefined,
      });
    }, 300);
  }
};

export const handleSignInModal = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_SIGNIN_MODAL',
    errorMessage: store.getState().threeBox.errorMessage,
    signInModal: !store.getState().threeBox.signInModal,
  });
};

export const handleConsentModal = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_CONSENT_MODAL',
    provideConsent: false,
  });
};

export const handleLoggedOutModal = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_LOGGEDOUT_MODAL',
    loggedOutModal: !store.getState().threeBox.loggedOutModal,
  });
};

export const handleSwitchedAddressModal = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_SWITCHED_ADDRESS_MODAL',
    switchedAddressModal: !store.getState().threeBox.switchedAddressModal,
  });
};

export const handleSwitchedNetworkModal = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_SWITCHED_NETWORK_MODAL',
    showDifferentNetworkModal: false,
  });
};

export const handleGithubVerificationModal = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_GITHUB_MODAL',
    showGithubVerificationModal: !store.getState().threeBox.showGithubVerificationModal,
  });
};

export const handleTwitterVerificationModal = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_TWITTER_MODAL',
    showTwitterVerificationModal: !store.getState().threeBox.showTwitterVerificationModal,
  });
};

export const handleEmailVerificationModal = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_EMAIL_MODAL',
    showEmailVerificationModal: !store.getState().threeBox.showEmailVerificationModal,
  });
};

export const handleOnboardingModal = mobile => async (dispatch) => {
  if (mobile) {
    dispatch({
      type: 'HANDLE_ONBOARDING_MODAL2',
      onBoardingModal: false,
    });
  } else {
    dispatch({
      type: 'HANDLE_ONBOARDING_MODAL2',
      onBoardingModalTwo: !store.getState().threeBox.onBoardingModalTwo,
      onBoardingModal: false,
    });
  }
};

export const handleRequireWalletLoginModal = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_REQUIRE_LOGIN_MODAL',
    signInToWalletModal: !store.getState().threeBox.signInToWalletModal,
  });
};

export const handleMobileWalletModal = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_MOBILE_WALLET_REQUIRED_MODAL',
    mobileWalletRequiredModal: !store.getState().threeBox.mobileWalletRequiredModal,
  });
};

export const handleAccessModal = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_ACCESS_MODAL',
    allowAccessModal: !store.getState().threeBox.allowAccessModal,
  });
};

export const handleDeniedAccessModal = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_DENIED_ACCESS_MODAL',
    accessDeniedModal: !store.getState().threeBox.accessDeniedModal,
  });
};

export const handleDownloadMetaMaskBanner = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_DOWNLOAD_BANNER',
    showDownloadBanner: !store.getState().threeBox.showDownloadBanner,
  });
};

export const handleSignInBanner = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_SIGNIN_BANNER',
    showSignInBanner: !store.getState().threeBox.showSignInBanner,
  });
};