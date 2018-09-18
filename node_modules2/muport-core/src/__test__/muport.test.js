const assert = require('chai').assert
const ganache = require('ganache-cli')
const EthrDIDRegistryAbi = require('ethr-did-registry').abi
const Web3 = require('web3')
const promisifyAll = require('bluebird').promisifyAll
const nock = require('nock')
let IPFS = require('ipfs-mini')
let ipfsDataStore = {}
let num = 1
IPFS.prototype.addJSON = (json, cb) => {
  // fake ipfs hash
  const hash = 'QmZZBBKPS2NWc6PMZbUk9zUHCo1SHKzQPPX4ndfwaYzmP' + num++
  ipfsDataStore[hash] = json
  cb(null, hash)
}
nock('https://ipfs.infura.io')
  .persist()
  .defaultReplyHeaders({ 'access-control-allow-origin': '*',
     'Content-Type': 'application/json',
     'Accept': 'application/json'
   })
  .get(/ipfs.*/)
  .reply(200, uri => ipfsDataStore[uri.slice(6)])
const RPC_PROV_URL = 'http://localhost:8555'
const CLAIM_KEY = '0x' + Buffer.from('muPortDocumentIPFS1220', 'utf8').toString('hex')
const deployData = require('./deployData.json')
const MuPort = require('../muport')
let id1
let id2
let id3
let id4
let id5
let id5externalMgmtKey

