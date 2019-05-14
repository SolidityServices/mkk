// for testing purposes only
const Pool = artifacts.require('./Pool.sol');
const KYC = artifacts.require('./KYC.sol');
const Web3 = require('web3');

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
let accounts;

(async () => {
  accounts = await web3.eth.getAccounts();
  console.log(accounts);

  const balance = await web3.eth.getBalance(accounts[0]);
  console.log('balance', web3.utils.fromWei(balance, 'ether'));
})();

module.exports = (deployer) => {
  deployer.deploy(KYC)
    .then(() => {
      console.log('KYC contract deployed and its address: ', KYC.address);
      return deployer.deploy(Pool,
        [KYC.address, accounts[1], accounts[0], accounts[2], accounts[3]],
        ['bla', 'bla', 'bla'],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        false,
        [], [], [], { from: accounts[0] });
    });
};
