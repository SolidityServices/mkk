<template>
  <div class="my-5">
    <div class="w-100 mb-4 mb-md-5" v-if="pool">
      <div class="container d-none d-sm-block mt-5">
        <div class="blue-36-20-bold">Pool name</div>
        <hr align="left" class="d-none d-sm-block blue-hr">
      </div>

      <div class="d-sm-none mobile-back d-flex flex-row">
        <div class="d-flex justify-content-center align-items-center ml-3"><img src="../../assets/chevron-left.png" alt=""></div>
        <div class="white-16-bold ml-2">Pool name</div>
      </div>
    </div>

    <div class="container d-flex flex-column mt-5">
      <div class="d-flex flex-column ml-sm-5">
        <div>
          <div class="o-border d-inline"></div>
          <div class="d-inline blue-36-20-bold"> Search
            <hr align="left" class="blue-hr-2">
          </div>
        </div>

        <div class="d-flex flex-column col-12">
          <div class="col-12 blue-24-16-bold py-3 pl-4"> Pool address:</div>
          <div class="col-12 input-group w-100">
            <div class="col-12 col-lg-10 px-0">
              <input type="text" class="form-control input-text"
                     v-model="address" placeholder="Sale ETH address"/>
            </div>
            <div class="col-lg-2 mt-3 mt-lg-0 px-0 px-md-4">
              <button class="btn blue-submit px-4" @click="search">Search</button>
            </div>
          </div>
        </div>
      </div>

      <hr class="blue-hr-fullw my-5 w-100" v-if="pool">
    </div>

    <div class="container d-flex flex-column" v-if="pool">
      <div class="d-flex flex-column ml-sm-5">
        <div>
          <div class="o-border d-inline"></div>
          <div class="d-inline blue-36-20-bold"> Creator
            <hr align="left" class="blue-hr-2">
          </div>
        </div>

        <div class="d-flex flex-column col-12">
          <div class="col-12 blue-24-16-bold py-3 pl-4"> Sale ETH address:</div>
          <div class="col-12 input-group w-100">
            <input type="text" v-validate="'required|eth-address'" data-vv-name="Sale ETH address"
                   class="form-control input-text" disabled
                   v-model="pool.saleAddress" placeholder="Sale ETH address"/>
          </div>
        </div>

        <div class="d-flex flex-column col-12">
          <div class="col-12 blue-24-16-bold py-3 pl-4"> Token address (optional):</div>
          <div class="col-12 input-group w-100">
            <input type="text" v-validate="'eth-address'" data-vv-name="Sale ETH address"
                   class="form-control input-text" disabled
                   v-model="pool.tokenAddress" placeholder="Token ETH address"/>
          </div>
        </div>
      </div>

      <hr class="blue-hr-fullw my-5 w-100">

      <div class="d-flex flex-column ml-sm-5">
        <div>
          <div class="o-border d-inline"></div>
          <div class="d-inline mt-5 blue-36-20-bold"> Deal Details
            <hr align="left" class="blue-hr-2">
          </div>
        </div>

        <div class="d-flex flex-row flex-wrap">
          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Creator fee in %:</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'required|numeric|min_value:0|max_value:100'"
                     class="form-control input-text w-100" disabled
                     placeholder="0.12"
                     step="0.01"
                     min="0"
                     max="100"
                     v-model="pool.creatorFeeRate">
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg"></div>
            <div class="col-12 col-lg-6"></div>
          </div>


          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Sale start date</div>
            <div class="col-12 col-lg-6">
              <date-picker v-model="pool.saleStartDate"
                           :config="datepickerOptions"
                           class="form-control input-text w-100" disabled
              ></date-picker>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Sale end date</div>
            <div class="col-12 col-lg-6">
              <date-picker v-model="pool.saleEndDate"
                           :config="datepickerOptions"
                           class="form-control input-text w-100" disabled
              ></date-picker>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Minimum pool goal in ETH</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'required|numeric|min_value:0'"
                     class="form-control input-text w-100" disabled
                     data-vv-name="Minimum pool goal"
                     v-model="pool.minPoolGoal">
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Max allocation in ETH</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'required|numeric|min_value:0'"
                     class="form-control input-text w-100" disabled
                     data-vv-name="Max allocation"
                     v-model="pool.maxPoolAllocation">
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 d-flex flex-row align-items-center">
              <div class="input-cb mr-3">
                <input type="checkbox"
                       v-model="pool.whitelistPool"
                       id="whitelistPool" name="" disabled/>
                <label for="whitelistPool"></label>
              </div>
              <label class="blue-18-reg mb-0" for="whitelistPool">Whitelist pool</label>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Withdraw timelock</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'required|numeric|min_value:0'"
                     class="form-control input-text w-100" disabled
                     data-vv-name="Withdraw time lock"
                     v-model="pool.withdrawTimelock">
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Minimum ETH contribution (optional)</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'numeric|min_value:0'" min="0"
                     class="form-control input-text w-100" disabled
                     data-vv-name="Minimum contribution"
                     v-model="pool.minContribution"/>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Maximum ETH contribution (optional)</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'numeric|min_value:0'" min="0"
                     class="form-control input-text" disabled
                     data-vv-name="Maximum contribution"
                     v-model="pool.maxContribution"/>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg"></div>
            <div class="col-12 col-lg-6">
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import datePicker from 'vue-bootstrap-datetimepicker';
import LocalPool from '../../model/LocalPool';

export default {
  components: {
    datePicker,
  },
  data: () => ({
    address: '',
    pool: null,
    datepickerOptions: {
      format: 'DD/MM/YYYY H:mm',
      useCurrent: false,
      sideBySide: true,
    },
  }),
  mounted() {
    if (this.$route.params.address) {
      this.address = this.$route.params.address;
      this.search();
    }
  },
  computed: {
    ...mapGetters([
      'connectICO',
    ]),
  },
  methods: {
    async search() {
      if (await this.connectICO.poolFactory.checkIfPoolExists(this.address)) {
        this.pool = new LocalPool(this.address);
      } else {
        this.$notify({
          type: 'error',
          title: 'Not found!',
          text: 'Pool not found by the given address!',
        });
      }
    },
  },
};
</script>

<style lang="scss">

</style>
