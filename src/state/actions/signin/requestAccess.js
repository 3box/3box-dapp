import Box from '3box';

import {
  store,
} from '../../store';
import * as routes from '../../../utils/routes';
import history from '../../../utils/history';
import accountsPromise from './accountsPromise';

// inject for breaking change
const requestAccess = directLogin => async (dispatch) => {
  let accounts = [];

  if (window.ethereum) { // eslint-disable-line no-undef
    try {
      window.web3 = new Web3(ethereum); // eslint-disable-line no-undef
      dispatch({
        type: 'HANDLE_ACCESS_MODAL',
        allowAccessModal: true,
        directLogin,
      });

      accounts = await window.ethereum.enable(); // eslint-disable-line no-undef
      accounts = !accounts ? await accountsPromise : accounts;
      window.localStorage.setItem('userEthAddress', accounts[0]);

      dispatch({
        type: 'UPDATE_ADDRESSES',
        isSignedIntoWallet: accounts && (accounts.length > 0 || store.getState().threeBox.currentWallet === 'isToshi'),
        isLoggedIn: accounts && Box.isLoggedIn(accounts[0]), // eslint-disable-line no-undef
        accountAddress: accounts[0],
        allowAccessModal: false,
        currentAddress: accounts[0],
      });
    } catch (error) {
      console.error(error);
      history.push(routes.LANDING);
      dispatch({
        type: 'HANDLE_DENIED_ACCESS_MODAL',
        accessDeniedModal: true,
        allowAccessModal: false,
        isSignedIntoWallet: accounts && (accounts.length > 0 || store.getState().threeBox.currentWallet === 'isToshi'),
      });
    }
  } else if (window.web3) { // eslint-disable-line no-undef
    window.web3 = new Web3(web3.currentProvider); // eslint-disable-line no-undef

    accounts = window.web3.eth.accounts; // eslint-disable-line no-undef
    window.localStorage.setItem('userEthAddress', accounts[0]);

    dispatch({
      type: 'UPDATE_ADDRESSES',
      isSignedIntoWallet: accounts && (accounts.length > 0 || store.getState().threeBox.currentWallet === 'isToshi'),
      isLoggedIn: accounts && Box.isLoggedIn(accounts[0]), // eslint-disable-line no-undef
      currentAddress: accounts[0],
    });
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
};

export default requestAccess;