import Web3Connect from 'web3connect';
// import Box from '3box';

import * as routes from '../../../utils/routes';
import accountsPromise from './accountsPromise';
import history from '../../../utils/history';
import { checkUsingInjectedProvider } from '../../../utils/funcs';

const connectProviderToDapp = async (provider, directLogin, dispatch) => {
  try {
    // save wallet name to local storage
    const {
      getProviderInfo,
    } = Web3Connect;
    const {
      name,
      logo
    } = getProviderInfo(provider);
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
    // accounts = !accounts ? await accountsPromise : accounts;
    window.localStorage.setItem('userEthAddress', accounts[0]);

    const usingInjectedAddress = checkUsingInjectedProvider(provider);
    dispatch({
      type: 'USER_ADDRESSES_UPDATE',
      currentAddress: accounts[0],
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