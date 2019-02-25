/* eslint-disable */
var web3 = require('web3')
var PoolFactory = artifacts.require('./PoolFactory.sol')
var Pool = artifacts.require('./Pool.sol')
var SafeMath = artifacts.require('../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol')
var SemiSafeMath = artifacts.require('./SemiSafeMath.sol')
var KYC = artifacts.require('./KYC.sol')
var Automations = artifacts.require('./Automations.sol')

module.exports = function (deployer) {

  var flatFee = 0.001 //in ETH
  var maxAllocationFeeRate = 10 //in 1 one 1000th e.g. 1 => 0.1%, 50 => 5%, 1000 => 100%
  var maxCreatorFeeRate = 150 //in 1 one 1000th e.g. 1 => 0.1%, 50 => 5%, 1000 => 100%
  var providerFeeRate = 50 //in 1 one 1000th e.g. 1 => 0.1%, 50 => 5%, 1000 => 100%

  var addressList = ['0xbc9276f53A84Cd0F0066EaD3c63595b0E937eBE5', '0x8B6FFe671fbF9608d4621633a331A70eDFf2b6E3'];
  var countryList = ['HUN', 'HUN'];

  deployer.deploy(KYC).then(function(){
    return deployer.deploy(PoolFactory, KYC.address, web3.utils.toWei(flatFee.toString()), maxAllocationFeeRate, maxCreatorFeeRate, providerFeeRate)
  }).then(function(){
    if(addressList.length > 0) KYC.deployed().then(instance => {
      console.log("adding kyc addresses: " + addressList)
      return instance.addKYCAddresses(addressList, countryList);
    })
  })

}
