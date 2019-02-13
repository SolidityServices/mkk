<template>
  <div id="app" class="d-flex flex-column wrapper">
    <notifications position="top center"/>
    <custom-header></custom-header>
    <router-view class="flex-grow-1" v-if="connectICOLoaded"></router-view>
    <custom-footer></custom-footer>
  </div>
</template>

<script>
import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';
import { mapGetters } from 'vuex';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const infura = require('../infura.json');

export default {
  components: {
    'custom-header': Header,
    'custom-footer': Footer,
  },
  async created() {
    await this.initProvider();
  },
  computed: {
    ...mapGetters([
      'connectICOLoaded',
      'mode',
    ]),
  },
  watch: {
    async mode() {
      await this.initProvider();
    },
  },
  methods: {
    async initProvider() {
      if (this.mode === 'mew') {
        await this.mewInit();
      } else {
        await this.metaMaskInit();
      }

      this.$store.dispatch('setConnectICO');
    },
    async metaMaskInit() {
      console.log('Initializing web3 components...');
      window.ethInitSuccess = false;

      if (window.ethereum) {
        console.log('window.ethereum is defined');
        // Modern dapp browsers...
        window.web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          window.ethereum.enable();
          // Accounts now exposed
          window.ethInitSuccess = true;
          console.log('Init success');
        } catch (error) {
          console.log('Init fail');
          window.ethInitSuccess = false;
          // User denied account access...
          this.$notify({
            type: 'error',
            title: 'Metamask is not detected',
            text: 'In order to use the site please install the MetaMask extension!',
          });
        }
      }
      // else if (window.web3) {
      //   console.log('window.web3 is defined');
      //   // Legacy dapp browsers...
      //   window.web3 = new Web3(Web3.currentProvider);
      //   // Acccounts always exposed
      //   window.ethInitSuccess = true;
      // }
      else {
        this.$store.commit('setMode', 'mew');
        this.$notify({
          type: 'error',
          title: 'Metamask is not detected',
          text: 'In order to use the site please install the MetaMask extension!',
        });
      }
    },
    async mewInit() {
      // Non-dapp browsers...
      console.log('Non-Ethereum browser detected. '
        + 'You should consider trying MetaMask! '
        + 'Falling back to http://localhost:8545. '
        + "You should remove this fallback when you deploy live, as it's inherently insecure. "
        + 'Consider switching to Metamask for development. '
        + 'More info here: http://truffleframework.com/tutorials/truffle-and-metamask');
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      let providerUrl;
      if (infura.network === 'ganache') {
        providerUrl = 'http://localhost:8545';
      } else {
        providerUrl = `https://${infura.network}.infura.io/v3/${infura.apiKey}`;
      }
      window.web3 = new Web3(new HDWalletProvider(infura.mnemonic, providerUrl, 4));
      window.ethInitSuccess = false;
    },
  },
};
</script>

<style lang="scss">
@import './scss/main';
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&subset=latin-ext');

html{
  overflow-x: hidden;
  font-family: 'Montserrat', sans-serif;
  body {
    overflow: hidden;

    .wrapper {
      min-height: 100vh;
    }
  }
}

</style>
