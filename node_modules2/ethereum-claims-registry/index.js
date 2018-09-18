module.exports = {
  registry: require('./build/contracts/EthereumClaimsRegistry.json'),
  applications: {
    RevokeAndPublish: require('./build/contracts/RevokeAndPublish.json'),
  }
}
