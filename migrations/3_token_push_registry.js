/* eslint-disable */
var TokenPushRegistry = artifacts.require('./TokenPushRegistry.sol')


module.exports = function (deployer) {

    deployer.deploy(TokenPushRegistry, 0x0, 0)

}