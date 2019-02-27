import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';

const infura = require('./infura.json');

module.exports = {
  async init(accountNumber) {
    let providerUrl;
    console.log(`network: ${infura.network}`);
    if (infura.network === 'ganache') {
      providerUrl = 'http://localhost:8545';
    } else {
      providerUrl = `https://${infura.network}.infura.io/v3/${infura.apiKey}`;
    }
    const provider = new HDWalletProvider(infura.mnemonic, providerUrl, accountNumber);
    console.log(`provider: ${providerUrl}`);
    const web3 = new Web3(provider);
    return web3;
  },
};
