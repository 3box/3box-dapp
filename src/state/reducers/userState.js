const userStateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_CHECK_WEB3':
      return {
        ...state,
        hasWeb3: action.hasWeb3,
        showDownloadBanner: action.showDownloadBanner,
        currentWallet: action.currentWallet,
      };

    case 'USER_ADDRESSES_UPDATE':
      return {
        ...state,
        isSignedIntoWallet: action.isSignedIntoWallet,
        isLoggedIn: action.isLoggedIn,
        accountAddress: action.accountAddress,
        currentAddress: action.currentAddress,
      };

    case 'USER_WEB3_STATUS_UPDATE':
      return {
        ...state,
        hasWeb3: action.hasWeb3,
      };

    case 'USER_WALLET_LOGIN_UPDATE':
      return {
        ...state,
        isSignedIntoWallet: action.isSignedIntoWallet,
      };

    case 'USER_NETWORK_UPDATE':
      return {
        ...state,
        currentNetwork: action.currentNetwork,
        prevNetwork: action.prevNetwork,
        prevPrevNetwork: action.prevPrevNetwork,
      };

    case 'USER_LOGIN_UPDATE':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };

    case 'USER_SIGN_OUT':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        hasSignedOut: action.hasSignedOut,
      };

    case 'USER_UPDATE_ADDRESS':
      return {
        ...state,
        currentAddress: action.currentAddress,
      };

    default:
      return state;
  }
};

export default userStateReducer;