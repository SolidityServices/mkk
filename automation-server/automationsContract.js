import TruffleContract from 'truffle-contract';
import promisifyEventGet from './promisifyEventGet';

export default class Automations {
  constructor(provider, account, web3, automationsArtifact) {
    this.kyc = TruffleContract(automationsArtifact);
    this.kyc.setProvider(provider);
    this.account = account;
    this.web3 = web3;
  }

  async emitPushOutTokenCompleted(pool, recipient) {
    const instance = await this.tokenPushRegistry.deployed();
    return instance.emitPushOutTokenCompleted(pool, recipient, { from: this.account });
  }

  async emitSendToSaleCompleted(pool) {
    const instance = await this.tokenPushRegistry.deployed();
    return instance.emitPushOutTokenCompleted(pool, { from: this.account });
  }

  async getNewPushOutTokenEvent(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const event = await instance.newPushOutToken({
      fromBlock: 0,
      toBlock: 'latest',
    });
    const logs = await promisifyEventGet(event);

    return logs;
  }

  async watchNewPushOutTokenEvent(poolAddress) {
    const instance = await this.pool.at(poolAddress);

    const event = await instance.newPushOutToken({ fromBlock: 0, toBlock: 'latest' });
    event.watch((error, result) => {
      if (error) {
        console.log(error);
      }
      return result;
    });
  }

  async getNewSendToSaleEvent(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const event = await instance.newSendToSale({
      fromBlock: 0,
      toBlock: 'latest',
    });
    const logs = await promisifyEventGet(event);

    return logs;
  }

  async watchNewSendToSaleEvent(poolAddress) {
    const instance = await this.pool.at(poolAddress);

    const event = await instance.newSendToSale({ fromBlock: 0, toBlock: 'latest' });
    event.watch((error, result) => {
      if (error) {
        console.log(error);
      }
      return result;
    });
  }

  async getCompletedPushOutTokenEvent(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const event = await instance.completedPushOutToken({
      fromBlock: 0,
      toBlock: 'latest',
    });
    const logs = await promisifyEventGet(event);

    return logs;
  }

  async watchCompletedPushOutTokenEvent(poolAddress) {
    const instance = await this.pool.at(poolAddress);

    const event = await instance.completedPushOutToken({ fromBlock: 0, toBlock: 'latest' });
    event.watch((error, result) => {
      if (error) {
        console.log(error);
      }
      return result;
    });
  }

  async getCompletedSendToSaleEvent(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const event = await instance.completedSendToSale({
      fromBlock: 0,
      toBlock: 'latest',
    });
    const logs = await promisifyEventGet(event);

    return logs;
  }

  async watchCompletedSendToSaleEvent(poolAddress) {
    const instance = await this.pool.at(poolAddress);

    const event = await instance.completedSendToSale({ fromBlock: 0, toBlock: 'latest' });
    event.watch((error, result) => {
      if (error) {
        console.log(error);
      }
      return result;
    });
  }
}
