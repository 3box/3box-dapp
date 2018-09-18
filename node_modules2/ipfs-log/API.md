# ipfs-log - API Documentation

# Log

To use `ipfs-log`, require the module in your project:

```javascript
const Log = require('ipfs-log')
```

### Constructor

#### new Log(ipfs, [id])

Create a log. Each log gets a unique ID passed as an argument. Returns a `Log` instance.

```javascript
const log = new Log(ipfs, 'logid')
```

`ipfs` is an instance of IPFS. `id` is a unique log identifier. Usually this should be a user id or similar.

### Properties

#### id

Returns the ID of the log.

#### values

Returns an `Array` of [entries](https://github.com/haadcode/ipfs-log/blob/master/src/entry.js) in the log. The values are in linearized order according to their [Lamport clocks](https://en.wikipedia.org/wiki/Lamport_timestamps).

```javascript
const values = log.values
// TODO: output example
```

#### length

Returns the number of entries in the log.

#### clock

Returns the current timestamp of the log.

#### heads

Returns the heads of the log. Heads are the entries that are not referenced by other entries in the log.

```javascript
const tails = log.tails
// TODO: output example
```

#### tails

Return the tails of the log. Tails are the entries that reference other entries that are not in the log.

```javascript
const tails = log.tails
// TODO: output example
```

### Methods

#### append(data)

Append an entry to the log. Returns a *Promise* that resolves to the updated `Log`.

`ipfs` IPFS instance.

`log` Log to append to.

`data` can be any type of data: Number, String, Object, etc. It can also be an instance of [Entry](https://github.com/haadcode/ipfs-log/blob/master/src/entry.js).

```javascript
log.append({ some: 'data' })
  .then(log => log.append('text'))
  .then(log => console.log(log.values))

// [ 
//   { 
//     hash: 'QmV1KFxZnaguPFp57PMXz5Dd1tf6z9U8csJQoy4xWDzzts',
//     id: 'A',
//     payload: { some: 'data' },
//     next: [],
//     v: 0,
//     clock: LamportClock { id: 'A', time: 0 } 
//   },
//   { hash: 'QmSxe4Shd7jt4ExyoBjtvgi1UabNKrZfRJKptwUmSa843u',
//     id: 'A',
//     payload: 'text',
//     next: [ 'QmV1KFxZnaguPFp57PMXz5Dd1tf6z9U8csJQoy4xWDzzts' ],
//     v: 0,
//     clock: LamportClock { id: 'A', time: 1 } 
//   } 
// ]
```

#### join(log, [length], [id])

Join the log with another log. Returns a Promise that resolves to a `Log` instance. The size of the joined log can be specified by giving `length` argument. 

```javascript
// log1.values ==> ['A', 'B', 'C']
// log2.values ==> ['C', 'D', 'E']

log1.join(log2)
  .then(() => console.log(log1.values))
// ['A', 'B', 'C', 'D', 'E']
```

### toMultihash()

Writes the log to IPFS and returns the Multihash of the log. Returns a `Promise` that resolves to a Base58 encoded `string`.

```javascript
log1.toMultihash()
  .then(hash => console.log(hash))

// QmSUrxz12UDsuuQMjzBQ4NDGyYprhFJbQefgeRiomQ5j6T
```

### toBuffer()

Converts the log to a `Buffer` that contains the log as JSON.stringified `string`. Returns a `Buffer`.

```javascript
const buffer = log1.toBuffer()
```

### toString

Returns the log values as a nicely formatted string.

```javascript
console.log(log.toString())
// two
// └─one
//   └─three
```

## Static methods

#### Log.isLog(log)

Check if an object is a `Log` instance.

```javascript
Log.isLog(log1)
// true
Log.isLog('hello')
// false
```

#### Log.expand(ipfs, log, [amount=-1])

Expands a `log` by `amount` by retreiving more entries from the tails of the log. Returns a new `Log` instance. 

Expanding a log will retrieve new entries from IPFS, thus causing side effects.

#### Log.expandFrom(ipfs, log, entries, [amount=-1])

Expand a `log` by `amount` by retrieving more entries starting from `entries`. `entries` is an `Array` of `Entry` instances. Returns a new `Log` instance. 

Expanding a log will retrieve new entries from IPFS, thus causing side effects.

#### Log.fromEntry(ipfs, entry, [length=-1])

Create a `Log` from an `Entry`.

Creating a log from an entry will retrieve entries from IPFS, thus causing side effects.

#### Log.toMultihash(ipfs, log)

Returns the multihash of the log.

Converting the log to a multihash will persist the log to IPFS, thus causing side effects.

#### Log.fromMultihash(ipfs, multihash, [length=-1])

Create a `Log` from a multihash.

Creating a log from a multihash will retrieve entries from IPFS, thus causing side effects.
