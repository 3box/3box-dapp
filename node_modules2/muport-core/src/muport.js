const IPFS = require('ipfs-mini')
const promisifyAll = require('bluebird').promisifyAll
const resolve = require('did-resolver')
const registerMuportResolver = require('muport-did-resolver')
const didJWT = require('did-jwt')
const bs58 = require('bs58')
const Keyring = require('./keyring')
const EthereumUtils = require('./ethereum-utils')

const IPFS_CONF = { host: 'ipfs.infura.io', port: 5001, protocol: 'https' }
let ipfs

/**
 * Primary object for interacting with a µPort identity. MuPort enables creation and
 * updating of µPort identities. It also provides functionality to sign claims and
 * help other identities recover.
 */
class MuPort {

  /**
   * Instantiates a µPort identity from its serialized state.
   *
   * @param     {String}    serializeState          the serialized state of a µPort identity
   * @param     {Object}    [opts]                  optional parameters
   * @param     {Object}    opts.ipfsConf           configuration options for ipfs-mini
   * @param     {String}    opts.rpcProviderUrl     rpc url to a custom ethereum node
   * @return    {MuPort}                            self
   */
  constructor (serializeState, opts = {}) {
    initIpfs(opts.ipfsConf)
    this._initIdentity(serializeState)

    this.ethUtils = new EthereumUtils(opts.rpcProviderUrl)
    registerMuportResolver({ ipfsConf: opts.ipfsConf, rpcProviderUrl: opts.rpcProviderUrl })
  }

  _initIdentity (serializeState) {
    const state = JSON.parse(serializeState)
    if (!state.did || !state.document || !state.keyring) {
      throw new Error('Data missing for restoring identity')
    }
    this.did = state.did
    this.document = state.document
    this.documentHash = state.documentHash || this.did.split(':')[2]
    this.keyring = new Keyring(state.keyring)

    // TODO - verify integrity of identity (resolving ID should result in the same did document, etc)
  }

  /**
   * Help another identity recover. Returns a decrypted share if the current identity is a delegate
   * returns undefined otherwise
   *
   * @param     {String}    did             the did of the identity that should be recovered
   * @return    {Promise<String, Error>}    a share that the recovering identity can use
   */
  async helpRecover (did) {
    const muportDoc = await MuPort.resolveIdentityDocument(did)

    return this.keyring.decryptOneShare(muportDoc.recoveryNetwork, muportDoc.asymEncryptionKey, this.did)
  }

  /**
   * The DID is the identifier of the identity. This is a unique string that can be used to
   * look up information about the identity.
   *
   * @return    {String}        the DID
   */
  getDid() {
    return this.did
  }

  /**
   * The DID Document is a json object that contains information such as public keys
   *
   * @return    {Object}        the DID Document
   */
  getDidDocument () {
    return this.document
  }

  /**
   * The recovery delegates that can help this identity recover
   *
   * @return    {Array<String>}        an array containing the DIDs of the delegates
   */
  getRecoveryDelegateDids () {
    const toBuffer = true
    let dids = []
    if (this.document.symEncryptedData && this.document.symEncryptedData.symEncDids){
      dids = this.document.symEncryptedData.symEncDids.map(
        (encDid) => bufferToDid(this.keyring.symDecrypt(encDid.ciphertext, encDid.nonce, toBuffer))
      )
    }
    return dids
  }

  /**
   * This function is used to update the publicProfile and/or the recoveryNetwork of the identity.
   * The returned object has three properties; `address` an ethereum address, `costInEther` a number,
   * and `finishUpdate` a function.
   * In order to complete the update of the delegates you have to
   * send `costInEther` ether to the `address` on mainnet (or other network if you are using
   * a custom config). Once that is done the `finishUpdate` function can be called. This
   * function sends a transaction to the network that updates the identity. The function
   * will throw an error if there is to little ether in the `address`.
   * Both publicProfile and delegateDids are optional and you may pass null if you don't wish to
   * update one of them.
   *
   * @param     {Object}            publicProfile       a new public profile for the identity
   * @param     {Array<String>}     delegateDids        an array containing the 3 DIDs of the new delegates
   * @return    {Promise<Object, Error>}                an object with the data needed to finalize the update
   */
  async updateIdentity (publicProfile, delegateDids) {
    if (!publicProfile && ! delegateDids) throw new Error('publicProfile or delegateDids has to be set')
    let newDocument = JSON.parse(JSON.stringify(this.document))
    if (publicProfile) {
      newDocument.publicProfile = publicProfile
    }
    if (delegateDids) {
      if (delegateDids.length !== 3) throw new Error('Must provide exactly 3 DIDs')
      // generate new recoveryNetwork
      const didsPublicKeys = await Promise.all(delegateDids.map(async did => (await MuPort.resolveIdentityDocument(did)).asymEncryptionKey))
      // seems like the best way to do a deep clone
      newDocument.recoveryNetwork = await this.keyring.createShares(delegateDids, didsPublicKeys)
      // save guardians
      newDocument.symEncryptedData = newDocument.symEncryptedData || {}
      newDocument.symEncryptedData.symEncDids = delegateDids.map((did) => this.keyring.symEncrypt(didToBuffer(did)))
    }
    let newDocumentHash = await ipfs.addJSONAsync(newDocument)
    // prepare ethereum tx
    const address = this.keyring.getManagementAddress()
    const txParams = await this.ethUtils.createPublishTxParams(newDocumentHash, address)
    const costInEther = this.ethUtils.calculateTxCost(txParams)
    const signedTx = this.keyring.externalMgmtKey ? null : this.keyring.signManagementTx(txParams)

    return {
      txParams,
      address,
      costInEther,
      finishUpdate: async txHash => {
        txHash = txHash || await this.ethUtils.sendRawTx(signedTx)
        try {
          await this.ethUtils.waitForTx(txHash)
          this.document = newDocument
          this.documentHash = newDocumentHash
        } catch (e) {
          throw new Error('There was a problem with sending the transaction' + e)
        }
      }
    }
  }

