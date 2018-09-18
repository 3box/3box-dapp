## orbit-db-cache

Isomorphic cache used by `orbit-db`, implemented using `level.js` (indexedDB) for the browser and `leveldown` (leveldb) for node.

### Used in

* [orbit-db](https://github/com/orbitdb/orbit-db)

### API

#### Public methods

##### `open`

Open cache store and make it available to be used (indexedDB or leveldb)

##### `close`

Close cache store and the underlying indexedDB / leveldb instance

##### `destroy`

Completely remove an existing store and deletes the locally persisted cache

##### `get`

Get an item from the cache store

##### `set`

Set a value for a given key on the cache store

##### `del`

Remove a given key-value from the cache store

## Contributing

See [orbit-db's contributing guideline](https://github.com/orbitdb/orbit-db#contributing).

## License

[MIT](LICENSE) ©️ 2017 Haadcode
