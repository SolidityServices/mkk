import Vue from 'vue';
import Vuex from 'vuex';
import ConnectICO from './model/connect-ico/ConnectICO';

Vue.use(Vuex);

const countries = require('./countries');

export default new Vuex.Store({
  state: {
    connectICO: null,
    countries,
    pools: [],
  },
  mutations: {
    async setConnectICO(state) {
      const connectIco = new ConnectICO();
      console.log('Starting ConnectICO');
      await connectIco.start();
      state.connectICO = connectIco;
      window.connectICO = connectIco;
    },
    fetchPools(state, pools) {
      state.pools = pools;
    },
  },
  actions: {
    setConnectICO({ commit }, connectICO) {
      commit('setConnectICO', connectICO);
    },
    fetchPools({ commit }, pools) {
      commit('fetchPools', pools);
    },
  },
  getters: {
    countries(state) {
      return state.countries;
    },
    connectICO(state) {
      return state.connectICO;
    },
    connectICOLoaded(state) {
      if (state.connectICO) {
        return state.connectICO.loaded;
      }
      return false;
    },
    pools(state) {
      return state.pools;
    },
  },
});
