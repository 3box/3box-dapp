import {
  store,
} from '../state/store';
import {
  accountsPromise,
} from '../state/actions';

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
  console.log('polling');
  setTimeout(() => {
    try {
      let prevAddress;

      const currentAddress =
        typeof window.web3 !== 'undefined' ?
        (typeof window.web3.eth !== 'undefined' ? window.web3.eth.accounts[0] : '') : ''; // eslint-disable-line no-undef

      // Logged out of MM while logged in to 3Box
      if (currentAddress !== address &&
        currentAddress === undefined &&
        store.getState().threeBox.isLoggedIn) {
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
        store.getState().threeBox.isLoggedIn) {
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
        (address !== undefined && address !== '') &&
        store.getState().threeBox.isLoggedIn) {
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
        store.getState().threeBox.isLoggedIn &&
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
          type: 'HANDLE_WALLET_LOGIN_DETECTED_MODAL',
          isSignedIntoWallet: true,
          hasWallet: true,
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
          type: 'HANDLE_WALLET_LOGIN_DETECTED_MODAL',
          isSignedIntoWallet: false,
          hasWallet: false,
        });
        store.dispatch({
          type: 'UPDATE_ADDRESS',
          currentAddress,
        });
        window.localStorage.setItem('userEthAddress', currentAddress);
      }

      address = currentAddress;
      pollNetworkAndAddress();
    } catch (err) {
      console.error(err);
    }
  }, 1000);
};