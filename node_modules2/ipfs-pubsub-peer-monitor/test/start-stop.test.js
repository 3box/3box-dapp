'use strict'

const assert = require('assert')
const Monitor = require('../src/ipfs-pubsub-peer-monitor')

const peers = ['A', 'B', 'C']
const topic = 'tests'

const mockPubsub = {
  peers: () => Promise.resolve(peers)
}

describe('start and stop', () => {
  it('started property is immutable', async () => {
    const m = new Monitor(mockPubsub, topic)
    let err
    try {
      m.started = true
    } catch (e) {
      err = e
    }
    assert.equal(err, "Error: 'started' is read-only")
  })

  it('removes all event listeners on stop', async () => {
    const m = new Monitor(mockPubsub, topic)
    m.on('error', () => {})
    m.on('join', () => {})
    m.on('leave', () => {})
    assert.equal(m.listenerCount('error'), 1)
    assert.equal(m.listenerCount('join'), 1)
    assert.equal(m.listenerCount('leave'), 1)
    m.stop()
    assert.equal(m.listenerCount('error'), 0)
    assert.equal(m.listenerCount('join'), 0)
    assert.equal(m.listenerCount('leave'), 0)
  })

  describe('poll loop', () => {
    it('starts polling peers', () => {
      const m = new Monitor(mockPubsub, topic)
      assert.notEqual(m, null)
      assert.equal(m.started, true)
    })

    it('doesn\'t start polling peers', () => {
      const m = new Monitor(mockPubsub, topic, { start: false })
      assert.notEqual(m, null)
      assert.equal(m.started, false)
    })

    it('starts polling peers when started manually', () => {
      const m = new Monitor(mockPubsub, topic, { start: false })
      m.start()
      assert.equal(m.started, true)
    })

    it('stops polling peers', () => {
      const m = new Monitor(mockPubsub, topic)
      m.stop()
      assert.equal(m.started, false)
    })

    it('polls with the given interval', async () => {
      const interval = 100
      const margin = interval / 10

      const m = new Monitor(mockPubsub, topic, { pollInterval: interval })
      const startTime = new Date().getTime()

      await new Promise((resolve, reject) => {
        let count = 0
        m.on('join', () => {
          try {
            const stopTime = new Date().getTime()
            const deltaTime = stopTime - startTime
            assert.equal(deltaTime >= interval, true)
            assert.equal(deltaTime < interval + margin, true, `Not within margin of ${margin} ms`)
            resolve()
          } catch (e) {
            reject(e)
          }
        })
      })
    })
  })
})
