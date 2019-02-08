export default {
  state: {
    pools: [],
    filter: '',
  },
  mutations: {
    initPools(state, pools) {
      state.pools = pools;
    },
  },
  actions: {
    initPools({ commit }, pools) {
      commit('initPools', pools);
    },
  },
  getters: {
    pools(state) {
      return (filter, page, itemsPerPage) => {
        const filteredPools = state.pools.filter(item => item.poolAddress.includes(filter));

        const minIndex = (page - 1) * itemsPerPage;
        const maxIndex = page * itemsPerPage > filteredPools.length ? filteredPools.length : page * itemsPerPage;

        return filteredPools.filter((pool, index) => index >= minIndex && index < maxIndex);
      };
    },
    poolCount(state) {
      return filter => state.pools.filter(item => item.poolAddress.includes(filter)).length;
    },
  },
};
