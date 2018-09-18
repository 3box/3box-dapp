'use strict'

const getPeerID = async (ipfs) => {
  const peerInfo = await ipfs.id()
  return peerInfo.id
}

module.exports = getPeerID
