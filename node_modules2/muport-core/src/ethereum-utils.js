const EthAbi = require('web3-eth-abi')
const bs58 = require('bs58')
const ethers = require('ethers')
const EthrDIDRegistryArtifact = require('ethr-did-registry')
const EthrDIDRegistryAbi = EthrDIDRegistryArtifact.abi
const EthrDIDRegistryAddress = EthrDIDRegistryArtifact.networks[1].address

const PROVIDER_URL = 'https://mainnet.infura.io'
const claimKey = '0x' + Buffer.from('muPortDocument', 'utf8').toString('hex')

class EthereumUtils {

  constructor (providerUrl) {
    this.provider = new ethers.providers.JsonRpcProvider(providerUrl || PROVIDER_URL)
  }

  async createPublishTxParams (ipfsHash, managementAddress) {
    const encodedHash = encodeIpfsHash(ipfsHash)
    const data = encodeMethodCall('setAttribute', [managementAddress, claimKey, encodedHash, 0])
    const nonce = await this.provider.getTransactionCount(managementAddress)
    const gasPrice = (await this.provider.getGasPrice()).toNumber()
    const txParams = {
      nonce,
      gasPrice,
      to: EthrDIDRegistryAddress,
      data,
    }
    // we need to add 500 as a gas buffer
    txParams.gasLimit = (await this.provider.estimateGas({...txParams, from: managementAddress})).toNumber() + 500
    return txParams
  }

  calculateTxCost (txParams) {
    return ethers.utils.formatUnits(txParams.gasPrice * txParams.gasLimit, 'ether')
  }

  async sendRawTx (rawTx) {
    return this.provider.sendTransaction(rawTx)
  }

  async waitForTx (txHash) {
    // sets the timeout to one minute
    return this.provider.waitForTransaction(txHash, 60000)
  }
}

const encodeIpfsHash = (hash) => {
  return '0x' + bs58.decode(hash).toString('hex')
}

const encodeMethodCall = (methodName, args) => {
  const methodAbi = EthrDIDRegistryAbi.filter(obj => obj.name === methodName)[0]
  return EthAbi.encodeFunctionCall(methodAbi, args)
}

module.exports = EthereumUtils
