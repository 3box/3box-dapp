import {
  store,
} from '../../store';

const accountsPromise = new Promise((resolve, reject) => {
  try {
    const {
      web3Obj,
    } = store.getState().userState;

    if (web3Obj) {
      web3Obj.eth.getAccounts((e, accountsFound) => { // eslint-disable-line no-undef
        if (e != null) {
          reject(e);
        } else {
          resolve(accountsFound);
        }
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }
});

export default accountsPromise;