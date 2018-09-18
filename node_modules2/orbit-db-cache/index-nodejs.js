const level = require('leveldown')
const mkdirp = require('mkdirp')
const Cache = require('./Cache')
module.exports = Cache(level, mkdirp)
