import TruffleContract from 'truffle-contract';
import poolFactoryArtifact from '../../../build/contracts/PoolFactory.json';
import encodeFunctionSignatureWithParameters
  from '../../utils/encodeFunctionSignatureWithParameters';
import promisifyEventGet from '../../utils/promisifyEventGet';

export default class PoolFactory {
  constructor(provider, account, web3, mode) {
    this.poolFactory = TruffleContract(poolFactoryArtifact);
    this.poolFactory.setProvider(provider);
    this.account = account;
    this.web3 = web3;
    this.mode = mode;
  }

  async getAddress() {
    const instance = await this.poolFactory.deployed();
    return instance.address;
  }

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
   * @property {boolean} useWhitelist -
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
      useWhitelist: result[5],
    };
  }

  /**
   *
   * Set all parameters
   *
   * @param {LocalPoolFactory} poolFactory - pool factory object
   *
   */
  async setPoolFactoryParams(poolFactory) {
    const instance = await this.poolFactory.deployed();

    if (this.mode === 'mew') {
      return instance.setParams.request(
        poolFactory.ownerAddress,
        poolFactory.kycContractAddress,
        poolFactory.flatFee,
        poolFactory.maxAllocationFeeRate,
        poolFactory.maxCreatorFeeRate,
        poolFactory.providerFeeRate,
        poolFactory.useWhitelist,
        [true, true, true, true, true, true],
        { from: this.account },
      ).params[0].data;
    }

    return instance.setParams(
      poolFactory.ownerAddress,
      poolFactory.kycContractAddress,
      poolFactory.flatFee,
      poolFactory.maxAllocationFeeRate,
      poolFactory.maxCreatorFeeRate,
      poolFactory.providerFeeRate,
      poolFactory.useWhitelist,
      [true, true, true, true, true, true],
      { from: this.account },
    );
  }

  /**
   * Returns the whole ETH balance of the PoolFactory contract
   *
   * Frontend page: PoolFactory info page
   *
   * @return the whole ETH balance of the PoolFactory contract
   */
  async getPoolFactoryBalance() {
    const instance = await this.poolFactory.deployed();
    const result = await this.web3.eth.getBalance(instance.address);
    return result.toString();
  }

  /**
   * Function for creating pools, needs ethereum sent to it (payable)
   *
   * Frontend page: Pool creation page
   *
   * @param {LocalPool} pool - LocalPool object
   * @param {number} transferValue Ethereum fee for creating pools in wei units, must equal
   * flatFee + (maxAllocationFeeRate * _maxPoolAllocation)/1000 or more
   * @return address of the created pool
   */
  async createPool(pool, transferValue) {
    const instance = await this.poolFactory.deployed();

    if (this.mode === 'mew') {
      return instance.createPool.request(
        [
          pool.saleAddress,
          pool.tokenAddress,
        ],
        [
          pool.saleParticipateFunctionSig,
          pool.saleWithdrawFunctionSig,
          pool.poolDescription,
        ],
        [
          pool.creatorFeeRate * 100, // convert percentage to integer
          Math.floor(pool.saleStartDate / 1000), // convert to unix timestamp
          Math.floor(pool.saleEndDate / 1000), // convert to unix timestamp
          pool.minContribution * 1000000000000000000, // convert ether to wei
          pool.maxContribution * 1000000000000000000, // convert ether to wei
          pool.minPoolGoal * 1000000000000000000, // convert ether to wei
          pool.maxPoolAllocation * 1000000000000000000, // convert ether to wei
          pool.withdrawTimelock * 60 * 60, // convert to unix time
        ],
        [
          pool.whitelistPool ? 1 : 0,
          pool.strictlyTrustlessPool ? 1 : 0,
        ],
        pool.adminAddresses,
        pool.whiteListAddresses,
        pool.countryBlackList,
        {
          from: this.account,
          value: transferValue * 1000000000000000000, // convert ether to wei
        },
      ).params[0].data;
    }

    const reciept = await instance.createPool(
      [
        pool.saleAddress,
        pool.tokenAddress,
      ],
      [
        pool.saleParticipateFunctionSig,
        pool.saleWithdrawFunctionSig,
        pool.poolDescription,
      ],
      [
        pool.creatorFeeRate * 100, // convert percentage to integer
        Math.floor(pool.saleStartDate / 1000), // convert to unix timestamp
        Math.floor(pool.saleEndDate / 1000), // convert to unix timestamp
        pool.minContribution * 1000000000000000000, // convert ether to wei
        pool.maxContribution * 1000000000000000000, // convert ether to wei
        pool.minPoolGoal * 1000000000000000000, // convert ether to wei
        pool.maxPoolAllocation * 1000000000000000000, // convert ether to wei
        pool.withdrawTimelock * 60 * 60, // convert to unix time
      ],
      [
        pool.whitelistPool ? 1 : 0,
        pool.strictlyTrustlessPool ? 1 : 0,
      ],
      pool.adminAddresses,
      pool.whiteListAddresses,
      pool.countryBlackList,
      {
        from: this.account,
        value: transferValue * 1000000000000000000, // convert ether to wei
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

    if (this.mode === 'mew') {
      return instance.withdraw.request({ from: this.account }).params[0].data;
    }

    return instance.withdraw({ from: this.account });
  }

  async getPools() {
    return this.getPoolsCreatedFromEvents(null, null);
  }

  async getAllPoolsByCreator(creatorAddress) {
    return this.getPoolsCreatedFromEvents(creatorAddress, null);
  }

  async getAllPoolsBySale(saleAddress) {
    return this.getPoolsCreatedFromEvents(null, saleAddress);
  }

  async getPoolsCreatedFromEvents(creatorAddress, saleAddress) {
    const instance = await this.poolFactory.deployed();
    const filter = {};
    if (creatorAddress) filter.poolCreator = creatorAddress;
    if (saleAddress) filter.poolSale = saleAddress;

    const event = await instance.poolCreated(filter, { fromBlock: 0, toBlock: 'latest' });
    const logs = await promisifyEventGet(event);
    return logs.map(item => item.args.poolAddress);
  }

  async functionSigToCalldata(functionSig) {
    const encodedFuncSignature = await encodeFunctionSignatureWithParameters(functionSig);
    return this.web3.eth.abi.encodeFunctionCall(encodedFuncSignature.abiJson, encodedFuncSignature.params);
  }
}
