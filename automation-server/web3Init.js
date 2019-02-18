import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';

const infura = require('../infura.json');

export default async function () {
  let providerUrl;
  if (infura.network === 'ganache') {
    providerUrl = 'http://localhost:8545';
  } else {
    providerUrl = `https://${infura.network}.infura.io/v3/${infura.apiKey}`;
  }
  const web3 = new Web3(new HDWalletProvider(infura.mnemonic, providerUrl, 0));
  return web3;
}
