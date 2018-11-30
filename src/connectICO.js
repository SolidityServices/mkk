/* eslint-disable */ //vagy ez vagy a szellemi épségem

import Vue from 'vue';
import TruffleContract from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import poolArtifact from '../build/contracts/Pool.json';
import poolFactoryArtifact from '../build/contracts/PoolFactory.json';
import kycArtifact from '../build/contracts/KYC.json';
import tokenPushRegistryArtifact from '../build/contracts/TokenPushRegistry.json';

const Pool = TruffleContract(poolArtifact);
const PoolFactory = TruffleContract(poolFactoryArtifact);
const KYC = TruffleContract(kycArtifact);
const TokenPushRegistry = TruffleContract(tokenPushRegistryArtifact);

export default class ConnectICO {
  constructor() {
    this.account = null;
  }

  start() {
    // Bootstrap the abstractions for Use.
    console.log(window.web3.currentProvider);
    Pool.setProvider(window.web3.currentProvider);
    PoolFactory.setProvider(window.web3.currentProvider);
    KYC.setProvider(window.web3.currentProvider);
    TokenPushRegistry.setProvider(window.web3.currentProvider);

    // set the initial this.account balance so it can be displayed.
    window.web3.eth.getAccounts((err, accounts) => {
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


  getPoolFactoryAddress () {
    let instance;
    let result;
    PoolFactory.deployed().then(
      (_instance) => {
        instance = _instance;
        result = instance.address;
        console.log(result);
        return result;
      });
  }

  getKYCAddress () {
    let instance;
    let result;
    KYC.deployed().then(
      (_instance) => {
        instance = _instance;
        result = instance.address;
        console.log(result);
        return result;
      });
  }

  getTokenPushRegistryAddress () {
    let instance;
    let result;
    TokenPushRegistry.deployed().then(
      (_instance) => {
        instance = _instance;
        result = instance.address;
        console.log(result);
        return result;
      });
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
   * Return all existing pool addresses in a list
   *
   * Frontend page: PoolFactory info page
   *
   * @return {string[]} all existing pool addresses in a list
   */
  /*
  getAllPools() {
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;
      return instance.poolList.call({ from: this.account });
    }).then((value) => {
      result = value.toString();
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }
  */

  /**
   * Return one pool address of the given index
   *
   * Frontend page: PoolFactory info page
   *
   * @param {number} index
   * @return {string} Pool address
   */

  async getPool(index) {
    let instance;
    let result;
    console.log(PoolFactory);
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;
      return instance.poolList.call(index, { from: this.account });
    }).then((value) => {
      result = value.toString();
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }


  /**
   *Returns a list of pool addresses between a first and last index (including boundaries)
   *
   * Frontend page: PoolFactory info page
   *
   * @param {number} firstIndex
   * @param {number} lastIndex
   * @return {string[]} list of pool adresses in range
   */
  /*
  async getPoolRange(firstIndex, lastIndex){
      var instance;
      var result;
      PoolFactory.deployed().then(function(_instance) {
          instance = _instance;
          return instance.poolList.call(index, {from: this.account});
      }).then(function(value) {
          result = value.toString();
          console.log(result);
          // output.innerHTML = result;
          return result;
      });
  }
  */

  /**
   * Retuns the number of pools created by the pool factory
   *
   * Frontend page: PoolFactory info page
   *
   * @return {number} number of pools
   */
  async getPoolNumber() {
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;
      return instance.poolList.length.call({ from: this.account });
    }).then((value) => {
      result = value.toNumber();
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }

  /**
   * Returns pool list for a sale address
   *
   * Frontend page: PoolFactory info page
   *
   * @param {string} saleAddress
   * @return {string[]} list of pool adresses for a given sale
   */
  async getPoolsBySales(saleAddress) {
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;
      return instance.poolsBySales.call(saleAddress, { from: this.account });
    }).then((value) => {
      result = value.toString();
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }

  /**
   * Cheks if a pool exists
   *
   * Frontend page: PoolFactory info page
   *
   * @param {string} poolAddress
   * @return {boolean} true if pool exists, fales if not
   */
  async checkIfPoolExists(poolAddress) {
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;
      return instance.pools.call(poolAddress, { from: this.account });
    }).then((value) => {
      result = value;
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
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
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;
      return instance.params.owner.call({ from: this.account });
    }).then((value) => {
      result = value.toString();
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }

  /**
   * Get the KYC contract address tied to the PoolFactory contract
   *
   * Frontend page: PoolFactory info page
   *
   * @return {string} KYC contract address
   */
  async getPoolFactoryKycContractAddress() {
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;
      return instance.params.kycContractAddress.call({ from: this.account });
    }).then((value) => {
      result = value.toString();
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }

  /**
   * Get flat fee for pool creation (1/1000)
   *
   * Frontend page: PoolFactory info page
   *
   * @return flat fee for pool creation (1/1000)
   */
  async getFlatFee() {
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;
      return instance.params.flatFee.call({ from: this.account });
    }).then((value) => {
      result = value.toNumber();
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }

  /**
   * Get fee rate for maximum pool allocation (1/1000)
   *
   * Frontend page: PoolFactory info page
   *
   * @return fee rate for maximum pool allocation (1/1000)
   */
  async getMaxAllocationFeeRate() {
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;
      return instance.params.maxAllocationFeeRate.call({ from: this.account });
    }).then((value) => {
      result = value.toNumber();
      console.log(result);
      // output.innerHTML = result;

      return result;
    });
  }

  /**
   * Get maximum allowed fee rates set by crators for pools (1/1000)
   *
   * Frontend page: PoolFactory info page
   *
   * @return maximum allowed fee rate (1/1000)
   */
  async getMaxCreatorFeeRate() {
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;
      return instance.params.maxCreatorFeeRate.call({ from: this.account });
    }).then((value) => {
      result = value.toNumber();
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
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
    let instance;
    let result;
    let ownerAddress;
    let kycContractAddress;
    let flatFee;
    let maxAllocationFeeRate;
    let maxCreatorFeeRate;
    let providerFeeRate;
    const toUpdate = [];
    if (_ownerAddress === null) {
      ownerAddress = 0x0;
      toUpdate.push(false);
    } else {
      ownerAddress = _ownerAddress;
      toUpdate.push(true);
    }

    if (_kycContractAddress === null) {
      kycContractAddress = 0x0;
      toUpdate.push(false);
    } else {
      kycContractAddress = _kycContractAddress;
      toUpdate.push(true);
    }

    if (_flatFee === null) {
      flatFee = 0;
      toUpdate.push(false);
    } else {
      flatFee = _flatFee;
      toUpdate.push(true);
    }

    if (_maxAllocationFeeRate === null) {
      maxAllocationFeeRate = 0;
      toUpdate.push(false);
    } else {
      maxAllocationFeeRate = _maxAllocationFeeRate;
      toUpdate.push(true);
    }

    if (_maxCreatorFeeRate === null) {
      maxCreatorFeeRate = 0;
      toUpdate.push(false);
    } else {
      maxCreatorFeeRate = _maxCreatorFeeRate;
      toUpdate.push(true);
    }

    if (_providerFeeRate === null) {
      providerFeeRate = 0;
      toUpdate.push(false);
    } else {
      providerFeeRate = _providerFeeRate;
      toUpdate.push(true);
    }


    PoolFactory.deployed().then((_instance) => {
      instance = _instance;
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
    }).then((reciept) => {
      result = reciept;
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }

  /**
   * Set owner address in PoolFactory contract, only current owner has authority
   *
   * Frontend page: PoolFactory admin page for provider/owner
   *
   * @param {string} ownerAddress
   */
  async setOwner(ownerAddress) {
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;

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
    }).then((reciept) => {
      result = reciept;
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }

  /**
   * Set KYC contract address in PoolFactory contract, only owner has authority
   *
   * Frontend page: PoolFactory admin page for provider/owner
   *
   * @param {string} kycContractAddress
   */
  async setKycContractAddress(kycContractAddress) {
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;

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
    }).then((reciept) => {
      result = reciept;
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }

  /**
   * Set flat fee in PoolFactory contract for creating pools, only owner has authority
   *
   * Frontend page: PoolFactory admin page for provider/owner
   *
   * @param flatFee flat fee for pool creation
   */
  async setFlatFee(flatFee) {
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;

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
    }).then((reciept) => {
      result = reciept;
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }

  /**
   * Set maximum allocation fee for creating pools, only owner has authority
   *
   * Frontend page: PoolFactory admin page for provider/owner
   *
   * @param maxAllocationFeeRate fee 'taxing' the maximum allocation parameter
   */
  async setMaxAllocationFeeRate(maxAllocationFeeRate) {
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;

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
    }).then((reciept) => {
      result = reciept;
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }

  /**
   * Set maximum allowed fee for pool creators, only owner has authority
   *
   * Frontend page: PoolFactory admin page for provider/owner
   *
   * @param maxCreatorFeeRate maximum amount of fee creators can set for a pool
   */
  async setMaxCreatorFeeRate(maxCreatorFeeRate) {
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;

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
    }).then((reciept) => {
      result = reciept;
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }

  /**
   * Set provider fee rate for creating pools, only owner has authority
   *
   * Frontend page: PoolFactory admin page for provider/owner
   *
   * @param providerFeeRate provider fees for pools
   */
  async setProviderFeeRate(providerFeeRate) {
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;

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
    }).then((reciept) => {
      result = reciept;
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
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
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;
      return web3.eth.getBalance(instance.address);
    }).then((value) => {
      result = value.toString();
      console.log(result);
      return result;
    });
  }

  // PoolFactory operations

  /**
   * Function for creating pools, needs ethereum sent to it (payable)
   *
   * Frontend page: Pool creation page
   *
   * @param {string} saleAddress address of the ICO token sale contract
   * @param {string} tokenAddress address of the erc20 token distributed in the sale
   * @param creatorFeeRate 1/1000 fee rate of the pool income payed to the pool creator
   * @param saleStartDate unix timestamp in seconds of the start of the sale
   * @param saleEndDate unix timestamp in seconds of the end of the sale
   * @param minContribution minimum amount of ETH contribution allowed in one tx
   * @param maxContribution maximum amount of ETH contribution allowed in one tx
   * @param minPoolGoal minimum amount of ETH needed to be raised by the pool for the sale
   * @param maxPoolAllocation maximum amount of ETH allowed to be raised by the pool for the sale
   * @param withdrawTimelock unix timestamp in seconds for how much time funds
   * are locked from withdrawal after contribution
   * @param {boolean} whitelistPool pool has address whitelist or not
   * @param transferValue Ethereum fee for creating pools, must equal
   * flatFee + (maxAllocationFeeRate * _maxPoolAllocation)/1000 or more
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
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;
      return instance.createPool(saleAddress,
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
        });
    }).then((reciept) => {
      result = reciept;
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
  }

  /**
   * Function for owner to withdraw accumulated fees from PoolFactory
   *
   * Frontend page: PoolFactory admin page for provider/owner
   *
   */
  async withdraw() { // onlyOwner
    let instance;
    let result;
    PoolFactory.deployed().then((_instance) => {
      instance = _instance;
      return instance.withdraw({ from: this.account });
    }).then((value) => {
      result = value.toString();
      console.log(result);
      // output.innerHTML = result;
      return result;
    });
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
    let instance;
    const result = {
      saleParticipateFunctionSig: null,
      saleWithdrawFunctionSig: null,
      saleAddress: null,
      tokenAddress: null,
      kycAddress: null,
      provider: null,
      creator: null,
      minContribution: null,
      maxContribution: null,
      minPoolGoal: null,
      saleStartDate: null,
      saleEndDate: null,
      maxPoolAllocation: null,
      withdrawTimelock: null,
      providerFeeRate: null,
      creatorFeeRate: null,
      whitelistPool: null,
    };
    Pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.getParams1.call({ from: this.account });
    }).then((value) => {
      result.providerFeeRate = value[0].toNumber();
      result.creatorFeeRate = value[1].toNumber();
      result.saleStartDate = value[2].toNumber();
      result.saleEndDate = value[3].toNumber();
      result.withdrawTimelock = value[4].toNumber();
      result.minContribution = value[5].toNumber();
      result.maxContribution = value[6].toNumber();
      result.minPoolGoal = value[7].toNumber();
      result.maxPoolAllocation = value[8].toNumber();
      return;
    }).then(() => {
      return instance.getParams2.call({ from: this.account });
    }).then((value) => {
      result.whitelistPool = value[0];
      result.saleParticipateFunctionSig = value[1].toString();
      result.saleWithdrawFunctionSig = value[2].toString();
      result.saleAddress = value[3].toString();
      result.tokenAddress = value[4].toString();
      result.kycAddress = value[5].toString();
      result.provider = value[6].toString();
      result.creator = value[7].toString();
      console.log(result);
      return result;
    });
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
    let instance;
    let result;
    Pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.getParams2.call({ from: this.account });
    }).then((value) => {
      result = value[5].toString();
      console.log(result);
      return result;
    });
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
    let instance;
    let result;
    Pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.getParams2.call({ from: this.account });
    }).then((value) => {
      result = value[6].toString();
      console.log(result);
      return result;
    });
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
    let instance;
    let result;
    Pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.getParams2.call({ from: this.account });
    }).then((value) => {
      result = value[7].toString();
      console.log(result);
      return result;
    });
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
    let instance;
    let result;
    Pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.getParams1.call({ from: this.account });
    }).then((value) => {
      result = value[0].toNumber();
      console.log(result);
      return result;
    });
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
    let instance;
    let result;
    Pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.getParams1.call({ from: this.account });
    }).then((value) => {
      result = value[1].toNumber();
      console.log(result);
      return result;
    });
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
    let instance;
    let result;
    Pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.getParams2.call({ from: this.account });
    }).then((value) => {
      result = value[3].toString();
      console.log(result);
      return result;
    });
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
    let instance;
    let result;
    Pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.getParams2.call({ from: this.account });
    }).then((value) => {
      result = value[4].toString();
      console.log(result);
      return result;
    });
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
    let instance;
    let result;
    Pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.getParams1.call({ from: this.account });
    }).then((value) => {
      result = value[5].toNumber();
      console.log(result);
      return result;
    });
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
    let instance;
    let result;
    Pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.getParams1.call({ from: this.account });
    }).then((value) => {
      result = value[6].toNumber();
      console.log(result);
      return result;
    });
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
    let instance;
    let result;
    Pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.getParams1.call({ from: this.account });
    }).then((value) => {
      result = value[7].toNumber();
      console.log(result);
      return result;
    });
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
    let instance;
    let result;
    Pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.getParams1.call({ from: this.account });
    }).then((value) => {
      result = value[8].toNumber();
      console.log(result);
      return result;
    });
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
    let instance;
    let result;
    Pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.getParams1.call({ from: this.account });
    }).then((value) => {
      result = value[4].toNumber();
      console.log(result);
      return result;
    });
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
    let instance;
    let result;
    Pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.getParams2.call({ from: this.account });
    }).then((value) => {
      result = value[1].toString();
      console.log(result);
      return result;
    });
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
    let instance;
    let result;
    Pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.getParams2.call({ from: this.account });
    }).then((value) => {
      result = value[1].toString();
      console.log(result);
      return result;
    });
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
    let instance;
    let result;
    Pool.at(poolAddress).then((_instance) => {
      instance = _instance;
      return instance.getParams2.call({ from: this.account });
    }).then((value) => {
      result = value[0];
      console.log(result);
      return result;
    });
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
  /*
  async isAdmin(poolAddress, address) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Check if the given address is on the whitelist of the pool
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} address address to check
   * @return {boolean} is on whitelist
   */
  /*
  async isOnWhitelist(poolAddress, address) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Check a country code if its on blacklist for the pool
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} countryCode 3 letter country code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3)
   * @return {boolean} is on blacklist
   */
  /*
  async isOnCountryBlacklist(poolAddress, countryCode) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Get all ETH balance of a given pool contract
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return ETH balance
   */
  /*
  async getPoolBalance(poolAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Get all ETH contributions of the pool without applying fees
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return all gross contributions
   */
  /*
  async getAllGrossContributions(poolAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Get ETH amount that the pool creator collected from fees
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return creator stash
   */
  /*
  async getCreatorStash(poolAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Get ETH amount that the service provider collected from fees
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return provider stash
   */
  /*
  async getProviderStash(poolAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
    Pool.deployed().then((_instance) => {
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
   * Cehck if the pool funds have been sent to sale
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return {boolean} true: sent, false: not sent yet
   */
  /*
  async isSentToSale(poolAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Check if token receiving is confirmed
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return {boolean} true: confirmed, false: not confirmed yet
   */
  /*
  async areTokensReceivedConfirmed(poolAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
    Pool.deployed().then((_instance) => {
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
  /*
  async getContributor(poolAddress, index) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
    Pool.deployed().then((_instance) => {
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
   * Get the least contribuition time of a specific contributor
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} contributorAddress address of contributor
   * @return contribution time
   */
  /*
  async getLastContributionTimeByContributor(poolAddress, contributorAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Get ETH contribution amount before fees applied by pool contributor
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} contributorAddress contributor address
   * @return contribution amount
   */
  /*
  async getGrossContributionByContributor(poolAddress, contributorAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
    Pool.deployed().then((_instance) => {
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
  /*
  async addAdmin(poolAddress, adminAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
    Pool.deployed().then((_instance) => {
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
  /*
  async removeAdmin(poolAddress, adminAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Add address to pool whiteslist (only admin)
   *
   * Frontend page: Pool admin page for pool admins
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} whitelistAddress address to add to whitelist
   */
  /*
  async addWhitelist(poolAddress, whitelistAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
    Pool.deployed().then((_instance) => {
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
  /*
  async removeWhitelist(poolAddress, whitelistAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Add country code to country blacklist (only admin)
   *
   * Frontend page: Pool admin page for pool admins
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} countryCode 3 letter country code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3)
   */
  /*
  async addCountryBlacklist(poolAddress, countryCode) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
    Pool.deployed().then((_instance) => {
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
  /*
  async removeCountryBlacklist(poolAddress, countryCode) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Contribute to pool payable - tx has to have ETH value
   *
   * Frontend page: Pool contributor page (can be the same as Pool info page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   */
  /*
  async contribute(poolAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Withdraw funds from the token before being sent to sale
   *
   * Frontend page: Pool contributor page (can be the same as Pool info page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   */
  /*
  async withdraw(poolAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Withdraw funds from the token after being sent
   * to sale and being refunded from sale to pool contract
   *
   * Frontend page: Pool contributor page (can be the same as Pool info page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   */
  /*
  async withdrawRefund(poolAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Withdraw main erc20 token from the pool (specified by tokenAddress)
   *
   * Frontend page: Pool contributor page (can be the same as Pool info page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   */
  /*
  async withdrawToken(poolAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Withdraw given erc20 token from the pool (sepcified by tokenAddress)
   *
   * Frontend page: Pool contributor page (can be the same as Pool info page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} tokenAddress erc 20 token address (this cannot be ETH, so no 0x0 allowed here)
   */
  /*
  async withdrawCustomToken(poolAddress, tokenAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Push out pool main tokens to participants (only admin, mostly for token push server)
   *
   * Frontend page: Pool admin page for pool admins
   * (but mostly called by token push server, might not even on frontend)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} recipientAddress address to push out their coins
   */
  /*
  async pushOutToken(poolAddress, recipientAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * @param tokensExpected amount of tokens expected from the sale
   */
  /*
  async confirmTokensReceived(poolAddress, tokensExpected) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Send pool funds to sale (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function interacts with
   */
  /*
  async sendToSale(poolAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Send pool funds to sale to predefined special function (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   */
  /*
  async sendToSaleFunction(poolAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Whitdraw tokens from sale with predefined special function (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   */
  /*
  async withdrawFromSaleFunction(poolAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Withdraw provider fee from the stash (onyl provider)
   *
   * Frontend page: Pool admin page for provider
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   */
  /*
  async poviderWithdraw(poolAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Withdraw creator fee from the stash (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   */
  /*
  async creatorWithdraw(poolAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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

  // Pool param setters

  async setPoolParamsCreator(){

  }

  async setPoolParamsProvider(){

  }

  /**
   * Set provider address (only provider)
   *
   * Frontend page: Pool admin page for provider
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} providerAddress new provider address
   */
  /*
  async setProvider(poolAddress, providerAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Set creator address (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} creatorAddress new creator address
   */
  /*
  async setCreator(poolAddress, creatorAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Set provider fee rate (only provider)
   *
   * Frontend page: Pool admin page for provider
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param providerFeeRate new provider fee rate (1/100)
   */
  /*
  async setProviderFeeRate(poolAddress, providerFeeRate) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Set creator fee rate (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param creatorFeeRate new creator fee rate (1/100)
   */
  /*
  async setCreatorFeeRate(poolAddress, creatorFeeRate) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Change erc20 token address distributed by the sale for the pool (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} tokenAddress new token address
   */
  /*
  async setTokenAddress(poolAddress, tokenAddress) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Set if pool is whitelist pool (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {boolean} isWhitelistPool
   */
  /*
  async setWhitelistPool(poolAddress, isWhitelistPool) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Set new sale start date (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param saleStartDate
   */
  /*
  async setSaleStartDate(poolAddress, saleStartDate) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Set new sale end date (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param saleEndDate
   */
  /*
  async setSaleEndDate(poolAddress, saleEndDate) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Set new minimum amount of ETH contribution allowed in one tx (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param minContribution new minimum contribution
   */
  /*
  async setMinContribution(poolAddress, minContribution) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Set new maximum amount of ETH contribution allowed in one tx (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param maxContribution new maximum contribution
   */
  /*
  async setMaxContribution(poolAddress, maxContribution) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Set new minimum amount of ETH needed to be raised by the pool for the sale (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param minPoolGoal new minimum pool goal
   */
  /*
  async setMinPoolGoal(poolAddress, minPoolGoal) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Set new maximum amount of ETH allowed to be raised by the pool for the sale (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param maxPoolAllocation new maximum pool allocation
   */
  /*
  async setMaxPoolAllocation(poolAddress, maxPoolAllocation) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
   * Set new unix timestamp in seconds for how much time funds are
   * locked from withdrawal after contribution (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param withdrawTimelock new withdraw timelock
   */
  /*
  async setWithdrawTimelock(poolAddress, withdrawTimelock) {
    let instance;
    let result;
    Pool.deployed().then((_instance) => {
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
}
