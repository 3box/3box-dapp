import Web3Connect from 'web3connect';

import history from '../../../utils/history';
import connectProviderToDapp from './connectProviderToDapp';
import handleSignOutFunc from './handleSignOutFunc';

const web3Connect = new Web3Connect.Core({
  providerOptions: {
    portis: {
      id: '8f5cf962-ad62-4861-ab0c-7b234b6e6cff', // required
      network: 'mainnet', // optional
    },
    fortmatic: {
      key: 'pk_live_EC842EEAC7F08995', // required
      network: 'mainnet', // optional
    },
  },
});

const pickWallet = async (directLogin, dispatch, shouldSignOut, showModalBG) => {
  dispatch({
    type: 'USER_WEB3CONNECT',
    web3Connect,
  });
  if (showModalBG) {
    dispatch({
      type: 'USER_WEB3CONNECT',
      web3Connect,
    });
  }
  const web3Promise = new Promise((resolve, reject) => {
    web3Connect.on('connect', async (provider) => {
      try {
        if (shouldSignOut) handleSignOutFunc();
        await connectProviderToDapp(provider, directLogin, dispatch);
        resolve();
      } catch (error) {
        reject();
      }
    });
  });

  // subscibe to close
  web3Connect.on('close', () => {
    const {
      pathname,
    } = history.location;
    const keepOpen = pathname === '/login';
    if (keepOpen) web3Connect.toggleModal(); // open modal on button click
  });

  web3Connect.toggleModal(); // open modal on button click

  try {
    await web3Promise;
  } catch (error) {
    console.log(error);
  }
};

export default pickWallet;