import {
  store,
} from '../../store';

export const closeErrorModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_CLOSE_ERROR_MODAL',
    errorMessage: '',
    showErrorModal: false,
  });
};

export const handleCollectiblesModal = (selectedCollectible, isFavorite) => {
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
    store.dispatch({
      type: 'UI_HANDLE_COLLECTIBLES_MODAL',
      showCollectiblesModal: !store.getState().uiState.showCollectiblesModal,
      selectedCollectible: orderedCollectible,
      isFavorite,
    });
  } else {
    store.dispatch({
      type: 'UI_CLOSE_COLLECTIBLES_MODAL',
      showCollectiblesModal: false,
    });
    setTimeout(() => {
      store.dispatch({
        type: 'UI_RESET_SELECTED_COLLECTIBLE',
        selectedCollectible: undefined,
        isFavorite: undefined,
      });
    }, 300);
  }
};

export const handleContactsModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_CONTACTS_MODAL',
    showContactsModal: !store.getState().uiState.showContactsModal,
  });
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

export const handleUnsupportedBrowserModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_UNSUPPORTED_BROWSER_MODAL',
    showUnsupportedBrowser: false,
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

export const handleShowSignInBanner = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_SIGNIN_BANNER',
    showSignInBanner: true,
  });
};

export const handleShowSafariBanner = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_SAFARI_BANNER',
    showSafariBanner: !store.getState().uiState.showSafariBanner,
  });
};

export const handleHideSignInBanner = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_SIGNIN_BANNER',
    showSignInBanner: false,
  });
};

export const handleFollowingPublicModal = () => async (dispatch) => {
  dispatch({
    type: 'UI_HANDLE_WARN_PUBLIC_FOLLOWING',
    showFollowingPublicModal: false,
  });
};