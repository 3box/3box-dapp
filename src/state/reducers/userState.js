const userStateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'WEB3_CHECK':
      return {
        ...state,
        hasWeb3: action.hasWeb3,
        showDownloadBanner: action.showDownloadBanner,
        currentWallet: action.currentWallet,
      };

    case 'ADDRESSES_UPDATE':
      return {
        ...state,
        isSignedIntoWallet: action.isSignedIntoWallet,
        isLoggedIn: action.isLoggedIn,
        accountAddress: action.accountAddress,
        currentAddress: action.currentAddress,
      };

    case 'WEB3_STATUS_UPDATE':
      return {
        ...state,
        hasWeb3: action.hasWeb3,
      };

    case 'WALLET_LOGIN_UPDATE':
      return {
        ...state,
        isSignedIntoWallet: action.isSignedIntoWallet,
      };

    case 'NETWORK_UPDATE':
      return {
        ...state,
        currentNetwork: action.currentNetwork,
        prevNetwork: action.prevNetwork,
        prevPrevNetwork: action.prevPrevNetwork,
      };

    case 'LOGIN_UPDATE':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };

    case 'SIGNOUT_USERSTATE':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
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