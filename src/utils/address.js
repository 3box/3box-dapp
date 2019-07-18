import {
  store,
} from '../state/store';

import actions from '../state/actions';

const {
  accountsPromise,
} = actions.signin;

let address;

export const initialAddress = async () => {
  store.dispatch({
    type: 'USER_UPDATE_ADDRESS',
    currentAddress: window.localStorage.getItem('userEthAddress'),
  });
};

export const startPollFlag = async () => {
  store.dispatch({
    type: 'USER_HANDLE_POLLING',
    shouldPoll: true,
  });
};

export const pollNetworkAndAddress = () => {
  setTimeout(async () => {
    try {
      // let prevAddress;

      const {
        // isLoggedIn,
        shouldPoll,
        currentAddress,
        usingInjectedAddress,
      } = store.getState().userState;
      const {
        switchedAddressModal,
      } = store.getState().uiState;

      // const isSameAddr = currentAddress === address;
      // const isAddrString = typeof currentAddress === 'string';
      const isAddrUndefined = currentAddress === undefined;
      // Logged out of MM while logged in to 3Box
      // if (!isSameAddr && isAddrUndefined && isLoggedIn) {
      //   prevAddress = address;
      //   store.dispatch({
      //     type: 'HANDLE_LOGGEDOUT_MODAL',
      //     loggedOutModal: true,
      //   });
      // }
      const hasWeb3 = window.web3 !== 'undefined';
      let injectedAddress;
      if (hasWeb3) {
        let injectedAccounts = await window.web3.currentProvider.enable();
        injectedAccounts = !injectedAccounts ? await accountsPromise : injectedAccounts;
        [injectedAddress] = injectedAccounts;
      }

      if (
        usingInjectedAddress &&
        injectedAddress &&
        injectedAddress !== currentAddress &&
        !isAddrUndefined
      ) {
        store.dispatch({
          type: 'UI_HANDLE_SWITCHED_ADDRESS_MODAL',
          switchedAddressModal: true,
        });
      }

      if (switchedAddressModal && injectedAddress && injectedAddress === currentAddress) {
        store.dispatch({
          type: 'UI_HANDLE_SWITCHED_ADDRESS_MODAL',
          switchedAddressModal: false,
        });
      }

      // Switched address while logged in
      // if (
      //   !isSameAddr &&
      //   isAddrString &&
      //   currentAddress !== prevAddress &&
      //   address !== undefined &&
      //   address !== '' &&
      //   isLoggedIn
      // ) {
      //   prevAddress = address;
      //   store.dispatch({
      //     type: 'UI_HANDLE_SWITCHED_ADDRESS_MODAL',
      //     switchedAddressModal: true,
      //     prevAddress,
      //   });
      // }

      // Switched back to previous address while logged in
      // if (currentAddress !== address &&
      //   isAddrString &&
      //   typeof address === 'string' &&
      //   isLoggedIn &&
      //   currentAddress === prevAddress
      // ) {
      //   store.dispatch({
      //     type: 'UI_HANDLE_SWITCHED_ADDRESS_MODAL',
      //     switchedAddressModal: false,
      //     prevAddress: '',
      //   });
      // }

      address = currentAddress;
      if (shouldPoll) {
        pollNetworkAndAddress();
      } else {
        address = undefined;
      }
    } catch (err) {
      console.error(err);
    }
  }, 1000);
};