import Vue from 'vue';
import Vuex from 'vuex';
import ConnectICO from '../model/connect-ico/ConnectICO';
import pool from './modules/pool';

Vue.use(Vuex);

const countries = require('./countries');

export default new Vuex.Store({
  state: {
    connectICO: null,
    countries,
    mode: 'mm',
  },
  mutations: {
    async setConnectICO(state) {
      const connectIco = new ConnectICO(state.mode);
      console.log('Starting ConnectICO');
      await connectIco.start();
      state.connectICO = connectIco;
      window.connectICO = connectIco;
    },
    setMode(state, mode) {
      state.mode = mode;
    },
  },
  actions: {
    setConnectICO({ commit }, connectICO) {
      commit('setConnectICO', connectICO);
    },
    setMode({ commit }, mode) {
      commit('setMode', mode);
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
    mode(state) {
      return state.mode;
    },
  },
  modules: {
    pool,
  },
});
