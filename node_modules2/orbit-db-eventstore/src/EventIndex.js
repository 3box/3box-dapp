'use strict'

class EventIndex {
  constructor() {
    this._index = null
  }

  get() {
    return this._index ? this._index.values : []
  }

  updateIndex(oplog) {
    this._index = oplog
  }
}

module.exports = EventIndex
