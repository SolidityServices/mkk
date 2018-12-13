export default class LocalPool {
  saleAddress;

  poolAddress;

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
    this.connectIco = window.connectIco;
    this.saleAddress = address;
    this.init();
  }

  init() {
    const params = this.connectIco.pool.getPoolParams(this.poolAddress);
    this.saleParticipateFunctionSig = params.saleParticipateFunctionSig;
    this.saleWithdrawFunctionSig = params.saleWithdrawFunctionSig;
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
}
