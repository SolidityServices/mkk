/* eslint-disable */
var Automations = artifacts.require('./Automations.sol')


module.exports = function (deployer) {

    deployer.deploy(Automations, 0x0, 0)

}