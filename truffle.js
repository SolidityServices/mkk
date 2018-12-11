const HDWalletProvider = require('truffle-hdwallet-provider');
const infura = require('./infura.json');

require('dotenv').config(); // Store environment-specific variable from '.env' to process.env

module.exports = {
  networks: {
    ganache: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      gas: 5000000,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(infura.mnemonic, `https://rinkeby.infura.io/v3/${infura.apiKey}`),
      network_id: 4,
      gas: 5000000,
      gasPrice: 20000000000, // 20 gwei
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
