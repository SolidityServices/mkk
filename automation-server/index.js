#!/usr/bin/env node

const commander = require('commander');
const web3Init = require('./web3Init.js');
const pool = require('./poolContract.js');
const automations = require('./automationsContract.js');
const infura = require('./infura.json');
const pushOutToken = require('./pushOutToken.js');
const sendToSale = require('./sendToSale.js');


commander
  .option('-c, --contract <contractPath>', "define path to the folder, where the compiled smart contracts, (Automations.json, KYC.json, Pool.json) is located, default: '../build/conrracts'")
  .option('-m, --mnemonic <mnemonic>', 'define keystore path')
  .option('-i, --account-index <accountIndex>', 'index of account derived from mnemonic , default is 0')
  .option('-b, --first-block <firstBlock>', 'first block to watch events from, default is 0');

commander
  .parse(process.argv);

const constractAtrifactPath = commander.contractPath ? commander.contractPath : '../build/conrracts';
const accountIndex = commander.accountIndex ? commander.accountIndex : 0;
const firstBlock = commander.firstBlock ? commander.firstBlock : 0;


// eslint-disable-next-line import/no-dynamic-require
// eslint-disable-next-line import/no-dynamic-require
const poolArtifact = require(`${constractAtrifactPath}/Pool.json`);
// eslint-disable-next-line import/no-dynamic-require
const automationsArtifact = require(`${constractAtrifactPath}/Automations.json`);

let providerUrl;
if (infura.network === 'ganache') {
  providerUrl = 'http://localhost:8545';
} else {
  providerUrl = `https://${infura.network}.infura.io/v3/${infura.apiKey}`;
}

let account;
let web3;

web3Init.init(providerUrl, accountIndex).then((_web3) => {
  web3 = _web3;
  const accounts = web3.eth.getAccounts();
  // eslint-disable-next-line prefer-destructuring
  account = accounts[0];

  const poolContract = new pool.Pool(web3.currentProvider, account, poolArtifact, firstBlock);
  const automationsContract = new automations.Automations(web3.currentProvider, account, automationsArtifact, firstBlock);

  pushOutToken.process(automationsContract, poolContract);
  sendToSale.process(automationsContract, poolContract);
});
