import Web3Connect from 'web3connect';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Portis from '@portis/web3';
import Fortmatic from 'fortmatic';
import Authereum from 'authereum';

import connectProviderToDapp from './connectProviderToDapp';

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

const useDefaultWallet = async (defaultWallet, directLogin, dispatch) => {
  let normalizedWallet;
  if (defaultWallet) normalizedWallet = defaultWallet.toLowerCase();
  let provider;
  switch (normalizedWallet) {
    case 'metamask':
      // provider = await web3Connect.ConnectToInjected();
      provider = await web3Connect.connectTo('injected');
      break;

    case 'dapper':
      // provider = await web3Connect.ConnectToInjected();
      provider = await web3Connect.connectTo('injected');
      break;

    case 'fortmatic':
      // provider = await web3Connect.ConnectToFortmatic(Fortmatic, {
      //   key: 'pk_live_EC842EEAC7F08995',
      //   network: 'mainnet',
      // });
      provider = await web3Connect.connectTo('fortmatic');
      break;

    case 'portis':
      // provider = await web3Connect.ConnectToPortis(Portis, {
      //   id: '8f5cf962-ad62-4861-ab0c-7b234b6e6cff',
      //   network: 'mainnet',
      // });
      provider = await web3Connect.connectTo('portis');
      break;

    case 'walletconnect':
      // provider = await web3Connect.ConnectToWalletConnect(WalletConnectProvider, {
      //   infuraId: 'e87f83fb85bf4aa09bdf6605ebe144b7', // required
      //   bridge: 'https://bridge.walletconnect.org', // optional
      // });
      provider = await web3Connect.connectTo('walletconnect');
      break;

    case 'authereum':
      // provider = await web3Connect.ConnectToAuthereum(Authereum, {
      //   network: 'mainnet', // optional
      // });
      provider = await web3Connect.connectTo('authereum');
      break;

    default:
      provider = await web3Connect.ConnectToInjected();
      break;
  }

  await connectProviderToDapp(provider, directLogin, dispatch);
};

export default useDefaultWallet;