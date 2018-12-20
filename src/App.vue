<template>
  <div id="app" class="d-flex flex-column wrapper">
    <notifications position="top center"/>
    <custom-header></custom-header>
    <router-view class="flex-grow-1" v-if="connectICOLoaded"></router-view>
    <custom-footer></custom-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    'custom-header': Header,
    'custom-footer': Footer,
  },
  beforeCreate() {
    this.$store.dispatch('setConnectICO');
  },
  mounted() {
    // TODO: move to web3init
    if (!window.ethInitSuccess) {
      this.$notify({
        type: 'error',
        title: 'Metamask is not detected',
        text: 'In order to use the site please install the MetaMask extension!',
      });
    }
  },
  computed: {
    ...mapGetters([
      'connectICOLoaded',
    ]),
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
