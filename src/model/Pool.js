export default class Pool {
  connectIco;

  address;

  tokenAddress;

  creatorFeeRate;

  saleStartDate;

  saleEndDate;

  minContribution;

  maxContribution;

  minPoolGoal;

  maxAllocationFee;

  withdrawTimeLock;

  isWhiteListPool;

  constructor(address) {
    this.connectIco = window.connectIco;
    this.address = address;
    this.init();
  }

  init() {
    this.tokenAddress = this.connectIco.getTokenAddress(this.address);
    this.creatorFeeRate = this.connectIco.getCreatorFeeRate(this.address);
    this.saleStartDate = this.connectIco.getStartDate(this.address);
    this.saleEndDate = this.connectIco.getEndDate(this.address);
    this.minContribution = this.connectIco.getMinContribution(this.address);
    this.maxContribution = this.connectIco.getMaxContribution(this.address);
    this.minPoolGoal = this.connectIco.getMinPoolGoal(this.address);
    this.maxAllocationFee = this.connectIco.getMaxPoolAllocation(this.address);
    this.withdrawTimeLock = this.connectIco.getWithdrawTimelock(this.address);
    this.isWhiteListPool = this.connectIco.isWhitelistPool(this.address);
  }
}
