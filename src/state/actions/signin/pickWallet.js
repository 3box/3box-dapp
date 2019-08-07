import Web3Connect from 'web3connect';

import history from '../../../utils/history';
import connectProviderToDapp from './connectProviderToDapp';
import handleSignOutFunc from './handleSignOutFunc';
import {
  isBrowserCompatible
} from '../../../utils/funcs';

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

const pickWallet = async (directLogin, dispatch, shouldSignOut) => {
  dispatch({
    type: 'USER_WEB3CONNECT',
    web3Connect,
  });
  dispatch({
    type: 'UI_FIX_BODY',
    fixBody: true,
  });

  const web3Promise = new Promise((resolve, reject) => {
    web3Connect.on('connect', async (provider) => {
      try {
        if (shouldSignOut) handleSignOutFunc();
        if(!isBrowserCompatible()) return;
        // if browser is safari less than 11, show error modal
        await connectProviderToDapp(provider, directLogin, dispatch);
        dispatch({
          type: 'UI_FIX_BODY',
          fixBody: false,
        });
        resolve();
      } catch (error) {
        dispatch({
          type: 'UI_FIX_BODY',
          fixBody: false,
        });
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
    if (keepOpen) {
      web3Connect.toggleModal(); // open modal on button click
    } else {
      dispatch({
        type: 'UI_FIX_BODY',
        fixBody: false,
      });
    }
  });

  web3Connect.toggleModal(); // open modal on button click

  try {
    await web3Promise;
  } catch (error) {
    console.log(error);
  }
};

export default pickWallet;