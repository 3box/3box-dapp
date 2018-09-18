const assert = require('chai').assert
const Keyring = require('../keyring')
const bip39 = require('bip39')
const nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')

// These are just random ipfs hashes
const DIDS = [
  'did:muport:QmZZBBKPS2NWc6PMZbUk9zUHCo1SHKzQPPX4ndfwaYzmPW',
  'did:muport:QmWfn55PTKTwCbdiEKgqdYXdJuHn25y6z7vwoV7QKLddVY',
  'did:muport:Qmbd63DgTfEH2xkLKfpVJovdqwZyZmrAkiEKV4do3nEPSU'
]

describe('Keyring', () => {

  let keyring1
  const mnemonic = 'clay rubber drama brush salute cream nerve wear stuff sentence trade conduct'
  const publicKeys = {
    signingKey: '028aaa695fa16f2a2279e1de718d80e00f4f4ddf30fe8674bbdb9e1f11778c2f77',
    managementKey: '027422e4f0321f010fd6b763bac41db22dcbf3717c7a9762bd7d2b9ce302152060',
    asymEncryptionKey: 'wW1wkjQ7kaZiBvk4bhukQ15Idx6d31XKFpq/jeup5nc='
  }
  const signedData = {
    r: 'b1f9c552e21b40fe95c5d3074a4ef3948a092a77fc814781bf8ae3a263499e0a',
    s: 'a57bdeb64a1490c3e8877d2d6e0c0450a87b765d8bf6f541b65bbf3aac1926f2',
    recoveryParam: 1
  }
  const keyring2 = new Keyring()
  const keyring3 = new Keyring()

  it('derives correct keys from mnemonic', async () => {
    keyring1 = new Keyring({mnemonic})

    assert.deepEqual(keyring1.getPublicKeys(), publicKeys)
    assert.deepEqual(keyring1.serialize().mnemonic, mnemonic)
    assert.deepEqual((await keyring1.getJWTSigner()('asdf')), signedData)
  })

  it('handles externalMgmtKey correctly', async () => {
    const external = '0xf3beac30c498d9e26865f34fcaa57dbb935b0d74'
    const keyring = new Keyring({externalMgmtKey: external})

    const address = keyring.getManagementAddress()
    assert.deepEqual(address, external)
    assert.deepEqual(keyring.getPublicKeys().managementKey, external)

    // serialize and deserialize correctly
    const serialized = keyring.serialize()
    const keyringCopy = new Keyring(serialized)
    assert.deepEqual(keyringCopy.serialize(), serialized)

    // should throw if signManagementTx is called
    let threwError = false
    try {
      keyring.signManagementTx()
    } catch (e) {
      threwError = true
    }
    assert.isTrue(threwError)
  })

  it('encrypts and decrypts correctly', () => {
    const testMsg = "Very secret test message"
    let box = keyring1.encrypt(testMsg, keyring2.getPublicKeys().asymEncryptionKey)

    let cleartext = keyring2.decrypt(box.ciphertext, keyring1.getPublicKeys().asymEncryptionKey, box.nonce)
    assert.equal(cleartext, testMsg)
  })

  it('splits shares correctly', async () => {
    delegatePubKeys = [
      keyring1.getPublicKeys().asymEncryptionKey,
      keyring2.getPublicKeys().asymEncryptionKey,
      keyring3.getPublicKeys().asymEncryptionKey
    ]
    const recoveryNetwork = await keyring1.createShares(DIDS, delegatePubKeys)
    const share2 = keyring2.decryptOneShare(recoveryNetwork, delegatePubKeys[0], DIDS[1])
    const share3 = keyring3.decryptOneShare(recoveryNetwork, delegatePubKeys[0], DIDS[2])

    const recoveredKeyring = await Keyring.recoverKeyring([share2, share3])
    assert.deepEqual(recoveredKeyring.getPublicKeys(), publicKeys)
  })

  it('symmetrically encrypts correctly', async () => {
    const testMsg = "Very secret test message"
    let box = keyring2.symEncrypt(testMsg)
    let cleartext = keyring2.symDecrypt(box.ciphertext, box.nonce)
    assert.equal(cleartext, testMsg)
  })

  it('returns the correct management address', () => {
    const managementAddress = '0x8997c4309384ECFE8A996A5e12E989fA08e9a0d1'
    const address = keyring1.getManagementAddress()
    assert.equal(address, managementAddress)
  })

  it('signs management tx correctly', () => {
    const signedRawTx = '0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ba064ff451a7884e83428bfd94811224519e0582d4af5c177ed2afcbe75563688e4a06536e60f06fa8f4e6412b14bd748d852bb60ff9659ee5247ce1ee7b319c6c7d0'
    const params = {
      nonce: '0x00',
      gasPrice: '0x09184e72a000',
      gasLimit: '0x2710',
      to: '0x0000000000000000000000000000000000000000',
      value: '0x00',
      data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
    }
    const rawTx = keyring1.signManagementTx(params)
    assert.equal(rawTx, signedRawTx)
  })
})
