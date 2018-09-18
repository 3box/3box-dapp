'use strict'

const pSeries = require('p-series')
const PeerMonitor = require('ipfs-pubsub-peer-monitor')

const Logger = require('logplease')
const logger = Logger.create("pubsub", { color: Logger.Colors.Yellow })
Logger.setLogLevel('ERROR')

const maxTopicsOpen = 256
let topicsOpenCount = 0

class IPFSPubsub {
  constructor(ipfs, id) {
    this._ipfs = ipfs
    this._id = id
    this._subscriptions = {}

    if (this._ipfs.pubsub === null)
      logger.error("The provided version of ipfs doesn't have pubsub support. Messages will not be exchanged.")

    this._handleMessage = this._handleMessage.bind(this)

    // Bump up the number of listeners we can have open,
    // ie. number of databases replicating
    if (this._ipfs.setMaxListeners)
      this._ipfs.setMaxListeners(maxTopicsOpen)
  }

  async subscribe(topic, onMessageCallback, onNewPeerCallback) {
    if(!this._subscriptions[topic] && this._ipfs.pubsub) {
      await this._ipfs.pubsub.subscribe(topic, this._handleMessage)

      const topicMonitor = new PeerMonitor(this._ipfs.pubsub, topic)

      topicMonitor.on('join', (peer) => {
        logger.debug(`Peer joined ${topic}:`)
        logger.debug(peer)
        if (this._subscriptions[topic]) {
          onNewPeerCallback(topic, peer)
        } else {
          logger.warn('Peer joined a room we don\'t have a subscription for')
          logger.warn(topic, peer)
        }
      })

      topicMonitor.on('leave', (peer) => logger.debug(`Peer ${peer} left ${topic}`))
      topicMonitor.on('error', (e) => logger.error(e))

      this._subscriptions[topic] = {
        topicMonitor: topicMonitor,
        onMessage: onMessageCallback,
        onNewPeer: onNewPeerCallback
      }

      topicsOpenCount ++
      logger.debug("Topics open:", topicsOpenCount)
    }
  }

  async unsubscribe(hash) {
    if(this._subscriptions[hash]) {
      await this._ipfs.pubsub.unsubscribe(hash, this._handleMessage)
      this._subscriptions[hash].topicMonitor.stop()
      delete this._subscriptions[hash]
      logger.debug(`Unsubscribed from '${hash}'`)
      topicsOpenCount --
      logger.debug("Topics open:", topicsOpenCount)
    }
  }

  publish(topic, message) {
    if(this._subscriptions[topic] && this._ipfs.pubsub) {
      this._ipfs.pubsub.publish(topic, Buffer.from(JSON.stringify(message)))
    }
  }

  async disconnect() {
    const topics = Object.keys(this._subscriptions)
    await pSeries(topics.map((t) => this.unsubscribe.bind(this, t)))
    this._subscriptions = {}
  }

  async _handleMessage(message) {
    // Don't process our own messages
    if (message.from === this._id)
      return

    // Get the message content and a subscription
    let content, subscription, topicId
    try {
      // Get the topic
      topicId = message.topicIDs[0]
      content = JSON.parse(message.data)
      subscription = this._subscriptions[topicId]
    } catch (e) {
      logger.error(e)
      logger.error('Couldn\'t parse pubsub message:', message)
    }

    if(subscription && subscription.onMessage && content) {
      await subscription.onMessage(topicId, content)
    }
  }
}

module.exports = IPFSPubsub