  /**
   * Signs the given payload (claim) and return a promis with the JWT.
   *
   * @return    {Promise<String, Error>}        a promise that resolves to a JWT
   */
  async signJWT (payload) {
    const settings = {
      signer: this.keyring.getJWTSigner(),
      issuer: this.did
      // TODO - should we have an expiry?
    }
    return didJWT.createJWT(payload, settings)
  }

  /**
   * Verifies a JWT.
   *
   * @param     {String}        jwt                 the JWT to verify
   * @param     {String}        audience=this.did   the audience, defaults to did of current identity
   * @return    {Promise<Object, Error>}            a promise that resolves to the decoded JWT
   */
  async verifyJWT (jwt, audience = this.did) {
    return didJWT.verifyJWT(jwt, {audience})
  }

  /**
   * Asymmetrically encrypt a message
   *
   * @param     {String}        msg                 the message to encrypt
   * @param     {String}        toPublic            the public key to encrypt to, encoded as a base64 string
   * @param     {String}        nonce               (optional) the nonce, encoded as a base64 string
   * @return    {Object}                            an object containing the nonce and the ciphertext
   */
  encrypt (msg, toPublic, nonce) {
    return this.keyring.encrypt(msg, toPublic, nonce)
  }

  /**
   * Decrypt an asymmetrically encrypted message
   *
   * @param     {String}            ciphertext          the ciphertext to decrypt, encoded as a base64 string
   * @param     {String}            fromPublic          the public key of the entity that encrypted the msg, encoded as a base64 string
   * @param     {String}            nonce               the nonce, encoded as a base64 string
   * @param     {Boolean}           toBuffer            a boolean deciding whether to
   * @return    {String | Buffer}                       the decrypted message
   */
  decrypt (ciphertext, fromPublic, nonce, toBuffer) {
    return this.keyring.decrypt(ciphertext, fromPublic, nonce, toBuffer)
  }

  /**
   * Symmetrically encrypt a message
   *
   * @param     {String}        msg                 the message to encrypt
   * @param     {String}        nonce               (optional) the nonce, encoded as a base64 string
   * @return    {Object}                            an object containing the nonce and the ciphertext
   */
  symEncrypt (msg, nonce) {
    return this.keyring.symEncrypt(msg, nonce)
  }

  /**
   * Decrypt a symmetrically encrypted message
   *
   * @param     {String}            ciphertext          the ciphertext to decrypt, encoded as a base64 string
   * @param     {String}            nonce               the nonce, encoded as a base64 string
   * @param     {Boolean}           toBuffer            a boolean deciding whether to
   * @return    {String | Buffer}                       the decrypted message
   */
  symDecrypt (ciphertext, nonce, toBuffer) {
    return this.keyring.symDecrypt(ciphertext, nonce, toBuffer)
  }

  /**
   * Serialize the state of the current identity to be able to reconstruct it later.
   *
   * @return    {String}    the serialized state
   */
  serializeState () {
    return JSON.stringify({
      did: this.did,
      document: this.document,
      documentHash: this.documentHash,
      keyring: this.keyring.serialize()
    })
  }

