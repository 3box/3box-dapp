import Web3Connect from 'web3connect';
import Box from '3box';

import * as routes from '../../../utils/routes';
import accountsPromise from './accountsPromise';
import history from '../../../utils/history';

const connectProviderToDapp = async (provider, directLogin, dispatch) => {
  try {
    const {
      getProviderInfo,
    } = Web3Connect;
    const {
      name,
    } = getProviderInfo(provider);

    const prevWeb3Provider = window.localStorage.getItem('web3Provider'); // eslint-disable-line no-undef
    window.localStorage.setItem('web3Provider', name); // eslint-disable-line no-undef
    if (prevWeb3Provider !== name) {
      window.localStorage.setItem('userEthAddress', undefined);
    }

    const web3Obj = new Web3(provider); // eslint-disable-line no-undef
    dispatch({
      type: 'USER_UPDATE_WEB3',
      web3Obj,
      currentWallet: name,
    });

    dispatch({
      type: 'UI_HANDLE_ACCESS_MODAL',
      allowAccessModal: true,
      directLogin,
    });
    let accounts = [];
    accounts = await web3Obj.currentProvider.enable(); // eslint-disable-line no-undef
    accounts = !accounts ? await accountsPromise : accounts;
    window.localStorage.setItem('userEthAddress', accounts[0]);

    const hasWeb3 = window.web3 !== 'undefined';
    let injectedAddress;
    if (hasWeb3) {
      let injectedAccounts = await window.web3.currentProvider.enable();
      injectedAccounts = !injectedAccounts ? await accountsPromise : injectedAccounts;
      [injectedAddress] = injectedAccounts;
    }

    dispatch({
      type: 'USER_ADDRESSES_UPDATE',
      isLoggedIn: accounts && Box.isLoggedIn(accounts[0]), // eslint-disable-line no-undef
      accountAddress: accounts[0],
      currentAddress: accounts[0],
      usingInjectedAddress: injectedAddress === accounts[0],
    });
    dispatch({
      type: 'UI_HANDLE_ACCESS_MODAL',
      allowAccessModal: false,
      directLogin,
    });

    if (directLogin) {
      dispatch({
        type: 'UI_HANDLE_PICK_PROVIDER_SCREEN',
        showPickProviderScreen: false,
      });
    }

    // resolve();
  } catch (error) {
    console.error('connectProviderToDappError', error);
    history.push(routes.LANDING);
    dispatch({
      type: 'UI_HANDLE_DENIED_ACCESS_MODAL',
      accessDeniedModal: true,
      allowAccessModal: false,
    });
    if (directLogin) {
      dispatch({
        type: 'UI_HANDLE_PICK_PROVIDER_SCREEN',
        showPickProviderScreen: false,
      });
    }
    // reject();
  }
};

export default connectProviderToDapp;