import {
  store,
} from '../../store';

// if has web3 wallet
const checkInitialAddr = () => async (dispatch) => {
  const myDefaultAddr = window.localStorage.getItem('userEthAddress');

  return myDefaultAddr;
};

export default checkInitialAddr;