describe('MuPort', () => {

  let recoveredId4
  let server
  let web3
  let ipfsd
  let accounts
  let claimsReg

  beforeAll(async () => {
    server = promisifyAll(ganache.server())
    await server.listenAsync(8555)
    web3 = new Web3(server.provider)
    accounts = await web3.eth.getAccounts()
    await deploy(deployData.EthereumDIDRegistry)
    ethrRegistry = new web3.eth.Contract(EthrDIDRegistryAbi, deployData.EthereumDIDRegistry.contractAddress)

    jest.setTimeout(50000)
  })

  it('create an identity correctly', async () => {
    id1 = await MuPort.newIdentity({name: 'lala'}, null, {rpcProviderUrl: RPC_PROV_URL, ipfsConf: { host: 'localhost', protocol: 'http' }})
    const serialized = id1.serializeState()

    const tmpId = new MuPort(serialized)
    assert.deepEqual(tmpId.serializeState(), serialized)
  })

  it('recover identity correctly', async () => {
    id2 = await MuPort.newIdentity({name: 'id2'})
    id3 = await MuPort.newIdentity({name: 'id3'})
    // get dids from three identities and pass them along the identity creation process
    id4 = await MuPort.newIdentity({name: 'id4'}, [id1.getDid(), id2.getDid(), id3.getDid()], {rpcProviderUrl: RPC_PROV_URL})//, ipfsConf: { host: 'localhost', port: 12345, protocol: 'http' }})

    const didOfLostId = id4.getDid()
    const share2 = await id2.helpRecover(didOfLostId)
    const share3 = await id3.helpRecover(didOfLostId)
    recoveredId4 = await MuPort.recoverIdentity(didOfLostId, [share2, share3])

    assert.deepEqual(recoveredId4.serializeState(), id4.serializeState())
  })

  it('create an identity with externalMgmtKey correctly', async () => {
    id5externalMgmtKey = accounts[1]
    id5 = await MuPort.newIdentity({name: 'id5'}, null, {externalMgmtKey: id5externalMgmtKey, rpcProviderUrl: RPC_PROV_URL})
    const serialized = id5.serializeState()

    const tmpId = new MuPort(serialized)
    assert.deepEqual(tmpId.serializeState(), serialized)
  })

  it('returns the delegate DIDs correctly', async () => {
    const dids = id4.getRecoveryDelegateDids()
    assert.deepEqual(dids, [id1.getDid(), id2.getDid(), id3.getDid()])

    const didsFromRecovered = recoveredId4.getRecoveryDelegateDids()
    assert.deepEqual(didsFromRecovered, [id1.getDid(), id2.getDid(), id3.getDid()])
  })

  it('returns an empty list of delegate DIDs', async () => {
    const dids = id1.getRecoveryDelegateDids()
    assert.equal(dids.length, 0)

    const didsFromRecovered = recoveredId4.getRecoveryDelegateDids()
    assert.deepEqual(didsFromRecovered, [id1.getDid(), id2.getDid(), id3.getDid()])
  })

  it('updateIdentity should throw without data', async () => {
    let threwError = false
    try {
      await id1.updateIdentity(null, null)
    } catch (e) {
      threwError = true
    }
    assert.isTrue(threwError, 'should have thrown')
  })

  it('updating publicProfile works as intended', async () => {
    const updateData = await id1.updateIdentity({name: 'id1 newname'})

    let threwError = false
    try {
      await updateData.finishUpdate()
    } catch (e) {
      threwError = true
    }
    assert.isTrue(threwError, 'finishUpdate should throw if no funds in managementAddress')

    let lookedUpDoc = await MuPort.resolveIdentityDocument(id1.getDid(), {rpcProviderUrl: RPC_PROV_URL})
    assert.deepEqual(lookedUpDoc, id1.document, 'looked up document should not be updated yet')

    await web3.eth.sendTransaction({from: accounts[0], to: updateData.address, value: web3.utils.toWei(updateData.costInEther + '', 'ether')})
    await updateData.finishUpdate()

    lookedUpDoc = await MuPort.resolveIdentityDocument(id1.getDid(), {rpcProviderUrl: RPC_PROV_URL})
    assert.deepEqual(lookedUpDoc, id1.document, 'looked up document should be the same as in muport ID')
  })

  it('updating publicProfile with externalMgmtKey works as intended', async () => {
    const updateData = await id5.updateIdentity({name: 'id5 newname'})

    let threwError = false
    try {
      await updateData.finishUpdate()
    } catch (e) {
      threwError = true
    }
    assert.isTrue(threwError, 'finishUpdate should throw if no funds in managementAddress')

    let lookedUpDoc = await MuPort.resolveIdentityDocument(id5.getDid(), {rpcProviderUrl: RPC_PROV_URL})
    assert.deepEqual(lookedUpDoc, id5.document, 'looked up document should not be updated yet')

    const txHash = (await web3.eth.sendTransaction({ ...updateData.txParams, from: id5externalMgmtKey})).transactionHash
    await updateData.finishUpdate(txHash)

    lookedUpDoc = await MuPort.resolveIdentityDocument(id5.getDid(), {rpcProviderUrl: RPC_PROV_URL})
    assert.deepEqual(lookedUpDoc, id5.document, 'looked up document should be the same as in muport ID')
  })

  it('updating delegates works as intended', async () => {
    const updateData = await id1.updateIdentity(null, [id2.getDid(), id3.getDid(), id4.getDid()])

    let threwError = false
    try {
      await updateData.finishUpdate()
    } catch (e) {
      threwError = true
    }
    assert.isTrue(threwError, 'finishUpdate should throw if no funds in managementAddress')

    let lookedUpDoc = await MuPort.resolveIdentityDocument(id1.getDid(), {rpcProviderUrl: RPC_PROV_URL})
    assert.deepEqual(lookedUpDoc, id1.document, 'looked up document should not be updated yet')

    await web3.eth.sendTransaction({from: accounts[0], to: updateData.address, value: web3.utils.toWei(updateData.costInEther + '', 'ether')})
    await updateData.finishUpdate()

    lookedUpDoc = await MuPort.resolveIdentityDocument(id1.getDid(), {rpcProviderUrl: RPC_PROV_URL})
    assert.deepEqual(lookedUpDoc, id1.document, 'looked up document should be the same as in muport ID')
  })

  it('updating delegates a second time works as intended', async () => {
    const updateData = await id1.updateIdentity(null, [id4.getDid(), id2.getDid(), id3.getDid()])

    await web3.eth.sendTransaction({from: accounts[0], to: updateData.address, value: web3.utils.toWei(updateData.costInEther + '', 'ether')})
    await updateData.finishUpdate()

    let lookedUpDoc = await MuPort.resolveIdentityDocument(id1.getDid(), {rpcProviderUrl: RPC_PROV_URL})
    assert.deepEqual(lookedUpDoc, id1.document, 'looked up document should be the same as in muport ID')
  })

  it('signs JWT as intended', async () => {
    const jwt  = await id1.signJWT({test: 123, aud: id2.getDid()})
    let verified
    let threwError = false
    try {
      verified = await id1.verifyJWT(jwt)
    } catch (e) {
      threwError = true
    }
    assert.isTrue(threwError, 'trying to verify JWT with id it is not issued to should fail')
    verified = await id2.verifyJWT(jwt)
    assert.equal(verified.payload.aud, id2.getDid())
    assert.equal(verified.payload.iss, id1.getDid())
  })

  afterAll(() => {
    server.close()
  })

  const deploy = async deployData => {
    await web3.eth.sendTransaction({from: accounts[0], to: deployData.senderAddress, value: web3.utils.toWei(deployData.costInEther + '', 'ether')})
    let txHash = await web3.eth.sendSignedTransaction(deployData.rawTx)
    let receipt = await web3.eth.getTransactionReceipt(txHash)
  }
})
