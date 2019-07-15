import {
  store,
} from '../state/store';

import actions from '../state/actions';

const {
  accountsPromise,
} = actions.signin;

let address;

export const initialAddress = async () => {
  try {
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

    const currentAddress = address || window.localStorage.getItem('userEthAddress');

    store.dispatch({
      type: 'USER_UPDATE_ADDRESS',
      currentAddress,
    });
  } catch (err) {
    console.error(err);
  }
};

export const pollNetworkAndAddress = () => {
  setTimeout(async () => {
    try {
      let prevAddress;
      let currentAddress;
      const hasWeb3 = typeof window.web3 !== 'undefined';

      if (hasWeb3) {
        let accounts = await window.web3.currentProvider.enable();
        accounts = !accounts ? await accountsPromise : accounts;
        [currentAddress] = accounts;
      } else {
        currentAddress = '';
      }

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
      // if (currentAddress !== address &&
      //   typeof currentAddress === 'string' &&
      //   currentAddress !== prevAddress &&
      //   (address !== undefined && address !== '') &&
      //   store.getState().userState.isLoggedIn) {
      //   prevAddress = address;
      //   store.dispatch({
      //     type: 'UI_HANDLE_SWITCHED_ADDRESS_MODAL',
      //     switchedAddressModal: true,
      //     prevAddress,
      //   });
      //   store.dispatch({
      //     type: 'UPDATE_ADDRESS',
      //     currentAddress,
      //   });
      //   window.localStorage.setItem('userEthAddress', currentAddress);
      // }

      // Switched back to previous address
      if (currentAddress !== address &&
        typeof currentAddress === 'string' &&
        typeof address === 'string' &&
        store.getState().userState.isLoggedIn &&
        currentAddress === prevAddress
      ) {
        store.dispatch({
          type: 'UI_HANDLE_SWITCHED_ADDRESS_MODAL',
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
        (!window.ethereum || !window.web3)) {
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