const userStateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHECK_WEB3':
      return {
        ...state,
        hasWeb3: action.hasWeb3,
        showDownloadBanner: action.showDownloadBanner,
        currentWallet: action.currentWallet,
      };

    case 'UPDATE_ADDRESSES':
      return {
        ...state,
        isSignedIntoWallet: action.isSignedIntoWallet,
        isLoggedIn: action.isLoggedIn,
        accountAddress: action.accountAddress,
        currentAddress: action.currentAddress,
      };

    case 'UPDATE_WEB3_STATUS':
      return {
        ...state,
        hasWeb3: action.hasWeb3,
      };

    case 'IS_SIGNED_INTO_WALLET':
      return {
        ...state,
        isSignedIntoWallet: action.isSignedIntoWallet,
      };

    case 'UPDATE_NETWORK':
      return {
        ...state,
        currentNetwork: action.currentNetwork,
        prevNetwork: action.prevNetwork,
        prevPrevNetwork: action.prevPrevNetwork,
      };

    case 'DIFFERENT_NETWORK':
      return {
        ...state,
        currentNetwork: action.currentNetwork,
        prevNetwork: action.prevNetwork,
        prevPrevNetwork: action.prevPrevNetwork,
      };

    case 'UPDATE_ACTIVITY_USERSTATE':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };

    case 'IS_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };

    case 'SIGNOUT_USERSTATE':
      return {
        ...state,
        isLoggedIn: false,
        hasSignedOut: action.hasSignedOut,
      };

    case 'UPDATE_ADDRESS':
      return {
        ...state,
        currentAddress: action.currentAddress,
      };

    default:
      return state;
  }
};

export default userStateReducer;