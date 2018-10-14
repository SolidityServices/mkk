<template>
  <div id="app">
    <router-link to="/pool-creator">Pool Creator</router-link>
    <router-link to="/project-name1">Project Name 1</router-link>
    <router-link to="/project-name2">Project Name 2</router-link>
    <router-link to="/deploy-contract">Deploy Contract</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
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
