<template>
  <div id="app" class="d-flex flex-column wrapper">
    <notifications position="top center"/>
    <custom-header></custom-header>
    <router-view class="flex-grow-1"></router-view>
    <custom-footer></custom-footer>
  </div>
</template>

<script>
import Vue from 'vue';
import ConnectICO from './model/connect-ico/ConnectICO';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    'custom-header': Header,
    'custom-footer': Footer,
  },
  mounted() {
    if (window.ethInitSuccess) {
      console.log('Starting ConnectICO');
      const connectIco = new ConnectICO();
      connectIco.start();
      window.connectICO = connectIco;
      Vue.prototype.$connectIco = connectIco;
    } else {
      this.$notify({
        type: 'error',
        title: 'Metamask is not detected',
        text: 'In order to use the site please install the MetaMask extension!',
      });
    }
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
