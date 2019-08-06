import {
  store,
} from '../../store';

const checkNetworkFunc = async (web3Obj) => {
  let network;
  let networkName;
  try {
    if (web3Obj.version && web3Obj.version.getNetwork) {
      network = await web3Obj.version.getNetwork();
    } else if (web3Obj.eth.net && web3Obj.eth.net.getId) {
      network = await web3Obj.eth.net.getId();
    } else if (web3Obj.eth.net.getNetworkType) {
      network = await web3Obj.eth.net.getNetworkType();
      return network
    }
  } catch (error) {
    console.log('error', error);
  }

  switch (network) {
    case 1:
      networkName = 'Main';
      break;
    case 2:
      networkName = 'Morder';
      break;
    case 3:
      networkName = 'Ropsten';
      break;
    case 4:
      networkName = 'Rinkeby';
      break;
    case 42:
      networkName = 'Kovan';
      break;
    default:
      networkName = 'Unknown';
      break;
  };
  return networkName;
}

// if has web3 wallet
const checkNetwork = () => async (dispatch) => {
  const {
    web3Obj,
  } = store.getState().userState;

  let currentNetwork;
  const network = await checkNetworkFunc(web3Obj);
  currentNetwork = network;

  const prevPrevNetwork = window.localStorage.getItem('prevNetwork'); // eslint-disable-line no-undef
  const prevNetwork = window.localStorage.getItem('currentNetwork'); // eslint-disable-line no-undef
  const shouldShowSwitchNetwork = window.localStorage.getItem('shouldShowSwitchNetwork'); // eslint-disable-line no-undef
  window.localStorage.setItem('prevPrevNetwork', prevPrevNetwork); // eslint-disable-line no-undef
  window.localStorage.setItem('prevNetwork', prevNetwork); // eslint-disable-line no-undef
  window.localStorage.setItem('currentNetwork', currentNetwork); // eslint-disable-line no-undef

  if (prevNetwork && (prevNetwork !== currentNetwork) && store.getState().userState.isLoggedIn && shouldShowSwitchNetwork === 'true') {
    window.localStorage.setItem('shouldShowSwitchNetwork', false); // eslint-disable-line no-undef
    dispatch({
      type: 'USER_NETWORK_UPDATE',
      currentNetwork,
      prevNetwork,
      prevPrevNetwork,
    });
    dispatch({
      type: 'UI_HANDLE_DIFFERENT_NETWORK_MODAL',
      showDifferentNetworkModal: true,
      onBoardingModal: false,
      onBoardingModal2: false,
      isFetchingThreeBox: false,
    });
  } else {
    window.localStorage.setItem('shouldShowSwitchNetwork', true); // eslint-disable-line no-undef
    dispatch({
      type: 'USER_NETWORK_UPDATE',
      currentNetwork,
      prevNetwork,
      prevPrevNetwork,
    });
  }
};

export default checkNetwork;