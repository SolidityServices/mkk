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
    this.minContribution = this.convertWeiToEther(params.minContribution);
    this.maxContribution = this.convertWeiToEther(params.maxContribution);
    this.minPoolGoal = this.convertWeiToEther(params.minPoolGoal);
    this.saleStartDate = new Date(params.saleStartDate * 1000);
    this.saleEndDate = new Date(params.saleEndDate * 1000);
    this.maxPoolAllocation = this.convertWeiToEther(params.maxPoolAllocation);
    this.withdrawTimelock = params.withdrawTimelock !== 0 ? params.withdrawTimelock / 60 / 60 : 0;
    this.providerFeeRate = params.providerFeeRate !== 0 ? params.providerFeeRate / 100 : 0;
    this.creatorFeeRate = params.creatorFeeRate !== 0 ? params.creatorFeeRate / 100 : 0;
    this.whitelistPool = params.whitelistPool;
  }

  initParams() {
    const params = {};

    params.saleAddress = '0x0000000000000000000000000000000000000000';
    params.tokenAddress = '0x0000000000000000000000000000000000000000';
    params.creatorFeeRate = 1;
    params.saleStartDate = Math.floor(new Date() / 1000);
    params.saleEndDate = Math.floor(new Date() / 1000);
    params.minContribution = 0;
    params.maxContribution = 0;
    params.minPoolGoal = 0;
    params.maxPoolAllocation = 0;
    params.withdrawTimelock = 0;
    params.whitelistPool = false;

    return params;
  }

  convertWeiToEther(value) {
    if (!value || value === 0) {
      return value;
    }

    return value / 1000000000000000000;
  }
}
