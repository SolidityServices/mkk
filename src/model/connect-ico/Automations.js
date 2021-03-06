import TruffleContract from 'truffle-contract';
import automationsArtifact from '../../../build/contracts/Automations.json';
import promisifyEvent from '../../utils/promisifyEvent';

export default class Automations {
  constructor(provider, account, web3, mode) {
    this.automations = TruffleContract(automationsArtifact);
    this.automations.setProvider(provider);
    this.account = account;
    this.web3 = web3;
    this.mode = mode;
  }

  async getAddress() {
    const instance = await this.automations.deployed();
    return instance.address;
  }

  async getPushServer() {
    const instance = await this.automations.deployed();
    return instance.pushServer.call({ from: this.account });
  }

  async getPushGasCost() {
    const instance = await this.automations.deployed();
    return instance.pushGasCost.call({ from: this.account });
  }

  async getSendToSaleGasCost() {
    const instance = await this.automations.deployed();
    return instance.sendToSaleGasCost.call({ from: this.account });
  }

  async addPushOutToken(pool, recipient, gasPrice) {
    const instance = await this.automations.deployed();

    if (this.mode === 'mew') {
      const callData = await instance.addPushOutToken.request(pool, recipient, gasPrice, { from: this.account }).params[0].data;
      const gasLimit = 1000 * 1000;

      return {
        callData,
        gasLimit,
      };
    }

    return instance.addPushOutToken(pool, recipient, gasPrice, { from: this.account });
  }

  async addSendToSale(pool, time, gasPrice) {
    const instance = await this.automations.deployed();

    if (this.mode === 'mew') {
      const callData = await instance.addSendToSale.request(pool, time, gasPrice, { from: this.account }).params[0].data;
      const gasLimit = 1000 * 1000;

      return {
        callData,
        gasLimit,
      };
    }

    return instance.addSendToSale(pool, time, gasPrice, { from: this.account });
  }

  async emitPushOutTokenCompleted(pool, recipient) {
    const instance = await this.automations.deployed();

    if (this.mode === 'mew') {
      const callData = await instance.emitPushOutTokenCompleted.request(pool, recipient, { from: this.account }).params[0].data;
      const gasLimit = 1000 * 1000;

      return {
        callData,
        gasLimit,
      };
    }

    return instance.emitPushOutTokenCompleted(pool, recipient, { from: this.account });
  }

  async emitSendToSaleCompleted(pool) {
    const instance = await this.automations.deployed();

    if (this.mode === 'mew') {
      const callData = await instance.emitPushOutTokenCompleted.request(pool, { from: this.account }).params[0].data;
      const gasLimit = 1000 * 1000;

      return {
        callData,
        gasLimit,
      };
    }

    return instance.emitPushOutTokenCompleted(pool, { from: this.account });
  }

  async setPushServer(pushServer) {
    const instance = await this.automations.deployed();

    if (this.mode === 'mew') {
      const callData = await instance.setPushServer.request(pushServer, { from: this.account }).params[0].data;
      const gasLimit = 1000 * 1000;

      return {
        callData,
        gasLimit,
      };
    }

    return instance.setPushServer(pushServer, { from: this.account });
  }

  async setPushGasCost(pushGasCost) {
    const instance = await this.automations.deployed();

    if (this.mode === 'mew') {
      const callData = await instance.setPushGasCost.request(pushGasCost, { from: this.account }).params[0].data;
      const gasLimit = 1000 * 1000;

      return {
        callData,
        gasLimit,
      };
    }

    return instance.setPushGasCost(pushGasCost, { from: this.account });
  }

  async setSendToSaleGasCost(sendToSaleGas) {
    const instance = await this.automations.deployed();

    if (this.mode === 'mew') {
      const callData = await instance.setSendToSaleGasCost.request(sendToSaleGas, { from: this.account }).params[0].data;
      const gasLimit = 1000 * 1000;

      return {
        callData,
        gasLimit,
      };
    }

    return instance.setSendToSaleGasCost(sendToSaleGas, { from: this.account });
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
