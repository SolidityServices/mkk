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
    this.minContribution = params.minContribution !== '' ? Web3.utils.fromWei(`${(params.minContribution / (1000 * 1000)).toString()}000000`, 'ether') : '';
    this.maxContribution = params.maxContribution !== '' ? Web3.utils.fromWei(`${(params.maxContribution / (1000 * 1000)).toString()}000000`, 'ether') : '';
    this.minPoolGoal = params.minPoolGoal !== '' ? Web3.utils.fromWei(`${(params.minPoolGoal / (1000 * 1000)).toString()}000000`, 'ether') : '';
    this.maxPoolAllocation = params.maxPoolAllocation !== '' ? Web3.utils.fromWei(`${(params.maxPoolAllocation / (1000 * 1000)).toString()}000000`, 'ether') : '';
    this.saleStartDate = new Date(params.saleStartDate * 1000);
    this.saleEndDate = new Date(params.saleEndDate * 1000);
    this.withdrawTimelock = params.withdrawTimelock !== '' ? params.withdrawTimelock / 60 / 60 : '';
    this.providerFeeRate = params.providerFeeRate !== 0 ? params.providerFeeRate / 100 : 0;
    this.creatorFeeRate = params.creatorFeeRate !== '' ? params.creatorFeeRate / 100 : '';
    this.whitelistPool = params.whitelistPool;
    this.strictlyTrustlessPool = params.strictlyTrustlessPool;
    this.adminAddresses = params.adminAddresses ? params.adminAddresses : [];
    this.whiteListAddresses = params.whiteListAddresses ? params.whiteListAddresses : [];
    this.countryBlackList = params.countryBlackList ? params.countryBlackList : [];
    this.balance = params.balance;
    this.isStopped = params.isStopped;
    this.isSentToSale = params.isSentToSale;
    this.allGrossContributions = Web3.utils.fromWei((`${(params.allGrossContributions / (1000 * 1000)).toString()}000000`).toString(), 'ether');
  }

  // eslint-disable-next-line class-methods-use-this
  initParams() {
    const params = {};

    params.saleAddress = '';
    params.tokenAddress = '';
    params.saleParticipateFunctionSig = '';
    params.saleWithdrawFunctionSig = '';
    params.poolDescription = '';
    params.creatorFeeRate = '';
    const date = Math.floor(new Date() / 1000);
    params.saleStartDate = date;
    params.saleEndDate = date + (24 * 60 * 60 * 7); // add 7 days
    params.minContribution = '';
    params.maxContribution = '';
    params.minPoolGoal = '';
    params.maxPoolAllocation = '';
    params.withdrawTimelock = '';
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
