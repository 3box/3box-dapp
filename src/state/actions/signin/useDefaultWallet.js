import Web3Connect from 'web3connect';

import connectProviderToDapp from './connectProviderToDapp';

const useDefaultWallet = async (defaultWallet, directLogin, dispatch) => {
  let provider;
  console.log('defaultWallet', defaultWallet);

  switch (defaultWallet) {
    case 'MetaMask':
      provider = await Web3Connect.ConnectToInjected();
      break;
    case 'Dapper':
      provider = await Web3Connect.ConnectToInjected();
      break;
    case 'Fortmatic':
      provider = await Web3Connect.ConnectToFortmatic({
        key: 'pk_live_EC842EEAC7F08995',
        network: 'mainnet',
      });
      break;
    case 'Portis':
      provider = await Web3Connect.ConnectToPortis({
        id: '8f5cf962-ad62-4861-ab0c-7b234b6e6cff',
        network: 'mainnet',
      });
      break;
    case 'WalletConnect':
      provider = await Web3Connect.ConnectToWalletConnect({
        bridge: 'https://bridge.walletconnect.org',
      });
      break;
    default:
      provider = await Web3Connect.ConnectToInjected();
      break;
  }

  await connectProviderToDapp(provider, directLogin, dispatch);
};

export default useDefaultWallet;