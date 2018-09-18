'use strict'

const EC = require('elliptic').ec
const ec = new EC('secp256k1')

class Keystore {
  constructor(storage) {
    this._storage = storage
  }

  createKey(id) {
    const key = ec.genKeyPair()
    const publicKey = key.getPublic('hex')
    const privateKey = key.getPrivate('hex')
    this._storage.setItem(id, JSON.stringify({
      publicKey: publicKey, 
      privateKey: privateKey 
    }))
    return key
  }

  getKey(id) {
    let key = JSON.parse(this._storage.getItem(id))

    if (!key)
      return

    const k = ec.keyPair({ 
      pub:  key.publicKey, 
      priv: key.privateKey,
      privEnc: 'hex',
      pubEnc: 'hex',
    })

    return k
  }

  generateKey() {
    return Promise.resolve(ec.genKeyPair())
  }

  exportPublicKey(key) {
    return Promise.resolve(key.getPublic('hex'))
  }

  exportPrivateKey(key) {
    return Promise.resolve(key.getPrivate('hex'))
  }

  importPublicKey(key) {
    return Promise.resolve(ec.keyFromPublic(key, 'hex'))
  }

  importPrivateKey(key) {
    return Promise.resolve(ec.keyFromPrivate(key, 'hex'))
  }

  sign(key, data) {
    const sig = ec.sign(data, key)
    return Promise.resolve(sig.toDER('hex'))
  }

  verify(signature, key, data) {
    let res = false
    res = ec.verify(data, signature, key)
    return Promise.resolve(res)
  }
}

module.exports = (LocalStorage, mkdir) => {
  return {
    create: (directory = './keystore') => {
      // If we're in Node.js, mkdir module is expected to passed
      // and we need to make sure the directory exists
      if (mkdir && mkdir.sync) 
        mkdir.sync(directory)
      // In Node.js, we use the injected LocalStorage module,
      // in the browser, we use the browser's localStorage
      const storage = LocalStorage ? new LocalStorage(directory) : localStorage
      return new Keystore(storage)
    }
  }
}
