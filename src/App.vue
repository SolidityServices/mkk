<template>
  <div id="app">
    <notifications position="top center"/>
    <router-link :to="{name: 'pool-creator'}">Pool Creator</router-link>
    <router-link :to="{name: 'project'}">Project</router-link>
    <router-link :to="{name: 'deploy-contract'}">Deploy Contract</router-link>
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
