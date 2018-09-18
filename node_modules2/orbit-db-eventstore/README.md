# orbit-db-eventstore

[![npm version](https://badge.fury.io/js/orbit-db-eventstore.svg)](https://badge.fury.io/js/orbit-db-eventstore)

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

Get a log database and add an entry to it:

```javascript
const log = orbitdb.eventlog('haad.posts')
log.add({ name: 'hello world' })
  .then(() => {
    const items = log.iterator().collect()
    items.forEach((e) => console.log(e.name))
    // "hello world"
  })
```

Later, when the database contains data, load the history and query when ready:

```javascript
const log = orbitdb.eventlog('haad.posts')
log.events.on('ready', () => {
  const items = log.iterator().collect()
  items.forEach((e) => console.log(e.name))
  // "hello world"
})
```

See [example/index.html](https://github.com/haadcode/orbit-db-eventstore/blob/master/example/index.html) for a detailed example. Note that to run this example, you need to have a local [IPFS daemon](https://dist.ipfs.io/go-ipfs/floodsub-2) [running](https://ipfs.io/docs/getting-started/) at port 5001.

## API

See [orbit-db's API Documenations](https://github.com/haadcode/orbit-db/blob/master/API.md#eventlogname) for full details.

## Contributing

See [orbit-db's contributing guideline](https://github.com/haadcode/orbit-db#contributing).

## License

[MIT](LICENSE) ©️ 2016 Haadcode
