import Web3Connect from 'web3connect';

import connectProviderToDapp from './connectProviderToDapp';

const useDefaultWallet = async (defaultWallet, directLogin, dispatch) => {
  let provider;
  let normalizedWallet;
  if (defaultWallet) normalizedWallet = defaultWallet.toLowerCase();

  switch (normalizedWallet) {
    case 'metamask':
      provider = await Web3Connect.ConnectToInjected();
      break;
    case 'dapper':
      provider = await Web3Connect.ConnectToInjected();
      break;
    case 'fortmatic':
      provider = await Web3Connect.ConnectToFortmatic({
        key: 'pk_live_EC842EEAC7F08995',
        network: 'mainnet',
      });
      break;
    case 'portis':
      provider = await Web3Connect.ConnectToPortis({
        id: '8f5cf962-ad62-4861-ab0c-7b234b6e6cff',
        network: 'mainnet',
      });
      break;
    case 'walletconnect':
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