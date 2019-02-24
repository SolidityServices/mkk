import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';

const infura = require('../infura.json');

module.exports = {
  async init(providerUrl, accountNumber) {
    const web3 = new Web3(new HDWalletProvider(infura.mnemonic, providerUrl, accountNumber));
    return web3;
  },
};
