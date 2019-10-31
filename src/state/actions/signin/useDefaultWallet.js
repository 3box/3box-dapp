import Web3Connect from 'web3connect';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Portis from '@portis/web3';
import Fortmatic from 'fortmatic';
// import Squarelink from 'squarelink';
// import Torus from '@toruslabs/torus-embed';

import connectProviderToDapp from './connectProviderToDapp';

const useDefaultWallet = async (defaultWallet, directLogin, dispatch) => {
  let normalizedWallet;
  if (defaultWallet) normalizedWallet = defaultWallet.toLowerCase();
  let provider;
  switch (normalizedWallet) {
    case 'metamask':
      provider = await Web3Connect.ConnectToInjected();
      break;

    case 'dapper':
      provider = await Web3Connect.ConnectToInjected();
      break;

    case 'fortmatic':
      provider = await Web3Connect.ConnectToFortmatic(Fortmatic, {
        key: 'pk_live_EC842EEAC7F08995',
        network: 'mainnet',
      });
      break;

    case 'portis':
      provider = await Web3Connect.ConnectToPortis(Portis, {
        id: '8f5cf962-ad62-4861-ab0c-7b234b6e6cff',
        network: 'mainnet',
      });
      break;

    case 'walletconnect':
      provider = await Web3Connect.ConnectToWalletConnect(WalletConnectProvider, {
        infuraId: 'e87f83fb85bf4aa09bdf6605ebe144b7', // required
        bridge: 'https://bridge.walletconnect.org', // optional
      });
      break;

      // case 'squarelink':
      //   provider = await Web3Connect.ConnectToSquarelink(Squarelink, {
      //     id: 'b87ab196551e4363e352', // required
      //     network: 'mainnet', // optional
      //   });
      //   break;

      // case 'torus':
      //   provider = await Web3Connect.ConnectToTorus(Torus, {
      //     enableLogging: false, // optional
      //     buttonPosition: 'bottom-left', // optional
      //     buildEnv: 'production', // optional
      //     showTorusButton: true, // optional
      //   });
      //   break;

    default:
      provider = await Web3Connect.ConnectToInjected();
      break;
  }

  await connectProviderToDapp(provider, directLogin, dispatch);
};

export default useDefaultWallet;