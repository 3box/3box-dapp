// ethjs wrap
import Eth from 'ethjs';

/* eslint-disable import/no-mutable-exports */
let web3 = null;
let accounts = [];
let waitForReceipt = null;
/* eslint-enable import/no-mutable-exports */

// follow https://github.com/ethereum/wiki/wiki/JavaScript-API
if (typeof window.web3 !== 'undefined') {
  // get ethjs object
  web3 = new Eth(window.web3.currentProvider);

  // get accounts
  web3.accounts().then((accs) => {
    accounts = accs;
  });

  // execute the given callback when the transaction is complete
  waitForReceipt = function func(hash, cb) {
    web3.getTransactionReceipt(hash).then((result) => {
      if (result !== null) {
        // Transaction went through
        if (cb) {
          cb(result);
        }
      } else {
        // Try again in 1 second
        window.setTimeout(() => {
          waitForReceipt(hash, cb);
        }, 1000);
      }
    }).catch((err) => {
      /* eslint-disable-next-line no-console */
      console.error(err);
    });
  };
} else {
  /* eslint-disable-next-line no-console */
  console.error('No web3? You should consider trying MetaMask!');
}

export {
  accounts,
  waitForReceipt,
  web3,
};
