#!/usr/bin/env node

const commander = require('commander');
const web3Init = require('./web3Init.js');
const Pool = require('./poolContract.js');
const Automations = require('./automationsContract.js');
const infura = require('./infura.json');
const getUnprocessedSendToSale = require('./getUnprocessedSendToSale.js');
const getUnprocessedPushOutToken = require('./getUnprocessedPushOutToken.js');


commander
  .option('-c, --contract <contractPath>', "define path to the folder, where the compiled smart contracts, (Automations.json, KYC.json, Pool.json) is located, default: '../build/conrracts'")
  .option('-m, --mnemonic <mnemonic>', 'define keystore path')
  .option('-i, --account-index <accountIndex>', 'index of account derived from mnemonic , default is 0')

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

const web3 = web3Init(providerUrl, accountIndex);
const accounts = web3.eth.getAccounts();
const account = accounts[0];


const poolInstance = new Pool(providerUrl, account, poolArtifact);
const automationsInstance = new Automations(providerUrl, account, automationsArtifact);

const { unprocessedSendToSale, sendToSaleTimes } = getUnprocessedSendToSale(automationsInstance);
const unprocessedPushOutToken = getUnprocessedPushOutToken(automationsInstance);

automationsInstance.watchNewSendToSaleEvent((error, result) => {
  if (!error) {
    unprocessedSendToSale[result.returnValues.pool] = {
      time: result.returnValues.time,
      gasPrice: result.returnValues.gasPrice,
    };

    // eslint-disable-next-line prefer-destructuring
    const pool = result.returnValues.pool;
    const time = result.returnValues.gasPrice;

    if (sendToSaleTimes[time]) sendToSaleTimes[time].push(pool);
    else sendToSaleTimes[time] = [pool];
  } else {
    console.log(error);
  }
});

automationsInstance.watchNewPushOutTokenEvent((error, result) => {
  if (!error) {
    unprocessedPushOutToken[result.returnValues.recipient] = {
      pool: result.returnValues.pool,
      gasPrice: result.returnValues.gasPrice,
    };
  } else {
    console.log(error);
  }
});

unprocessedPushOutToken.keys().forEach((element) => {
  poolInstance.watchTokensRecievedEvent(element.pool, (error, result) => {
    if (!error) {

    } else {
      console.log(error);
    }
  });
});
