import Web3Connect from 'web3connect';
import Web3 from 'web3';

import * as routes from '../../../utils/routes';
import accountsPromise from './accountsPromise';
import history from '../../../utils/history';
import {
  checkUsingInjectedProvider,
} from '../../../utils/funcs';

const connectProviderToDapp = async (provider, directLogin, dispatch) => {
  try {
    // save wallet name to local storage
    const {
      name,
      logo,
    } = Web3Connect.getProviderInfo(provider);
    if (name.toLowerCase() === 'walletconnect') window.localStorage.removeItem('walletconnect');
    window.localStorage.setItem('defaultWallet', name); // eslint-disable-line no-undef

    // create web3 object and save to redux store
    const web3Obj = new Web3(provider); // eslint-disable-line no-undef
    dispatch({
      type: 'USER_UPDATE_WEB3',
      web3Obj,
      currentWallet: name,
      currentWalletLogo: logo,
    });

    // begin process to get eth addresses
    dispatch({
      type: 'UI_HANDLE_ACCESS_MODAL',
      allowAccessModal: true,
      directLogin,
    });
    let accounts = [];
    accounts = web3Obj.currentProvider ?
      await web3Obj.currentProvider.enable() :
      await accountsPromise;

    const currentAddress = provider.isAuthereum ? accounts.account.accountAddress : accounts[0];
    window.localStorage.setItem('userEthAddress', currentAddress);

    const usingInjectedAddress = checkUsingInjectedProvider(provider);
    dispatch({
      type: 'USER_ADDRESSES_UPDATE',
      currentAddress,
      usingInjectedAddress,
    });

    // close process modals
    dispatch({
      type: 'UI_HANDLE_ACCESS_MODAL',
      allowAccessModal: false,
      directLogin,
    });
  } catch (error) {
    console.error('Error connecting web3 provider to dapp', error);
    history.push(routes.LANDING);
    dispatch({
      type: 'UI_HANDLE_DENIED_ACCESS_MODAL',
      accessDeniedModal: true,
      allowAccessModal: false,
    });
  }
};

export default connectProviderToDapp;