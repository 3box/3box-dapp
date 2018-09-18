'use strict'

const EventEmitter = require('events').EventEmitter
const Readable = require('readable-stream')
const mapSeries = require('p-each-series')
const Log = require('ipfs-log')
const Index = require('./Index')
const Replicator = require('./Replicator')
const ReplicationInfo = require('./replication-info')

const Logger = require('logplease')
const logger = Logger.create("orbit-db.store", { color: Logger.Colors.Blue })
Logger.setLogLevel('ERROR')

const DefaultOptions = {
  Index: Index,
  maxHistory: -1,
  path: './orbitdb',
  replicate: true,
  referenceCount: 64,
  replicationConcurrency: 128,
}

class Store {
  constructor (ipfs, peerId, address, options) {
    // Set the options
    let opts = Object.assign({}, DefaultOptions)
    Object.assign(opts, options)
    this.options = opts

    // Default type
    this._type = 'store'

    // Create IDs, names and paths
    this.id = address.toString()
    this.uid = peerId
    this.address = address
    this.dbname = address.path || ''
    this.events = new EventEmitter()

    // External dependencies
    this._ipfs = ipfs
    this._cache = options.cache

    this._keystore = options.keystore
    this._key = options && options.key
      ? options.key
      : this._keystore.getKey(peerId) || this._keystore.createKey(peerId)
    // FIX: duck typed interface
    this._ipfs.keystore = this._keystore

    // Access mapping
    const defaultAccess = {
      admin: [this._key.getPublic('hex')],
      read: [], // Not used atm, anyone can read
      write: [this._key.getPublic('hex')],
    }
    this.access = options.accessController || defaultAccess

    // Create the operations log
    this._oplog = new Log(this._ipfs, this.id, null, null, null, this._key, this.access.write)

    // Create the index
    this._index = new this.options.Index(this.uid)

    // Replication progress info
    this._replicationStatus = new ReplicationInfo()

    // Statistics
    this._stats = {
      snapshot: {
        bytesLoaded: -1,
      },
      syncRequestsReceieved: 0,
    }

    try {
      this._replicator = new Replicator(this, this.options.replicationConcurrency)
      // For internal backwards compatibility,
      // to be removed in future releases
      this._loader = this._replicator
      this._replicator.on('load.added', (entry) => {
        // Update the latest entry state (latest is the entry with largest clock time)
        this._replicationStatus.queued ++
        this._recalculateReplicationMax(entry.clock ? entry.clock.time : 0)
        // logger.debug(`<replicate>`)
        this.events.emit('replicate', this.address.toString(), entry)
      })
      this._replicator.on('load.progress', (id, hash, entry, have, bufferedLength) => {
        if (this._replicationStatus.buffered > bufferedLength) {
          this._recalculateReplicationProgress(this.replicationStatus.progress + bufferedLength)
        } else {
          this._recalculateReplicationProgress(this._oplog.length + bufferedLength)
        }
        this._replicationStatus.buffered = bufferedLength
        this._recalculateReplicationMax(this.replicationStatus.progress)
        // logger.debug(`<replicate.progress>`)
        this.events.emit('replicate.progress', this.address.toString(), hash, entry, this.replicationStatus.progress, this.replicationStatus.max)
      })

      const onLoadCompleted = async (logs, have) => {
        try {
          for (let log of logs) {
            await this._oplog.join(log)
          }
          this._replicationStatus.queued -= logs.length
          this._replicationStatus.buffered = this._replicator._buffer.length
          await this._updateIndex()

          //only store heads that has been verified and merges
          const heads = this._oplog.heads
          await this._cache.set('_remoteHeads', heads)
          logger.debug(`Saved heads ${heads.length} [${heads.map(e => e.hash).join(', ')}]`)

          // logger.debug(`<replicated>`)
          this.events.emit('replicated', this.address.toString(), logs.length)
        } catch (e) {
          console.error(e)
        }
      }
      this._replicator.on('load.end', onLoadCompleted)
    } catch (e) {
      console.error("Store Error:", e)
    }
  }

  get all () {
    return Array.isArray(this._index._index)
      ? this._index._index
      : Object.keys(this._index._index).map(e => this._index._index[e])
  }

  get type () {
    return this._type
  }

  get key () {
    return this._key
  }

  /**
   * Returns the database's current replication status information
   * @return {[Object]} [description]
   */
  get replicationStatus () {
    return this._replicationStatus
  }

