const EventEmitter = require('events').EventEmitter
const pMap = require('p-map')
const Log = require('ipfs-log')

const Logger = require('logplease')
const logger = Logger.create("replicator", { color: Logger.Colors.Cyan })
Logger.setLogLevel('ERROR')

const getNext = e => e.next
const flatMap = (res, val) => res.concat(val)
const notNull = entry => entry !== null && entry !== undefined
const uniqueValues = (res, val) => {
  res[val] = val
  return res
}

const batchSize = 1

class Replicator extends EventEmitter {
  constructor (store, concurrency) {
    super()
    this._store = store
    this._fetching = {}
    this._stats = {
      tasksRequested: 0,
      tasksStarted: 0,
      tasksProcessed: 0,
    }
    this._buffer = []

    this._concurrency = concurrency || 128
    this._queue = {}
    this._q = new Set()

    // Flush the queue as an emergency switch
    this._flushTimer = setInterval(() => {
      if (this.tasksRunning === 0 && Object.keys(this._queue).length > 0) {
        logger.warn("Had to flush the queue!", Object.keys(this._queue).length, "items in the queue, ", this.tasksRequested, this.tasksFinished, " tasks requested/finished")
        setTimeout(() => this._processQueue(), 0)
      }
    }, 3000)
  }

  /**
   * Returns the number of tasks started during the life time
   * @return {[Integer]} [Number of tasks started]
   */
  get tasksRequested () {
    return this._stats.tasksRequested
  }

  /**
   * Returns the number of tasks started during the life time
   * @return {[Integer]} [Number of tasks running]
   */
  get tasksStarted () {
    return this._stats.tasksStarted
  }

  /**
   * Returns the number of tasks running currently
   * @return {[Integer]} [Number of tasks running]
   */
  get tasksRunning () {
    return this._stats.tasksStarted - this._stats.tasksProcessed
  }

  /**
   * Returns the number of tasks currently queued
   * @return {[Integer]} [Number of tasks queued]
   */
  get tasksQueued () {
    return Math.max(Object.keys(this._queue).length - this.tasksRunning, 0)
  }

  /**
   * Returns the number of tasks finished during the life time
   * @return {[Integer]} [Number of tasks finished]
   */
  get tasksFinished () {
    return this._stats.tasksProcessed
  }

  /**
   * Returns the hashes currently queued
   * @return {[Array<String>]} [Queued hashes]
   */
  getQueue () {
    return Object.values(this._queue)
  }

  /*
    Process new heads.
   */
  load (entries) {
    const notKnown = entry => !this._store._oplog.has(entry.hash || entry) && !this._queue[entry.hash || entry]

    try {
      entries
        .filter(notNull)
        .filter(notKnown)
        .forEach(this._addToQueue.bind(this))

      setTimeout(() => this._processQueue(), 0)
    } catch (e) {
      console.error(e)
    }
  }

  stop() {
    //Clears the queue flusher
    clearInterval(this._flushTimer)
  }

  _addToQueue (entry) {
    const hash = entry.hash || entry

    if (this._store._oplog.has(hash) || this._fetching[hash] || this._queue[hash])
      return

    this._stats.tasksRequested += 1
    this._queue[hash] = entry
  }

  async _processQueue () {
    if (this.tasksRunning < this._concurrency) {
      const capacity = this._concurrency - this.tasksRunning
      const items = Object.values(this._queue).slice(0, capacity).filter(notNull)
      items.forEach(entry => delete this._queue[entry.hash || entry])

      const flattenAndGetUniques = (nexts) => nexts.reduce(flatMap, []).reduce(uniqueValues, {})
      const processValues = (nexts) => {
        const values = Object.values(nexts).filter(notNull)

        if ((items.length > 0 && this._buffer.length > 0)
          || (this.tasksRunning === 0 && this._buffer.length > 0)) {
            const logs = this._buffer.slice()
            this._buffer = []
            this.emit('load.end', logs)
        }

        if (values.length > 0)
          this.load(values)
      }

      return pMap(items, e => this._processOne(e))
        .then(flattenAndGetUniques)
        .then(processValues)
    }
  }

  async _processOne (entry) {
    const hash = entry.hash || entry

    if (this._store._oplog.has(hash) || this._fetching[hash])
      return

    this._fetching[hash] = hash
    this.emit('load.added', entry)
    this._stats.tasksStarted += 1

    const exclude = []
    const log = await Log.fromEntryHash(this._store._ipfs, hash, this._store._oplog.id, batchSize, exclude, this._store.key, this._store.access.write)
    this._buffer.push(log)

    const latest = log.values[0]
    delete this._queue[hash]

    // Mark this task as processed
    this._stats.tasksProcessed += 1

    // Notify subscribers that we made progress
    this.emit('load.progress', this._id, hash, latest, null, this._buffer.length)

    // Return all next pointers
    return log.values.map(getNext).reduce(flatMap, [])
  }
}

module.exports = Replicator
