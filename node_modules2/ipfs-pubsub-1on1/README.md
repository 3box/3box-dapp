# ipfs-pubsub-1on1

> Communication channel between two peers over IPFS Pubsub

***Work in progress!***

`ipfs-pubsub-1on1` is a 1-to-1 communication channel over IPFS Pubsub. It enables two peers to exchange messages between each other.

## Usage

```javascript
// Include as lib
const Channel = require('ipfs-pubsub-1on1')
// Create IPFS instance somewhow
const ipfs = ...
 // IPFS peer ID of the peer to connect to
const friendId = 'QmP9TWCAsHLs6a3hcCbqE6WZs3VhQF6QsmkFPAFmmcuMa6'
// Open a channel with the other peer
const channel = await Channel.open(ipfs, friendId)
// Explicitly wait for peers to connect
await channel.connect()
// Process messages from the other peer
channel.on('message', (message) => {
  console.log("Message from", message.from, message)
})
```

For more usage examples, see the [tests](https://github.com/haadcode/ipfs-pubsub-dc/blob/master/test/direct-channel.test.js)
