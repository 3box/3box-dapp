const bip39 = require('bip39')
const hdkey = require('ethereumjs-wallet/hdkey')
const Tx = require('ethereumjs-tx')
const nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')
const bs58 = require('bs58')
const sss = require('secrets.js')
const SimpleSigner = require('did-jwt').SimpleSigner

const BASE_PATH = "m/7696500'/0'/0'"
const MM_PATH = "m/44'/60'/0'/0"


class Keyring {

  constructor (opts = {}) {
    opts.mnemonic = opts.mnemonic || bip39.generateMnemonic()
    this._initKeys(opts)
  }

  async createShares (dids, publicKeys) {
    const amount = 3
    const theshold = 2
    if (dids.length !== amount && publicKeys.length !== amount) {
      throw new Error('There needs to be exactly ' + amount + ' dids and corresponding publicKeys')
    }
    const entropyStr = bip39.mnemonicToEntropy(this.mnemonic).toString('hex')
    const shares = await sss.share(entropyStr, amount, theshold)
    const nonce = randomNonce()
    // we need to add 0 to the end of the shares because they are of odd length
    return {
      nonce: nacl.util.encodeBase64(nonce),
      ciphertexts: [
        this.encrypt(Buffer.concat([didToBuffer(dids[0]), Buffer.from(shares[0]+'0', 'hex')]), publicKeys[0], nonce).ciphertext,
        this.encrypt(Buffer.concat([didToBuffer(dids[1]), Buffer.from(shares[1]+'0', 'hex')]), publicKeys[1], nonce).ciphertext,
        this.encrypt(Buffer.concat([didToBuffer(dids[2]), Buffer.from(shares[2]+'0', 'hex')]), publicKeys[2], nonce).ciphertext
      ]
    }
  }

  encrypt (msg, toPublic, nonce) {
    nonce = nonce || randomNonce()
    toPublic = nacl.util.decodeBase64(toPublic)
    if (typeof msg === 'string') {
      msg = nacl.util.decodeUTF8(msg)
    }
    const ciphertext = nacl.box(msg, nonce, toPublic, this.asymEncryptionKey.secretKey)

    return {
      nonce: nacl.util.encodeBase64(nonce),
      ciphertext: nacl.util.encodeBase64(ciphertext)
    }
  }

  decrypt (ciphertext, fromPublic, nonce, toBuffer) {
    fromPublic = nacl.util.decodeBase64(fromPublic)
    ciphertext = nacl.util.decodeBase64(ciphertext)
    nonce = nacl.util.decodeBase64(nonce)

    const cleartext = nacl.box.open(ciphertext, nonce, fromPublic, this.asymEncryptionKey.secretKey)
    if (toBuffer) {
      return cleartext ? Buffer.from(cleartext) : null
    }
    return cleartext ? nacl.util.encodeUTF8(cleartext) : null
  }

  decryptOneShare (recoveryNetwork, fromPublic, did) {
    const didBuf = didToBuffer(did)
    for (const box of recoveryNetwork.ciphertexts) {
      const cleartextBuf = this.decrypt(box, fromPublic, recoveryNetwork.nonce, true)
      // where we able to decrypt?
      // check if encrypted did is our did
      if (cleartextBuf && didBuf.equals(cleartextBuf.slice(0, didBuf.length))) {
        // return the decrypted share, remove the trailing zero
        return cleartextBuf.slice(didBuf.length, cleartextBuf.length + 1).toString('hex').slice(0, -1)
      }
    }
  }

  symEncrypt (msg, nonce) {
    return symEncryptBase(msg, this.symEncryptionKey, nonce)
  }

  symDecrypt (ciphertext, nonce, toBuffer) {
    return symDecryptBase(ciphertext, this.symEncryptionKey, nonce, toBuffer)
  }

  getJWTSigner () {
    return SimpleSigner(this.signingKey._hdkey._privateKey)
  }

  signManagementTx (txParams) {
    if (this.externalMgmtKey) throw new Error('Can not sign transaction if externalMgmtKey is set')
    const privKey = this.managementKey.getWallet().getPrivateKey()
    let tx = new Tx(txParams)
    tx.sign(privKey)
    return '0x' + tx.serialize().toString('hex')
  }

  getManagementAddress () {
    if (this.externalMgmtKey) {
      return this.managementKey
    }
    return this.managementKey.getWallet().getChecksumAddressString()
  }

  getPublicKeys () {
    return {
      signingKey: this.signingKey._hdkey._publicKey.toString('hex'),
      managementKey: this.externalMgmtKey ? this.managementKey
        : this.managementKey._hdkey._publicKey.toString('hex'),
      asymEncryptionKey: nacl.util.encodeBase64(this.asymEncryptionKey.publicKey)
    }
  }

  serialize () {
    let obj = { mnemonic: this.mnemonic }
    if (this.externalMgmtKey) {
      obj.externalMgmtKey = this.managementKey
    }
    return obj
  }

  _initKeys({mnemonic, externalMgmtKey}) {
    this.mnemonic = mnemonic
    const seed = bip39.mnemonicToSeed(mnemonic)
    const seedKey = hdkey.fromMasterSeed(seed)
    const baseKey = seedKey.derivePath(BASE_PATH)
    this.signingKey = baseKey.deriveChild(0)
    const tmpEncKey = baseKey.deriveChild(2)._hdkey._privateKey
    this.asymEncryptionKey = nacl.box.keyPair.fromSecretKey(tmpEncKey)
    this.symEncryptionKey = baseKey.deriveChild(3)._hdkey._privateKey

    if (externalMgmtKey) {
      this.managementKey = externalMgmtKey
      this.externalMgmtKey = true
    } else {
      // Management key is used to sign ethereum txs, so we use the MM base path
      this.managementKey = seedKey.derivePath(MM_PATH).deriveChild(0)
  }
  }

  static async recoverKeyring (shares) {
    const entropy = await sss.combine(shares)
    return new Keyring({
      mnemonic: bip39.entropyToMnemonic(entropy)
    })
  }
}

const randomNonce = () => {
  return nacl.randomBytes(24)
}

const didToBuffer = (didUri) => {
  const hash = didUri.split(':')[2]
  return bs58.decode(hash)
}

const symEncryptBase = (msg, symKey, nonce) => {
  nonce = nonce || randomNonce()
  if (typeof msg === 'string') {
    msg = nacl.util.decodeUTF8(msg)
  }

  const ciphertext = nacl.secretbox(msg, nonce, symKey)

  return {
    nonce: nacl.util.encodeBase64(nonce),
    ciphertext: nacl.util.encodeBase64(ciphertext)
  }
}

const symDecryptBase = (ciphertext, symKey, nonce, toBuffer) => {
  ciphertext = nacl.util.decodeBase64(ciphertext)
  nonce = nacl.util.decodeBase64(nonce)

  const cleartext = nacl.secretbox.open(ciphertext, nonce, symKey)
  if (toBuffer) {
    return cleartext ? Buffer.from(cleartext) : null
  }
  return cleartext ? nacl.util.encodeUTF8(cleartext) : null
}


module.exports = Keyring
