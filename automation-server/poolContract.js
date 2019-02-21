import TruffleContract from 'truffle-contract';
import promisifyEventGet from './promisifyEventGet';

export default class Pool {
  constructor(provider, account, web3, poolArtifact) {
    this.pool = TruffleContract(poolArtifact);
    this.pool.setProvider(provider);
    this.account = account;
    this.web3 = web3;
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
  async pushOutToken(poolAddress, recipientAddress) {
    const instance = await this.pool.at(poolAddress);

    return instance.pushOutToken(recipientAddress, { from: this.account });
  }

  async getTokensRecievedEvent(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const event = await instance.tokensReceived({
      fromBlock: 0,
      toBlock: 'latest',
    });
    const logs = await promisifyEventGet(event);

    return logs.map(item => ({
      contributor: item.args.poolAddress,
      amount: item.args.amount,
    }));
  }

  async watchTokensRecievedEvent(poolAddress, callback) {
    const instance = await this.pool.at(poolAddress);

    const event = await instance.tokensReceived({ fromBlock: 0, toBlock: 'latest' });
    event.watch(callback);
  }
}
