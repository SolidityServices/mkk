<template>
  <div id="app">
    <notifications position="top center"/>
    <custom-header></custom-header>
    <router-view></router-view>
    <custom-footer></custom-footer>
  </div>
</template>

<script>
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
      window.connectICO.start();
    } else {
      console.log('Showing notification');
      this.$notify({
        type: 'error',
        title: 'Metamask is not detected',
        text: 'In order to use the site please install the MetaMask extension!',
      });
    }
  },
  data() {
    return {

    };
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
  }
}

</style>
