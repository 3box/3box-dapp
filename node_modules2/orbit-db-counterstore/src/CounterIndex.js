'use strict'

const Counter = require('crdts/src/G-Counter')

class CounterIndex {
  constructor(id) {
    this._index = new Counter(id)
  }

  get() {
    return this._index
  }

  updateIndex(oplog) {
    if(this._index) {
      const createCounter = e => Counter.from(e.payload.value)
      const mergeToIndex = e => this._index.merge(e)
      oplog.values.filter(e => e && e.payload.op === 'COUNTER')
        .map(createCounter)
        .forEach(mergeToIndex)
    }
  }
}

module.exports = CounterIndex
