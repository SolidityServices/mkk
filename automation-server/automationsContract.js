import TruffleContract from 'truffle-contract';
import promisifyEvent from './promisifyEvent';

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

  async getNewPushOutTokenEvent(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const instanceRawWeb3 = new this.web3.eth.Contract(instance.abi, instance.address);

    const logs = await promisifyEvent(callback => instanceRawWeb3.getPastEvents('newPushOutToken', {
      fromBlock: 0,
      toBlock: 'latest',
    }, callback));

    return logs;
  }

  async watchNewPushOutTokenEvent(poolAddress, callback) {
    const instance = await this.pool.at(poolAddress);
    const instanceRawWeb3 = new this.web3.eth.Contract(instance.abi, instance.address);
    instanceRawWeb3.event.newPushOutToken({ fromBlock: 0, toBlock: 'latest' }).on('data', callback);
  }

  async getNewSendToSaleEvent(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const instanceRawWeb3 = new this.web3.eth.Contract(instance.abi, instance.address);

    const logs = await promisifyEvent(callback => instanceRawWeb3.getPastEvents('newSendToSale', {
      fromBlock: 0,
      toBlock: 'latest',
    }, callback));

    return logs;
  }

  async watchNewSendToSaleEvent(poolAddress, callback) {
    const instance = await this.pool.at(poolAddress);
    const instanceRawWeb3 = new this.web3.eth.Contract(instance.abi, instance.address);
    instanceRawWeb3.event.newSendToSale({ fromBlock: 0, toBlock: 'latest' }).on('data', callback);
  }

  async getCompletedPushOutTokenEvent(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const instanceRawWeb3 = new this.web3.eth.Contract(instance.abi, instance.address);

    const logs = await promisifyEvent(callback => instanceRawWeb3.getPastEvents('completedPushOutToken', {
      fromBlock: 0,
      toBlock: 'latest',
    }, callback));

    return logs;
  }

  async watchCompletedPushOutTokenEvent(poolAddress, callback) {
    const instance = await this.pool.at(poolAddress);
    const instanceRawWeb3 = new this.web3.eth.Contract(instance.abi, instance.address);
    instanceRawWeb3.event.completedPushOutToken({ fromBlock: 0, toBlock: 'latest' }).on('data', callback);
  }

  async getCompletedSendToSaleEvent(poolAddress) {
    const instance = await this.pool.at(poolAddress);
    const instanceRawWeb3 = new this.web3.eth.Contract(instance.abi, instance.address);

    const logs = await promisifyEvent(callback => instanceRawWeb3.getPastEvents('completedSendToSale', {
      fromBlock: 0,
      toBlock: 'latest',
    }, callback));

    return logs;
  }

  async watchCompletedSendToSaleEvent(poolAddress, callback) {
    const instance = await this.pool.at(poolAddress);
    const instanceRawWeb3 = new this.web3.eth.Contract(instance.abi, instance.address);
    instanceRawWeb3.event.completedSendToSale({ fromBlock: 0, toBlock: 'latest' }).on('data', callback);
  }
}
