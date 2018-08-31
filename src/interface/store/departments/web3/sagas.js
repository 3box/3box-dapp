import { put, takeEvery } from 'redux-saga/effects';
import actions from './actions'
import web3 from 'web3'

export function * web3SetProvider ({payload, metadata}) {
  try {

    yield put(actions.web3SetProvider("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.web3SetProvider("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}



export function * ethSetProvider ({payload, metadata}) {
  try {

    yield put(actions.ethSetProvider("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethSetProvider("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetProtocolVersion ({payload, metadata}) {
  try {

    yield put(actions.ethGetProtocolVersion("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetProtocolVersion("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethIsSyncing ({payload, metadata}) {
  try {

    yield put(actions.ethIsSyncing("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethIsSyncing("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetCoinbase ({payload, metadata}) {
  try {

    yield put(actions.ethGetCoinbase("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetCoinbase("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethIsMining ({payload, metadata}) {
  try {

    yield put(actions.ethIsMining("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethIsMining("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetHashrate ({payload, metadata}) {
  try {

    yield put(actions.ethGetHashrate("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetHashrate("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetGasPrice ({payload, metadata}) {
  try {

    yield put(actions.ethGetGasPrice("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetGasPrice("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetAccounts ({payload, metadata}) {
  try {

    yield put(actions.ethGetAccounts("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetAccounts("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetBlockNumber ({payload, metadata}) {
  try {

    yield put(actions.ethGetBlockNumber("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetBlockNumber("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetBalance ({payload, metadata}) {
  try {

    yield put(actions.ethGetBalance("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetBalance("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetStorageAt ({payload, metadata}) {
  try {

    yield put(actions.ethGetStorageAt("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetStorageAt("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetCode ({payload, metadata}) {
  try {

    yield put(actions.ethGetCode("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetCode("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetBlock ({payload, metadata}) {
  try {

    yield put(actions.ethGetBlock("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetBlock("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetBlockTransactionCount ({payload, metadata}) {
  try {

    yield put(actions.ethGetBlockTransactionCount("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetBlockTransactionCount("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetUncle ({payload, metadata}) {
  try {

    yield put(actions.ethGetUncle("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetUncle("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetTransaction ({payload, metadata}) {
  try {

    yield put(actions.ethGetTransaction("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetTransaction("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetTransactionFromBlock ({payload, metadata}) {
  try {

    yield put(actions.ethGetTransactionFromBlock("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetTransactionFromBlock("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetTransactionReceipt ({payload, metadata}) {
  try {

    yield put(actions.ethGetTransactionReceipt("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetTransactionReceipt("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetTransactionCount ({payload, metadata}) {
  try {

    yield put(actions.ethGetTransactionCount("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetTransactionCount("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethSendTransaction ({payload, metadata}) {
  try {

    yield put(actions.ethSendTransaction("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethSendTransaction("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethSendSignedTransaction ({payload, metadata}) {
  try {

    yield put(actions.ethSendSignedTransaction("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethSendSignedTransaction("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethSign ({payload, metadata}) {
  try {

    yield put(actions.ethSign("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethSign("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethSignTransaction ({payload, metadata}) {
  try {

    yield put(actions.ethSignTransaction("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethSignTransaction("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethEstimateGas ({payload, metadata}) {
  try {

    yield put(actions.ethEstimateGas("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethEstimateGas("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetPastLogs ({payload, metadata}) {
  try {

    yield put(actions.ethGetPastLogs("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetPastLogs("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetCompilers ({payload, metadata}) {
  try {

    yield put(actions.ethGetCompilers("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetCompilers("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethGetWork ({payload, metadata}) {
  try {

    yield put(actions.ethGetWork("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethGetWork("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethSubmitWork ({payload, metadata}) {
  try {

    yield put(actions.ethSubmitWork("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethSubmitWork("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethSubscribe ({payload, metadata}) {
  try {

    yield put(actions.ethSubscribe("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethSubscribe("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethClearSubscriptions ({payload, metadata}) {
  try {

    yield put(actions.ethClearSubscriptions("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethClearSubscriptions("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}



export function * ethContractCreate ({payload, metadata}) {
  try {

    yield put(actions.ethContractCreate("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethContractCreate("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethContractClone ({payload, metadata}) {
  try {

    yield put(actions.ethContractClone("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethContractClone("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethContractDeploy ({payload, metadata}) {
  try {

    yield put(actions.ethContractDeploy("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethContractDeploy("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethContractCall ({payload, metadata}) {
  try {

    yield put(actions.ethContractCall("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethContractCall("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethContractSend ({payload, metadata}) {
  try {

    yield put(actions.ethContractSend("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethContractSend("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethContractEstimateGas ({payload, metadata}) {
  try {

    yield put(actions.ethContractEstimateGas("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethContractEstimateGas("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethContractEncodeAbi ({payload, metadata}) {
  try {

    yield put(actions.ethContractEncodeAbi("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethContractEncodeAbi("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethContractGetPastEvents ({payload, metadata}) {
  try {

    yield put(actions.ethContractGetPastEvents("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethContractGetPastEvents("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}



export function * ethAccountsCreate ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsCreate("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsCreate("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsPrivateKeyToAccount ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsPrivateKeyToAccount("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsPrivateKeyToAccount("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsSignTransaction ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsSignTransaction("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsSignTransaction("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsRecoverTransaction ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsRecoverTransaction("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsRecoverTransaction("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsHashMessage ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsHashMessage("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsHashMessage("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsSign ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsSign("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsSign("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsRecover ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsRecover("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsRecover("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsEncrypt ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsEncrypt("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsEncrypt("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsDecrypt ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsDecrypt("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsDecrypt("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsWallet ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsWallet("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsWallet("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsWalletCreate ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsWalletCreate("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsWalletCreate("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsWalletAdd ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsWalletAdd("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsWalletAdd("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsWalletRemove ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsWalletRemove("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsWalletRemove("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsWalletClear ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsWalletClear("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsWalletClear("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsWalletEncrypt ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsWalletEncrypt("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsWalletEncrypt("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsWalletDecrypt ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsWalletDecrypt("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsWalletDecrypt("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsWalletSave ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsWalletSave("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsWalletSave("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAccountsWalletLoad ({payload, metadata}) {
  try {

    yield put(actions.ethAccountsWalletLoad("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAccountsWalletLoad("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}



export function * ethPersonalSetProvider ({payload, metadata}) {
  try {

    yield put(actions.ethPersonalSetProvider("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethPersonalSetProvider("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethPersonalProviders ({payload, metadata}) {
  try {

    yield put(actions.ethPersonalProviders("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethPersonalProviders("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethPersonalGivenProvider ({payload, metadata}) {
  try {

    yield put(actions.ethPersonalGivenProvider("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethPersonalGivenProvider("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethPersonalCurrentProvider ({payload, metadata}) {
  try {

    yield put(actions.ethPersonalCurrentProvider("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethPersonalCurrentProvider("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethPersonalNewAccount ({payload, metadata}) {
  try {

    yield put(actions.ethPersonalNewAccount("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethPersonalNewAccount("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethPersonalSign ({payload, metadata}) {
  try {

    yield put(actions.ethPersonalSign("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethPersonalSign("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethPersonalEcRecover ({payload, metadata}) {
  try {

    yield put(actions.ethPersonalEcRecover("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethPersonalEcRecover("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethPersonalSignTransaction ({payload, metadata}) {
  try {

    yield put(actions.ethPersonalSignTransaction("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethPersonalSignTransaction("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}



export function * ethIbanCreate ({payload, metadata}) {
  try {

    yield put(actions.ethIbanCreate("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethIbanCreate("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethIbanToAddress ({payload, metadata}) {
  try {

    yield put(actions.ethIbanToAddress("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethIbanToAddress("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethIbanToIban ({payload, metadata}) {
  try {

    yield put(actions.ethIbanToIban("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethIbanToIban("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethIbanFromEthereumAddress ({payload, metadata}) {
  try {

    yield put(actions.ethIbanFromEthereumAddress("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethIbanFromEthereumAddress("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethIbanFromIban ({payload, metadata}) {
  try {

    yield put(actions.ethIbanFromIban("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethIbanFromIban("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethIbanCreateIndirect ({payload, metadata}) {
  try {

    yield put(actions.ethIbanCreateIndirect("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethIbanCreateIndirect("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethIbanIsValid ({payload, metadata}) {
  try {

    yield put(actions.ethIbanIsValid("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethIbanIsValid("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethIbanIsDirect ({payload, metadata}) {
  try {

    yield put(actions.ethIbanIsDirect("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethIbanIsDirect("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}



export function * ethAbiEncodeFunctionSignature ({payload, metadata}) {
  try {

    yield put(actions.ethAbiEncodeFunctionSignature("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAbiEncodeFunctionSignature("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAbiEncodeEventSignature ({payload, metadata}) {
  try {

    yield put(actions.ethAbiEncodeEventSignature("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAbiEncodeEventSignature("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAbiEncodeParameter ({payload, metadata}) {
  try {

    yield put(actions.ethAbiEncodeParameter("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAbiEncodeParameter("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAbiEncodeFunctionCall ({payload, metadata}) {
  try {

    yield put(actions.ethAbiEncodeFunctionCall("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAbiEncodeFunctionCall("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAbiDecodeParameter ({payload, metadata}) {
  try {

    yield put(actions.ethAbiDecodeParameter("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAbiDecodeParameter("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAbiDecodeParameters ({payload, metadata}) {
  try {

    yield put(actions.ethAbiDecodeParameters("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAbiDecodeParameters("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * ethAbiDecodeLog ({payload, metadata}) {
  try {

    yield put(actions.ethAbiDecodeLog("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.ethAbiDecodeLog("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}



export function * netGetId ({payload, metadata}) {
  try {

    yield put(actions.netGetId("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.netGetId("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * netIsListening ({payload, metadata}) {
  try {

    yield put(actions.netIsListening("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.netIsListening("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export function * netGetPeerCount ({payload, metadata}) {
  try {

    yield put(actions.netGetPeerCount("SUCCESS")(
      payload,
      metadata,
    ))
  } catch (err) {
    yield put(actions.netGetPeerCount("FAILURE")(
      {
        error: err.message,
      },
      metadata,
    ))
  }
}


export default function* ethersSaga() {
  yield [
   takeEvery(actions.WEB3_SET_PROVIDER.REQUEST, web3SetProvider),

   takeEvery(actions.ETH_SET_PROVIDER.REQUEST, ethSetProvider),
    takeEvery(actions.ETH_GET_PROTOCOL_VERSION.REQUEST, ethGetProtocolVersion),
    takeEvery(actions.ETH_IS_SYNCING.REQUEST, ethIsSyncing),
    takeEvery(actions.ETH_GET_COINBASE.REQUEST, ethGetCoinbase),
    takeEvery(actions.ETH_IS_MINING.REQUEST, ethIsMining),
    takeEvery(actions.ETH_GET_HASHRATE.REQUEST, ethGetHashrate),
    takeEvery(actions.ETH_GET_GAS_PRICE.REQUEST, ethGetGasPrice),
    takeEvery(actions.ETH_GET_ACCOUNTS.REQUEST, ethGetAccounts),
    takeEvery(actions.ETH_GET_BLOCK_NUMBER.REQUEST, ethGetBlockNumber),
    takeEvery(actions.ETH_GET_BALANCE.REQUEST, ethGetBalance),
    takeEvery(actions.ETH_GET_STORAGE_AT.REQUEST, ethGetStorageAt),
    takeEvery(actions.ETH_GET_CODE.REQUEST, ethGetCode),
    takeEvery(actions.ETH_GET_BLOCK.REQUEST, ethGetBlock),
    takeEvery(actions.ETH_GET_BLOCK_TRANSACTION_COUNT.REQUEST, ethGetBlockTransactionCount),
    takeEvery(actions.ETH_GET_UNCLE.REQUEST, ethGetUncle),
    takeEvery(actions.ETH_GET_TRANSACTION.REQUEST, ethGetTransaction),
    takeEvery(actions.ETH_GET_TRANSACTION_FROM_BLOCK.REQUEST, ethGetTransactionFromBlock),
    takeEvery(actions.ETH_GET_TRANSACTION_RECEIPT.REQUEST, ethGetTransactionReceipt),
    takeEvery(actions.ETH_GET_TRANSACTION_COUNT.REQUEST, ethGetTransactionCount),
    takeEvery(actions.ETH_SEND_TRANSACTION.REQUEST, ethSendTransaction),
    takeEvery(actions.ETH_SEND_SIGNED_TRANSACTION.REQUEST, ethSendSignedTransaction),
    takeEvery(actions.ETH_SIGN.REQUEST, ethSign),
    takeEvery(actions.ETH_SIGN_TRANSACTION.REQUEST, ethSignTransaction),
    takeEvery(actions.ETH_ESTIMATE_GAS.REQUEST, ethEstimateGas),
    takeEvery(actions.ETH_GET_PAST_LOGS.REQUEST, ethGetPastLogs),
    takeEvery(actions.ETH_GET_COMPILERS.REQUEST, ethGetCompilers),
    takeEvery(actions.ETH_GET_WORK.REQUEST, ethGetWork),
    takeEvery(actions.ETH_SUBMIT_WORK.REQUEST, ethSubmitWork),
    takeEvery(actions.ETH_SUBSCRIBE.REQUEST, ethSubscribe),
    takeEvery(actions.ETH_CLEAR_SUBSCRIPTIONS.REQUEST, ethClearSubscriptions),

   takeEvery(actions.ETH_CONTRACT_CREATE.REQUEST, ethContractCreate),
    takeEvery(actions.ETH_CONTRACT_CLONE.REQUEST, ethContractClone),
    takeEvery(actions.ETH_CONTRACT_DEPLOY.REQUEST, ethContractDeploy),
    takeEvery(actions.ETH_CONTRACT_CALL.REQUEST, ethContractCall),
    takeEvery(actions.ETH_CONTRACT_SEND.REQUEST, ethContractSend),
    takeEvery(actions.ETH_CONTRACT_ESTIMATE_GAS.REQUEST, ethContractEstimateGas),
    takeEvery(actions.ETH_CONTRACT_ENCODE_ABI.REQUEST, ethContractEncodeAbi),
    takeEvery(actions.ETH_CONTRACT_GET_PAST_EVENTS.REQUEST, ethContractGetPastEvents),

   takeEvery(actions.ETH_ACCOUNTS_CREATE.REQUEST, ethAccountsCreate),
    takeEvery(actions.ETH_ACCOUNTS_PRIVATE_KEY_TO_ACCOUNT.REQUEST, ethAccountsPrivateKeyToAccount),
    takeEvery(actions.ETH_ACCOUNTS_SIGN_TRANSACTION.REQUEST, ethAccountsSignTransaction),
    takeEvery(actions.ETH_ACCOUNTS_RECOVER_TRANSACTION.REQUEST, ethAccountsRecoverTransaction),
    takeEvery(actions.ETH_ACCOUNTS_HASH_MESSAGE.REQUEST, ethAccountsHashMessage),
    takeEvery(actions.ETH_ACCOUNTS_SIGN.REQUEST, ethAccountsSign),
    takeEvery(actions.ETH_ACCOUNTS_RECOVER.REQUEST, ethAccountsRecover),
    takeEvery(actions.ETH_ACCOUNTS_ENCRYPT.REQUEST, ethAccountsEncrypt),
    takeEvery(actions.ETH_ACCOUNTS_DECRYPT.REQUEST, ethAccountsDecrypt),
    takeEvery(actions.ETH_ACCOUNTS_WALLET.REQUEST, ethAccountsWallet),
    takeEvery(actions.ETH_ACCOUNTS_WALLET_CREATE.REQUEST, ethAccountsWalletCreate),
    takeEvery(actions.ETH_ACCOUNTS_WALLET_ADD.REQUEST, ethAccountsWalletAdd),
    takeEvery(actions.ETH_ACCOUNTS_WALLET_REMOVE.REQUEST, ethAccountsWalletRemove),
    takeEvery(actions.ETH_ACCOUNTS_WALLET_CLEAR.REQUEST, ethAccountsWalletClear),
    takeEvery(actions.ETH_ACCOUNTS_WALLET_ENCRYPT.REQUEST, ethAccountsWalletEncrypt),
    takeEvery(actions.ETH_ACCOUNTS_WALLET_DECRYPT.REQUEST, ethAccountsWalletDecrypt),
    takeEvery(actions.ETH_ACCOUNTS_WALLET_SAVE.REQUEST, ethAccountsWalletSave),
    takeEvery(actions.ETH_ACCOUNTS_WALLET_LOAD.REQUEST, ethAccountsWalletLoad),

   takeEvery(actions.ETH_PERSONAL_SET_PROVIDER.REQUEST, ethPersonalSetProvider),
    takeEvery(actions.ETH_PERSONAL_PROVIDERS.REQUEST, ethPersonalProviders),
    takeEvery(actions.ETH_PERSONAL_GIVEN_PROVIDER.REQUEST, ethPersonalGivenProvider),
    takeEvery(actions.ETH_PERSONAL_CURRENT_PROVIDER.REQUEST, ethPersonalCurrentProvider),
    takeEvery(actions.ETH_PERSONAL_NEW_ACCOUNT.REQUEST, ethPersonalNewAccount),
    takeEvery(actions.ETH_PERSONAL_SIGN.REQUEST, ethPersonalSign),
    takeEvery(actions.ETH_PERSONAL_EC_RECOVER.REQUEST, ethPersonalEcRecover),
    takeEvery(actions.ETH_PERSONAL_SIGN_TRANSACTION.REQUEST, ethPersonalSignTransaction),

   takeEvery(actions.ETH_IBAN_CREATE.REQUEST, ethIbanCreate),
    takeEvery(actions.ETH_IBAN_TO_ADDRESS.REQUEST, ethIbanToAddress),
    takeEvery(actions.ETH_IBAN_TO_IBAN.REQUEST, ethIbanToIban),
    takeEvery(actions.ETH_IBAN_FROM_ETHEREUM_ADDRESS.REQUEST, ethIbanFromEthereumAddress),
    takeEvery(actions.ETH_IBAN_FROM_IBAN.REQUEST, ethIbanFromIban),
    takeEvery(actions.ETH_IBAN_CREATE_INDIRECT.REQUEST, ethIbanCreateIndirect),
    takeEvery(actions.ETH_IBAN_IS_VALID.REQUEST, ethIbanIsValid),
    takeEvery(actions.ETH_IBAN_IS_DIRECT.REQUEST, ethIbanIsDirect),

   takeEvery(actions.ETH_ABI_ENCODE_FUNCTION_SIGNATURE.REQUEST, ethAbiEncodeFunctionSignature),
    takeEvery(actions.ETH_ABI_ENCODE_EVENT_SIGNATURE.REQUEST, ethAbiEncodeEventSignature),
    takeEvery(actions.ETH_ABI_ENCODE_PARAMETER.REQUEST, ethAbiEncodeParameter),
    takeEvery(actions.ETH_ABI_ENCODE_FUNCTION_CALL.REQUEST, ethAbiEncodeFunctionCall),
    takeEvery(actions.ETH_ABI_DECODE_PARAMETER.REQUEST, ethAbiDecodeParameter),
    takeEvery(actions.ETH_ABI_DECODE_PARAMETERS.REQUEST, ethAbiDecodeParameters),
    takeEvery(actions.ETH_ABI_DECODE_LOG.REQUEST, ethAbiDecodeLog),

   takeEvery(actions.NET_GET_ID.REQUEST, netGetId),
    takeEvery(actions.NET_IS_LISTENING.REQUEST, netIsListening),
    takeEvery(actions.NET_GET_PEER_COUNT.REQUEST, netGetPeerCount),

  ];
}
