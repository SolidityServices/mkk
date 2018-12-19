export default class LocalPoolFactory {
  ownerAddress;

  kycContractAddress;

  flatFee;

  maxAllocationFeeRate;

  maxCreatorFeeRate;

  providerFeeRate;

  useWhitelist;

  constructor(address) {
    this.connectIco = window.connectICO;
    this.ownerAddress = address;
    this.init();
  }

  init() {
    const params = this.connectIco.poolFactory.getAllPoolFactoryParams();
    this.kycContractAddress = params.kycContractAddress;
    this.flatFee = params.flatFee;
    this.maxAllocationFeeRate = params.maxAllocationFeeRate;
    this.maxCreatorFeeRate = params.maxCreatorFeeRate;
    this.providerFeeRate = params.providerFeeRate;
    this.useWhitelist = params.useWhitelist;
  }
}
