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

  adminAddresses;

  whiteListAddresses;

  countryBlackList;

  constructor(address) {
    this.connectIco = window.connectICO;
    this.poolAddress = address;
    this.init();
  }

  async init() {
    let params = this.initParams();
    if (this.poolAddress) {
      params = await this.connectIco.pool.getPoolParams(this.poolAddress);
      params.balance = await this.connectIco.pool.getPoolBalance(this.poolAddress);
    }
    this.saleParticipateFunctionSig = params.saleParticipateFunctionSig;
    this.saleWithdrawFunctionSig = params.saleWithdrawFunctionSig;
    this.poolDescription = params.poolDescription;
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
    this.adminAddresses = params.adminAddresses ? params.adminAddresses : [];
    this.whiteListAddresses = params.whiteListAddresses ? params.whiteListAddresses : [];
    this.countryBlackList = params.countryBlackList ? params.countryBlackList : [];
    this.balance = params.balance;
  }

  initParams() {
    const params = {};

    params.saleAddress = '';
    params.tokenAddress = '';
    params.saleParticipateFunctionSig = '';
    params.saleWithdrawFunctionSig = '';
    params.poolDescription = '';
    params.creatorFeeRate = 1;
    const date = Math.floor(new Date() / 1000);
    params.saleStartDate = date;
    params.saleEndDate = date + (24 * 60 * 60 * 7); // add 7 days
    params.minContribution = 1000000000000;
    params.maxContribution = 1000000000000;
    params.minPoolGoal = 1000000000000;
    params.maxPoolAllocation = 1000000000000;
    params.withdrawTimelock = 0;
    params.whitelistPool = false;
    params.adminAddresses = [];
    params.whiteListAddresses = [];
    params.countryBlackList = [];

    return params;
  }

  convertWeiToEther(value) {
    if (!value || value === 0) {
      return value;
    }

    return value / 1000000000000000000;
  }
}
