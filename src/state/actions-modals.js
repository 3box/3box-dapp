import {
  store,
} from './store';

export const closeDifferentNetworkModal = () => (dispatch) => {
  dispatch({
    type: 'CLOSE_DIFFERENT_NETWORK_MODAL',
    showDifferentNetworkModal: false,
  });
};

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

export const handleSignInModal = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_SIGNIN_MODAL',
    errorMessage: store.getState().threeBox.errorMessage,
    signInModal: !store.getState().threeBox.signInModal,
  });
};

export const closeConsentModal = () => async (dispatch) => {
  dispatch({
    type: 'CLOSE_CONSENT_MODAL',
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

export const proceedWithSwitchedAddressModal = () => async (dispatch) => {
  dispatch({
    type: 'PROCEED_WITH_SWITCHED_ADDRESS',
    switch: false,
    showDifferentNetworkModal: false,
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
