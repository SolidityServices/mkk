import Web3 from 'web3';

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

  strictlyTrustlessPool;

  tokenAddress;

  maxPoolAllocation;

  adminAddresses;

  whiteListAddresses;

  countryBlackList;

  isStopped;

  isSentToSale;

  allGrossContributions;

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
      params.isStopped = await this.connectIco.pool.isStopped(this.poolAddress);
      params.isSentToSale = await this.connectIco.pool.isSentToSale(this.poolAddress);
      params.allGrossContributions = await this.connectIco.pool.getAllGrossContributions(this.poolAddress);
    }
    this.saleParticipateFunctionSig = params.saleParticipateFunctionSig;
    this.saleWithdrawFunctionSig = params.saleWithdrawFunctionSig;
    this.poolDescription = params.poolDescription;
    this.saleAddress = params.saleAddress;
    this.tokenAddress = params.tokenAddress;
    this.kycAddress = params.kycAddress;
    this.provider = params.provider;
    this.creator = params.creator;
    this.minContribution = Web3.utils.fromWei(Web3.utils.toBN(params.minContribution), 'ether');
    this.maxContribution = Web3.utils.fromWei(Web3.utils.toBN(params.maxContribution), 'ether');
    this.minPoolGoal = Web3.utils.fromWei(Web3.utils.toBN(params.minPoolGoal), 'ether');
    this.saleStartDate = new Date(params.saleStartDate * 1000);
    this.saleEndDate = new Date(params.saleEndDate * 1000);
    this.maxPoolAllocation = Web3.utils.fromWei(Web3.utils.toBN(params.maxPoolAllocation), 'ether');
    this.withdrawTimelock = params.withdrawTimelock !== 0 ? params.withdrawTimelock / 60 / 60 : 0;
    this.providerFeeRate = params.providerFeeRate !== 0 ? params.providerFeeRate / 100 : 0;
    this.creatorFeeRate = params.creatorFeeRate !== 0 ? params.creatorFeeRate / 10 : 0;
    this.whitelistPool = params.whitelistPool;
    this.strictlyTrustlessPool = params.strictlyTrustlessPool;
    this.adminAddresses = params.adminAddresses ? params.adminAddresses : [];
    this.whiteListAddresses = params.whiteListAddresses ? params.whiteListAddresses : [];
    this.countryBlackList = params.countryBlackList ? params.countryBlackList : [];
    this.balance = params.balance;
    this.isStopped = params.isStopped;
    this.isSentToSale = params.isSentToSale;
    this.allGrossContributions = Web3.utils.fromWei(Web3.utils.toBN(params.allGrossContributions), 'ether');
  }

  // eslint-disable-next-line class-methods-use-this
  initParams() {
    const params = {};

    params.saleAddress = '';
    params.tokenAddress = '';
    params.saleParticipateFunctionSig = '';
    params.saleWithdrawFunctionSig = '';
    params.poolDescription = '';
    params.creatorFeeRate = 0;
    const date = Math.floor(new Date() / 1000);
    params.saleStartDate = date;
    params.saleEndDate = date + (24 * 60 * 60 * 7); // add 7 days
    params.minContribution = 1000000000000;
    params.maxContribution = 1000000000000;
    params.minPoolGoal = 1000000000000;
    params.maxPoolAllocation = 10000000000000000;
    params.withdrawTimelock = 0;
    params.whitelistPool = false;
    params.strictlyTrustlessPool = false;
    params.adminAddresses = [];
    params.whiteListAddresses = [];
    params.countryBlackList = [];
    params.isStopped = false;
    params.isSentToSale = false;
    params.allGrossContributions = 0;

    return params;
  }
}
