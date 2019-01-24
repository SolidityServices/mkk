import TruffleContract from 'truffle-contract';
import poolArtifact from '../../../build/contracts/Pool.json';
import encodeFunctionSignatureWithParameters
  from '../../utils/encodeFunctionSignatureWithParameters';

export default class Pool {
  constructor(provider, account, web3) {
    this.pool = TruffleContract(poolArtifact);
    this.pool.setProvider(provider);
    this.account = account;
    this.web3 = web3;
  }

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
   * @property {string} poolDescription -
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
   * @property {boolean} strictlyTrustlessPool -
   *
   * @return {PoolParams}
   */
  async getPoolParams(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result1 = await instance.getParams1.call({ from: this.account });
    const result2 = await instance.getParams2.call({ from: this.account });

    return {
      saleParticipateFunctionSig: this.web3.utils.hexToUtf8(result2[2]),
      saleWithdrawFunctionSig: this.web3.utils.hexToUtf8(result2[3]),
      poolDescription: this.web3.utils.hexToUtf8(result2[4]),
      saleAddress: result2[5].toString(),
      tokenAddress: result2[6].toString(),
      kycAddress: result2[7].toString(),
      provider: result2[8].toString(),
      creator: result2[9].toString(),
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
      strictlyTrustlessPool: result2[1],
    };
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
    const result = await this.web3.eth.getBalance(instance.address);
    return this.web3.utils.fromWei(result, 'ether');
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
   * @property {boolean} stopped -
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
      stopped: result[5],
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
   * Cehck if the pool is stopped
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @return {boolean} true: stopped, false: not stopped
   */
  async isStopped(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const result = await instance.poolStats.call({ from: this.account });
    return result[5];
  }

  /**
   * Get tokens owed to a contributor
   *
   * Frontend page: Pool info page (can be the same as Pool contributor page)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} contibutorAddress address of the pool contributor
   * @return {boolean} true: stopped, false: not stopped
   */
  async getTokensOwedToContributor(poolAddress, contibutorAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.tokensOwedToContributor.call(contibutorAddress, { from: this.account });
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
   * @param {string[]} adminAddressList address of new admin
   */
  async addAdmin(poolAddress, adminAddressList) {
    const instance = await this.pool.at(poolAddress);
    return instance.addAdmin(adminAddressList, { from: this.account });
  }

  async addAdminCalldata(poolAddress, adminAddressList) {
    const instance = await this.pool.at(poolAddress);
    return instance.addAdmin.request(adminAddressList, { from: this.account }).params[0].data;
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
   * @param {string[]} adminAddressList address of admin to remove
   */
  async removeAdmin(poolAddress, adminAddressList) {
    const instance = await this.pool.at(poolAddress);
    return instance.removeAdmin(adminAddressList, { from: this.account });
  }

  async removeAdminCalldata(poolAddress, adminAddressList) {
    const instance = await this.pool.at(poolAddress);
    return instance.removeAdmin.request(adminAddressList, { from: this.account }).params[0].data;
  }

  /**
   * Add address to pool whiteslist (only admin)
   *
   * Frontend page: Pool admin page for pool admins
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string[]} whitelistAddressList address to add to whitelist
   */
  async addWhitelist(poolAddress, whitelistAddressList) {
    const instance = await this.pool.at(poolAddress);
    return instance.addWhitelist(whitelistAddressList, { from: this.account });
  }

  async addWhitelistCalldata(poolAddress, whitelistAddressList) {
    const instance = await this.pool.at(poolAddress);
    return instance.addWhitelist.request(whitelistAddressList, { from: this.account }).params[0].data;
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
   * @param {string[]} whitelistAddressList address to remove from whitelist
   */
  async removeWhitelist(poolAddress, whitelistAddressList) {
    const instance = await this.pool.at(poolAddress);
    return instance.removeWhitelist(whitelistAddressList, { from: this.account });
  }

  async removeWhitelistCalldata(poolAddress, whitelistAddressList) {
    const instance = await this.pool.at(poolAddress);
    return instance.removeWhitelist.request(whitelistAddressList, { from: this.account }).params[0].data;
  }

  /**
   * Add country code to country blacklist (only admin)
   *
   * Frontend page: Pool admin page for pool admins
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string[]} countryCodeList 3 letter country code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3)
   */
  async addCountryBlacklist(poolAddress, countryCodeList) {
    const instance = await this.pool.at(poolAddress);
    return instance.addCountryBlacklist(countryCodeList, { from: this.account });
  }

  async addCountryBlacklistCalldata(poolAddress, countryCodeList) {
    const instance = await this.pool.at(poolAddress);
    return instance.addCountryBlacklist.request(countryCodeList, { from: this.account }).params[0].data;
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
   * @param {string} countryCodeList 3 letter country code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3)
   */
  async removeCountryBlacklist(poolAddress, countryCodeList) {
    const instance = await this.pool.at(poolAddress);
    return instance.removeCountryBlacklist(countryCodeList, { from: this.account });
  }

  async removeCountryBlacklistCalldata(poolAddress, countryCodeList) {
    const instance = await this.pool.at(poolAddress);
    return instance.removeCountryBlacklist.request(countryCodeList, { from: this.account }).params[0].data;
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
    return instance.contribute({
      from: this.account,
      value: amount * 1000000000000000000, // convert ether to wei,
    });
  }

  async contributeCalldata(poolAddress, amount) {
    const instance = await this.pool.at(poolAddress);
    return instance.contribute.request({
      from: this.account,
      value: amount * 1000000000000000000, // convert ether to wei,
    }).params[0].data;
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
    return instance.withdraw(amount * 1000000000000000000, { from: this.account });
  }

  async withdrawCalldata(poolAddress, amount) {
    const instance = await this.pool.at(poolAddress);
    return instance.withdraw.request(amount * 1000000000000000000, { from: this.account }).params[0].data;
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

  async withdrawRefundCalldata(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.withdrawRefund.request({ from: this.account }).params[0].data;
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

  async withdrawTokenCalldata(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.withdrawToken.request({ from: this.account }).params[0].data;
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

  async withdrawCustomTokenCalldata(poolAddress, tokenAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.withdrawCustomToken.request(tokenAddress, { from: this.account }).params[0].data;
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

  async pushOutTokenCalldata(poolAddress, recipientAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.pushOutToken.request(recipientAddress, { from: this.account }).params[0].data;
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

  async confirmTokensReceivedCalldata(poolAddress, tokensExpected) {
    const instance = await this.pool.at(poolAddress);
    return instance.confirmTokensReceived.request(tokensExpected, { from: this.account }).params[0].data;
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

  async sendToSaleCalldata(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.sendToSale.request({ from: this.account }).params[0].data;
  }

  /**
   * Stop pool durng contribution stage (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function interacts with
   */
  async stopPool(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.stopPool({ from: this.account });
  }

  async stopPoolCalldata(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.stopPool.request({ from: this.account }).params[0].data;
  }

  /**
   * Send pool funds to sale to predefined special function (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   */
  async sendToSaleWithCalldata(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.sendToSaleWithCalldata({ from: this.account });
  }

  async sendToSaleWithCalldataCalldata(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.sendToSaleWithCalldata.request({ from: this.account }).params[0].data;
  }

  /**
   * Whitdraw tokens from sale with predefined special function (only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   */
  async withdrawFromSaleWithCalldata(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.withdrawFromSaleWithCalldata({ from: this.account });
  }

  async withdrawFromSaleWithCalldataCalldata(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.withdrawFromSaleWithCalldata.request({ from: this.account }).params[0].data;
  }

  /**
   * Send pool funds to sale to special function given as parameter(only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} functionSignature -
   */
  async sendToSaleWithCalldataParameter(poolAddress, functionSignature) {
    const instance = await this.pool.at(poolAddress);
    return instance.sendToSaleWithCalldataParameter(this.functionSigToCalldata(functionSignature), { from: this.account });
  }

  async sendToSaleWithCalldataParameterCalldata(poolAddress, functionSignature) {
    const instance = await this.pool.at(poolAddress);
    return instance.sendToSaleWithCalldataParameter.request(this.functionSigToCalldata(functionSignature), { from: this.account }).params[0].data;
  }

  /**
   * Whitdraw tokens from sale with special function  given as parameter(only creator)
   *
   * Frontend page: Pool admin page for pool creator
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} functionSignature
   */
  async withdrawFromSaleWithCalldataParameter(poolAddress, functionSignature) {
    const instance = await this.pool.at(poolAddress);
    return instance.withdrawFromSaleWithCalldataParameter(this.functionSigToCalldata(functionSignature), { from: this.account });
  }

  async withdrawFromSaleWithCalldataParameterCalldata(poolAddress, functionSignature) {
    const instance = await this.pool.at(poolAddress);
    return instance.withdrawFromSaleWithCalldataParameter.request(this.functionSigToCalldata(functionSignature), { from: this.account }).params[0].data;
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

  async poviderWithdrawCalldata(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.providerWithdraw.request({ from: this.account }).params[0].data;
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

  async creatorWithdrawCalldata(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.creatorWithdraw.request({ from: this.account }).params[0].data;
  }

  // Pool param setters
  /**
   * Set all pool parameters settable by creator
   *
   * Should be null if you dont want to change a particular parameter
   *
   * @param {LocalPool} pool pool object
   */

  async setPoolParamsCreator(pool) {
    const instance = await this.pool.at(pool.poolAddress);
    return instance.setParams(
      pool.creator,
      pool.creatorFeeRate * 100, // convert percentage to integer
      Math.floor(pool.saleStartDate / 1000), // convert to unix timestamp
      Math.floor(pool.saleEndDate / 1000), // convert to unix timestamp
      pool.withdrawTimelock * 60 * 60, // convert to unix time
      pool.minContribution * 1000000000000000000, // convert ether to wei
      pool.maxContribution * 1000000000000000000, // convert ether to wei
      pool.minPoolGoal * 1000000000000000000, // convert ether to wei
      pool.whitelistPool ? 1 : 0,
      pool.poolDescription,
      pool.tokenAddress,
      [true, true, true, true, true, true, true, true, true, true, true],
      { from: this.account },
    );
  }

  async setPoolParamsCreatorCalldata(pool) {
    const instance = await this.pool.at(pool.poolAddress);
    return instance.setParams.request(
      pool.creator,
      pool.creatorFeeRate * 100, // convert percentage to integer
      Math.floor(pool.saleStartDate / 1000), // convert to unix timestamp
      Math.floor(pool.saleEndDate / 1000), // convert to unix timestamp
      pool.withdrawTimelock * 60 * 60, // convert to unix time
      pool.minContribution * 1000000000000000000, // convert ether to wei
      pool.maxContribution * 1000000000000000000, // convert ether to wei
      pool.minPoolGoal * 1000000000000000000, // convert ether to wei
      pool.whitelistPool ? 1 : 0,
      pool.poolDescription,
      pool.tokenAddress,
      [true, true, true, true, true, true, true, true, true, true, true],
      { from: this.account },
    ).params[0].data;
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

  async setPoolParamsProviderCalldata(
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
    return instance.setParams.request(
      provider,
      providerFeeRate,
      maxPoolAllocation,
      toUpdate,
      { from: this.account },
    ).params[0].data;
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

  async setProviderCalldata(poolAddress, providerAddress) {
    const instance = await this.pool.at(poolAddress);
    return instance.setParams.request(
      providerAddress,
      0,
      0,
      [true, false, false],
      { from: this.account },
    ).params[0].data;
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

  async setProviderFeeRateCalldata(poolAddress, providerFeeRate) {
    const instance = await this.pool.at(poolAddress);
    return instance.setParams.request(
      0x0,
      providerFeeRate,
      0,
      [false, true, false],
      { from: this.account },
    ).params[0].data;
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

  async setMaxPoolAllocationCalldata(poolAddress, maxPoolAllocation) {
    const instance = await this.pool.at(poolAddress);
    return instance.setParams.request(
      0x0,
      0,
      maxPoolAllocation,
      [false, false, true],
      { from: this.account },
    ).params[0].data;
  }

  async setSaleParticipateCalldata(poolAddress, functionSignature) {
    const instance = await this.pool.at(poolAddress);
    return instance.setSaleParticipateCalldata(this.functionSigToCalldata(functionSignature), { from: this.account });
  }

  async setSaleParticipateCalldataCalldata(poolAddress, functionSignature) {
    const instance = await this.pool.at(poolAddress);
    return instance.setSaleParticipateCalldata.request(this.functionSigToCalldata(functionSignature), { from: this.account }).params[0].data;
  }

  async setSaleWithdrawCalldata(poolAddress, functionSignature) {
    const instance = await this.pool.at(poolAddress);
    return instance.setSaleWithdrawCalldata(this.functionSigToCalldata(functionSignature), { from: this.account });
  }

  async setSaleWithdrawCalldataCalldata(poolAddress, functionSignature) {
    const instance = await this.pool.at(poolAddress);
    return instance.setSaleWithdrawCalldata.request(this.functionSigToCalldata(functionSignature), { from: this.account }).params[0].data;
  }

  async getAdmins(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const logs = new Promise((resolve, reject) => {
      instance.adminsChange({ fromBlock: 0, toBlock: 'latest' }, (error, event) => {
        if (error) {
          reject(error);
        } else {
          resolve(event);
        }
      });
    });

    return this.getActiveListItems(logs);
  }

  async getWhitelist(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const logs = new Promise((resolve, reject) => {
      instance.whitelistChange({ fromBlock: 0, toBlock: 'latest' }, (error, event) => {
        if (error) {
          reject(error);
        } else {
          resolve(event);
        }
      });
    });

    return this.getActiveListItems(logs);
  }

  async getKycCountryBlacklist(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const logs = new Promise((resolve, reject) => {
      instance.countryBlacklistChange({ fromBlock: 0, toBlock: 'latest' }, (error, event) => {
        if (error) {
          reject(error);
        } else {
          resolve(event);
        }
      });
    });

    const hexResult = this.getActiveListItems(logs);
    return hexResult.map(item => this.web3.utils.hexToUtf8(item));
  }

  async getAllContributions(poolAddress) {
    return this.getContributionsFromEvents(poolAddress, null);
  }

  async getContributionsByContributor(poolAddress, contributorAddress) {
    return this.getContributionsFromEvents(poolAddress, contributorAddress);
  }

  async getContributionsFromEvents(poolAddress, contributorAddress) {
    const instance = await this.pool.at(poolAddress);
    const filter = {};
    if (contributorAddress) filter.contributor = contributorAddress;

    const logs = new Promise((resolve, reject) => {
      instance.contributed({ filter, fromBlock: 0, toBlock: 'latest' }, (error, event) => {
        if (error) {
          reject(error);
        } else {
          resolve(event);
        }
      });
    });

    return logs.map(item => ({ contributor: item.args.poolAddress, amount: item.args.amount }));
  }

  // eslint-disable-next-line class-methods-use-this
  getActiveListItems(logs) {
    const mostRecentEvents = {};
    const activeItems = [];
    logs.forEach((item) => {
      if (!mostRecentEvents[item.args.listItem]) {
        mostRecentEvents[item.args.listItem] = {
          isActive: item.args.isActive,
          blockNumber: item.blockNumber,
        };
      } else if (mostRecentEvents[item.args.listItem].blockNumber < item.blockNumber) {
        mostRecentEvents[item.args.listItem] = {
          isActive: item.args.isActive,
          blockNumber: item.blockNumber,
        };
      }
    });
    const allItems = Object.keys(mostRecentEvents);
    allItems.forEach((item) => {
      if (mostRecentEvents[item].isActive) activeItems.push(item);
    });
    return activeItems;
  }

  async functionSigToCalldata(functionSig) {
    const { abiJson, params } = encodeFunctionSignatureWithParameters(functionSig);
    return this.web3.eth.abi.encodeFunctionCall(abiJson, params);
  }
}
