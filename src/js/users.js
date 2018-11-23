import contract from 'truffle-contract';
import UsersContract from '@/contracts/Users.json';

const Users = {

  contract: null,

  instance: null,

  init() {
    const self = this;

    return new Promise(((resolve, reject) => {
      self.contract = contract(UsersContract);
      self.contract.setProvider(window.web3.currentProvider);

      self.contract.deployed().then((instance) => {
        self.instance = instance;
        resolve();
      }).catch((err) => {
        reject(err);
      });
    }));
  },

  exists(address) {
    const self = this;

    return new Promise((resolve, reject) => {
      self.instance.exists.call(
        address || window.web3.eth.defaultAccount,
        { from: window.web3.eth.accounts[0] },
      ).then((exists) => {
        resolve(exists);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  authenticate() {
    const self = this;

    return new Promise((resolve, reject) => {
      self.instance.authenticate.call(
        { from: window.web3.eth.accounts[0] },
      ).then((pseudo) => {
        resolve(window.web3.toUtf8(pseudo));
      }).catch((err) => {
        reject(err);
      });
    });
  },

  create(pseudo) {
    const self = this;

    return new Promise((resolve, reject) => {
      self.instance.create(
        pseudo,
        { from: window.web3.eth.accounts[0] },
      ).then((tx) => {
        resolve(tx);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  destroy() {
    const self = this;

    return new Promise((resolve, reject) => {
      self.instance.destroy(
        { from: window.web3.eth.accounts[0] },
      ).then((tx) => {
        resolve(tx);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

export default Users;
