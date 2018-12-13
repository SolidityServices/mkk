import Vue from 'vue';
import TruffleContract from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import poolArtifact from '../build/contracts/Pool.json';
import poolFactoryArtifact from '../build/contracts/PoolFactory.json';
import kycArtifact from '../build/contracts/KYC.json';
import tokenPushRegistryArtifact from '../build/contracts/TokenPushRegistry.json';

export default class ConnectICO {
  pool;

  poolFactory;

  KYC;

  tokenPushRegistry;

  web3;

  constructor() {
    this.account = null;
    this.pool = TruffleContract(poolArtifact);
    this.poolFactory = TruffleContract(poolFactoryArtifact);
    this.KYC = TruffleContract(kycArtifact);
    this.tokenPushRegistry = TruffleContract(tokenPushRegistryArtifact);
    this.web3 = window.web3;
  }

  start() {
    // Bootstrap the abstractions for Use.
    console.log(this.web3.currentProvider);
    this.pool.setProvider(this.web3.currentProvider);
    this.poolFactory.setProvider(this.web3.currentProvider);
    this.KYC.setProvider(this.web3.currentProvider);
    this.tokenPushRegistry.setProvider(this.web3.currentProvider);

    // set the initial this.account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accounts) => {
      if (err != null) {
        Vue.notify({
          type: 'error',
          title: 'Error',
          text: 'There was an error fetching your accounts!',
        });
        console.log('There was an error fetching your this.accounts.');
        return;
      }

      if (accounts.length === 0) {
        Vue.notify({
          type: 'error',
          title: 'Error',
          text: 'Couldn\'t get any this.accounts! '
            + 'Make sure your Ethereum client is configured correctly!',
        });
        console.log('Couldn\'t get any this.accounts! '
          + 'Make sure your Ethereum client is configured correctly.');
        return;
      }

      // eslint-disable-next-line prefer-destructuring
      this.account = accounts[0];

      console.log('Application initialized');
    });
  }

  async getPoolFactoryAddress() {
    const instance = await this.poolFactory.deployed();
    return instance.address;
  }

  async getKYCAddress() {
    const instance = await this.KYC.deployed();
    return instance.address;
  }

  async getTokenPushRegistryAddress() {
    const instance = await this.tokenPushRegistry.deployed();
    return instance.address;
  }

  /**
   *A status message for each page for the actual tx status
   *
   * @param {string} status Status message
   */
  /*
  setStatus(message) {
    const status = document.getElementById('status');
    status.innerHTML = message;
  },
  */

  // PoolFactory pool queries

  /**
   * Return one pool address of the given index
   *
   * Frontend page: Pool listing page
   *
   * @param {number} index
   * @return {string} Pool address
   */
  async getPool(index) {
    const instance = await this.poolFactory.deployed();
    const result = await instance.poolList.call(index, { from: this.account });
    return result.toString();
  }

  /**
   * Retuns the number of pools created by the pool factory
   *
   * Frontend page: Pool listing page
   *
   * @return {number} number of pools
   */
  async getPoolNumber() {
    const instance = await this.poolFactory.deployed();
    const result = await instance.getPoolNumber.call({ from: this.account });
    return result.toNumber();
  }

  /**
   * Returns one item of pool list for a sale address by its index
   *
   * Frontend page: Pool listing page
   *
   * @param {number} index
   * @param {string} saleAddress
   * @return {string} pool address
   */
  async getPoolBySale(saleAddress, index) {
    const instance = await this.poolFactory.deployed();
    const result = await instance.getPoolBySale.call(saleAddress, index, { from: this.account });
    return result.toString();
  }

  /**
   * Retuns the number of pools created by the pool factory for one sale
   *
   * Frontend page: Pool listing page
   *
   * @param {string} saleAddress
   * @return {number} number of pools
   */
  async getPoolNumberBySale(saleAddress) {
    const instance = await this.poolFactory.deployed();
    const result = await instance.getPoolNumberBySale.call(saleAddress, { from: this.account });
    return result.toNumber();
  }

  /**
   * Returns one item of pool list for a sale address by its index
   *
   * Frontend page: Pool listing page
   *
   * @param {number} index
   * @param {string} creatorAddress
   * @return {string} pool address
   */
  async getPoolByCreator(creatorAddress, index) {
    const instance = await this.poolFactory.deployed();
    const result = await instance.getPoolByCreator.call(creatorAddress, index, { from: this.account });
    return result.toString();
  }

  /**
   * Retuns the number of pools created by the pool factory by the given creator
   *
   * Frontend page: Pool listing page
   *
   * @param {string} creatorAddress
   * @return {number} number of pools
   */

  async getPoolNumberByCreator(creatorAddress) {
    const instance = await this.poolFactory.deployed();
    const result = await instance.getPoolNumberByCreator.call(creatorAddress, { from: this.account });
    return result.toNumber();
  }

  /**
   * Cheks if a pool exists
   *
   * Frontend page: Pool listing page
   *
   * @param {string} poolAddress
   * @return {boolean} true if pool exists, fales if not
   */
  async checkIfPoolExists(poolAddress) {
    const instance = await this.poolFactory.deployed();
    return instance.pools.call(poolAddress, { from: this.account });
  }

  // PoolFactory param getters
  /**
   * Get owner address of pool factory
   *
   * Frontend page: PoolFactory info page
   *
   * @return {string} owner address of pool factory
   */
  async getPoolFactoryOwner() {
    const instance = await this.poolFactory.deployed();
    const result = await instance.owner.call({ from: this.account });
    return result.toString();
  }

  /**
   * Get all Pool Factory params
   *
   * Frontend page: PoolFactory info page
   *
   *
   * @typedef {Object} PoolFactoryParams
   *
   * @property {string} kycContractAddress -
   * @property {number} flatFee -
   * @property {number} maxAllocationFeeRate -
   * @property {number} maxCreatorFeeRate -
   * @property {number} providerFeeRate -
   *
   * @return {PoolFactoryParams}
   */

  async getAllPoolFactoryParams() {
    const instance = await this.poolFactory.deployed();
    const result = await instance.params.call({ from: this.account });
    return {
      kycContractAddress: result[0].toString(),
      flatFee: result[1].toNumber(),
      maxAllocationFeeRate: result[2].toNumber(),
      maxCreatorFeeRate: result[3].toNumber(),
      providerFeeRate: result[4].toNumber(),
    };
  }

  /**
   * Get the KYC contract address tied to the PoolFactory contract
   *
   * Frontend page: PoolFactory info page
   *
   * @return {string} KYC contract address
   */
  async getPoolFactoryKycContractAddress() {
    const instance = await this.poolFactory.deployed();
    const result = await instance.params.call({ from: this.account });
    return result[0].toString();
  }

  /**
   * Get flat fee for pool creation (1/1000)
   *
   * Frontend page: PoolFactory info page
   *
   * @return flat fee for pool creation (1/1000)
   */
  async getFlatFee() {
    const instance = await this.poolFactory.deployed();
    const result = await instance.params.call({ from: this.account });
    return result[1].toNumber();
  }

  /**
   * Get fee rate for maximum pool allocation (1/1000)
   *
   * Frontend page: PoolFactory info page
   *
   * @return fee rate for maximum pool allocation (1/1000)
   */
  async getMaxAllocationFeeRate() {
    const instance = await this.poolFactory.deployed();
    const result = await instance.params.call({ from: this.account });
    return result[2].toNumber();
  }

  /**
   * Get maximum allowed fee rates set by crators for pools (1/1000)
   *
   * Frontend page: PoolFactory info page
   *
   * @return maximum allowed fee rate (1/1000)
   */
  async getMaxCreatorFeeRate() {
    const instance = await this.poolFactory.deployed();
    const result = await instance.params.call({ from: this.account });
    return result[3].toNumber();
  }

  async getProviderFeeRate() {
    const instance = await this.poolFactory.deployed();
    const result = await instance.params.call({ from: this.account });
    return result[4].toNumber();
  }

  // PoolFactory param setters (onlyOwner)
  /**
   *
   * Set all parameters
   *
   * Should be null if you dont want to change a particular parameter
   *
   * @param {string} _ownerAddress - address of pool factory
   * @param {string} _kycContractAddress - KYC contract address
   * @param {number} _flatFee - flat fee for pool creation (1/1000)
   * @param {number} _maxAllocationFeeRate - fee rate for maximum pool allocation (1/1000)
   * @param {number} _maxCreatorFeeRate - maximum allowed fee rate (1/1000)
   * @param {number} _providerFeeRate - provider fee rate for pools (1/1000)
   *
   */

  async setPoolFactoryParams(
    _ownerAddress,
    _kycContractAddress,
    _flatFee,
    _maxAllocationFeeRate,
    _maxCreatorFeeRate,
    _providerFeeRate,
  ) {
    let ownerAddress;
    let kycContractAddress;
    let flatFee;
    let maxAllocationFeeRate;
    let maxCreatorFeeRate;
    let providerFeeRate;
    const toUpdate = [];

    if (!_ownerAddress) {
      ownerAddress = 0x0;
      toUpdate.push(false);
    } else {
      ownerAddress = _ownerAddress;
      toUpdate.push(true);
    }

    if (!_kycContractAddress) {
      kycContractAddress = 0x0;
      toUpdate.push(false);
    } else {
      kycContractAddress = _kycContractAddress;
      toUpdate.push(true);
    }

    if (!_flatFee) {
      flatFee = 0;
      toUpdate.push(false);
    } else {
      flatFee = _flatFee;
      toUpdate.push(true);
    }

    if (!_maxAllocationFeeRate) {
      maxAllocationFeeRate = 0;
      toUpdate.push(false);
    } else {
      maxAllocationFeeRate = _maxAllocationFeeRate;
      toUpdate.push(true);
    }

    if (!_maxCreatorFeeRate) {
      maxCreatorFeeRate = 0;
      toUpdate.push(false);
    } else {
      maxCreatorFeeRate = _maxCreatorFeeRate;
      toUpdate.push(true);
    }

    if (!_providerFeeRate) {
      providerFeeRate = 0;
      toUpdate.push(false);
    } else {
      providerFeeRate = _providerFeeRate;
      toUpdate.push(true);
    }

    const instance = await this.poolFactory.deployed();
    return instance.setParams(
      ownerAddress,
      kycContractAddress,
      flatFee,
      maxAllocationFeeRate,
      maxCreatorFeeRate,
      providerFeeRate,
      toUpdate,
      { from: this.account },
    );
  }

  /**
   * Set owner address in PoolFactory contract, only current owner has authority
   *
   * Frontend page: PoolFactory admin page for provider/owner
   *
   * @param {string} ownerAddress
   */
  async setOwner(ownerAddress) {
    const instance = await this.poolFactory.deployed();
    return instance.setParams(
      ownerAddress,
      0x0,
      0,
      0,
      0,
      0,
      [true, false, false, false, false, false],
      { from: this.account },
    );
  }

  /**
   * Set KYC contract address in PoolFactory contract, only owner has authority
   *
   * Frontend page: PoolFactory admin page for provider/owner
   *
   * @param {string} kycContractAddress
   */
  async setKycContractAddress(kycContractAddress) {
    const instance = await this.poolFactory.deployed();
    return instance.setParams(
      0x0,
      kycContractAddress,
      0,
      0,
      0,
      0,
      [false, true, false, false, false, false],
      { from: this.account },
    );
  }

  /**
   * Set flat fee in PoolFactory contract for creating pools, only owner has authority
   *
   * Frontend page: PoolFactory admin page for provider/owner
   *
   * @param flatFee flat fee for pool creation
   */
  async setFlatFee(flatFee) {
    const instance = await this.poolFactory.deployed();
    return instance.setParams(
      0x0,
      0x0,
      flatFee,
      0,
      0,
      0,
      [false, false, true, false, false, false],
      { from: this.account },
    );
  }

  /**
   * Set maximum allocation fee for creating pools, only owner has authority
   *
   * Frontend page: PoolFactory admin page for provider/owner
   *
   * @param maxAllocationFeeRate fee 'taxing' the maximum allocation parameter
   */
  async setMaxAllocationFeeRate(maxAllocationFeeRate) {
    const instance = await this.poolFactory.deployed();
    return instance.setParams(
      0x0,
      0x0,
      0,
      maxAllocationFeeRate,
      0,
      0,
      [false, false, false, true, false, false],
      { from: this.account },
    );
  }

  /**
   * Set maximum allowed fee for pool creators, only owner has authority
   *
   * Frontend page: PoolFactory admin page for provider/owner
   *
   * @param maxCreatorFeeRate maximum amount of fee creators can set for a pool
   */
  async setMaxCreatorFeeRate(maxCreatorFeeRate) {
    const instance = await this.poolFactory.deployed();
    return instance.setParams(
      0x0,
      0x0,
      0,
      0,
      maxCreatorFeeRate,
      0,
      [false, false, false, false, true, false],
      { from: this.account },
    );
  }

  /**
   * Set provider fee rate for creating pools, only owner has authority
   *
   * Frontend page: PoolFactory admin page for provider/owner
   *
   * @param providerFeeRate provider fees for pools
   */
  async setProviderFeeRate(providerFeeRate) {
    const instance = await this.poolFactory.deployed();
    return instance.setParams(
      0x0,
      0x0,
      0,
      0,
      0,
      providerFeeRate,
      [false, false, false, false, false, true],
      { from: this.account },
    );
  }

  // Pool factory stats getters

  /**
   * Retruns the whole ETH balace of the PoolFactory contract
   *
   * Frontend page: PoolFactory info page
   *
   * @return the whole ETH balace of the PoolFactory contract
   */
  // getBalance function does not exist
  async getPoolFactoryBalance() {
    const instance = await this.poolFactory.deployed();
    const result = await this.web3.eth.getBalance(instance.address);
    return result.toString();
  }

  // PoolFactory operations

  /**
   * Function for creating pools, needs ethereum sent to it (payable)
   *
   * Frontend page: Pool creation page
   *
   * @param {string} saleAddress address of the ICO token sale contract
   * @param {string} tokenAddress address of the erc20 token distributed in the sale
   * @param {number} creatorFeeRate 1/1000 fee rate of the pool income payed to the pool creator
   * @param {number} saleStartDate unix timestamp in seconds of the start of the sale
   * @param {number} saleEndDate unix timestamp in seconds of the end of the sale
   * @param {number} minContribution minimum amount of ETH contribution allowed in one tx
   * @param {number} maxContribution maximum amount of ETH contribution allowed in one tx
   * @param {number} minPoolGoal minimum amount of ETH needed to be raised by the pool for the sale
   * @param {number} maxPoolAllocation maximum amount of ETH allowed to be raised by the pool for the sale
   * @param {number} withdrawTimelock unix timestamp in seconds for how much time funds
   * are locked from withdrawal after contribution
   * @param {boolean} whitelistPool pool has address whitelist or not
   * @param {number} transferValue Ethereum fee for creating pools in wei units, must equal
   * flatFee + (maxAllocationFeeRate * _maxPoolAllocation)/1000 or more
   * @return address of the created pool
   */
  async createPool(
    saleAddress,
    tokenAddress,
    creatorFeeRate,
    saleStartDate,
    saleEndDate,
    minContribution,
    maxContribution,
    minPoolGoal,
    maxPoolAllocation,
    withdrawTimelock,
    whitelistPool,
    transferValue,
  ) {
    const instance = await this.poolFactory.deployed();
    const reciept = await instance.createPool(
      saleAddress,
      tokenAddress,
      creatorFeeRate,
      saleStartDate,
      saleEndDate,
      minContribution,
      maxContribution,
      minPoolGoal,
      maxPoolAllocation,
      withdrawTimelock,
      whitelistPool,
      {
        from: this.account,
        value: transferValue,
      },
    );

    const result = reciept.logs[0].args.poolAddress;
    console.log(reciept);
    console.log(`pool address: ${result}`);

    return result;
  }

  /**
   * Function for owner to withdraw accumulated fees from PoolFactory
   *
   * Frontend page: PoolFactory admin page for provider/owner
   *
   */
  async withdraw() { // onlyOwner
    const instance = await this.poolFactory.deployed();
    const result = await instance.withdraw({ from: this.account });
    return result.toString();
  }

  // Pool
  // Pool param getters

  /**
   * Get all Pool parameters
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   *
   * @typedef {Object} PoolParams
   *
   * @property {string} saleParticipateFunctionSig -
   * @property {string} saleWithdrawFunctionSig -
   * @property {string} saleAddress -
   * @property {string} tokenAddress -
   * @property {string} kycAddress -
   * @property {string} provider -
   * @property {string} creator -
   * @property {number} minContribution -
   * @property {number} maxContribution -
   * @property {number} minPoolGoal -
   * @property {number} maxPoolAllocation -
   * @property {number} saleStartDate -
   * @property {number} saleEndDate -
   * @property {number} maxPoolAllocation -
   * @property {number} withdrawTimelock -
   * @property {number} providerFeeRate -
   * @property {number} creatorFeeRate -
   * @property {boolean} whitelistPool -
   *
   * @return {PoolParams}
   */

  async getPoolParams(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result1 = await instance.getParams1.call({ from: this.account });
    const result2 = await instance.getParams2.call({ from: this.account });

    return {
      saleParticipateFunctionSig: result2[1].toString(),
      saleWithdrawFunctionSig: result2[2].toString(),
      saleAddress: result2[3].toString(),
      tokenAddress: result2[4].toString(),
      kycAddress: result2[5].toString(),
      provider: result2[6].toString(),
      creator: result2[7].toString(),
      minContribution: result1[5].toNumber(),
      maxContribution: result1[6].toNumber(),
      minPoolGoal: result1[7].toNumber(),
      saleStartDate: result1[2].toNumber(),
      saleEndDate: result1[3].toNumber(),
      maxPoolAllocation: result1[8].toNumber(),
      withdrawTimelock: result1[4].toNumber(),
      providerFeeRate: result1[0].toNumber(),
      creatorFeeRate: result1[1].toNumber(),
      whitelistPool: result2[0],
    };
  }

  /**
   * Get the KYC contract address tied to the Pool contract
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return {string} address of the KYC contract
   */
  async getPoolKycContractAddress(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.getParams2.call({ from: this.account });
    return result[5].toString();
  }

  /**
   * Address of the service provider (same as pool factory owner)
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return {string} address provider
   */

  async getProviderAddress(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.getParams2.call({ from: this.account });
    return result[6].toString();
  }

  /**
   * Address of the pool creator
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return {string} pool creator address
   */
  async getCreatorAddress(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.getParams2.call({ from: this.account });
    return result[7].toString();
  }

  /**
   * Get fee rate for the service provider after every pool income (1/1000)
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return provider fee rate
   */
  async getProviderFeeRate(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.getParams1.call({ from: this.account });
    return result[0].toNumber();
  }

  /**
   * Get fee rate for the pool creator after every pool income (1/1000)
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return creator fee rate
   */
  async getCreatorFeeRate(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.getParams1.call({ from: this.account });
    return result[1].toNumber();
  }

  /**
   * Get address of the ICO token sale contract the pool is raising funds for
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return {string} sale contract address
   */
  async getSaleAddress(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.getParams2.call({ from: this.account });
    return result[3].toString();
  }

  /**
   * Get address of the erc20 token distributed in the sale
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return {string} token address
   */
  async getTokenAddress(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.getParams2.call({ from: this.account });
    return result[4].toString();
  }

  /**
   * Get minimum amount of ETH contribution allowed in one tx
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return minium contribution
   */
  async getMinContribution(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.getParams1.call({ from: this.account });
    return result[5].toNumber();
  }

  /**
   * Get maximum amount of ETH contribution allowed in one tx
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return maximum contribution
   */
  async getMaxContribution(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.getParams1.call({ from: this.account });
    return result[6].toNumber();
  }

  /**
   * Getminimum amount of ETH needed to be raised by the pool for the sale
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return minimum pool goal
   */
  async getMinPoolGoal(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.getParams1.call({ from: this.account });
    return result[7].toNumber();
  }

  /**
   * Get maximum amount of ETH allowed to be raised by the pool for the sale
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return max pool goal
   */
  async getMaxPoolAllocation(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.getParams1.call({ from: this.account });
    return result[8].toNumber();
  }

  /**
   * Get unix timestamp in seconds for start date of the sale
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return sale start date
   */
  async getStartDate(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.getParams1.call({ from: this.account });
    return result[2].toNumber();
  }

  /**
   * Get unix timestamp in seconds for end date of the sale
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return sale end date
   */
  async getEndDate(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.getParams1.call({ from: this.account });
    return result[3].toNumber();
  }

  /**
   * Get unix timestamp in seconds for how much
   * time funds are locked from withdrawal after contribution
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return withdraw timelock
   */
  async getWithdrawTimelock(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.getParams1.call({ from: this.account });
    return result[4].toNumber();
  }

  /**
   * Get sale function signature for the case of sales,
   * that unable to receive funds the anonymus fallback function
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return {string} sale function signature
   */
  async getSaleParticipateFunctionSig(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.getParams2.call({ from: this.account });
    return result[1].toString();
  }

  /**
   * Get withdraw function signature for the case of sales,
   * that unable push out tokens automatically
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return {string} withdraw function signature
   */
  async getSaleWtidrawFunctionSig(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.getParams2.call({ from: this.account });
    return result[1].toString();
  }

  /**
   * Check if the pool enforces a whitelist for participants
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return {boolean} is whitelist pool
   */
  async isWhitelistPool(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.getParams2.call({ from: this.account });
  }

  /**
   * Checik if a given address is an admin address for the pool
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} address address to check
   * @return {boolean} is admin
   */

  async isAdmin(poolAddress, address) {
    const instance = await this.pool.at(poolAddress);
    return instance.admins.call(address, { from: this.account });
  }

  /**
   * Check if the given address is on the whitelist of the pool
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} address address to check
   * @return {boolean} is on whitelist
   */
  async isOnWhitelist(poolAddress, address) {
    const instance = await this.pool.at(poolAddress);
    return instance.whitelist.call(address, { from: this.account });
  }

  /**
   * Check a country code if its on blacklist for the pool
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} countryCode 3 letter country code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3)
   * @return {boolean} is on blacklist
   */
  async isOnCountryBlacklist(poolAddress, countryCode) {
    const instance = await this.pool.at(poolAddress);
    return instance.kycCountryBlacklist.call(countryCode, { from: this.account });
  }

  /**
   * Get all ETH balance of a given pool contract
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return ETH balance
   */
  async getPoolBalance(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = this.web3.eth.getBalance(instance.address);
    return result.toString();
  }

  /**
   * Get all Pool stats
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   *
   * @typedef {Object} PoolStats
   *
   * @property {number} allGrossContributions -
   * @property {number} creatorStash -
   * @property {number} providerStash -
   * @property {number} tokensReceivedConfirmed -
   * @property {boolean} sentToSale -
   *
   * @return {PoolStats}
   */

  async getAllPoolStats(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.poolStats.call({ from: this.account });
    return {
      allGrossContributions: result[0].toNumber(),
      creatorStash: result[1].toNumber(),
      providerStash: result[2].toNumber(),
      tokensReceivedConfirmed: result[3],
      sentToSale: result[4],
    };
  }

  /**
   * Get all ETH contributions of the pool without applying fees
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return all gross contributions
   */
  async getAllGrossContributions(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.poolStats.call({ from: this.account });
    return result[0].toNumber();
  }

  /**
   * Get ETH amount that the pool creator collected from fees
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return creator stash
   */
  async getCreatorStash(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.poolStats.call({ from: this.account });
    return result[1].toNumber();
  }

  /**
   * Get ETH amount that the service provider collected from fees
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return provider stash
   */
  async getProviderStash(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.poolStats.call({ from: this.account });
    return result[2].toNumber();
  }

  /**
   * Cehck if the pool funds have been sent to sale
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return {boolean} true: sent, false: not sent yet
   */
  async isSentToSale(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.poolStats.call({ from: this.account });
    return result[4];
  }

  /**
   * Check if token receiving is confirmed
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return {boolean} true: confirmed, false: not confirmed yet
   */
  async areTokensReceivedConfirmed(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.poolStats.call({ from: this.account });
    return result[3];
  }

  /** FIX CONTRACT (GETTER)
   * Get total token amouts that has been payed out the by pool by different tokens
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} tokenAddress address of the token
   * we want to query the payout amount in ETH is 0x0
   * @return payout amount
   */
  /*
  async getTotalPayedOutByToken(poolAddress, tokenAddress) {
    let instance;
    let result;
    this.pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.totalPayedOut.call(tokenAddress, { from: this.account });
    }).then((value) => {
      result = value;
      console.log(result);
      return result;
    });
  }
  */

  // Pool contributor queries
  /**
   * Get the address list of all pool contributors
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return {string[]} address list of all pool contributors
   */
  /*
  async getAllContibutors(poolAddress) {
    let instance;
    let result;
    this.pool.deployed().then((_instance) => {
      instance = _instance;
      return instance.poolList.call(index, { from: this.account });
    }).then((value) => {
      result = value.toString();
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }
  */

  /**
   * Get pool contributor address at index
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {number} index
   * @return {string} pool contributor address
   */

  async getContributor(poolAddress, index) {
    const instance = await this.pool.at(poolAddress);
    return instance.contributorList.call(index, { from: this.account });
  }


  /** FIX CONTRACT (GETTER)
   * Get number of individual pool contributors
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return {number} number of individual pool contributors
   */
  /*
  async getContributorNumber(poolAddress) {
    let instance;
    let result;
    this.pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.contributorList.length.call({ from: this.account });
    }).then((value) => {
      result = value;
      console.log(result);
      return result;
    });
  }
  */

  /**
   * Get the last contribuition time of a specific contributor
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} contributorAddress address of contributor
   * @return contribution time
   */
  async getLastContributionTimeByContributor(poolAddress, contributorAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.contributors.call(contributorAddress, { from: this.account });
    return result[0].toNumber();
  }

  /**
   * Get ETH contribution amount before fees applied by pool contributor
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} contributorAddress contributor address
   * @return contribution amount
   */
  async getGrossContributionByContributor(poolAddress, contributorAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.contributors.call(contributorAddress, { from: this.account });
    return result[1].toNumber();
  }


  /** FIX CONTRACT (GETTER)
   * Get payout amounts by token by pool contributor
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} contributorAddress contributor address
   * @param {string} tokenAddress token address in case of ETH 0x0
   * @return tonken amount
   */
  /*
  async getPayedOutByContributorByToken(poolAddress, contributorAddress, tokenAddress) {
    let instance;
    let result;
    this.pool.deployed().then((_instance) => {
      instance = _instance;
      return instance.poolList.call(index, { from: this.account });
    }).then((value) => {
      result = value.toString();
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }
  */

  // Pool operations

  /**
   * Add a new pool admin address (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} adminAddress address of new admin
   */
  async addAdmin(poolAddress, adminAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.addAdmin(adminAddress, { from: this.account });
  }

  /** function deleted from contract
   * Add list of new admin addresses (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string[]} adminAddressList address list of new admins
   */
  /*
  async addAdminList(poolAddress, adminAddressList) {
    let instance;
    let result;
    this.pool.deployed().then((_instance) => {
      instance = _instance;
      return instance.poolList.call(index, { from: this.account });
    }).then((value) => {
      result = value.toString();
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }
  */

  /**
   * Remove admin by address (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} adminAddress address of admin to remove
   */
  async removeAdmin(poolAddress, adminAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.removeAdmin(adminAddress, { from: this.account });
  }

  /**
   * Add address to pool whiteslist (only admin)
   *
   * Frontend page: Pool admin page for pool admins
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} whitelistAddress address to add to whitelist
   */
  async addWhitelist(poolAddress, whitelistAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.addWhitelist(whitelistAddress, { from: this.account });
  }

  /** function deleted from contract
   * Add list of addresses to pool whiteslist (only admin)
   *
   * Frontend page: Pool admin page for pool admins
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string[]} whitelistAddressList list of addresses to add to whitelist
   */
  /*
  async addWhitelistList(poolAddress, whitelistAddressList) {
    let instance;
    let result;
    this.pool.deployed().then((_instance) => {
      instance = _instance;
      return instance.poolList.call(index, { from: this.account });
    }).then((value) => {
      result = value.toString();
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }
  */

  /**
   * Remove address from pool whiteslist (only admin)
   *
   * Frontend page: Pool admin page for pool admins
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} whitelistAddress address to remove from whitelist
   */
  async removeWhitelist(poolAddress, whitelistAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.removeWhitelist(whitelistAddress, { from: this.account });
  }

  /**
   * Add country code to country blacklist (only admin)
   *
   * Frontend page: Pool admin page for pool admins
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} countryCode 3 letter country code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3)
   */
  async addCountryBlacklist(poolAddress, countryCode) {
    const instance = await this.pool.at(poolAddress);
    return instance.addCountryBlacklist(countryCode, { from: this.account });
  }

  /** function deleted from contract
   * Add list of country codes to country blacklist (only admin)
   *
   * Frontend page: Pool admin page for pool admins
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string[]} countryCode list of 3 letter country codes (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3)
   */
  /*
  async addCountryBlacklistList(poolAddress, countryCodeList) {
    let instance;
    let result;
    this.pool.deployed().then((_instance) => {
      instance = _instance;
      return instance.poolList.call(index, { from: this.account });
    }).then((value) => {
      result = value.toString();
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }
  */

  /**
   * Remove country code from country blacklist (only admin)
   *
   * Frontend page: Pool admin page for pool admins
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} countryCode 3 letter country code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3)
   */
  async removeCountryBlacklist(poolAddress, countryCode) {
    const instance = await this.pool.at(poolAddress);
    return instance.removeCountryBlacklist(countryCode, { from: this.account });
  }

  /**
   * Contribute to pool payable - tx has to have ETH value
   *
   * Frontend page: Pool contributor page (can be the same as Pool info page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   *
   * @param {number} amount ETH amount to send in wei
   */
  async contribute(poolAddress, amount) {
    const instance = await this.pool.at(poolAddress);
    // TODO: ???
    return instance.contribute(adminAddress, { from: this.account, value: amount });
  }

  /**
   * Withdraw funds from the token before being sent to sale
   *
   * Frontend page: Pool contributor page (can be the same as Pool info page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {number} amount ETH amount to withdraw in wei
   */
  async withdraw(poolAddress, amount) {
    const instance = await this.pool.at(poolAddress);
    return instance.withdraw(amount, { from: this.account });
  }

  /**
   * Withdraw funds from the token after being sent
   * to sale and being refunded from sale to pool contract
   *
   * Frontend page: Pool contributor page (can be the same as Pool info page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   */
  async withdrawRefund(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.withdrawRefund({ from: this.account });
  }

  /**
   * Withdraw main erc20 token from the pool (specified by tokenAddress)
   *
   * Frontend page: Pool contributor page (can be the same as Pool info page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   */

  async withdrawToken(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.withdrawToken({ from: this.account });
  }

  /**
   * Withdraw given erc20 token from the pool (sepcified by tokenAddress)
   *
   * Frontend page: Pool contributor page (can be the same as Pool info page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} tokenAddress erc 20 token address (this cannot be ETH, so no 0x0 allowed here)
   */
  async withdrawCustomToken(poolAddress, tokenAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.withdrawCustomToken(tokenAddress, { from: this.account });
  }

  /**
   * Push out pool main tokens to participants (only admin, mostly for token push server)
   *
   * Frontend page: Pool admin page for pool admins
   * (but mostly called by token push server, might not even on frontend)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} recipientAddress address to push out their coins
   */
  async pushOutToken(poolAddress, recipientAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.pushOutToken(recipientAddress, { from: this.account });
  }

  /**
   * Change erc20 token address distributed by the sale for the pool (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} tokenAddress new token address
   */
  // DUPLICATE changeTokenAddress: async function(poolAddress, tokenAddress){
  //
  // }

  /**
   * Confirm that the tokens are received from the sale (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {BigNumber} tokensExpected amount of tokens expected from the sale
   */
  async confirmTokensReceived(poolAddress, tokensExpected) {
    const instance = await this.pool.at(poolAddress);
    return instance.confirmTokensReceived(tokensExpected, { from: this.account });
  }

  /**
   * Send pool funds to sale (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function interacts with
   */
  async sendToSale(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.sendToSale({ from: this.account });
  }

  /**
   * Send pool funds to sale to predefined special function (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   */
  async sendToSaleFunction(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.sendToSaleFunction({ from: this.account });
  }

  /**
   * Whitdraw tokens from sale with predefined special function (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   */
  async withdrawFromSaleFunction(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.withdrawFromSaleFunction({ from: this.account });
  }

  /**
   * Withdraw provider fee from the stash (onyl provider)
   *
   * Frontend page: Pool admin page for provider
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   */
  async poviderWithdraw(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.providerWithdraw({ from: this.account });
  }


  /**
   * Withdraw creator fee from the stash (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   */
  async creatorWithdraw(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.creatorWithdraw({ from: this.account });
  }

  // Pool param setters
  /**
   * Set all pool parameters settable by creator
   *
   * Should be null if you dont want to change a particular parameter
   *
   * @param {string} poolAddress pool address
   * @param {string} _creator creator address
   * @param {number} _creatorFeeRate 1/1000 fee rate of the pool income payed to the pool creator
   * @param {number} _saleStartDate unix timestamp in seconds of the start of the sale
   * @param {number} _saleEndDate unix timestamp in seconds of the end of the sale
   * @param {number} _withdrawTimelock unix timestamp in seconds for how much time funds
   * are locked from withdrawal after contribution
   * @param {number} _minContribution minimum amount of ETH contribution allowed in one tx
   * @param {number} _maxContribution maximum amount of ETH contribution allowed in one tx
   * @param {number} _minPoolGoal minimum amount of ETH needed to be raised by the pool for the sale
   * @param {boolean} _whitelistPool pool has address whitelist or not
   * @param {string} _tokenAddress address of the erc20 token distributed in the sale
   */

  async setPoolParamsCreator(
    poolAddress,
    _creator,
    _creatorFeeRate,
    _saleStartDate,
    _saleEndDate,
    _withdrawTimelock,
    _minContribution,
    _maxContribution,
    _minPoolGoal,
    _whitelistPool,
    _tokenAddress,
  ) {
    let creator;
    let creatorFeeRate;
    let saleStartDate;
    let saleEndDate;
    let withdrawTimelock;
    let minContribution;
    let maxContribution;
    let minPoolGoal;
    let whitelistPool;
    let tokenAddress;
    const toUpdate = [];

    if (!_creator) {
      creator = 0x0;
      toUpdate.push(false);
    } else {
      creator = _creator;
      toUpdate.push(true);
    }

    if (!_creatorFeeRate) {
      creatorFeeRate = 0;
      toUpdate.push(false);
    } else {
      creatorFeeRate = _creatorFeeRate;
      toUpdate.push(true);
    }

    if (!_saleStartDate) {
      saleStartDate = 0;
      toUpdate.push(false);
    } else {
      saleStartDate = _saleStartDate;
      toUpdate.push(true);
    }

    if (!_saleEndDate) {
      saleEndDate = 0;
      toUpdate.push(false);
    } else {
      saleEndDate = _saleEndDate;
      toUpdate.push(true);
    }

    if (!_withdrawTimelock) {
      withdrawTimelock = 0;
      toUpdate.push(false);
    } else {
      withdrawTimelock = _withdrawTimelock;
      toUpdate.push(true);
    }

    if (!_minContribution) {
      minContribution = 0;
      toUpdate.push(false);
    } else {
      minContribution = _minContribution;
      toUpdate.push(true);
    }

    if (!_maxContribution) {
      maxContribution = 0;
      toUpdate.push(false);
    } else {
      maxContribution = _maxContribution;
      toUpdate.push(true);
    }

    if (!_minPoolGoal) {
      // TODO: ??
      minPoolGoal = whitelistPool;
      toUpdate.push(false);
    } else {
      minPoolGoal = _minPoolGoal;
      toUpdate.push(true);
    }

    if (!_whitelistPool) {
      whitelistPool = false;
      toUpdate.push(false);
    } else {
      whitelistPool = _whitelistPool;
      toUpdate.push(true);
    }

    if (!_tokenAddress) {
      tokenAddress = 0x0;
      toUpdate.push(false);
    } else {
      tokenAddress = _tokenAddress;
      toUpdate.push(true);
    }

    const instance = await this.pool.at(poolAddress);
    return instance.setParams(
      creator,
      creatorFeeRate,
      saleStartDate,
      saleEndDate,
      withdrawTimelock,
      minContribution,
      maxContribution,
      minPoolGoal,
      whitelistPool,
      tokenAddress,
      toUpdate,
      { from: this.account },
    );
  }

  /**
   * Set all pool parameters settable by provider
   *
   * Should be null if you dont want to change a particular parameter
   *
   * @param {string} poolAddress pool address
   * @param {string} _provider creator address
   * @param {number} _providerFeeRate 1/1000 fee rate of the pool income payed to the pool creator
   * @param {number} _maxPoolAllocation unix timestamp in seconds of the start of the sale
   */
  async setPoolParamsProvider(
    poolAddress,
    _provider,
    _providerFeeRate,
    _maxPoolAllocation,
  ) {
    let provider;
    let providerFeeRate;
    let maxPoolAllocation;
    const toUpdate = [];

    if (!_provider) {
      provider = 0x0;
      toUpdate.push(false);
    } else {
      provider = _provider;
      toUpdate.push(true);
    }

    if (!_providerFeeRate) {
      providerFeeRate = 0;
      toUpdate.push(false);
    } else {
      providerFeeRate = _providerFeeRate;
      toUpdate.push(true);
    }

    if (!_maxPoolAllocation) {
      maxPoolAllocation = 0;
      toUpdate.push(false);
    } else {
      maxPoolAllocation = _maxPoolAllocation;
      toUpdate.push(true);
    }

    const instance = await this.pool.at(poolAddress);
    return instance.setParams(
      provider,
      providerFeeRate,
      maxPoolAllocation,
      toUpdate,
      { from: this.account },
    );
  }

  /**
   * Set provider address (only provider)
   *
   * Frontend page: Pool admin page for provider
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} providerAddress new provider address
   */
  async setProvider(poolAddress, providerAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.setParams(
      providerAddress,
      0,
      0,
      [true, false, false],
      { from: this.account },
    );
  }

  /**
   * Set creator address (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} creatorAddress new creator address
   */
  async setCreator(poolAddress, creatorAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.setParams(
      creatorAddress,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      false,
      0x0,
      [true, false, false, false, false, false, false, false, false, false],
      { from: this.account },
    );
  }

  /**
   * Set provider fee rate (only provider)
   *
   * Frontend page: Pool admin page for provider
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param providerFeeRate new provider fee rate (1/100)
   */
  async setProviderFeeRate(poolAddress, providerFeeRate) {
    const instance = await this.pool.at(poolAddress);
    return instance.setParams(
      0x0,
      providerFeeRate,
      0,
      [false, true, false],
      { from: this.account },
    );
  }

  /**
   * Set creator fee rate (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param creatorFeeRate new creator fee rate (1/100)
   */
  async setCreatorFeeRate(poolAddress, creatorFeeRate) {
    const instance = await this.pool.at(poolAddress);
    return instance.setParams(
      0x0,
      creatorFeeRate,
      0,
      0,
      0,
      0,
      0,
      0,
      false,
      0x0,
      [false, true, false, false, false, false, false, false, false, false],
      { from: this.account },
    );
  }

  /**
   * Change erc20 token address distributed by the sale for the pool (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} tokenAddress new token address
   */
  async setTokenAddress(poolAddress, tokenAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.setParams(
      0x0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      false,
      tokenAddress,
      [false, false, false, false, false, false, false, false, false, true],
      { from: this.account },
    );
  }

  /**
   * Set if pool is whitelist pool (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {boolean} isWhitelistPool
   */
  async setWhitelistPool(poolAddress, isWhitelistPool) {
    const instance = await this.pool.at(poolAddress);
    return instance.setParams(
      0x0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      isWhitelistPool,
      0x0,
      [false, false, false, false, false, false, false, false, true, false],
      { from: this.account },
    );
  }

  /**
   * Set new sale start date (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param saleStartDate
   */
  async setSaleStartDate(poolAddress, saleStartDate) {
    const instance = await this.pool.at(poolAddress);
    return instance.setParams(
      0x0,
      0,
      saleStartDate,
      0,
      0,
      0,
      0,
      0,
      false,
      0x0,
      [false, false, true, false, false, false, false, false, false, false],
      { from: this.account },
    );
  }

  /**
   * Set new sale end date (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param saleEndDate
   */
  async setSaleEndDate(poolAddress, saleEndDate) {
    const instance = await this.pool.at(poolAddress);
    return instance.setParams(
      0x0,
      0,
      0,
      saleEndDate,
      0,
      0,
      0,
      0,
      false,
      0x0,
      [false, false, false, true, false, false, false, false, false, false],
      { from: this.account },
    );
  }

  /**
   * Set new minimum amount of ETH contribution allowed in one tx (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param minContribution new minimum contribution
   */
  async setMinContribution(poolAddress, minContribution) {
    const instance = await this.pool.at(poolAddress);
    return instance.setParams(
      0x0,
      0,
      0,
      0,
      0,
      minContribution,
      0,
      0,
      false,
      0x0,
      [false, false, false, false, false, true, false, false, false, false],
      { from: this.account },
    );
  }

  /**
   * Set new maximum amount of ETH contribution allowed in one tx (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param maxContribution new maximum contribution
   */
  async setMaxContribution(poolAddress, maxContribution) {
    const instance = await this.pool.at(poolAddress);
    return instance.setParams(
      0x0,
      0,
      0,
      0,
      0,
      0,
      maxContribution,
      0,
      false,
      0x0,
      [false, false, false, false, false, false, true, false, false, false],
      { from: this.account },
    );
  }

  /**
   * Set new minimum amount of ETH needed to be raised by the pool for the sale (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param minPoolGoal new minimum pool goal
   */
  async setMinPoolGoal(poolAddress, minPoolGoal) {
    const instance = await this.pool.at(poolAddress);
    return instance.setParams(
      0x0,
      0,
      0,
      0,
      0,
      0,
      0,
      minPoolGoal,
      false,
      0x0,
      [false, false, false, false, false, false, false, true, false, false],
      { from: this.account },
    );
  }

  /**
   * Set new maximum amount of ETH allowed to be raised by the pool for the sale (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param maxPoolAllocation new maximum pool allocation
   */
  async setMaxPoolAllocation(poolAddress, maxPoolAllocation) {
    const instance = await this.pool.at(poolAddress);
    return instance.setParams(
      0x0,
      0,
      maxPoolAllocation,
      [false, false, true],
      { from: this.account },
    );
  }


  /**
   * Set new unix timestamp in seconds for how much time funds are
   * locked from withdrawal after contribution (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param withdrawTimelock new withdraw timelock
   */

  async setWithdrawTimelock(poolAddress, withdrawTimelock) {
    const instance = await this.pool.at(poolAddress);
    return instance.setParams(
      0x0,
      0,
      0,
      0,
      withdrawTimelock,
      0,
      0,
      0,
      false,
      0x0,
      [false, false, false, false, true, false, false, false, false, false],
      { from: this.account },
    );
  }
}
