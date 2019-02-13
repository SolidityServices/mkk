import Vue from 'vue';
import PoolFactory from './PoolFactory';
import Pool from './Pool';
import KYC from './KYC';
import TokenPushRegistry from './TokenPushRegistry';

export default class ConnectICO {
  constructor(mode) {
    this.account = null;
    this.web3 = window.web3;
    this.loaded = false;
    this.mode = mode;
  }

  async start() {
    // Bootstrap the abstractions for Use.
    console.log(this.web3.currentProvider);

    // set the initial this.account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accounts) => {
      let account = '0x0';

      if (this.mode === 'mm') {
        if (err) {
          Vue.notify({
            type: 'error',
            title: 'Error',
            text: 'There was an error fetching your accounts!',
          });
          console.log('There was an error fetching your this.accounts.');
          return;
        }

        if (this.mode === 'mm' && accounts.length === 0) {
          Vue.notify({
            type: 'error',
            title: 'Error',
            text: 'Couldn\'t get any this.accounts! Make sure your Ethereum client is configured correctly!',
          });
          console.log('Couldn\'t get any this.accounts! Make sure your Ethereum client is configured correctly.');
          return;
        }

        // eslint-disable-next-line prefer-destructuring
        account = accounts[0];
      }
      this.account = account;

      this.pool = new Pool(this.web3.currentProvider, this.account, this.web3, this.mode);
      this.poolFactory = new PoolFactory(this.web3.currentProvider, this.account, this.web3, this.mode);
      this.KYC = new KYC(this.web3.currentProvider, this.account, this.web3);
      this.tokenPushRegistry = new TokenPushRegistry(this.web3.currentProvider);

      console.log(this.pool);
      console.log(this.poolFactory);
      console.log(this.KYC);
      console.log(this.tokenPushRegistry);

      console.log('Application initialized');
      this.loaded = true;
    });
  }
}
