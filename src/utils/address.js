import {
  store,
} from '../state/store';

export let address =
  typeof window.web3 !== 'undefined' ? window.web3.eth.accounts[0] : ''; // eslint-disable-line no-undef

let prevAddress;

const pollNetworkAndAddress = () => {
  setTimeout(() => {
    const currentAddress = typeof window.web3 !== 'undefined' ? window.web3.eth.accounts[0] : ''; // eslint-disable-line no-undef

    // Logged out of MM while logged in to 3Box
    if (currentAddress !== address &&
      currentAddress === undefined &&
      store.getState().threeBox.isLoggedIn) {
      prevAddress = address;
      store.dispatch({
        type: 'HANDLE_LOGGEDOUT_MODAL',
        loggedOutModal: true,
      });
    }

    if (currentAddress !== address &&
      currentAddress === undefined &&
      store.getState().threeBox.isLoggedIn) {
      store.dispatch({
        type: 'HANDLE_LOGGEDOUT_MODAL',
        loggedOutModal: true,
      });
    }

    // Switched address
    if (currentAddress !== address &&
      typeof currentAddress === 'string' &&
      currentAddress !== prevAddress &&
      address !== undefined &&
      store.getState().threeBox.isLoggedIn) {
      prevAddress = address;
      store.dispatch({
        type: 'HANDLE_SWITCHED_ADDRESS_MODAL',
        switchedAddressModal: true,
        prevAddress,
      });
    }

    // Switched back to previous address
    if (currentAddress !== address &&
      typeof currentAddress === 'string' &&
      typeof address === 'string' &&
      store.getState().threeBox.isLoggedIn &&
      currentAddress === prevAddress
    ) {
      store.dispatch({
        type: 'HANDLE_SWITCHED_ADDRESS_MODAL',
        switchedAddressModal: false,
        prevAddress: '',
      });
    }

    // Logged in to MM
    if (currentAddress !== address &&
      typeof currentAddress === 'string' &&
      address === undefined &&
      !window.ethereum) {
      store.dispatch({
        type: 'HANDLE_WALLET_LOGIN_DETECTED_MODAL',
        isSignedIntoWallet: true,
        hasWallet: true,
      });
    }

    // Logged out of MM while not signed in to 3Box
    if (currentAddress !== address &&
      currentAddress === undefined) {
      store.dispatch({
        type: 'HANDLE_WALLET_LOGIN_DETECTED_MODAL',
        isSignedIntoWallet: false,
        hasWallet: false,
      });
    }

    address = currentAddress;
    pollNetworkAndAddress();
  }, 1000);
};

pollNetworkAndAddress();

export default address;