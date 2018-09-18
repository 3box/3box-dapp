'use strict'

const IPFS = require('ipfs')
const rmrf = require('rimraf')
const pMapSeries = require('p-map-series')
const config = require('./config')
const waitForPeers = require('../../src/wait-for-peers')

/**
 * Start an IPFS instance
 * @param  {Object}  config  [IPFS configuration to use]
 * @return {[Promise<IPFS>]} [IPFS instance]
 */
const startIpfs = (config = {}) => {
  return new Promise((resolve, reject) => {
    const ipfs = new IPFS(config)
    ipfs.on('error', reject)
    ipfs.on('ready', () => resolve(ipfs))
  })
}

const createIpfsTestInstances = async (ipfsPaths) => {
  // Create all instance sequentially
  return await pMapSeries(ipfsPaths, async (ipfsPath) => {
    rmrf.sync(ipfsPath) // remove test data
    const ipfsConfig = Object.assign({}, config.defaultIpfsConfig, { repo: ipfsPath })
    return await startIpfs(ipfsConfig) // Returns a Promise<IPFS>
  })
}

const destroyIpfsTestInstances = async (instances, ipfsPaths) => {
  const stop = ipfs => ipfs.stop()
  const removeDir = p => rmrf.sync(p)
  await pMapSeries(instances, stop)
  ipfsPaths.forEach(removeDir)
}

const connectIpfsInstances = async (instances) => {
  // Multiaddress of all instances
  const addresses = instances.map(ipfs => ipfs._peerInfo.multiaddrs._multiaddrs[0].toString())
  // Connect each instance with all other instances
  instances.forEach(ipfs => {
    // Connect to all addresses
    addresses.forEach(addr => {
      // But don't try to connect to self
      if (addr !== ipfs._peerInfo.multiaddrs._multiaddrs[0].toString()) {
        ipfs.swarm.connect(addr)
      }
    })
  })
}

exports.startIpfs = startIpfs
exports.createIpfsTestInstances = createIpfsTestInstances
exports.destroyIpfsTestInstances = destroyIpfsTestInstances
exports.connectIpfsInstances = connectIpfsInstances
exports.waitForPeers = waitForPeers
