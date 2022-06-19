const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*",
      gas: 5000000,
    },
    loc_development_development: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1",
    },
    matic: {
      provider: () =>
        new HDWalletProvider(mnemonic, "https://speedy-nodes-nyc.moralis.io/a73e8588c0131bc401ce8fc4/polygon/mumbai"),
      network_id: 80001,
      confirmations: 1,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
