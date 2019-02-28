const TestSale = artifacts.require('./TestSale.sol');

module.exports = function (deployer, network, accounts) {
  deployer.deploy(TestSale, 1, accounts[0]).then((instance) => {
    instance.token.call().then((result) => {
      console.log('Test token address: ' + result);
    });
  });
};
