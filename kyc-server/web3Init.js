const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');


const infura = require('./infura.json');

module.exports = {
  async init(accountNumber, argNetwork) {
    let providerUrl;
    const network = argNetwork ? argNetwork : infura.network;
    console.log(`network: ${network}`);
    if (network === 'ganache') {
      providerUrl = 'http://localhost:8545';
    } else {
      providerUrl = `https://${network}.infura.io/v3/${infura.apiKey}`;
    }
    const provider = new HDWalletProvider(infura.mnemonic, providerUrl, accountNumber);
    console.log(`provider: ${providerUrl}`);
    const web3 = new Web3(provider);
    console.log('Getting latest block number...');
    await web3.eth.getBlockNumber((error, result) => {
      if (!error) {
        console.log(`Latest block number: ${result}`);
      } else {
        console.log(`Error during getting latest block number: ${error}`);
      }
    });
    return web3;
  },
};
