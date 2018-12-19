/* eslint-disable */
//for testing purposes only
let Pool = artifacts.require('./Pool.sol')
let KYC = artifacts.require('./KYC.sol')


let Web3= require('web3');
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
let accounts;

(async () => {
  accounts = await web3.eth.getAccounts();
  console.log(accounts);

  const balance = await web3.eth.getBalance(accounts[0]);
  console.log("balance", web3.utils.fromWei(balance, "ether"));
})();



module.exports = function (deployer) {
  deployer.deploy(KYC).then(function() {
    console.log("KYC contract deployed and its address: ",KYC.address);
    return deployer.deploy(Pool,
      [KYC.address, accounts[1], accounts[0], accounts[2], accounts[3]],
      ["bla","bla","bla"],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      false,
      [],[],[],{from:accounts[0]}).then(function(){
    });
  });
};
