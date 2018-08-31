/* ------------------------- External Dependencies -------------------------- */
import idx from './idx'
import { put, takeEvery } from 'redux-saga/effects';
import actions from './actions'
import ethers from 'ethers'
import { EthersBlockFlowIn } from 'logic/interface/DataScaffold'
import MetamaskSigner from './metamask.js'
// Initialize
const Wallet = ethers.Wallet;
const Contract = ethers.Contract;
const providers = ethers.providers;


const networkRouting = network => {
  switch(idx(network, _=>_.provider)) {
    case 'json':
      return window.ethereum.providers.json;
    case 'test':
      return window.ethereum.providers.test;
    case 'infura':
      return window.ethereum.providers.infura;
    case 'metamask':
      return new ethers.providers.Web3Provider(window.web3.currentProvider); // Use Mist/MetaMask's provider
    default:
      return providers.getDefaultProvider(network.chain) 
  }
}

// Network List
const networkList = {
  'homestead': providers.networks.homestead,
  'ropsten': providers.networks.ropsten,
  'rinkeby': providers.networks.rinkeby,
  'kovan': providers.networks.kovan,
}

// Global State
window.ethereum = {
  contracts: {},
  providers: {}
}
/* ------------------------- Internal Dependencies -------------------------- */

export function * walletGenerateRandom ({payload, metadata}) {
  try {
    const { extraEntropy } = metadata
    const walletRandom = Wallet.createRandom(extraEntropy);
    yield put(actions.walletGenerateRandom("SUCCESS")(
      walletRandom,
      metadata,
    ))
  } catch (err) {
    yield put(actions.walletGenerateRandom("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * walletGenerateJson ({payload, metadata}) {
  try {
    const { json, password } = payload
    yield Wallet.fromEncryptedWallet(json, password)
    yield put(actions.walletGenerateJson("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.walletGenerateJson("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * walletGenerateMenomonic ({payload, metadata}) {
  try {
    const mnemonic = payload
    const walletMnemonic = Wallet.fromMnemonic(mnemonic);
    yield put(actions.walletGenerateMenomonic("SUCCESS")(
      walletMnemonic,
      metadata,
    ))
  } catch (err) {
    yield put(actions.walletGenerateMenomonic("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * walletGenerateBrain ({payload, metadata}) {
  try {
    const { username, password } = payload
    const walletBrain = yield Wallet.fromBrainWallet(username, password)
    yield put(actions.walletGenerateBrain("SUCCESS")(
      walletBrain,
      metadata,
    ))
  } catch (err) {
    yield put(actions.walletGenerateBrain("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * walletAddress ({payload, metadata}) {
  try {

    yield put(actions.walletAddress("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.walletAddress("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * walletSign ({payload, metadata}) {
  try {

    yield put(actions.walletSign("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.walletSign("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * walletSignMessage ({payload, metadata}) {
  try {

    yield put(actions.walletSignMessage("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.walletSignMessage("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * walletEncrypt ({payload, metadata}) {
  try {

    yield put(actions.walletEncrypt("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.walletEncrypt("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}



export function * blockchainBlockNumber ({payload, metadata}) {
  try {
    const { network } = metadata
    const provider = networkRouting(network)
    const latestBlockNumber =  yield provider.getBlockNumber()
    yield put(actions.blockchainBlockNumber("SUCCESS")(
      latestBlockNumber,
      metadata,
    ))
  } catch (err) {
    yield put(actions.blockchainBlockNumber("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * blockchainGasPrice ({payload, metadata}) {
  try {
    const { network } = metadata
    const provider = networkRouting(network)
    const gasPrice = yield provider.getGasPrice()
    yield put(actions.blockchainGasPrice("SUCCESS")(
      gasPrice.toString(),
      metadata,
    ))
  } catch (err) {
    yield put(actions.blockchainGasPrice("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

export function * blockchainBlock ({payload, metadata}) {
  try {
    const { network } = metadata
    const blockNumber = payload
    const provider = networkRouting(network)
    const blockInfo = yield provider.getBlock(blockNumber)
    yield put(actions.blockchainBlock("SUCCESS")(
      EthersBlockFlowIn(blockInfo),
      metadata,
    ))
  } catch (err) {
    yield put(actions.blockchainBlock("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * blockchainTransaction ({payload, metadata}) {
  try {
    const { network } = metadata
    const provider = networkRouting(network)
    const transactionHash = payload
    const transaction = yield provider.getTransaction(transactionHash)
    yield put(actions.blockchainTransaction("SUCCESS")(
      transaction,
      metadata,
    ))
  } catch (err) {
    yield put(actions.blockchainTransaction("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * blockchainTransactionReceipt ({payload, metadata}) {
  try {

    yield put(actions.blockchainTransactionReceipt("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.blockchainTransactionReceipt("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}



export function * ensResolveName ({payload, metadata}) {
  try {
    const { network } = metadata
    const provider = networkRouting(network)
    const address = yield provider.resolveName(payload)
    yield put(actions.ensResolveName("SUCCESS")(
      address,
      metadata,
    ))
  } catch (err) {
    console.log(err)
    yield put(actions.ensResolveName("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * ensLookupAddress ({payload, metadata}) {
  try {

    yield put(actions.ensLookupAddress("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ensLookupAddress("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}



export function * providerEtherscan ({payload, metadata}) {
  try {

    yield put(actions.providerEtherscan("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.providerEtherscan("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * providerJsonRpc ({payload, metadata}) {
  try {
      const { url } = payload
      const { network } = metadata
      const networkSelection = networkList[network.chain]
      if(!networkSelection) throw new Error('Provider: invalid network selection')
      const provider = new providers.JsonRpcProvider(url, networkSelection);
      window.ethers = {
        ...window.ethers,
        json: provider
      }

    yield put(actions.providerJsonRpc("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    if(process.env.REACT_APP_GLOBAL_DEBUG) console.log(err)
    yield put(actions.providerJsonRpc("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
    
  }
}

 
export function * providerInfura ({payload, metadata}) {
  try {
    const { network } = payload
    const infuraProvider = new providers.InfuraProvider(network.chain || 'homestead');
    window.ethereum.providers.infura = infuraProvider
    yield put(actions.providerInfura("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    if(process.env.REACT_APP_GLOBAL_DEBUG) console.log(err)
    yield put(actions.providerInfura("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * providerFallback ({payload, metadata}) {
  try {

    yield put(actions.providerFallback("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    if(process.env.REACT_APP_GLOBAL_DEBUG) console.log(err)
    yield put(actions.providerFallback("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * providerDefault ({payload, metadata}) {
  try {

    yield put(actions.providerDefault("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    if(process.env.REACT_APP_GLOBAL_DEBUG) console.log(err)
    yield put(actions.providerDefault("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}



export function * accountBalance ({payload, metadata}) {
  try {
    const { network } = metadata
    const provider = networkRouting(network)
    const { address } = payload
    const balance = yield provider.getBalance(payload)
    const balanceFormatted = ethers.utils.formatEther(balance);
    yield put(actions.accountBalance("SUCCESS")(
      balanceFormatted,
      metadata,
    ))
  } catch (err) {
    yield put(actions.accountBalance("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * accountTransactionCount ({payload, metadata}) {
  try {
    const { network } = metadata
    const provider = networkRouting(network)
    const address = payload
    const transactionCount = yield provider.getTransactionCount(address)
    yield put(actions.accountTransactionCount("SUCCESS")(
      transactionCount,
      metadata,
    ))
  } catch (err) {
    if(process.env.REACT_APP_GLOBAL_DEBUG) console.log(err)
    yield put(actions.accountTransactionCount("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * contractCreate ({payload, metadata}) {
  try {
    const { network, delta } = metadata
    const {ethAddress, ethAbi, ethereumPrivateKey, contractName } = payload
    if (!contractName) throw new Error('Ethers: Contracts must be created with a name identifier.')
    // Initialize Provider
    const provider = networkRouting(network)
    // Create Contact
    let contract;
    if(ethereumPrivateKey) {
      const wallet = new Wallet(ethereumPrivateKey);
      wallet.provider = provider
      contract = new ethers.Contract(ethAddress, ethAbi, wallet);
    } else {
      contract = new ethers.Contract(ethAddress, ethAbi, provider);
    }

    window.ethereum.contracts[contractName] = contract
    yield put(actions.contractCreate("SUCCESS")(
      contract,
      metadata,
    ))
  } catch (err) {
    if(process.env.REACT_APP_GLOBAL_DEBUG) console.log(err)
    yield put(actions.contractCreate("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * contractCall ({payload, metadata}) {
  try {
    const { contractName, contractFunction, contractParams } = payload
    const contract = window.ethereum.contracts[contractName]
    if (!contract[contractFunction]) throw new Error("Ethers: Contracts function doesn't exist")
    const response = contractParams 
      ? yield contract[contractFunction](...contractParams) 
      : yield contract[contractFunction]()
    yield put(actions.contractCall("SUCCESS")(
      response,
      metadata,
    ))
  } catch (err) {
    if(process.env.REACT_APP_GLOBAL_DEBUG) console.log(err)
    yield put(actions.contractCall("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * contractEstimateGas ({payload, metadata}) {
  try {

    yield put(actions.contractEstimateGas("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.contractEstimateGas("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

 
export function * contractSendTransaction ({payload, metadata}) {
  try {

    yield put(actions.contractSendTransaction("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.contractSendTransaction("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

export function * contractDeploy ({payload, metadata}) {
  try {
    const { network } = metadata
    const { bytecode, abi, params } = payload
    const provider = networkRouting(network)
    const wallet = new MetamaskSigner(window.web3, provider);

    // Built for ERC20 Smart Contract
    // TODO (@kamescg) Generalize for all Ethereum Smart Contracts
    const deployTransaction = ethers.Contract.getDeployTransaction(
      bytecode, abi, // Smart Contract Metadata
      params.amount, params.name, params.decimals, params.symbol // Smart Contract Input Parameters
    );
    const transaction = yield wallet.sendTransaction(deployTransaction);
    yield put(actions.contractDeploy("SUCCESS")(
      transaction,
      metadata,
    ))
  } catch (err) {
    if(process.env.REACT_APP_GLOBAL_DEBUG) console.log(err)
    yield put(actions.contractDeploy("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

export function * transactionsBatchProcess({payload, metadata}) {
  try {
    const { 
      ethereumAddressList,
      ethereumGasPrice,
      ethereumGasLimit,
      ethereumTokenAmount
    } = payload

    var overrideOptions = {
        gasLimit: ethereumGasLimit || 250000,
        gasPrice: ethereumGasPrice || 9000000000,
    };
    const results = []
    const list = ethereumAddressList.split(",").filter(address=>isAddress(address))
    for (let i of list) {
      let result = yield window.ethereum.contracts.tokenContract.transfer(i, Number(ethereumTokenAmount), overrideOptions)
      results.push(result)
    }
  
    yield put(actions.transactionBatchProcess("SUCCESS")(
      results,
      metadata,
    ))
  } catch (err) {
    yield put(actions.transactionBatchProcess("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isAddress = function (address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        /* TODO: SHAD ADDRESS
          We should also SHA the addresses, but the sha_512 is not the correct one.
          And, I can't find the correct implmementation online. So if it fits, we ships! - @kamescg  */
        // return isChecksumAddress(address);
        return true
    }
};


export default function* ethersSaga() {
  yield [
    takeEvery(actions.WALLET_GENERATE_RANDOM.REQUEST, walletGenerateRandom),
    takeEvery(actions.WALLET_GENERATE_JSON.REQUEST, walletGenerateJson),
    takeEvery(actions.WALLET_GENERATE_MENOMONIC.REQUEST, walletGenerateMenomonic),
    takeEvery(actions.WALLET_GENERATE_BRAIN.REQUEST, walletGenerateBrain),
    takeEvery(actions.WALLET_ADDRESS.REQUEST, walletAddress),
    takeEvery(actions.WALLET_SIGN.REQUEST, walletSign),
    takeEvery(actions.WALLET_SIGNMESSAGE.REQUEST, walletSignMessage),
    takeEvery(actions.WALLET_ENCRYPT.REQUEST, walletEncrypt),

    takeEvery(actions.BLOCKCHAIN_BLOCK_NUMBER.REQUEST, blockchainBlockNumber),
    takeEvery(actions.BLOCKCHAIN_GAS_PRICE.REQUEST, blockchainGasPrice),
    takeEvery(actions.BLOCKCHAIN_BLOCK.REQUEST, blockchainBlock),
    takeEvery(actions.BLOCKCHAIN_TRANSACTION.REQUEST, blockchainTransaction),
    takeEvery(actions.BLOCKCHAIN_TRANSACTION_RECEIPT.REQUEST, blockchainTransactionReceipt),

    takeEvery(actions.ENS_RESOLVE_NAME.REQUEST, ensResolveName),
    takeEvery(actions.ENS_LOOKUPADDRESS.REQUEST, ensLookupAddress),

    takeEvery(actions.PROVIDER_ETHERSCAN.REQUEST, providerEtherscan),
    takeEvery(actions.PROVIDER_JSONRPC.REQUEST, providerJsonRpc),
    takeEvery(actions.PROVIDER_INFURA.REQUEST, providerInfura),
    takeEvery(actions.PROVIDER_FALLBACK.REQUEST, providerFallback),
    takeEvery(actions.PROVIDER_DEFAULT.REQUEST, providerDefault),

    takeEvery(actions.ACCOUNT_BALANCE.REQUEST, accountBalance),
    takeEvery(actions.ACCOUNT_TRANSACTIONCOUNT.REQUEST, accountTransactionCount),

    takeEvery(actions.CONTRACT_CREATE.REQUEST, contractCreate),
    takeEvery(actions.CONTRACT_CALL.REQUEST, contractCall),
    takeEvery(actions.CONTRACT_ESTIMATE_GAS.REQUEST, contractEstimateGas),
    takeEvery(actions.CONTRACT_SEND_TRANSACTION.REQUEST, contractSendTransaction),
    takeEvery(actions.CONTRACT_DEPLOY.REQUEST, contractDeploy),


    // ADDITIONAL 
    takeEvery(actions.TRANSACTION_BATCH_PROCESS.REQUEST, transactionsBatchProcess),
  ];
}