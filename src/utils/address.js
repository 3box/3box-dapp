import {
  store,
} from '../state/store';

export let address = typeof web3 !== 'undefined' ? web3.eth.accounts[0] : ''; // eslint-disable-line no-undef

const pollNetworkAndAddress = () => {
  setTimeout(() => {
    const currentAddress = typeof web3 !== 'undefined' ? web3.eth.accounts[0] : ''; // eslint-disable-line no-undef
    // Logged out
    if (currentAddress !== address && currentAddress === undefined && store.getState().threeBox.isLoggedIn) {
      store.dispatch({
        type: 'SHOW_LOGGEDOUT_MODAL',
        loggedOutModal: true,
      });
    }

    // Switched address
    if (currentAddress !== address && typeof currentAddress === 'string' && address !== undefined && store.getState().threeBox.isLoggedIn) {
      store.dispatch({
        type: 'SHOW_SWITCHED_ADDRESS_MODAL',
        switchedAddressModal: true,
        switched: true,
      });
    }

    // Logged in to MM
    // if (currentAddress !== address && typeof currentAddress === 'string' && address === undefined) {
    //   // window.location.reload();
    //   store.dispatch({
    //     type: 'HANDLE_WALLET_LOGIN_DETECTED_MODAL',
    //     loginDetectedModal: true,
    //   });
    //   // web3 login detected
    //   // show modal
    //   // reload page from modal
    // }

    address = currentAddress;
    pollNetworkAndAddress();
  }, 1000);
};

pollNetworkAndAddress();

export {
  address as
  default,
};
