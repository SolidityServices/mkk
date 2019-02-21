import TruffleContract from 'truffle-contract';
import promisifyEventGet from './promisifyEventGet';

export default class Automations {
  constructor(provider, account, web3, automationsArtifact) {
    this.automations = TruffleContract(automationsArtifact);
    this.automations.setProvider(provider);
    this.account = account;
    this.web3 = web3;
  }

  async emitPushOutTokenCompleted(pool, recipient) {
    const instance = await this.automations.deployed();
    return instance.emitPushOutTokenCompleted(pool, recipient, { from: this.account });
  }

  async emitSendToSaleCompleted(pool) {
    const instance = await this.automations.deployed();
    return instance.emitPushOutTokenCompleted(pool, { from: this.account });
  }

  async getNewPushOutTokenEvent() {
    const instance = await this.automations.deployed();
    const event = await instance.newPushOutToken({
      fromBlock: 0,
      toBlock: 'latest',
    });
    const logs = await promisifyEventGet(event);

    return logs;
  }

  async watchNewPushOutTokenEvent(callback) {
    const instance = await this.automations.deployed();
    const event = await instance.newPushOutToken({ fromBlock: 0, toBlock: 'latest' });
    event.watch(callback);
  }

  async getNewSendToSaleEvent() {
    const instance = await this.automations.deployed();
    const event = await instance.newSendToSale({
      fromBlock: 0,
      toBlock: 'latest',
    });
    const logs = await promisifyEventGet(event);

    return logs;
  }

  async watchNewSendToSaleEvent(callback) {
    const instance = await this.automations.deployed();
    const event = await instance.newSendToSale({ fromBlock: 0, toBlock: 'latest' });
    event.watch(callback);
  }

  async getCompletedPushOutTokenEvent() {
    const instance = await this.automations.deployed();
    const event = await instance.completedPushOutToken({
      fromBlock: 0,
      toBlock: 'latest',
    });
    const logs = await promisifyEventGet(event);

    return logs;
  }

  async watchCompletedPushOutTokenEvent(callback) {
    const instance = await this.automations.deployed();
    const event = await instance.completedPushOutToken({ fromBlock: 0, toBlock: 'latest' });
    event.watch(callback);
  }

  async getCompletedSendToSaleEvent() {
    const instance = await this.automations.deployed();
    const event = await instance.completedSendToSale({
      fromBlock: 0,
      toBlock: 'latest',
    });
    const logs = await promisifyEventGet(event);

    return logs;
  }

  async watchCompletedSendToSaleEvent(callback) {
    const instance = await this.automations.deployed();

    const event = await instance.completedSendToSale({ fromBlock: 0, toBlock: 'latest' });
    event.watch(callback);
  }
}
