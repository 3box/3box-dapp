import {
  store,
} from '../state/store';

const webThree = store.getState().threeBox.webThree;
export let address = webThree ? webThree.eth.accounts[0] : ''; // eslint-disable-line no-undef

setInterval(() => {
  const currentAddress = webThree ? webThree.eth.accounts[0] : ''; // eslint-disable-line no-undef
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

  // let MMdetectAddress = null;
  // window.web3.currentProvider.publicConfigStore.on('update', (obj) => {
  //   console.log('network change detected', obj);
  //   if (!MMdetectAddress && obj.selectedAddress) {
  //     console.log('user just signed in');
  //   }
  //   MMdetectAddress = obj.selectedAddress;
  // });

  address = currentAddress;
}, 1500);

export {
  address as
  default,
};