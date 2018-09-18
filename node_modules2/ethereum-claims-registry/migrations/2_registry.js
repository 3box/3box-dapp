var EthereumClaimsRegistry = artifacts.require("./EthereumClaimsRegistry.sol");

module.exports = function(deployer) {
  deployer.deploy(EthereumClaimsRegistry);
};
