'use strict'

const Store = require('orbit-db-store')
const KeyValueIndex = require('./KeyValueIndex')

class KeyValueStore extends Store {
  constructor(ipfs, id, dbname, options) {
    let opts = Object.assign({}, { Index: KeyValueIndex })
    Object.assign(opts, options)
    super(ipfs, id, dbname, opts)
    this._type = 'keyvalue'
  }

  all () {
    return this._index._index
  }

  get (key) {
    return this._index.get(key)
  }

  set (key, data) {
    return this.put(key, data)
  }

  put (key, data) {
    return this._addOperation({
      op: 'PUT',
      key: key,
      value: data
    })
  }

  del (key) {
    return this._addOperation({
      op: 'DEL',
      key: key,
      value: null
    })
  }
}

module.exports = KeyValueStore