  /**
   * Creates a new µPort identity.
   *
   * @param     {Object}            publicProfile           a public profile for the new identity
   * @param     {Array<String>}     delegateDids            three DIDs that can be used to recover the identity at a later point (optional)
   * @param     {Object}            [opts]                  optional parameters
   * @param     {String}            opts.externalMgmtKey    an ethereum address to be used as an external managementKey
   * @param     {Object}            opts.ipfsConf           configuration options for ipfs-mini
   * @param     {String}            opts.rpcProviderUrl     rpc url to a custom ethereum node
   * @return    {Promise<MuPort, Error>}                    a promise that resolves to an instance of the MuPort class
   */
  static async newIdentity (publicProfile, delegateDids, opts = {}) {
    initIpfs(opts.ipfsConf)
    const keyring = new Keyring(opts)
    let recoveryNetwork
    let symEncryptedData
    if (delegateDids) {
      const didsPublicKeys = await Promise.all(delegateDids.map(async did => (await MuPort.resolveIdentityDocument(did, opts)).asymEncryptionKey))
      recoveryNetwork = await keyring.createShares(delegateDids, didsPublicKeys)

      let symEncryptedDelegateDids = delegateDids.map((did) => keyring.symEncrypt(didToBuffer(did)))
      symEncryptedData = {symEncDids: symEncryptedDelegateDids}
    }
    const publicKeys = keyring.getPublicKeys()

    const doc = createMuportDocument(publicKeys, recoveryNetwork, publicProfile, symEncryptedData)
    const docHash = await ipfs.addJSONAsync(doc)
    const did = 'did:muport:' + docHash

    return new MuPort(JSON.stringify({
        did,
        document: doc,
        documentHash: docHash,
        keyring: keyring.serialize()
      }),
      opts
    )
  }

  /**
   * Recovers a µPort identity.
   *
   * @param     {String}            did                     the DID of the identity to be recovered
   * @param     {Array<String>}     shares                  atleast two shares that your delegates helped recover
   * @param     {Object}            [opts]                  optional parameters
   * @param     {Object}            opts.ipfsConf           configuration options for ipfs-mini
   * @param     {String}            opts.rpcProviderUrl     rpc url to a custom ethereum node
   * @return    {Promise<MuPort, Error>}                    a promise that resolves to an instance of the MuPort class
   */
  static async recoverIdentity (did, shares, opts = {}) {
    initIpfs(opts.ipfsConf)
    return new MuPort(JSON.stringify({
        did,
        document: await MuPort.resolveIdentityDocument(did, opts),
        keyring: (await Keyring.recoverKeyring(shares)).serialize()
      }),
      opts
    )
  }

  /**
   * Resovles the identity document for the given DID.
   *
   * @param     {String}            did                     the DID of the identity
   * @param     {Object}            [opts]                  optional parameters
   * @param     {Object}            opts.ipfsConf           configuration options for ipfs-mini
   * @param     {String}            opts.rpcProviderUrl     rpc url to a custom ethereum node
   * @return    {Promise<Object, Error>}                    a promise that resolves to the identity document
   */
  static async resolveIdentityDocument (did, opts) {
    if (opts) {
      registerMuportResolver({ ipfsConf: opts.ipfsConf, rpcProviderUrl: opts.rpcProviderUrl })
    }
    const didDoc = await resolve(did)
    const managementKeyStruct = didDoc.publicKey.find(key => (key.id.indexOf('#managementKey') !== -1))
    const publicKeys = {
      signingKey: didDoc.publicKey.find(key => (key.id.indexOf('#signingKey') !== -1)).publicKeyHex,
      managementKey: managementKeyStruct.publicKeyHex || managementKeyStruct.ethereumAddress,
      asymEncryptionKey: didDoc.publicKey.find(key => (key.id.indexOf('#encryptionKey') !== -1)).publicKeyBase64
    }
    const recoveryNetwork = didDoc.muportData.recoveryNetwork
    const publicProfile = didDoc.uportProfile
    const symEncryptedData = didDoc.muportData.symEncryptedData
    return createMuportDocument(publicKeys, recoveryNetwork, publicProfile, symEncryptedData)
  }
}

const initIpfs = (ipfsConf) => {
  ipfs = promisifyAll(new IPFS(ipfsConf || IPFS_CONF))
}

const createMuportDocument = (publicKeys, recoveryNetwork, publicProfile, symEncryptedData) => {
  let doc = {
    version: 1,
    ...publicKeys
  }
  if (recoveryNetwork) {
    doc.recoveryNetwork = recoveryNetwork
  }
  if (publicProfile) {
    doc.publicProfile = publicProfile
  }
  if (symEncryptedData) {
    doc.symEncryptedData = symEncryptedData
  }
  return doc
}

const bufferToDid = (didBuffer) => {
  return ('did:muport:' + bs58.encode(didBuffer))
}

const didToBuffer = (didUri) => {
  const hash = didUri.split(':')[2]
  return bs58.decode(hash)
}

module.exports = MuPort
