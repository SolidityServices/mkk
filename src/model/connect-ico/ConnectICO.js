import Vue from 'vue';
import PoolFactory from './PoolFactory';
import Pool from './Pool';
import KYC from './KYC';
import TokenPushRegistry from './TokenPushRegistry';

export default class ConnectICO {
  constructor() {
    this.account = null;
    this.web3 = window.web3;
  }

  start() {
    // Bootstrap the abstractions for Use.
    console.log(this.web3.currentProvider);

    // set the initial this.account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accounts) => {
      if (err != null) {
        Vue.notify({
          type: 'error',
          title: 'Error',
          text: 'There was an error fetching your accounts!',
        });
        console.log('There was an error fetching your this.accounts.');
        return;
      }

      if (accounts.length === 0) {
        Vue.notify({
          type: 'error',
          title: 'Error',
          text: 'Couldn\'t get any this.accounts! Make sure your Ethereum client is configured correctly!',
        });
        console.log('Couldn\'t get any this.accounts! Make sure your Ethereum client is configured correctly.');
        return;
      }

      // eslint-disable-next-line prefer-destructuring
      this.account = accounts[0];

      // TODO: is this necessary?
      this.web3.currentProvider.enable();
      this.pool = new Pool(this.web3.currentProvider, this.account, this.web3);
      this.poolFactory = new PoolFactory(this.web3.currentProvider, this.account, this.web3);
      this.KYC = new KYC(this.web3.currentProvider);
      this.tokenPushRegistry = new TokenPushRegistry(this.web3.currentProvider);

      console.log('Application initialized');
    });
  }
}
