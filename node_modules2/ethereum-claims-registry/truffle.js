const TestRPC = require("ganache-cli");


module.exports = {
  networks: {
    test: {
      provider: TestRPC.provider({total_accounts: 25}),
      network_id: "*"
    }
  }
}
