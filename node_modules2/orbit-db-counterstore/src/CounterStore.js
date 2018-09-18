'use strict'

const Store = require('orbit-db-store')
const CounterIndex = require('./CounterIndex')
const Counter = require('crdts/src/G-Counter')

class CounterStore extends Store {
  constructor(ipfs, id, dbname, options = {}) {
    if(!options.Index) Object.assign(options, { Index: CounterIndex })
    super(ipfs, id, dbname, options)
    this._type = 'counter'
  }

  get value() {
    return this._index.get().value
  }

  inc(amount) {
    const counter = new Counter(this.uid, Object.assign({}, this._index.get()._counters))
    counter.increment(amount)
    return this._addOperation({
      op: 'COUNTER',
      key: null,
      value: counter.toJSON(),
    })
  }
}

module.exports = CounterStore
