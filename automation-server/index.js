#!/usr/bin/env node

const commander = require('commander');
const web3Init = require('./web3Init.js');
const pool = require('./poolContract.js');
const automations = require('./automationsContract.js');

const pushOutToken = require('./pushOutToken.js');
const sendToSale = require('./sendToSale.js');


commander
  .option('-c, --contract <contractPath>', "define path to the folder, where the compiled smart contracts, (Automations.json, KYC.json, Pool.json) is located, default: '../build/conrracts'")
  .option('-n, --network <network>', 'network name eg.: "main", "kovan", "rinkeby", "ganache", default comes from infura.json file, this can overwrite that')
  .option('-i, --account-index <accountIndex>', 'index of account derived from mnemonic , default is 0')
  .option('-b, --first-block <firstBlock>', 'first block to watch events from, default is 0');

commander
  .parse(process.argv);

const constractAtrifactPath = commander.contractPath ? commander.contractPath : '../build/contracts';
const accountIndex = commander.accountIndex ? commander.accountIndex : 0;
const firstBlock = commander.firstBlock ? commander.firstBlock : 0;


// eslint-disable-next-line import/no-dynamic-require
// eslint-disable-next-line import/no-dynamic-require
const poolArtifact = require(`${constractAtrifactPath}/Pool.json`);
// eslint-disable-next-line import/no-dynamic-require
const automationsArtifact = require(`${constractAtrifactPath}/Automations.json`);

(async () => {
  console.log('initalizing web3...');
  const web3 = await web3Init.init(accountIndex, commander.network);
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  console.log('web3 initalized OK');
  console.log(`account: ${account}`);
  const poolContract = new pool.Pool(web3.currentProvider, account, web3, poolArtifact, firstBlock);
  const automationsContract = new automations.Automations(web3.currentProvider, account, web3, automationsArtifact, firstBlock);

  try {
    pushOutToken.process(automationsContract, poolContract, web3);
    sendToSale.process(automationsContract, poolContract, web3);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();
