#!/usr/bin/env node

const commander = require('commander');
const express = require('express');
const httpKycHandler = require('./httpKycHandler.js');
const web3Init = require('./web3Init.js');
const kyc = require('./kycContract.js');

const app = express();


commander
  .option('-c, --contract <contractPath>', "define path to the folder, where the compiled smart contracts, (Automations.json, KYC.json, Pool.json) is located, default: '../build/conrracts'")
  .option('-i, --account-index <accountIndex>', 'index of account derived from mnemonic, default is 0')
  .option('-g, --gas-price <gasPrice>', 'gasPrice in GWEI, default is 1')
  .option('-n, --network <network>', 'network name eg.: "main", "kovan", "rinkeby", "ganache", default comes from infura.json file, this can overwrite that')
  .option('-p, --port <port>', 'port, default is 8081');

commander
  .parse(process.argv);


// set default values
const constractAtrifactPath = commander.contractPath ? commander.contractPath : '../build/contracts';
const accountIndex = commander.accountIndex ? commander.accountIndex : 0;
const gasPrice = commander.gasPrice ? commander.gasPrice : 1;
const port = commander.port ? commander.port : 8081;

// eslint-disable-next-line import/no-dynamic-require
const kycArtifact = require(`${constractAtrifactPath}/KYC.json`);

(async () => {
  console.log('initalizing web3...');
  const web3 = await web3Init.init(accountIndex, commander.network);
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  console.log('web3 initalized OK');
  console.log(`account: ${account}`);
  const kycInstance = new kyc.KYC(web3.currentProvider, account, kycArtifact, gasPrice);

  httpKycHandler.handle(app, kycInstance, port);
})();
