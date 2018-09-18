# Ethereum Claims Registry
The Ethereum Claims Registry is a contract that stores claims made by and to identities and contracts on the ethereum blockchain.

## Using the registry
The Claim Registry can be used from javascript as well as directly from other contracts.

### From javascript
To use the contract we provide truffle artifacts. Once you require the `uport-identity` module you will get an object containing a versioned index of the uport contracts. You can specify which version you want to user, or just use the latest one. Keep in mind that different versions will be deployed to different addresses.
```javascript
const EthereumClaimsRegistry = require('ethereum-claims-registry').registry
```

 You can use `truffle-contract` to utilize these artifacts.
```javascript
const Contract = require('truffle-contract')
let ClaimsReg = Contract(EthereumClaimsRegistry)
ClaimsReg.setProvider(web3.currentProvider)
let claimsReg = ClaimsReg.deployed()
```
You can also use web3.
```javascript
let networkId = 1 // Mainnet
let ClaimsReg = web3.eth.contract(EthereumClaimsRegistry.abi)
let claimsReg = ClaimsReg.at(EthereumClaimsRegistry.networks[networkId].address)
```

### From solidity
TODO - add documentation


## Contract Deployments
|Network|Address|
| --|--|
|Mainnet (id: 1)|[0xaca1bcd8d0f5a9bfc95aff331da4c250cd9ac2da](https://etherscan.io/address/0xaca1bcd8d0f5a9bfc95aff331da4c250cd9ac2da)|
|Ropsten (id: 3)|[0xaca1bcd8d0f5a9bfc95aff331da4c250cd9ac2da](https://ropsten.etherscan.io/address/0xaca1bcd8d0f5a9bfc95aff331da4c250cd9ac2da)|
|Rinkeby (id: 4)|[0xaca1bcd8d0f5a9bfc95aff331da4c250cd9ac2da](https://rinkeby.etherscan.io/address/0xaca1bcd8d0f5a9bfc95aff331da4c250cd9ac2da)|
|Kovan (id: 42)|[0xaca1bcd8d0f5a9bfc95aff331da4c250cd9ac2da](https://kovan.etherscan.io/address/0xaca1bcd8d0f5a9bfc95aff331da4c250cd9ac2da)|


## Testing the contracts

Make sure you have truffle installed then simply run:
```
$ truffle test
```

## Deploy contract
First run,
```
$ scripts/generateDeployTxs.js
```
you will get the data needed to deploy as an output from this command. Copy the `senderAddress` and send `cost` amount of ether to this address on the ethereum network you wish to deploy to. Once this tx is confirmed simply send the `rawTx` to the same network. `contractAddress` is the address of the deployed contract. This will be the same on all networks it is deployed to.