  async close () {
    if (this.options.onClose)
      await this.options.onClose(this.address.toString())

    //Replicator teardown logic
    this._replicator.stop();

    // Reset replication statistics
    this._replicationStatus.reset()

    // Reset database statistics
    this._stats = {
      snapshot: {
        bytesLoaded: -1,
      },
      syncRequestsReceieved: 0,
    }

    // Remove all event listeners
    this.events.removeAllListeners('load')
    this.events.removeAllListeners('load.progress')
    this.events.removeAllListeners('replicate')
    this.events.removeAllListeners('replicate.progress')
    this.events.removeAllListeners('replicated')
    this.events.removeAllListeners('ready')
    this.events.removeAllListeners('write')

    // Close cache
    await this._cache.close()

    // Database is now closed
    // TODO: afaik we don't use 'closed' event anymore,
    // to be removed in future releases
    this.events.emit('closed', this.address.toString())
    return Promise.resolve()
  }

  /**
   * Drops a database and removes local data
   * @return {[None]}
   */
  async drop () {
    await this.close()
    await this._cache.destroy()
    // Reset
    this._index = new this.options.Index(this.uid)
    this._oplog = new Log(this._ipfs, this.id, null, null, null, this._key, this.access.write)
    this._cache = this.options.cache
  }

  async load (amount) {
    amount = amount || this.options.maxHistory

    const localHeads = await this._cache.get('_localHeads') || []
    const remoteHeads = await this._cache.get('_remoteHeads') || []
    const heads = localHeads.concat(remoteHeads)

    if (heads.length > 0)
      this.events.emit('load', this.address.toString(), heads)

    await mapSeries(heads, async (head) => {
      this._recalculateReplicationMax(head.clock.time)
      let log = await Log.fromEntryHash(this._ipfs, head.hash, this._oplog.id, amount, this._oplog.values, this._key, this.access.write, this._onLoadProgress.bind(this))
      await this._oplog.join(log, amount)
    })

    // Update the index
    if (heads.length > 0)
      await this._updateIndex()

    this.events.emit('ready', this.address.toString(), this._oplog.heads)
  }

  sync (heads) {
    this._stats.syncRequestsReceieved += 1
    logger.debug(`Sync request #${this._stats.syncRequestsReceieved} ${heads.length}`)

    if (heads.length === 0)
      return

    // To simulate network latency, uncomment this line
    // and comment out the rest of the function
    // That way the object (received as head message from pubsub)
    // doesn't get written to IPFS and so when the Replicator is fetching
    // the log, it'll fetch it from the network instead from the disk.
    // return this._replicator.load(heads)

    const saveToIpfs = (head) => {
      if (!head) {
        console.warn("Warning: Given input entry was 'null'.")
        return Promise.resolve(null)
      }

      if (!this.access.write.includes(head.key) && !this.access.write.includes('*')) {
        console.warn("Warning: Given input entry is not allowed in this log and was discarded (no write access).")
        return Promise.resolve(null)
      }

      // TODO: verify the entry's signature here

      const logEntry = Object.assign({}, head)
      logEntry.hash = null
      return this._ipfs.object.put(Buffer.from(JSON.stringify(logEntry)))
        .then((dagObj) => dagObj.toJSON().multihash)
        .then(hash => {
          // We need to make sure that the head message's hash actually
          // matches the hash given by IPFS in order to verify that the
          // message contents are authentic
          if (hash !== head.hash) {
            console.warn('"WARNING! Head hash didn\'t match the contents')
          }

          return hash
        })
        .then(() => head)
    }

    return mapSeries(heads, saveToIpfs)
      .then(async (saved) => {
          return this._replicator.load(saved.filter(e => e !== null))
      })
  }

  loadMoreFrom (amount, entries) {
    this._replicator.load(entries)
  }

  async saveSnapshot () {
    const unfinished = this._replicator.getQueue()

    let snapshotData = this._oplog.toSnapshot()
    let header = new Buffer(JSON.stringify({
      id: snapshotData.id,
      heads: snapshotData.heads,
      size: snapshotData.values.length,
      type: this.type,
    }))
    const rs = new Readable()
    let size = new Uint16Array([header.length])
    let bytes = new Buffer(size.buffer)
    rs.push(bytes)
    rs.push(header)

    const addToStream = (val) => {
      let str = new Buffer(JSON.stringify(val))
      let size = new Uint16Array([str.length])
      rs.push(new Buffer(size.buffer))
      rs.push(str)
    }

    snapshotData.values.forEach(addToStream)
    rs.push(null) // tell the stream we're finished

    const snapshot = await this._ipfs.files.add(rs)

    await this._cache.set('snapshot', snapshot[snapshot.length - 1])
    await this._cache.set('queue', unfinished)

    logger.debug(`Saved snapshot: ${snapshot[snapshot.length - 1].hash}, queue length: ${unfinished.length}`)

    return snapshot
  }

