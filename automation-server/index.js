#!/usr/bin/env node

const commander = require('commander');
const HDWalletProvider = require('truffle-hdwallet-provider');
const web3Init = require('./web3Init.js');
const Pool = require('./poolContract.js');
const Automations = require('./automationsContract.js');
const infura = require('./infura.json');
const pushOutToken = require('./pushOutToken.js');
const getUnprocessedPushOutToken = require('./getUnprocessedPushOutToken.js');

commander
  .option('-c, --contract <contractPath>', "define path to the folder, where the compiled smart contracts, (Automations.json, KYC.json, Pool.json) is located, default: '../build/conrracts'")
  .option('-m, --mnemonic <mnemonic>', 'define keystore path')
  .option('-i, --account-index <accountIndex>', 'index of account derived from mnemonic , default is 0');

commander
  .parse(process.argv);

const constractAtrifactPath = commander.contractPath ? commander.contractPath : '../build/conrracts';
const accountIndex = commander.accountIndex ? commander.accountIndex : 0;

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

const provider = new HDWalletProvider(commander.mnemonic, providerUrl);
const web3 = web3Init(provider, accountIndex);
const accounts = web3.eth.getAccounts();
const account = accounts[0];


const poolContract = new Pool(provider, account, poolArtifact);
const automationsContract = new Automations(provider, account, automationsArtifact);

pushOutToken(automationsContract, poolContract);
