import TruffleContract from 'truffle-contract';
import promisifyEvent from './promisifyEvent';

class Pool {
  constructor(provider, account, web3, poolArtifact, firstBlock) {
    this.pool = TruffleContract(poolArtifact);
    this.pool.setProvider(provider);
    this.account = account;
    this.web3 = web3;
    this.firstBlock = firstBlock;
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
   * Push out pool main tokens to participants (only admin, mostly for token push server)
   *
   * Frontend page: Pool admin page for pool admins
   * (but mostly called by token push server, might not even on frontend)
   *
   * @param {string} poolAddress address of the Pool this function iteracts with
   * @param {string} recipientAddress address to push out their coins
   */
  async pushOutToken(poolAddress, recipientAddress, _gasPrice) {
    const instance = await this.pool.at(poolAddress);

    return instance.pushOutToken(recipientAddress, { from: this.account, gasPrice: _gasPrice });
  }

  async getTokensRecievedEvent(poolAddress) {
    const instanceRawWeb3 = new this.web3.eth.Contract(this.pool.abi, poolAddress);
    const logs = await promisifyEvent.promisify(callback => instanceRawWeb3.getPastEvents('tokensReceived', {
      fromBlock: this.firstBlock,
      toBlock: 'latest',
    }, callback));

    return logs.map(item => ({
      contributor: item.returnValues.poolAddress,
      amount: item.returnValues.amount,
    }));
  }

  async watchTokensRecievedEventOnce(poolAddress, callback) {
    const instanceRawWeb3 = new this.web3.eth.Contract(this.pool.abi, poolAddress);
    instanceRawWeb3.events.once('tokensReceived', { fromBlock: 0, toBlock: 'latest' }, callback);
  }
}

module.exports.Pool = Pool;
