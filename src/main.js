import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VeeValidate, { Validator } from 'vee-validate';
import Notifications from 'vue-notification';
import VueCountdown from '@chenfengyuan/vue-countdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Web3 from 'web3';
import App from './App.vue';

import router from './router';
import store from './store/index';


Validator.extend('eth-address', {
  getMessage: field => `The ${field} value is not an Ethereum address.`,
  validate: value => Web3.utils.isAddress(value),
});

Validator.extend('eth-address-array', {
  getMessage: field => `The ${field} contains elements that is not an Ethereum address.`,
  validate: (value) => {
    let valid = true;

    value.forEach((address) => {
      if (!Web3.utils.isAddress(address)) {
        valid = false;
      }
    });

    return valid;
  },
});

Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.use(Notifications);
Vue.component(VueCountdown.name, VueCountdown);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
