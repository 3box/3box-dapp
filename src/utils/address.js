import {
  store,
} from '../state/store';

export let address = typeof window.web3 !== 'undefined' ? window.web3.eth.accounts[0] : ''; // eslint-disable-line no-undef

const pollNetworkAndAddress = () => {
  setTimeout(() => {
    const currentAddress = typeof window.web3 !== 'undefined' ? window.web3.eth.accounts[0] : ''; // eslint-disable-line no-undef
    // Logged out
    if (currentAddress !== address && currentAddress === undefined && store.getState().threeBox.isLoggedIn) {
      store.dispatch({
        type: 'HANDLE_LOGGEDOUT_MODAL',
        loggedOutModal: true,
      });
    }

    // Switched address
    if (currentAddress !== address && typeof currentAddress === 'string' && address !== undefined && store.getState().threeBox.isLoggedIn) {
      store.dispatch({
        type: 'HANDLE_SWITCHED_ADDRESS_MODAL',
        switchedAddressModal: true,
        switched: true,
      });
    }

    // Logged in to MM
    if (currentAddress !== address && typeof currentAddress === 'string' && address === undefined) {
      store.dispatch({
        type: 'HANDLE_WALLET_LOGIN_DETECTED_MODAL',
        isSignedIntoWallet: true,
        hasWallet: true,
      });
    }

    // Logged out of MM
    if (currentAddress !== address && typeof address === 'string' && currentAddress === undefined) {
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

export {
  address as
  default,
};
