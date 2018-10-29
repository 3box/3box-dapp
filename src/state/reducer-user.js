import {
  store,
} from './store';

export const threeBoxReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHECK_WALLET':
      return {
        ...state,
        hasWallet: action.hasWallet,
        currentWallet: action.currentWallet,
        isSignedIntoWallet: action.isSignedIntoWallet,
        isLoggedIn: action.isLoggedIn,
      };

    case 'DIFFERENT_NETWORK':
      return {
        ...state,
        currentNetwork: action.currentNetwork,
        prevNetwork: action.prevNetwork,
        prevPrevNetwork: action.prevPrevNetwork,
        showDifferentNetworkModal: true,
        onBoardingModal: false,
        onBoardingModal2: false,
        ifFetchingThreeBox: false,
      };

    case 'CHECK_NETWORK_AND_ADDRESS':
      return {
        ...state,
        currentNetwork: action.currentNetwork,
        prevNetwork: action.prevNetwork,
        prevPrevNetwork: action.prevPrevNetwork,
      };

    case 'REQUIRE_METAMASK':
      return {
        ...state,
        alertRequireMetaMask: action.alertRequireMetaMask,
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
        switched: action.switched,
        isLoggedIn: action.isLoggedIn,
      };

    case 'GET_THREEBOX':
      return {
        ...state,
        box: action.box,
        ifFetchingThreeBox: false,
        switched: action.switched,
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

    case 'GET_PUBLIC_IMAGE':
      return {
        ...state,
        image: action.image,
      };

    case 'GET_PRIVATE_EMAIL':
      return {
        ...state,
        email: action.email,
      };

    case 'PROVIDE_CONSENT':
      return {
        ...state,
        provideConsent: true,
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

    case 'CLOSE_CONSENT_MODAL':
      return {
        ...state,
        provideConsent: false,
      };

    case 'CLOSE_DIFFERENT_NETWORK_MODAL':
      return {
        ...state,
        showDifferentNetworkModal: false,
      };

    case 'LOADING_ACTIVITY':
      return {
        ...state,
        ifFetchingActivity: true,
      };

    case 'GET_ACTIVITY':
      return {
        ...state,
        feedByAddress: action.feedByAddress,
        ifFetchingActivity: false,
      };

    case 'FAILED_LOADING_ACTIVITY':
      return {
        ...state,
        feedByAddress: [],
        ifFetchingActivity: false,
      };

    case 'SHOW_LOGGEDOUT_MODAL':
      return {
        ...state,
        loggedOutModal: action.loggedOutModal,
        ifFetchingThreeBox: false,
        onBoardingModal: false,
        onBoardingModal2: false,
      };

    case 'SHOW_SWITCHED_ADDRESS_MODAL':
      return {
        ...state,
        switchedAddressModal: action.switchedAddressModal,
        ifFetchingThreeBox: false,
        switched: action.switched,
        onBoardingModal: false,
        onBoardingModal2: false,
      };

    case 'HANDLE_SIGNIN_MODAL':
      return {
        ...state,
        signInModal: action.signInModal,
      };

    case 'PROCEED_WITH_SWITCHED_ADDRESS':
      return {
        ...state,
        switch: action.switch,
        showDifferentNetworkModal: action.showDifferentNetworkModal,
      };

    case 'HANDLE_SIGNOUT':
      return {
        ...state,
        isLoggedIn: false,
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
        loginDetectedModal: action.loginDetectedModal,
      };

    default:
      return state;
  }
};

export default threeBoxReducer;