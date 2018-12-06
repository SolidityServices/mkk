import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Notifications from 'vue-notification';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Web3 from 'web3';
import App from './App.vue';

import router from './router';
import store from './store';
import ConnectICO from './connectICO';

Vue.use(BootstrapVue);
Vue.use(Notifications);

Vue.config.productionTip = false;

let initSuccess = false;

window.connectICO = new ConnectICO();
if (window.ethereum) {
  console.log('window.ethereum is defined');
  // Modern dapp browsers...
  window.web3 = new Web3(window.ethereum);
  try {
    // Request account access if needed
    window.ethereum.enable();
    // Accounts now exposed
    window.web3.eth.sendTransaction({/* ... */});
    initSuccess = true;
  } catch (error) {
    initSuccess = false;
    // User denied account access...
  }
} else if (window.web3) {
  console.log('window.web3 is defined');
  // Legacy dapp browsers...
  window.web3 = new Web3(Web3.currentProvider);
  // Acccounts always exposed
  Web3.eth.sendTransaction({/* ... */});
  initSuccess = true;
} else {
  // Non-dapp browsers...
  console.log('Non-Ethereum browser detected. '
    + 'You should consider trying MetaMask! '
    + 'Falling back to http://localhost:8545. '
    + "You should remove this fallback when you deploy live, as it's inherently insecure. "
    + 'Consider switching to Metamask for development. '
    + 'More info here: http://truffleframework.com/tutorials/truffle-and-metamask');
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  initSuccess = false;
}

if (initSuccess) {
  window.connectICO.start();
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
