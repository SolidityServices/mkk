const HDWalletProvider = require('truffle-hdwallet-provider');
const NonceTrackerSubprovider = require('web3-provider-engine/subproviders/nonce-tracker');
const infura = require('./infura.json');

module.exports = {
  networks: {
    ganache: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      gas: 6720000,
    },
    rinkeby: {
      provider() {
        const wallet = new HDWalletProvider(infura.mnemonic, `https://rinkeby.infura.io/v3/${infura.apiKey}`);
        const nonceTracker = new NonceTrackerSubprovider();
        // eslint-disable-next-line no-underscore-dangle
        wallet.engine._providers.unshift(nonceTracker);
        nonceTracker.setEngine(wallet.engine);
        return wallet;
      },
      network_id: 4,
      gas: 7000000,
      gasPrice: 1000000000, // 1 gwei
    },
    kovan: {
      provider() {
        const wallet = new HDWalletProvider(infura.mnemonic, `https://kovan.infura.io/v3/${infura.apiKey}`);
        const nonceTracker = new NonceTrackerSubprovider();
        // eslint-disable-next-line no-underscore-dangle
        wallet.engine._providers.unshift(nonceTracker);
        nonceTracker.setEngine(wallet.engine);
        return wallet;
      },
      network_id: 42,
      gas: 7000000,
      gasPrice: 1000000000, // 1 gwei
    },
    ropsten: {
      provider() {
        const wallet = new HDWalletProvider(infura.mnemonic, `https://ropsten.infura.io/v3/${infura.apiKey}`);
        const nonceTracker = new NonceTrackerSubprovider();
        // eslint-disable-next-line no-underscore-dangle
        wallet.engine._providers.unshift(nonceTracker);
        nonceTracker.setEngine(wallet.engine);
        return wallet;
      },
      network_id: 3,
      gas: 7000000,
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
