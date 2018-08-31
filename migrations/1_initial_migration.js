const MigrationsContract = artifacts.require('./Migrations.sol');

module.exports = (deployer) => {
  deployer.deploy(MigrationsContract);
};
