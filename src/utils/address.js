import {
  store,
} from '../state/store';

export let address = typeof web3 !== 'undefined' ? web3.eth.accounts[0] : ''; // eslint-disable-line no-undef

const checkAddress = setInterval(() => {
  const currentAddress = web3.eth.accounts[0]; // eslint-disable-line no-undef
  if (currentAddress !== address && currentAddress === undefined) {
    clearInterval(checkAddress);
    window.location.reload();
    store.dispatch({
      type: 'SHOW_LOGGEDOUT_MODAL',
      loggedOutModal: true,
    });
  }

  if (currentAddress !== address && typeof currentAddress === 'string' && address !== undefined) {
    clearInterval(checkAddress);
    window.location.reload();
    store.dispatch({
      type: 'SHOW_SWITCHED_NETWORK_MODAL',
      switchedNetworkModal: true,
    });
  }

  if (currentAddress !== address && typeof currentAddress === 'string' && address === undefined) {
    clearInterval(checkAddress);
    window.location.reload();
  }
}, 1000);

export {
  address as
  default,
};


// import history from '../history';

// const checkAddress = setInterval(() => {
//   if (web3.eth.accounts[0] !== address) { // eslint-disable-line no-undef
//     clearInterval(checkAddress);
//     window.location.reload();
//     history.push({
//       pathname: '/',
//     });
//     console.log('logged out');
//   }
//   console.log(web3.eth.accounts[0]); // eslint-disable-line no-undef
// }, 1000);