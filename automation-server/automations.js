#!/usr/bin/env node

const commander = require('commander');
const express = require('express');
const httpKycHandler = require('./httpKycHandler.js');
const web3Init = require('./web3Init.js');
const KYC = require('./kycContract.js');
const Pool = require('./poolContract.js');
const Automations = require('./automationsContract.js');
const infura = require('../infura.json');

const app = express();


commander
  .option('-c, --contract <contractPath>', "define path to the folder, where the compiled smart contracts, (Automations.json, KYC.json, Pool.json) is located, default: '../build/conrracts'")
  .option('-m, --mnemonic <mnemonic>', 'define keystore path')
  .option('-i, --account-index <accountIndex>', 'index of account derived from mnemonic , default is 0')
  .option('-p, --port <port>', 'port, default is 8080');

commander
  .parse(process.argv);

const constractAtrifactPath = commander.contractPath ? commander.contractPath : '../build/conrracts';
const accountIndex = commander.accountIndex ? commander.accountIndex : 0;
const port = commander.port ? commander.port : 8080;

// eslint-disable-next-line import/no-dynamic-require
const kycArtifact = require(`${constractAtrifactPath}/KYC.json`);
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

const web3 = web3Init(providerUrl, accountIndex);
const accounts = web3.eth.getAccounts();
const account = accounts[0];


const kycInstance = new KYC(providerUrl, account, kycArtifact);
const poolInstance = new Pool(providerUrl, account, poolArtifact);
const automationsInstance = new Automations(providerUrl, account, automationsArtifact);

httpKycHandler(app, kycInstance, port);
