'use strict'

const IPFS = require('ipfs')
const Log = require('../../src/log')

const ipfs = new IPFS({
  repo: './ipfs-log/examples/browser/new/index.js',
  start: false,
  EXPERIMENTAL: {
    pubsub: true
  },
})

ipfs.on('error', (e) => console.error(e))

ipfs.on('ready', () => {
  const outputElm = document.getElementById('output')

  // When IPFS is ready, add some log entries
  let log = new Log(ipfs, 'example')
  log.append('one')
    .then((res) => {
      const values = JSON.stringify(log.values, null, 2)
      console.log('\n', values)
      outputElm.innerHTML += values + '<br><br>'
      return log.append({ two: 'hello' })
    })
    .then((res) => {
      const values = JSON.stringify(log.values, null, 2)
      console.log('\n', values)
      outputElm.innerHTML += values + '<br><br>'
    })
})
