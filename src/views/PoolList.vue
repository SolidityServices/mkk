<template>
    <div class="container">
        <div class="d-flex flex-row mt-4 flex-wrap">
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


            <div class="col-12 col-lg-3 col-2xl-2 ml-auto">
                <form class="form-inline my-2 my-lg-0">
                    <input class="w-75 form-control search-form"
                           type="text"
                           v-model="filter"
                           placeholder="Search"
                           aria-label="Search">
                    <div class="w-25 search-form-btn my-2 my-sm-0 text-right pr-1">
                      <img src="../assets/search.png" alt="">
                    </div>
                </form>
            </div>
        </div>

      <div class="d-flex flex-row flex-wrap mb-3">
        <div class="d-flex flex-column w-100 mb-3" v-for="pool in filteredPools" :key="pool.poolAddress">
          <div class="d-flex flex-row mb-3">
            <hr class="blue-hr-fullw w-100">
          </div>
          <div class="d-flex flex-row flex-wrap">
            <div class="col-12 col-lg-6 border-right">
              <router-link :to="{name: 'project', params: {address: pool.poolAddress}}">
                {{pool.poolAddress}}
              </router-link>
            </div>
            <div class="col-12 col-lg-6">
              {{pool.description}}
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import { mapGetters } from 'vuex';
import LocalPool from '../model/LocalPool';

export default {
  name: 'PoolList',
  data: () => ({
    selectedOption: null,
    options: [
      { text: 'Active', value: 'active' },
      { text: 'Upcoming', value: 'upcoming' },
      { text: 'Closed', value: 'closed' },
      { text: 'Waiting for token', value: 'waiting' },
    ],
    pools: [],
    filter: '',
  }),
  async mounted() {
    const pools = [];
    const poolCount = await this.connectICO.poolFactory.getPoolNumber();
    for (let i = 0; i < poolCount; i += 1) {
      pools.push(new LocalPool(await this.connectICO.poolFactory.getPool(i)));
    }
    if (pools && pools.length > 0) {
      this.pools = pools;
    }
  },
  computed: {
    ...mapGetters([
      'connectICO',
    ]),
    filteredPools() {
      if (this.filter === '') {
        return this.pools;
      }

      return this.pools.filter(item => item.name.contains(this.filter));
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';
@import '../scss/main';
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
