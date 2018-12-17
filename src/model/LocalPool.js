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
    this.connectIco = window.connectICO;
    this.poolAddress = address;
    this.init();
  }

  async init() {
    let params = this.initParams();
    if (this.poolAddress) {
      params = await this.connectIco.pool.getPoolParams(this.poolAddress);
      console.log(params);
    }
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
    this.saleStartDate = new Date(params.saleStartDate * 1000);
    this.saleEndDate = new Date(params.saleEndDate * 1000);
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
