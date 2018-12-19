const HDWalletProvider = require('truffle-hdwallet-provider');
const infura = require('./infura.json');

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      gas: 6000000,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(infura.mnemonic, `https://rinkeby.infura.io/v3/${infura.apiKey}`),
      network_id: 4,
      gas: 6000000,
      gasPrice: 20000000000, // 20 gwei
    },
  },
  solc: {
    version: '0.4.24',
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
