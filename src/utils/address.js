import Box from '3box';

import {
  store,
} from '../state/store';

import actions from '../state/actions';

const {
  accountsPromise,
} = actions.signin;

export const initialAddress = async () => {
  const rawAddress = window.localStorage.getItem('userEthAddress');
  const currentAddress = rawAddress && rawAddress.toLowerCase();
  store.dispatch({
    type: 'USER_UPDATE_ADDRESS',
    currentAddress,
  });

  if (currentAddress) {
    const myPublicProfile = await Box.getProfile(currentAddress);
    store.dispatch({
      type: 'MY_NAME_UPDATE',
      name: myPublicProfile.name,
    });
    store.dispatch({
      type: 'MY_IMAGE_UPDATE',
      image: myPublicProfile.image,
    });
  }
  return currentAddress;
};

export const startPollFlag = async () => {
  store.dispatch({
    type: 'USER_HANDLE_POLLING',
    shouldPoll: true,
  });
};

export const pollNetworkAndAddress = () => {
  let getInjectedAddressFlag = false;
  setTimeout(async () => {
    try {
      const {
        shouldPoll,
        currentAddress,
        usingInjectedAddress,
      } = store.getState().userState;
      const {
        switchedAddressModal,
      } = store.getState().uiState;

      const isAddrUndefined = currentAddress === undefined;
      const hasWeb3 = window.web3 !== 'undefined';

      let injectedAddress;
      if (hasWeb3 && usingInjectedAddress && !getInjectedAddressFlag) {
        let injectedAccounts = await window.web3.currentProvider.enable();
        injectedAccounts = !injectedAccounts ? await accountsPromise : injectedAccounts;
        [injectedAddress] = injectedAccounts;
        getInjectedAddressFlag = true;
      }

      if (
        usingInjectedAddress &&
        injectedAddress &&
        injectedAddress !== currentAddress &&
        !isAddrUndefined &&
        !switchedAddressModal
      ) {
        store.dispatch({
          type: 'UI_HANDLE_SWITCHED_ADDRESS_MODAL',
          switchedAddressModal: true,
        });
      }

      // Logged out of injected provider while logged in to 3Box
      if (usingInjectedAddress && !hasWeb3) {
        store.dispatch({
          type: 'HANDLE_LOGGEDOUT_MODAL',
          loggedOutModal: true,
        });
      }

      if (switchedAddressModal && injectedAddress && injectedAddress === currentAddress) {
        store.dispatch({
          type: 'UI_HANDLE_SWITCHED_ADDRESS_MODAL',
          switchedAddressModal: false,
        });
      }

      if (shouldPoll) pollNetworkAndAddress();
    } catch (err) {
      console.error(err);
    }
  }, 1000);
};