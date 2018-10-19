import {
  store,
} from '../state/store';

// import history from '../history';

export let address = typeof web3 !== 'undefined' ? web3.eth.accounts[0] : ''; // eslint-disable-line no-undef

setInterval(() => {
  const currentAddress = typeof web3 !== 'undefined' ? web3.eth.accounts[0] : ''; // eslint-disable-line no-undef

  // Logged out
  if (currentAddress !== address && currentAddress === undefined) {
    store.dispatch({
      type: 'SHOW_LOGGEDOUT_MODAL',
      loggedOutModal: true,
    });
  }

  // Switched address
  if (currentAddress !== address && typeof currentAddress === 'string' && address !== undefined) {
    store.dispatch({
      type: 'SHOW_SWITCHED_ADDRESS_MODAL',
      switchedAddressModal: true,
      switched: true,
    });
  }

  // Logged in to MM
  if (currentAddress !== address && typeof currentAddress === 'string' && address === undefined) {
    window.location.reload();
  }
  address = currentAddress;
}, 1000);

export {
  address as
  default,
};