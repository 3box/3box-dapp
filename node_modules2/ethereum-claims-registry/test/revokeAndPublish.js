const EthereumClaimsRegistry = artifacts.require('EthereumClaimsRegistry')
const RevokeAndPublish = artifacts.require('RevokeAndPublish')
const generateDeployTxs = require('../scripts/generateDeployTxs')
const promisifyAll = require('bluebird').promisifyAll


contract('RevokeAndPublish', accounts => {

  let revPub
  let claimsReg

  const testKey = 'key123'
  const testVal1 = 'abc123'
  const testVal2 = 'abc456'
  const testVal3 = 'abc789'
  const testVal4 = 'def789'

  before(async () => {
    web3.eth = promisifyAll(web3.eth)
    const deployData = generateDeployTxs()
    // deploy the ECR
    await deploy(deployData.EthereumClaimsRegistry)
    claimsReg = await EthereumClaimsRegistry.at(deployData.EthereumClaimsRegistry.contractAddress)
    await deploy(deployData.RevokeAndPublish)
    revPub = await RevokeAndPublish.at(deployData.RevokeAndPublish.contractAddress)
  })


  it('should not set data when publish is called by unauthorized', async () => {
    try {
      await revPub.publish(accounts[1], testKey, testVal1, {from: accounts[0]})
      assert.fail()
    } catch (error) {
      assert.equal(error.message, 'VM Exception while processing transaction: revert')
    }
  })

  it('should set data when publish is called', async () => {
    await revPub.publish(accounts[0], testKey, testVal1, {from: accounts[0]})

    let entry = await claimsReg.registry(revPub.address, accounts[0], testKey)
    assert.equal(Buffer.from(entry.split('00').join('').slice(2), 'hex').toString(), testVal1, 'should have correct value')
  })

  it('should lookup data correctly', async () => {
    let entry = await revPub.lookup(accounts[0], testKey)
    assert.equal(Buffer.from(entry.split('00').join('').slice(2), 'hex').toString(), testVal1, 'should have correct value')
  })

  it('should set data and rotate key when revokeAndPublish is called', async () => {
    const tx = await revPub.revokeAndPublish(accounts[0], testKey, testVal2, accounts[1], {from: accounts[0]})

    let entry = await claimsReg.registry(revPub.address, accounts[0], testKey)
    assert.equal(Buffer.from(entry.split('00').join('').slice(2), 'hex').toString(), testVal2, 'should have correct value')

    let manager = await revPub.manager(accounts[0])
    assert.equal(manager, accounts[1])

    let event = tx.logs[0].args
    assert.equal(event.genesis, accounts[0])
    assert.equal(event.from, '0x0000000000000000000000000000000000000000')
    assert.equal(event.to, accounts[1])
  })

  it('should not set data when publish is called by unauthorized (keys rotated)', async () => {
    try {
      await revPub.publish(accounts[0], testKey, testVal1, {from: accounts[0]})
      assert.fail()
    } catch (error) {
      assert.equal(error.message, 'VM Exception while processing transaction: revert')
    }
  })

  it('should not set data and rotate keys when publish is called by unauthorized (keys rotated)', async () => {
    try {
      await revPub.revokeAndPublish(accounts[0], testKey, testVal1, accounts[3], {from: accounts[0]})
      assert.fail()
    } catch (error) {
      assert.equal(error.message, 'VM Exception while processing transaction: revert')
    }
  })

  it('should set data when publish is called (keys rotated)', async () => {
    await revPub.publish(accounts[0], testKey, testVal3, {from: accounts[1]})

    let entry = await claimsReg.registry(revPub.address, accounts[0], testKey)
    assert.equal(Buffer.from(entry.split('00').join('').slice(2), 'hex').toString(), testVal3, 'should have correct value')
  })

  it('should set data and rotate key when revokeAndPublish is called (keys rotated)', async () => {
    const tx = await revPub.revokeAndPublish(accounts[0], testKey, testVal4, accounts[2], {from: accounts[1]})

    let entry = await claimsReg.registry(revPub.address, accounts[0], testKey)
    assert.equal(Buffer.from(entry.split('00').join('').slice(2), 'hex').toString(), testVal4, 'should have correct value')

    let manager = await revPub.manager(accounts[0])
    assert.equal(manager, accounts[2])

    let event = tx.logs[0].args
    assert.equal(event.genesis, accounts[0])
    assert.equal(event.from, accounts[1])
    assert.equal(event.to, accounts[2])
  })

  const deploy = async deployData => {
    await web3.eth.sendTransactionAsync({from: accounts[0], to: deployData.senderAddress, value: web3.toWei(deployData.costInEther, 'ether')})
    const txHash = await web3.eth.sendRawTransactionAsync(deployData.rawTx)

    const receipt = await web3.eth.getTransactionReceiptAsync(txHash)
    console.log('Gas used for deployment:', receipt.gasUsed)
  }
})

