const PoolFactory = artifacts.require('./PoolFactory.sol');
const KYC = artifacts.require('./KYC.sol');

module.exports = (deployer) => {
  const flatFee = 1000000000000000; // in wei
  const maxAllocationFeeRate = 1; // in 1 one 1000th e.g. 1 => 0.1%, 50 => 5%, 1000 => 100%
  const maxCreatorFeeRate = 150; // in 1 one 1000th e.g. 1 => 0.1%, 50 => 5%, 1000 => 100%
  const providerFeeRate = 50; // in 1 one 1000th e.g. 1 => 0.1%, 50 => 5%, 1000 => 100%

  const addressList = [
    '0xbc9276f53A84Cd0F0066EaD3c63595b0E937eBE5',
    '0x8B6FFe671fbF9608d4621633a331A70eDFf2b6E3',
    '0x29235860dbc2A672E6DbbCCC013eC993d02EA6d2',
    '0x79e1a91602f033d6c3da248c908c727cc0443a2c',
  ];

  const countryList = [
    'HUN',
    'HUN',
    'HUN',
    'HUN',
  ];

  deployer.deploy(KYC)
    .then(() => deployer.deploy(PoolFactory, KYC.address, flatFee, maxAllocationFeeRate, maxCreatorFeeRate, providerFeeRate))
    .then(() => {
      if (addressList.length > 0) {
        KYC.deployed()
          .then((instance) => {
            instance.addKYCAddresses(addressList, countryList)
              .then(() => {
                instance.addAdmin(addressList);
              });
          });
      }
    });
}