  async loadFromSnapshot (onProgressCallback) {
    this.events.emit('load', this.address.toString())

    const maxClock = (res, val) => Math.max(res, val.clock.time)

    const queue = await this._cache.get('queue')
    this.sync(queue || [])

    const snapshot = await this._cache.get('snapshot')

    if (snapshot) {
      const res = await this._ipfs.files.catReadableStream(snapshot.hash)
      const loadSnapshotData = () => {
        return new Promise((resolve, reject) => {
          let buf = new Buffer(0)
          let q = []

          const bufferData = (d) => {
            this._byteSize += d.length
            if (q.length < 20000) {
              q.push(d)
            } else {
              const a = Buffer.concat(q)
              buf = Buffer.concat([buf, a])
              q = []
            }
          }

          const done = () => {
            if (q.length > 0) {
              const a = Buffer.concat(q)
              buf = Buffer.concat([buf, a])
            }

            function toArrayBuffer (buf) {
              var ab = new ArrayBuffer(buf.length)
              var view = new Uint8Array(ab)
              for (var i = 0; i < buf.length; ++i) {
                view[i] = buf[i]
              }
              return ab
            }

            const headerSize = parseInt(new Uint16Array(toArrayBuffer(buf.slice(0, 2))))
            let header

            try {
              header = JSON.parse(buf.slice(2, headerSize + 2))
            } catch (e) {
              // TODO
            }

            let values = []
            let a = 2 + headerSize
            while (a < buf.length) {
              const s = parseInt(new Uint16Array(toArrayBuffer(buf.slice(a, a + 2))))
              a += 2
              const data = buf.slice(a, a + s)
              try {
                const d = JSON.parse(data)
                values.push(d)
              } catch (e) {
              }
              a += s
            }

            if (header) {
              this._type = header.type
              resolve({ values: values, id: header.id, heads: header.heads, type: header.type })
            } else {
              resolve({ values: values, id: null, heads: null, type: null })
            }
          }
          res.on('data', bufferData)
          res.on('end', done)
        })
      }

      const onProgress = (hash, entry, count, total) => {
        this._recalculateReplicationStatus(count, entry.clock.time)
        this._onLoadProgress(hash, entry)
      }

      // Fetch the entries
      // Timeout 1 sec to only load entries that are already fetched (in order to not get stuck at loading)
      const snapshotData = await loadSnapshotData()
      this._recalculateReplicationMax(snapshotData.values.reduce(maxClock, 0))
      if (snapshotData) {
        const log = await Log.fromJSON(this._ipfs, snapshotData, -1, this._key, this.access.write, 1000, onProgress)
        await this._oplog.join(log)
        await this._updateIndex()
        this.events.emit('replicated', this.address.toString())
      }
      this.events.emit('ready', this.address.toString(), this._oplog.heads)
    } else {
      throw new Error(`Snapshot for ${this.address} not found!`)
    }

    return this
  }

  async _updateIndex () {
    this._recalculateReplicationMax()
    await this._index.updateIndex(this._oplog)
    this._recalculateReplicationProgress()
  }

  async _addOperation (data, batchOperation, lastOperation, onProgressCallback) {
    if (this._oplog) {
      const entry = await this._oplog.append(data, this.options.referenceCount)
      this._recalculateReplicationStatus(this.replicationStatus.progress + 1, entry.clock.time)
      await this._cache.set('_localHeads', [entry])
      await this._updateIndex()
      this.events.emit('write', this.address.toString(), entry, this._oplog.heads)
      if (onProgressCallback) onProgressCallback(entry)
      return entry.hash
    }
  }

  _addOperationBatch (data, batchOperation, lastOperation, onProgressCallback) {
    throw new Error("Not implemented!")
  }

  _onLoadProgress (hash, entry, progress, total) {
    this._recalculateReplicationStatus(progress, total)
    this.events.emit('load.progress', this.address.toString(), hash, entry, this.replicationStatus.progress, this.replicationStatus.max)
  }

  /* Replication Status state updates */

  _recalculateReplicationProgress (max) {
    this._replicationStatus.progress = Math.max.apply(null, [
      this._replicationStatus.progress,
      this._oplog.length,
      max || 0,
    ])
    this._recalculateReplicationMax(this.replicationStatus.progress)
  }

  _recalculateReplicationMax (max) {
    this._replicationStatus.max = Math.max.apply(null, [
      this._replicationStatus.max,
      this._oplog.length,
      max || 0,
    ])
  }

  _recalculateReplicationStatus (maxProgress, maxTotal) {
    this._recalculateReplicationProgress(maxProgress)
    this._recalculateReplicationMax(maxTotal)
  }
}

module.exports = Store
