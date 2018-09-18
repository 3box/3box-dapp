'use strict'

const assert = require('assert')
const EventEmitter = require('events')
const Monitor = require('../src/ipfs-pubsub-peer-monitor')

const peers = ['A', 'B', 'C', 'D', 'E']
const topic = 'tests'

const mockPubsub = {
  peers: () => Promise.resolve(peers)
}

describe('peer monitor', () => {
  it('finds peers', async () => {
    const m = new Monitor(mockPubsub, topic, { pollInterval: 100 })
    const newPeers = await m.getPeers()
    assert.deepEqual(newPeers, peers)
  })

  it('emits \'join\' event for each peer', async () => {
    const m = new Monitor(mockPubsub, topic, { pollInterval: 10 })
    await new Promise((resolve, reject) => {
      let count = 0
      let res = []
      m.on('join', peer => {
        try {
          count ++
          res.push(peer)
          assert.equal(count <= peers.length, true)
          if (count === peers.length) {
            assert.deepEqual(res, peers)
            resolve()
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  })

  it('emits joins', async () => {
    const ee = new EventEmitter()
    await new Promise((resolve, reject) => {
      let res = []
      
      const done = () => {
        assert.equal(res.length, 2)
        assert.equal(res[0], 'C')
        assert.equal(res[1], 'D')
        resolve()
      }

      ee.on('join', peer => {
        res.push(peer)
        if (res.length === 2)
          done()
      })

      Monitor._emitJoinsAndLeaves(new Set(['A', 'B']), new Set(['A', 'B', 'C', 'D']), ee)
    })
  })

  it('emits leaves', async () => {
    const ee = new EventEmitter()
    await new Promise((resolve, reject) => {
      let res = []
      
      const done = () => {
        assert.equal(res.length, 2)
        assert.equal(res[0], 'A')
        assert.equal(res[1], 'B')
        resolve()
      }

      ee.on('leave', peer => {
        res.push(peer)
        if (res.length === 2)
          done()
      })

      Monitor._emitJoinsAndLeaves(new Set(['A', 'B']), new Set(), ee)
    })
  })

  it('emits nothing', async () => {
    const ee = new EventEmitter()
    await new Promise((resolve, reject) => {
      ee.on('join', peer => assert.equal(peer, null))
      ee.on('leave', peer => assert.equal(peer, null))
      Monitor._emitJoinsAndLeaves(new Set(['A', 'B']), new Set(['A', 'B']), ee)
      resolve()
    })
  })
})
