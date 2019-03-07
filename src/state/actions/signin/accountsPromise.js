const accountsPromise = new Promise((resolve, reject) => {
  try {
    if (window.web3) {
      window.web3.eth.getAccounts((e, accountsFound) => { // eslint-disable-line no-undef
        if (e != null) {
          reject(e);
        } else {
          resolve(accountsFound);
        }
      });
    } else {
      console.error('You must have web3 to continue');
    }
  } catch (err) {
    console.error(err);
  }
});

export default accountsPromise;