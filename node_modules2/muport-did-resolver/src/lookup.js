import bs58 from 'bs58'
import { ec as EC } from 'elliptic'
import { keccak_256 } from 'js-sha3'
import EthrDIDRegistry from 'ethr-did-registry'
import HttpProvider from 'ethjs-provider-http'
import Eth from 'ethjs-query'
import abi from 'ethjs-abi'

const XMLHttpRequest = (typeof window !== 'undefined') ? window.XMLHttpRequest : require('xmlhttprequest').XMLHttpRequest
const secp256k1 = new EC('secp256k1')

const PROVIDER_URL = 'https://mainnet.infura.io'
const IPFS_CONF = { host: 'ipfs.infura.io', port: 5001, protocol: 'https' }
const ATTRIBUTE_CHANGED_FILTER = '0x18ab6b2ae3d64306c00ce663125f2bd680e441a098de1635bd7ad8b0d44965e4'
const ZERO_HEX = '0x0000000000000000000000000000000000000000000000000000000000000000'
const CLAIM_KEY = '0x' + Buffer.from('muPortDocument', 'utf8').toString('hex')

async function ipfsLookup (hash, conf) {
  conf = conf || IPFS_CONF
  const url = conf.protocol + '://' + conf.host + '/ipfs/' + hash
  return request(url)
}

async function ethrLookup (managementKey, rpcUrl = PROVIDER_URL) {
  const eth = new Eth(new HttpProvider(rpcUrl))
  const logDecoder = abi.logDecoder(EthrDIDRegistry.abi, false)
  const address = managementKey.length === 42 ? managementKey.slice(2).toLowerCase() : toEthereumAddress(managementKey)
  let hexHash
  let previousChange = await lastChange(address, rpcUrl)
  while (previousChange) {
    const event = logDecoder(await eth.getLogs({
      address: EthrDIDRegistry.networks[1].address,
      topics: [ATTRIBUTE_CHANGED_FILTER, '0x000000000000000000000000' + address],
      fromBlock: previousChange,
      toBlock: previousChange
    }))[0]
    previousChange = event.previousChange.isZero() ? null : event.previousChange
    if (event.name.startsWith(CLAIM_KEY)) {
      hexHash = event.value
      break
    }
  }
  return hexHash ? hexToIpfsHash(hexHash) : null
}

async function lastChange (address, rpcUrl = PROVIDER_URL) {
  address = '0x' + address
  const methodAbi = EthrDIDRegistry.abi.filter(x => x.name === "changed")[0]
  const callData = abi.encodeMethod(methodAbi, [address])
  const lastChanged = (await request(rpcUrl, JSON.stringify({
      method: 'eth_call',
      params: [{
        to: EthrDIDRegistry.networks[1].address,
        data: callData
      }, 'latest' ],
      id: 1,
      jsonrpc: '2.0'
    })
  )).result
  return lastChanged !== ZERO_HEX ? lastChanged : null
}

const hexToIpfsHash = hexHash => bs58.encode(Buffer.from(hexHash.slice(2), 'hex'))

function request (url, payload) {
  const request = new XMLHttpRequest()
  return new Promise((resolve, reject) => {
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.timeout !== 1) {
        if (request.status !== 200) {
          reject(`[muport-did-resolver] status ${request.status}: ${request.responseText}`)
        } else {
          try {
            resolve(JSON.parse(request.responseText))
          } catch (jsonError) {
            reject(`[muport-did-resolver] while parsing data: '${String(request.responseText)}', error: ${String(jsonError)}`)
          }
        }
      }
    }
    if (payload) {
      request.open('POST', url)
      request.setRequestHeader('Content-Type', `application/json`)
    } else {
      request.open('GET', url)
    }
    request.setRequestHeader('accept', 'application/json')
    request.send(payload)
  })
}

const keccak = data => Buffer.from(keccak_256.buffer(data))
const decompressPubKey = key => secp256k1.keyFromPublic(key, 'hex').pub.encode('hex')
const toEthereumAddress = pubkey => keccak(Buffer.from(decompressPubKey(pubkey).slice(2), 'hex')).slice(-20).toString('hex')

module.exports = { ethrLookup, ipfsLookup }
