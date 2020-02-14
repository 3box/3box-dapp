import Web3Connect from 'web3connect';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Portis from '@portis/web3';
import Fortmatic from 'fortmatic';
import Authereum from 'authereum';

import history from '../../../utils/history';
import connectProviderToDapp from './connectProviderToDapp';
import handleSignOutFunc from './handleSignOutFunc';
import {
  isBrowserCompatible,
} from '../../../utils/funcs';

const web3Connect = new Web3Connect.Core({
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: 'e87f83fb85bf4aa09bdf6605ebe144b7', // required
      },
    },
    portis: {
      package: Portis, // required
      options: {
        id: '8f5cf962-ad62-4861-ab0c-7b234b6e6cff', // required
      },
    },
    fortmatic: {
      package: Fortmatic, // required
      options: {
        key: 'pk_live_EC842EEAC7F08995', // required
      },
    },
    authereum: {
      package: Authereum, // required
      options: {},
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
    if (!isBrowserCompatible()) {
      reject();
    } else {
      web3Connect.connect();
      web3Connect.on('connect', async (provider) => {
        try {
          if (shouldSignOut) handleSignOutFunc();
          dispatch({
            type: 'SPACES_SIGN_OUT',
          });
          dispatch({
            type: 'MY_DATA_SIGNOUT',
          });
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
    }
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

  // web3Connect.toggleModal(); // open modal on button click

  try {
    await web3Promise;
  } catch (error) {
    console.error(error);
  }
};

export default pickWallet;