<template>
    <div class="container">
        <div class="d-flex flex-row mt-4 flex-wrap">
          <template>
            <div class="d-flex px-3 mb-3"
                 v-for="option in options"
                 :key="option.value"
            >
              <div class="my-auto px-2 input-radio">
                <input type="radio"
                       :name="`radio_${option.value}`"
                       :id="`radio_${option.value}`"
                       :value="option.value"
                       v-model="selectedOption"/>
                <label :for="`radio_${option.value}`"></label>
              </div>
              <label class="pl-1 my-auto blue-14-bold"
                     :for="`radio_${option.value}`">{{option.text}}</label>
            </div>
          </template>


            <div class="col-12 col-lg-3 col-2xl-2 ml-auto">
                <form class="form-inline my-2 my-lg-0">
                    <input class="w-75 form-control search-form"
                           type="text"
                           v-model="filter"
                           placeholder="Search"
                           aria-label="Search">
                    <div class="w-25 search-form-btn my-2 my-sm-0 text-right pr-1">
                      <img src="../../assets/search.png" alt="">
                    </div>
                </form>
            </div>
        </div>

      <div class="d-flex flex-row flex-wrap mb-3">
        <div class="d-flex flex-column w-100 mb-3" v-for="pool in pools" :key="pool.poolAddress">
          <div class="d-flex flex-row mb-3">
            <hr class="blue-hr-fullw w-100">
          </div>
          <div class="d-flex flex-row flex-wrap">
            <div class="col-12 col-lg-6 border-right">
              <i class="fa fa-lock mr-2" v-if="isClosedPool(pool)"></i>
              <i class="fa fa-ban mr-2" v-if="isStoppedPool(pool)"></i>

              <router-link :to="{name: 'project', params: {address: pool.poolAddress}}">
                {{pool.poolAddress}}
              </router-link>
            </div>
            <div class="col-12 col-lg-6">
              {{pool.poolDescription}}
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex flex-row justify-content-center" v-if="poolCount && poolCount > itemsPerPage">
        <b-pagination size="md" :total-rows="poolCount" v-model="currentPage" :per-page="itemsPerPage"></b-pagination>
      </div>
    </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LocalPool from '../../model/LocalPool';

export default {
  name: 'PoolList',
  data: () => ({
    options: [
      { text: 'Active', value: 'active' },
      { text: 'Upcoming', value: 'upcoming' },
      { text: 'Closed', value: 'closed' },
      // { text: 'Waiting for token', value: 'waiting' },
    ],
    filter: '',
    currentPage: 1,
    itemsPerPage: 10,
  }),
  async created() {
    this.fetchPools();
  },
  methods: {
    ...mapActions(['initPools']),
    async fetchPools() {
      const pools = await this.connectICO.poolFactory.getPools();
      const poolObjects = [];
      pools.forEach((pool) => {
        poolObjects.push(new LocalPool(pool));
      });

      this.initPools(poolObjects);
    },
    isClosedPool(item) {
      const now = Date.now();

      return item.saleEndDate <= now;
    },
    isStoppedPool(item) {
      return item.isStopped;
    },
  },
  computed: {
    ...mapGetters([
      'connectICO',
    ]),
    pools() {
      return this.$store.getters.pools(this.filter, this.currentPage, this.itemsPerPage);
    },
    poolCount() {
      return this.$store.getters.poolCount(this.filter);
    },
    selectedOption: {
      get: function () { return this.$store.getters.category; },
      set: function (value) { return this.$store.dispatch('setCategory', value); },
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/variables';
@import '../../scss/mixins';
@import '../../scss/main';
    .search-form {
        border: 1px solid $blue;
        border-radius: 0;
        border-right: none;
        height: 30px;
        &:focus {
            border-color: $blue;
            box-shadow: none;
        }
    }
    .search-form-btn {
        border: 1px solid $blue;
        border-radius: 0;
        border-left: none;
        height: 30px;
        background-color: transparent;
        &:focus {
            outline: none;
        }
    }
        // Input Radio
    input[type=radio] {
        visibility: hidden;
    }
    .input-radio {
        width: 26px;
        height: 26px;
        background: $blue;
        border-radius: 50%;
        position: relative;
    }
    .input-radio label {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 100px;
        transition: all .5s ease;
        cursor: pointer;
        position: absolute;
        top: 3px;
        left: 3px;
        z-index: 1;
        background: $white;
        box-shadow:inset 0px 0px 1px 6px white;
    }
    .input-radio input[type=radio]:checked + label {
        background: $orange;
        width: 20px;
        height: 20px;
    }

    @media (min-width: 1367px) {
        .col-2xl-2 {
            -ms-flex: 0 0 16.66666%;
            -webkit-box-flex: 0;
            flex: 0 0 16.66666%;
            max-width: 16.66666%;
        }
        .col-2xl-3 {
            -ms-flex: 0 0 25%;
            -webkit-box-flex: 0;
            flex: 0 0 25%;
            max-width: 25%;
        }
    }

</style>
