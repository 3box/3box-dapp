import {createRequestTypes, action} from '../utils'
const entity = 'ethers'
export const actions = {
WALLET_GENERATE_RANDOM: createRequestTypes('WALLET_GENERATE_RANDOM'),
WALLET_GENERATE_JSON: createRequestTypes('WALLET_GENERATE_JSON'),
WALLET_GENERATE_MENOMONIC: createRequestTypes('WALLET_GENERATE_MENOMONIC'),
WALLET_GENERATE_BRAIN: createRequestTypes('WALLET_GENERATE_BRAIN'),
WALLET_ADDRESS: createRequestTypes('WALLET_ADDRESS'),
WALLET_SIGN: createRequestTypes('WALLET_SIGN'),
WALLET_SIGNMESSAGE: createRequestTypes('WALLET_SIGNMESSAGE'),
WALLET_ENCRYPT: createRequestTypes('WALLET_ENCRYPT'),

BLOCKCHAIN_BLOCK_NUMBER: createRequestTypes('BLOCKCHAIN_BLOCK_NUMBER'),
BLOCKCHAIN_GAS_PRICE: createRequestTypes('BLOCKCHAIN_GAS_PRICE'),
BLOCKCHAIN_BLOCK: createRequestTypes('BLOCKCHAIN_BLOCK'),
BLOCKCHAIN_TRANSACTION: createRequestTypes('BLOCKCHAIN_TRANSACTION'),
BLOCKCHAIN_TRANSACTION_RECEIPT: createRequestTypes('BLOCKCHAIN_TRANSACTION_RECEIPT'),

ENS_RESOLVE_NAME: createRequestTypes('ENS_RESOLVE_NAME'),
ENS_LOOKUPADDRESS: createRequestTypes('ENS_LOOKUPADDRESS'),

PROVIDER_ETHERSCAN: createRequestTypes('PROVIDER_ETHERSCAN'),
PROVIDER_JSONRPC: createRequestTypes('PROVIDER_JSONRPC'),
PROVIDER_INFURA: createRequestTypes('PROVIDER_INFURA'),
PROVIDER_FALLBACK: createRequestTypes('PROVIDER_FALLBACK'),
PROVIDER_DEFAULT: createRequestTypes('PROVIDER_DEFAULT'),

ACCOUNT_BALANCE: createRequestTypes('ACCOUNT_BALANCE'),
ACCOUNT_TRANSACTIONCOUNT: createRequestTypes('ACCOUNT_TRANSACTIONCOUNT'),

CONTRACT_CREATE: createRequestTypes('CONTRACT_CREATE'),
CONTRACT_DEPLOY: createRequestTypes('CONTRACT_DEPLOY'),
CONTRACT_CALL: createRequestTypes('CONTRACT_CALL'),
CONTRACT_ESTIMATE_GAS: createRequestTypes('CONTRACT_ESTIMATE_GAS'),
CONTRACT_SEND_TRANSACTION: createRequestTypes('CONTRACT_SEND_TRANSACTION'),

TRANSACTION_BATCH_PROCESS: createRequestTypes('TRANSACTION_BATCH_PROCESS'),

walletGenerateRandom: status => (payload, metadata) => action(actions.WALLET_GENERATE_RANDOM[status], payload, metadata, status, entity),
walletGenerateJson: status => (payload, metadata) => action(actions.WALLET_GENERATE_JSON[status], payload, metadata, status, entity),
walletGenerateMenomonic: status => (payload, metadata) => action(actions.WALLET_GENERATE_MENOMONIC[status], payload, metadata, status, entity),
walletGenerateBrain: status => (payload, metadata) => action(actions.WALLET_GENERATE_BRAIN[status], payload, metadata, status, entity),
walletAddress: status => (payload, metadata) => action(actions.WALLET_ADDRESS[status], payload, metadata, status, entity),
walletSign: status => (payload, metadata) => action(actions.WALLET_SIGN[status], payload, metadata, status, entity),
walletSignMessage: status => (payload, metadata) => action(actions.WALLET_SIGNMESSAGE[status], payload, metadata, status, entity),
walletEncrypt: status => (payload, metadata) => action(actions.WALLET_ENCRYPT[status], payload, metadata, status, entity),

blockchainBlockNumber: status => (payload, metadata) => action(actions.BLOCKCHAIN_BLOCK_NUMBER[status], payload, metadata, status, entity),
blockchainGasPrice: status => (payload, metadata) => action(actions.BLOCKCHAIN_GAS_PRICE[status], payload, metadata, status, entity),
blockchainBlock: status => (payload, metadata) => action(actions.BLOCKCHAIN_BLOCK[status], payload, metadata, status, entity),
blockchainTransaction: status => (payload, metadata) => action(actions.BLOCKCHAIN_TRANSACTION[status], payload, metadata, status, entity),
blockchainTransactionReceipt: status => (payload, metadata) => action(actions.BLOCKCHAIN_TRANSACTION_RECEIPT[status], payload, metadata, status, entity),

ensResolveName: status => (payload, metadata) => action(actions.ENS_RESOLVE_NAME[status], payload, metadata, status, entity),
ensLookupAddress: status => (payload, metadata) => action(actions.ENS_LOOKUPADDRESS[status], payload, metadata, status, entity),

providerEtherscan: status => (payload, metadata) => action(actions.PROVIDER_ETHERSCAN[status], payload, metadata, status, entity),
providerJsonRpc: status => (payload, metadata) => action(actions.PROVIDER_JSONRPC[status], payload, metadata, status, entity),
providerInfura: status => (payload, metadata) => action(actions.PROVIDER_INFURA[status], payload, metadata, status, entity),
providerFallback: status => (payload, metadata) => action(actions.PROVIDER_FALLBACK[status], payload, metadata, status, entity),
providerDefault: status => (payload, metadata) => action(actions.PROVIDER_DEFAULT[status], payload, metadata, status, entity),

accountBalance: status => (payload, metadata) => action(actions.ACCOUNT_BALANCE[status], payload, metadata, status, entity),
accountTransactionCount: status => (payload, metadata) => action(actions.ACCOUNT_TRANSACTIONCOUNT[status], payload, metadata, status, entity),

contractCreate: status => (payload, metadata) => action(actions.CONTRACT_CREATE[status], payload, metadata, status, entity),
contractDeploy: status => (payload, metadata) => action(actions.CONTRACT_DEPLOY[status], payload, metadata, status, entity),
contractCall: status => (payload, metadata) => action(actions.CONTRACT_CALL[status], payload, metadata, status, entity),
contractEstimateGas: status => (payload, metadata) => action(actions.CONTRACT_ESTIMATE_GAS[status], payload, metadata, status, entity),
contractSendTransaction: status => (payload, metadata) => action(actions.CONTRACT_SEND_TRANSACTION[status], payload, metadata, status, entity),

transactionBatchProcess: status => (payload, metadata) => action(actions.TRANSACTION_BATCH_PROCESS[status], payload, metadata, status, entity),

// Provider Actions
PROVIDER_CHANGE: 'PROVIDER_CHANGE',
providerChange: ({payload = {}}) => ({
  type: actions.PROVIDER_CHANGE,
  payload
}),
CHAIN_CHANGE: 'CHAIN_CHANGE',
chainChange: ({payload = {}}) => ({
  type: actions.CHAIN_CHANGE,
  payload
}),
JSONRPC_URL_CHANGE: 'JSONRPC_URL_CHANGE',
jsonRpcUrlChange: ({payload = {}}) => ({
  type: actions.JSONRPC_URL_CHANGE,
  payload
}),

}
export default actions