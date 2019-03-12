import {
  store,
} from '../state/store';

import actions from '../state/actions';

const {
  accountsPromise,
} = actions.signin;

let address;

export const initialAddress = async () => {
  if (typeof window.web3 !== 'undefined') {
    if (window.web3.eth.accounts[0]) {
      [address] = window.web3.eth.accounts;
    } else {
      const returnedAddress = await accountsPromise;
      [address] = returnedAddress;
    }
  } else {
    address = null;
  }
  store.dispatch({
    type: 'UPDATE_ADDRESS',
    currentAddress: address,
  });
};

export const pollNetworkAndAddress = () => {
  setTimeout(() => {
    let prevAddress;
    const currentAddress = typeof window.web3 !== 'undefined' ? window.web3.eth.accounts[0] : ''; // eslint-disable-line no-undef

    // Logged out of MM while logged in to 3Box
    if (currentAddress !== address &&
      currentAddress === undefined &&
      store.getState().userState.isLoggedIn) {
      prevAddress = address;
      store.dispatch({
        type: 'HANDLE_LOGGEDOUT_MODAL',
        loggedOutModal: true,
      });
      store.dispatch({
        type: 'UPDATE_ADDRESS',
        currentAddress,
      });
      window.localStorage.setItem('userEthAddress', currentAddress);
    }

    // Logs out of 3Box
    if (currentAddress !== address &&
      currentAddress === undefined &&
      store.getState().userState.isLoggedIn) {
      store.dispatch({
        type: 'HANDLE_LOGGEDOUT_MODAL',
        loggedOutModal: true,
      });
      store.dispatch({
        type: 'UPDATE_ADDRESS',
        currentAddress,
      });
      window.localStorage.setItem('userEthAddress', currentAddress);
    }

    // Switched address
    if (currentAddress !== address &&
      typeof currentAddress === 'string' &&
      currentAddress !== prevAddress &&
      address !== undefined &&
      store.getState().userState.isLoggedIn) {
      prevAddress = address;
      store.dispatch({
        type: 'HANDLE_SWITCHED_ADDRESS_MODAL',
        switchedAddressModal: true,
        prevAddress,
      });
      store.dispatch({
        type: 'UPDATE_ADDRESS',
        currentAddress,
      });
      window.localStorage.setItem('userEthAddress', currentAddress);
    }

    // Switched back to previous address
    if (currentAddress !== address &&
      typeof currentAddress === 'string' &&
      typeof address === 'string' &&
      store.getState().userState.isLoggedIn &&
      currentAddress === prevAddress
    ) {
      store.dispatch({
        type: 'HANDLE_SWITCHED_ADDRESS_MODAL',
        switchedAddressModal: false,
        prevAddress: '',
      });
      store.dispatch({
        type: 'UPDATE_ADDRESS',
        currentAddress,
      });
      window.localStorage.setItem('userEthAddress', currentAddress);
    }

    // Logged in to MM
    if (currentAddress !== address &&
      typeof currentAddress === 'string' &&
      address === undefined &&
      !window.ethereum) {
      store.dispatch({
        type: 'WEB3_STATUS_UPDATE',
        hasWeb3: true,
      });
      store.dispatch({
        type: 'WALLET_LOGIN_UPDATE',
        isSignedIntoWallet: true,
      });
      store.dispatch({
        type: 'UPDATE_ADDRESS',
        currentAddress,
      });
      window.localStorage.setItem('userEthAddress', currentAddress);
    }

    // Logged out of MM while not signed in to 3Box
    if (currentAddress !== address &&
      currentAddress === undefined) {
      store.dispatch({
        type: 'WEB3_STATUS_UPDATE',
        hasWeb3: false,
      });
      store.dispatch({
        type: 'WALLET_LOGIN_UPDATE',
        isSignedIntoWallet: false,
      });
      store.dispatch({
        type: 'UPDATE_ADDRESS',
        currentAddress,
      });
      window.localStorage.setItem('userEthAddress', currentAddress);
    }

    address = currentAddress;
    pollNetworkAndAddress();
  }, 1000);
};