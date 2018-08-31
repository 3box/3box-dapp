import ethers from 'ethers'
export default function MetamaskSigner(web3, provider) {
  this.provider = provider;

  this.getAddress = function() {
      return web3.eth.accounts[0];
  }
  
  Object.defineProperty(this, 'address', {
      get: function() {
          return web3.eth.accounts[0];
      }
  });
  
  this.sendTransaction = function(transaction) {
      var tx = {
          from: this.address
      };
      ['to', 'data'].forEach(function(key) {
          if (transaction[key] != null) {
              tx[key] = transaction[key];
          }
      });
      ['gasLimit', 'gasPrice', 'nonce', 'value'].forEach(function(key) {
          if (transaction[key] != null) {
              tx[key] = ethers.utils.hexlify(transaction[key]);
          }
      });
      return new Promise(function(resolve, reject) {
          var payload = {
              jsonrpc: "2.0",
              method: 'eth_sendTransaction',
              id: 1,
              params: [ tx ]
          };
          web3.currentProvider.sendAsync(payload, function(error, hash) {
              if (error) {
                  reject(error);
              } else {
                  tx.hash = hash;
                  resolve(tx);
              }
          });
      });
  }
}