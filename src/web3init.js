import Web3 from 'web3';

const infura = require('../infura.json');


console.log('Initializing web3 components...');
window.ethInitSuccess = false;

if (window.ethereum) {
  console.log('window.ethereum is defined');
  // Modern dapp browsers...
  window.web3 = new Web3(window.ethereum);
  try {
    // Request account access if needed
    window.ethereum.enable();
    // Accounts now exposed
    window.ethInitSuccess = true;
    console.log('Init success');
  } catch (error) {
    console.log('Init fail');
    window.ethInitSuccess = false;
    // User denied account access...
  }
} else if (window.web3) {
  console.log('window.web3 is defined');
  // Legacy dapp browsers...
  window.web3 = new Web3(Web3.currentProvider);
  // Acccounts always exposed
  window.ethInitSuccess = true;
} else {
  // Non-dapp browsers...
  console.log('Non-Ethereum browser detected. '
    + 'You should consider trying MetaMask! '
    + 'Falling back to http://localhost:8545. '
    + "You should remove this fallback when you deploy live, as it's inherently insecure. "
    + 'Consider switching to Metamask for development. '
    + 'More info here: http://truffleframework.com/tutorials/truffle-and-metamask');
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  let providerUrl;
  if (infura.network === 'ganache') {
    providerUrl = 'http://localhost:8545';
  } else {
    providerUrl = `https://${infura.network}.infura.io/v3/${infura.apiKey}`;
  }
  window.web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
  window.ethInitSuccess = false;
}
