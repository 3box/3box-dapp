'use strict'

class FeedIndex {
  constructor() {
    this._index = {}
  }

  get() {
    return Object.keys(this._index).map((f) => this._index[f])
  }

  updateIndex(oplog) {
    this._index = {}
    oplog.values.reduce((handled, item) => {
      if(!handled.includes(item.hash)) {
        handled.push(item.hash)
        if(item.payload.op === 'ADD') {
          this._index[item.hash] = item
        } else if(item.payload.op === 'DEL') {
          delete this._index[item.payload.value]
        }
      }
      return handled
    }, [])
  }
}

module.exports = FeedIndex
