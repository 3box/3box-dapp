const userStateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'INITIAL_USER_CHECK_WEB3':
      return {
        ...state,
        currentWallet: action.currentWallet,
      };

    case 'USER_CHECK_WEB3':
      return {
        ...state,
        currentWallet: action.currentWallet,
      };

    case 'USER_UPDATE_WEB3':
      return {
        ...state,
        web3Obj: action.web3Obj,
          currentWallet: action.currentWallet,
      };

    case 'USER_ADDRESSES_UPDATE':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
          currentAddress: action.currentAddress,
          usingInjectedAddress: action.usingInjectedAddress,
      };

    case 'USER_WEB3_STATUS_UPDATE':
      return {
        ...state,
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
          shouldPoll: action.shouldPoll,
          web3Obj: action.web3Obj,
          usingInjectedAddress: action.usingInjectedAddress,
          currentAddress: action.currentAddress,
      };

    case 'USER_UPDATE_ADDRESS':
      return {
        ...state,
        currentAddress: action.currentAddress,
      };

    case 'USER_HANDLE_POLLING':
      return {
        ...state,
        shouldPoll: action.shouldPoll,
      };

    default:
      return state;
  }
};

export default userStateReducer;