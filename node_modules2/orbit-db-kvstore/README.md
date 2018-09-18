# orbit-db-kvstore

[![npm version](https://badge.fury.io/js/orbit-db-kvstore.svg)](https://badge.fury.io/js/orbit-db-kvstore)

An append-only log with traversable history. Useful for *"latest N"* use cases or as a message queue.

Used in [orbit-db](https://github.com/haadcode/orbit-db).

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Install
```
npm install orbit-db ipfs
```

## Usage

First, create an instance of OrbitDB:

```javascript
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

const ipfs = new IPFS()
const orbitdb = new OrbitDB(ipfs)
```

Get a key-value database and add an entry to it:

```javascript
const kv = orbitdb.kvstore('settings')
kv.put('volume', '100')
  .then(() => {
    console.log(kv.get('volume'))
    // 100
  })
```

Later, when the database contains data, load the history and query when ready:

```javascript
const kv = orbitdb.kvstore('settings')
kv.events.on('ready', () => {
  console.log(kv.get('volume'))
  // 100
})
```

## API

See [orbit-db's API Documenations](https://github.com/haadcode/orbit-db/blob/master/API.md#kvstorename) for full details.

## Contributing

See [orbit-db's contributing guideline](https://github.com/haadcode/orbit-db#contributing).

## License

[MIT](LICENSE) ©️ 2016 Haadcode
