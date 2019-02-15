function filterPools(pools, filter, category) {
  const now = Date.now();
  return pools.filter((item) => {
    switch (category) {
      case 'active':
        if (item.saleStartDate <= now && item.saleEndDate > now) {
          break;
        }
        return false;
      case 'upcoming':
        if (item.saleStartDate > now) {
          break;
        }
        return false;
      case 'closed':
        if (item.saleEndDate <= now) {
          break;
        }
        return false;
      default:
        return false;
    }

    return item.poolAddress.includes(filter);
  });
}

export default {
  state: {
    pools: [],
    filter: '',
    category: 'active',
  },
  mutations: {
    initPools(state, pools) {
      state.pools = pools;
    },
    setCategory(state, category) {
      state.category = category;
    },
  },
  actions: {
    initPools({ commit }, pools) {
      commit('initPools', pools);
    },
    setCategory({ commit }, category) {
      commit('setCategory', category);
    },
  },
  getters: {
    pools(state) {
      return (filter, page, itemsPerPage) => {
        const filteredPools = filterPools(state.pools, state.filter, state.category);

        const minIndex = (page - 1) * itemsPerPage;
        const maxIndex = page * itemsPerPage > filteredPools.length ? filteredPools.length : page * itemsPerPage;

        return filteredPools.filter((pool, index) => index >= minIndex && index < maxIndex);
      };
    },
    poolCount(state) {
      return filter => state.pools.filter(item => item.poolAddress.includes(filter)).length;
    },
    category(state) {
      return state.category;
    },
  },
};
