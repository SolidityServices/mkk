#!/usr/bin/env node

const commander = require('commander');

commander
  .option('-c, --contract <contractPath>', "define path to the folder, where the compiled smart contract, Automations.json is located, default: '../biuld/conrracts'")
  .option('-m, --mnemonic <mnemonic>', 'define keystore path')
  .option('-n, --account-number <accountNumber>', 'account number derived from mnemonic , default is 0');

commander
  .parse(process.argv);
