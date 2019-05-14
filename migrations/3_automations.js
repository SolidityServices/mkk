const Automations = artifacts.require('./Automations.sol');

module.exports = (deployer) => {
  deployer.deploy(Automations, 0x0, 0, 0);
};
