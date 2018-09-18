'use strict'

const path = require('path')
const rmrf = require('rimraf')
const assert = require('assert')
const pMapSeries = require('p-map-series')
const { 
  createIpfsTestInstances,
  destroyIpfsTestInstances,
  connectIpfsInstances,
  waitForPeers,
} = require('./utils/ipfs-utils')

const Channel = require('../src/direct-channel')
const getPeerID = require('../src/get-peer-id')
const PROTOCOL = require('../src/protocol')

// IPFS instances used in these tests
const ipfsPaths = [
  './tmp/peer1/ipfs',
  './tmp/peer2/ipfs',
  './tmp/peer3/ipfs',
]

describe('DirectChannel', function() {
  this.timeout(20000)

  let instances = []
  let ipfs1, ipfs2, ipfs3

  let id1, id2, id3
  let expectedPeerIDs = []

  before(async () => {
    instances = await createIpfsTestInstances(ipfsPaths)
    await connectIpfsInstances(instances)
    ipfs1 = instances[0]
    ipfs2 = instances[1]
    ipfs3 = instances[2]
    id1 = await getPeerID(ipfs1)
    id2 = await getPeerID(ipfs2)
    id3 = await getPeerID(ipfs3)
    // Note, we only create channels between peer1 and peer2 in these test,
    // peer3 is used for "external actor" tests
    expectedPeerIDs = Array.from([id1, id2]).sort()
  })

  after(async () => {
    await destroyIpfsTestInstances(instances, ipfsPaths)
    rmrf.sync('./tmp/') // remove test data directory
  })

  describe('create a channel', function() {
    it('has two participants', async () => {
      const c = await Channel.open(ipfs1, id2)
      assert.deepEqual(c.peers, expectedPeerIDs)
      c.close()
    })

    it('has correct ID', async () => {
      const expectedID = path.join('/', PROTOCOL, expectedPeerIDs.join('/'))
      const c = await Channel.open(ipfs1, id2)
      assert.deepEqual(c.id, expectedID)
      c.close()
    })

    it('has two peers', async () => {
      const c1 = await Channel.open(ipfs1, id2)
      const c2 = await Channel.open(ipfs2, id1)
      assert.deepEqual(c1.peers, expectedPeerIDs)
      assert.deepEqual(c2.peers, expectedPeerIDs)
      assert.equal(c1.id, path.join('/', PROTOCOL, expectedPeerIDs.join('/')))
      assert.equal(c2.id, path.join('/', PROTOCOL, expectedPeerIDs.join('/')))
      c1.close()
      c2.close()
    })

    it('can be created with one line', async () => {
      const c = await Channel.open(ipfs1, id2)
      const topics = await ipfs1.pubsub.ls()
      const channelID = topics.find(e => e === c.id)
      assert.equal(channelID, c.id)
      c.close()
    })
  })

  describe('properties', function() {
    let c

    beforeEach(async () => {
      c = await Channel.open(ipfs1, id2)
    })

    afterEach(() => {
      if (c) {
        c.close()
      }
    })

    it('has an id', async () => {
      assert.equal(c.id, path.join('/', PROTOCOL, expectedPeerIDs.join('/')))
    })

    it('has two peers', async () => {
      assert.equal(c.peers.length, 2)
      assert.deepEqual(c.peers, expectedPeerIDs)
    })

    it('has an event emitter for \'message\' event', async () => {
      let err
      try {
        c.on('message', () => {})
      } catch (e) {
        err = e
      }
      assert.equal(err, null)
    })
  })

  describe('messaging', function() {
    it('sends and receives messages', async () => {
      const c1 = await Channel.open(ipfs1, id2)
      const c2 = await Channel.open(ipfs2, id1)

      await c1.connect()
      await c2.connect()

      return new Promise(async (resolve, reject) => {
        c1.on('error', reject)
        c2.on('error', reject)

        c2.on('message', async (m) => {
          assert.notEqual(m, null)
          assert.equal(m.from, id1)
          assert.equal(m.data.toString(), 'hello1')
          assert.equal(m.topicIDs.length, 1)
          assert.equal(m.topicIDs[0], c1.id)
          assert.equal(m.topicIDs[0], c2.id)
          await c2.send(Buffer.from('hello2'))
        })

        c1.on('message', (m) => {
          assert.equal(m.from, id2)
          assert.equal(m.data.toString(), Buffer.from('hello2'))
          assert.equal(m.topicIDs.length, 1)
          assert.equal(m.topicIDs[0], c1.id)
          assert.equal(m.topicIDs[0], c2.id)
          c1.close()
          c2.close()
          setTimeout(() => resolve(), 500)
        })

        await c1.send('hello1')
      })
    })
  })

  describe('connect', function() {
    it('connects the peers', async () => {
      let c1, c2

      c1 = await Channel.open(ipfs1, id2)
      c2 = await Channel.open(ipfs2, id1)

      let peers = await ipfs1.pubsub.peers(c1.id)
      assert.deepEqual(peers, [])

      await c1.connect()

      peers = await ipfs1.pubsub.peers(c1.id)
      assert.deepEqual(peers, [id2])

      c1.close()
      c2.close()
    })
  })

  describe('disconnecting', function() {
    it('closes a channel', async () => {
      const c1 = await Channel.open(ipfs1, id2)
      const c2 = await Channel.open(ipfs2, id1)

      await c1.connect()
      await c2.connect()

      return new Promise(async (resolve, reject) => {
        c1.close()
        const topics1 = await ipfs1.pubsub.ls()
        assert.deepEqual(topics1, [])

        c2.close()
        const topics2 = await ipfs2.pubsub.ls()
        assert.deepEqual(topics1, [])

        setTimeout(async () => {
          const peers1 = await ipfs1.pubsub.peers(c1.id)
          const peers2 = await ipfs2.pubsub.peers(c1.id)
          assert.deepEqual(peers1, [])
          assert.deepEqual(peers2, [])
          resolve()
        }, 200)
      })
    })

    it('removes event listener upon closing the channel', async () => {
      const c1 = await Channel.open(ipfs1, id2)
      const c2 = await Channel.open(ipfs2, id1)
      c1.on('message', () => {})
      c2.on('message', () => {})
      await c1.connect()
      await c2.connect()
      assert.equal(c1.listenerCount('message'), 1)
      assert.equal(c2.listenerCount('message'), 1)
      c1.close()
      c2.close()
      assert.equal(c1.listenerCount('message'), 0)
      assert.equal(c2.listenerCount('message'), 0)
    })
  })

  describe('errors', function() {
    it('throws an error if pubsub is not supported by given IPFS instance', async () => {
      let c, err
      try {
        c = await Channel.open({}, id2)
      } catch (e) {
        err = e
      }

      assert.equal(err, 'Error: This IPFS node does not support pubsub.')
    })

    it('throws an error if receiver ID was not given', async () => {
      let c, err
      try {
        c = await Channel.open(ipfs1)
      } catch (e) {
        err = e
      }

      assert.equal(err, 'Error: Receiver ID was undefined')
    })
  })

  describe('non-participant peers can\'t send messages', function() {
    it('doesn\'t receive unwated messages', async () => {
      const c1 = await Channel.open(ipfs1, id2)
      const c2 = await Channel.open(ipfs2, id1)

      await c1.connect()
      await c2.connect()

      c1.on('message', (m) => {
        assert.equal(m.from, id2)
        assert.equal(m.data.toString(), 'hello1')
        assert.equal(m.topicIDs.length, 1)
        assert.equal(m.topicIDs[0], c1.id)
        assert.equal(m.topicIDs[0], c2.id)
      })

      await ipfs3.pubsub.subscribe(c1.id, () => {})
      await waitForPeers(ipfs1, [id3], c1.id)
      await ipfs3.pubsub.publish(c1.id, Buffer.from('OMG!'))

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          c2.send('hello1')
          setTimeout(() => {
            c1.close()
            c2.close()
            resolve()
          }, 1000)
        }, 1000)
      })
    })
  })
})
