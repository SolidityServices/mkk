export default class LocalPool {
  saleAddress;

  poolAddress;

  saleParticipateFunctionSig;

  saleWithdrawFunctionSig;

  poolDescription;

  creator;

  creatorFeeRate;

  saleStartDate;

  saleEndDate;

  withdrawTimelock;

  minContribution;

  maxContribution;

  minPoolGoal;

  whitelistPool;

  tokenAddress;

  maxPoolAllocation;

  constructor(address) {
    this.connectIco = window.connectICO;
    this.poolAddress = address;
    this.init();
  }

  init() {
    let params = this.initParams();
    if (this.poolAddress) {
      params = this.connectIco.pool.getPoolParamsNew(this.poolAddress);
    }
    this.saleParticipateFunctionSig = params.saleParticipateFunctionSig;
    this.saleWithdrawFunctionSig = params.saleWithdrawFunctionSig;
    this.poolDescription = params.poolDescription;
    this.saleAddress = params.saleAddress;
    this.tokenAddress = params.tokenAddress;
    this.kycAddress = params.kycAddress;
    this.provider = params.provider;
    this.creator = params.creator;
    this.minContribution = params.minContribution;
    this.maxContribution = params.maxContribution;
    this.minPoolGoal = params.minPoolGoal;
    this.saleStartDate = params.saleStartDate;
    this.saleEndDate = params.saleEndDate;
    this.maxPoolAllocation = params.maxPoolAllocation;
    this.withdrawTimelock = params.withdrawTimelock;
    this.providerFeeRate = params.providerFeeRate;
    this.creatorFeeRate = params.creatorFeeRate;
    this.whitelistPool = params.whitelistPool;
  }

  initParams() {
    const params = {};

    params.saleAddress = '0x0000000000000000000000000000000000000000';
    params.tokenAddress = '0x0000000000000000000000000000000000000000';
    params.saleParticipateFunctionSig = '';
    params.saleWithdrawFunctionSig = '';
    params.poolDescription = '';
    params.creatorFeeRate = 0;
    params.saleStartDate = new Date();
    params.saleEndDate = new Date();
    params.minContribution = 0;
    params.maxContribution = 0;
    params.minPoolGoal = 0;
    params.maxPoolAllocation = 0;
    params.withdrawTimelock = 0;
    params.whitelistPool = false;

    return params;
  }
}
