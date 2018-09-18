'use strict'

const path = require('path')

const Logger = require('logplease')
const logger = Logger.create('cache', { color: Logger.Colors.Magenta })
Logger.setLogLevel('ERROR')

let caches = {}

class Cache {
  constructor (storage, directory) {
    this.path = directory || './orbitdb'
    this._storage = storage
    this._store = null
  }

  // Setup storage backend
  async open () {
    logger.debug('open', this.path)

    if (this.store)
      return Promise.resolve()

    return new Promise((resolve, reject) => {
      const store = this._storage(this.path)
      store.open((err) => {
        if (err) {
          return reject(err)
        }
        this._store = store
        resolve()
      })
    })
  }

  async close () {
    logger.debug('close', this.path)

    if (!this._store)
      return Promise.resolve()

    return new Promise(resolve => {
      this._store.close((err) => {
        if (err) {
          return reject(err)
        }
        this._store = null
        delete caches[this.path]
        resolve()
      })
    })
  }

  async destroy () {
    logger.debug('destroy', this.path)

    return new Promise((resolve, reject) => {
      this._storage.destroy(this.path, (err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }

  async get (key) {
    if (!this._store)
      await this.open()

    if (this._store.status && this._store.status !== 'open')
      return Promise.resolve(null)

    return new Promise((resolve, reject) => {
      this._store.get(key, (err, value) => {
        if (err) {
          // Ignore error if key was not found
          if (err.toString().indexOf('NotFoundError: Key not found in database') === -1
            && err.toString().indexOf('NotFound') === -1)
            return reject(err)
        }
        resolve(value ? JSON.parse(value) : null)
      })
    })
  }

  // Set value in the cache and return the new value
  async set (key, value) {
    if (!this._store)
      await this.open()

    if (this._store.status && this._store.status !== 'open')
      return Promise.resolve()

    return new Promise((resolve, reject) => {
      this._store.put(key, JSON.stringify(value), (err) => {
        if (err) {
          // Ignore error if key was not found
          if (err.toString().indexOf('NotFoundError: Key not found in database') === -1
            && err.toString().indexOf('NotFound') === -1)
            return reject(err)
        }
        resolve()
      })
    })
  }

  // Remove a value and key from the cache
  async del (key) {
    if (!this._store)
      await this.open()

    return new Promise((resolve, reject) => {
      this._store.del(key, (err) => {
        if (err) {
          // Ignore error if key was not found
          if (err.toString().indexOf('NotFoundError: Key not found in database') === -1
            && err.toString().indexOf('NotFound') === -1)
            return reject(err)
        }
        resolve()
      })
    })
  }
}

module.exports = (storage, mkdir) => {
  return {
    load: async (directory, dbAddress) => {
      logger.debug('load, database:', dbAddress.toString())

      const dbPath = path.join(dbAddress.root, dbAddress.path)
      const dataPath = path.join(directory, dbPath)
      let cache = caches[dataPath]
      if (!cache) {
        if (mkdir && mkdir.sync) 
          mkdir.sync(dataPath)
        cache = new Cache(storage, dataPath)
        await cache.open()
        caches[dataPath] = cache
      }
      return cache
    },
    close: async () => {
      logger.debug('close all')

      await Promise.all(Object.values(caches), cache => cache.close())
      caches = {}
    },
  }
}
