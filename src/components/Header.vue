<template>
  <header class="d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex flex-row w-80 mb-4">
      <div class="d-flex align-items-center justify-content-center justify-content-sm-start col-12 col-sm">
        <router-link to="/">
          <img src="../assets/logo.png" alt="">
        </router-link>
      </div>

      <div class="align-items-center d-none d-sm-flex col-sm ml-auto justify-content-end">
        <span><a href="#" target="_blank"><img src="../assets/header/header-icon-1.png" alt=""></a></span>
        <span><a href="#" target="_blank" class="px-3"><img src="../assets/header/header-icon-2.png" alt=""></a></span>
        <span><a href="#" target="_blank"><img src="../assets/header/header-icon-3.png" alt=""></a></span>
      </div>
    </div>
    <div class="d-flex flex-row flex-wrap w-100">
      <div class="d-flex flex-grow-1 justify-content-center">
        <router-link :to="{name: 'pool-creator'}" class="custom-navbar-item">Pool Creator</router-link>
        <!--<router-link :to="{name: 'project', params: {address: null}}" class="custom-navbar-item">Project</router-link>-->
        <!--<router-link :to="{name: 'deploy-contract'}" class="custom-navbar-item">Deploy Contract</router-link>-->
        <router-link :to="{name: 'pool-list'}" class="custom-navbar-item">Pool List</router-link>
      </div>
      <b-form-group class="d-flex mx-5">
        <b-form-radio-group id="modeOptions"
                            class="text-white"
                            v-model="mode"
                            :options="modeOptions"
                            name="modeOptions">
        </b-form-radio-group>
      </b-form-group>
    </div>
  </header>
</template>

<script>
export default {
  data: () => ({
    modeOptions: [
      { text: 'MEW', value: 'mew' },
      { text: 'MM', value: 'mm' },
    ],
  }),
  computed: {
    mode: {
      get() { return this.$store.getters.mode; },
      set(v) { this.$store.commit('setMode', v); },
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../scss/_variables.scss';

  header {
    height: 170px;
    background: url('../assets/header/header-bg.png') center;
    background-size: cover;
  }

  @media(max-width: 576px) {
    header {
      .header-logo {
        img {
          width: 50%;
        }
      }
    }
  }

  .custom-navbar-item {
    font-size: 18px;
    color: $white;
    text-transform: uppercase;
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
