const TruffleContract = require('truffle-contract');
const promisifyEvent = require('./promisifyEvent');

class Automations {
  constructor(provider, account, web3, automationsArtifact, firstBlock) {
    this.automations = TruffleContract(automationsArtifact);
    this.automations.setProvider(provider);
    this.account = account;
    this.web3 = web3;
    this.firstBlock = firstBlock;
  }

  async getAddress() {
    const instance = await this.automations.deployed();
    return instance.address;
  }

  async emitPushOutTokenCompleted(pool, recipient, _gasPrice) {
    const instance = await this.automations.deployed();
    return instance.emitPushOutTokenCompleted(pool, recipient, { from: this.account, gasPrice: _gasPrice });
  }

  async emitSendToSaleCompleted(pool, _gasPrice) {
    const instance = await this.automations.deployed();
    return instance.emitPushOutTokenCompleted(pool, { from: this.account, gasPrice: _gasPrice });
  }

  async getNewPushOutTokenEvent() {
    const instance = await this.automations.deployed();
    const instanceRawWeb3 = new this.web3.eth.Contract(instance.abi, instance.address);

    const logs = await promisifyEvent.promisify(callback => instanceRawWeb3.getPastEvents('newPushOutToken', {
      fromBlock: this.firstBlock,
      toBlock: 'latest',
    }, callback));

    return logs;
  }

  async watchNewPushOutTokenEvent(callback) {
    const instance = await this.automations.deployed();
    const instanceRawWeb3 = new this.web3.eth.Contract(instance.abi, instance.address);
    instanceRawWeb3.events.newPushOutToken({ fromBlock: 0, toBlock: 'latest' }).on('data', callback);
  }

  async getNewSendToSaleEvent() {
    const instance = await this.automations.deployed();
    const instanceRawWeb3 = new this.web3.eth.Contract(instance.abi, instance.address);

    const logs = await promisifyEvent.promisify(callback => instanceRawWeb3.getPastEvents('newSendToSale', {
      fromBlock: this.firstBlock,
      toBlock: 'latest',
    }, callback));

    return logs;
  }

  async watchNewSendToSaleEvent(callback) {
    const instance = await this.automations.deployed();
    const instanceRawWeb3 = new this.web3.eth.Contract(instance.abi, instance.address);
    instanceRawWeb3.events.newSendToSale({ fromBlock: 0, toBlock: 'latest' }).on('data', callback);
  }

  async getCompletedPushOutTokenEvent() {
    const instance = await this.automations.deployed();
    const instanceRawWeb3 = new this.web3.eth.Contract(instance.abi, instance.address);

    const logs = await promisifyEvent.promisify(callback => instanceRawWeb3.getPastEvents('completedPushOutToken', {
      fromBlock: this.firstBlock,
      toBlock: 'latest',
    }, callback));

    return logs;
  }

  async watchCompletedPushOutTokenEvent(callback) {
    const instance = await this.automations.deployed();
    const instanceRawWeb3 = new this.web3.eth.Contract(instance.abi, instance.address);
    instanceRawWeb3.events.completedPushOutToken({ fromBlock: 0, toBlock: 'latest' }).on('data', callback);
  }

  async getCompletedSendToSaleEvent() {
    const instance = await this.automations.deployed();
    const instanceRawWeb3 = new this.web3.eth.Contract(instance.abi, instance.address);

    const logs = await promisifyEvent.promisify(callback => instanceRawWeb3.getPastEvents('completedSendToSale', {
      fromBlock: this.firstBlock,
      toBlock: 'latest',
    }, callback));

    return logs;
  }

  async watchCompletedSendToSaleEvent(callback) {
    const instance = await this.automations.deployed();
    const instanceRawWeb3 = new this.web3.eth.Contract(instance.abi, instance.address);
    instanceRawWeb3.events.completedSendToSale({ fromBlock: 0, toBlock: 'latest' }).on('data', callback);
  }
}

module.exports.Automations = Automations;
