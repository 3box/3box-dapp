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

export const pollNetworkAndAddress = () => {
  const poll = setTimeout(async () => {
    try {
      let prevAddress;
      let currentAddress;

      const hasWeb3 = typeof window.web3 !== 'undefined';
      const {
        isLoggedIn,
      } = store.getState().userState;

      if (hasWeb3) {
        let accounts = await window.web3.currentProvider.enable();
        accounts = !accounts ? await accountsPromise : accounts;
        [currentAddress] = accounts;
      } else {
        currentAddress = '';
      }

      const isSameAddr = currentAddress === address;
      const isAddrUndefined = currentAddress === undefined;
      const isAddrString = typeof currentAddress === 'string';

      // Logged out of MM while logged in to 3Box
      if (!isSameAddr && isAddrUndefined && isLoggedIn) {
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

      // Switched address while logged in
      if (
        !isSameAddr &&
        isAddrString &&
        currentAddress !== prevAddress &&
        address !== undefined &&
        address !== '' &&
        isLoggedIn
      ) {
        prevAddress = address;
        store.dispatch({
          type: 'UI_HANDLE_SWITCHED_ADDRESS_MODAL',
          switchedAddressModal: true,
          prevAddress,
        });
        store.dispatch({
          type: 'UPDATE_ADDRESS',
          currentAddress,
        });
        window.localStorage.setItem('userEthAddress', currentAddress);
      }

      // Switched back to previous address while logged in
      if (currentAddress !== address &&
        isAddrString &&
        typeof address === 'string' &&
        isLoggedIn &&
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

      // Logged in to MM so update address
      // if (currentAddress !== address &&
      //   isAddrString &&
      //   address === undefined &&
      //   (!window.ethereum || !window.web3)) {
      //   store.dispatch({
      //     type: 'UPDATE_ADDRESS',
      //     currentAddress,
      //   });
      //   window.localStorage.setItem('userEthAddress', currentAddress);
      // }

      // Logged out of MM while not signed in to 3Box
      // if (currentAddress !== address &&
      //   currentAddress === undefined) {
      //   store.dispatch({
      //     type: 'UPDATE_ADDRESS',
      //     currentAddress,
      //   });
      //   window.localStorage.setItem('userEthAddress', currentAddress);
      // }

      address = currentAddress;
      pollNetworkAndAddress();
    } catch (err) {
      console.error(err);
    }
  }, 1000);
  // store.dispatch({
  //   type: 'USER_HANDLE_POLLING',
  //   pollId: poll,
  // });
};