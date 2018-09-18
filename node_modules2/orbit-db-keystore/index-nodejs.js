const mkdirp = require('mkdirp')
const LocalStorage = require('node-localstorage').LocalStorage
const Keystore = require('./src/keystore')
module.exports = Keystore(LocalStorage, mkdirp)
