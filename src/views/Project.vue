<template>
  <div class="row" v-if="pool">
    <div class="d-none d-sm-flex col-1"></div>
    <div class="col-12 col-sm-10">
      <div class="d-none d-sm-block mt-5 blue-36-20-bold">{{pool.poolAddress}}</div>
      <hr align="left" class="d-none d-sm-block blue-hr">
      <div class="d-sm-none mobile-back row mx-0">
        <div class="my-auto pl-3"><img src="../assets/chevron-left.png" alt=""></div>
        <div class="white-16-bold my-auto">Project Name</div>
      </div>
      <router-link class="btn blue-submit px-4 mr-3" :to="{name: 'project.edit', params: {address: pool.poolAddress}}">
        Edit pool
      </router-link>

      <div class="row">
        <div class="col-1"></div>
        <div class="col-10 mt-5 ">
          <div class="o-border d-inline "></div>
          <div class="d-inline blue-36-20-bold"> Project Description
            <hr align="left" class="blue-hr-2">
          </div>
          <div class="blue-18-reg pl-3">
            <p>
              {{pool.poolDescription}}
            </p>

          </div>

          <hr class="blue-hr-fullw my-5">

          <!-- Deal Details -->

          <div class="o-border d-inline "></div>
          <div class="d-inline blue-36-20-bold"> Deal Details
            <hr align="left" class="blue-hr-2">
          </div>
          <div class="row mx-0">
            <div class="col-12 col-lg-4 pt-3">
              <div class="blue-18-bold">Parameters</div>
              <div class="row pt-3">
                <!--<div class="py-1 col-8 blue-18-reg">Net amount (ETH):</div>-->
                <!--<div class="py-1 col-4 orange-18-bold text-right">1000</div>-->

                <div class="py-1 col-8 blue-18-reg">Fee</div>
                <div class="py-1 col-4 orange-18-bold text-right">{{pool.creatorFeeRate}} %</div>

                <div class="py-1 col-8 blue-18-reg">ConnectICO Fee</div>
                <div class="py-1 col-4 orange-18-bold text-right">{{pool.providerFeeRate}} %</div>

                <div class="py-1 col-8 blue-18-reg">Individual Min</div>
                <div class="py-1 col-4 orange-18-bold text-right">{{pool.minContribution}} ETH</div>

                <div class="py-1 col-8 blue-18-reg">Individual Max:</div>
                <div class="py-1 col-4 orange-18-bold text-right">{{pool.maxContribution}} ETH</div>
              </div>
            </div>
          </div>
          <!--<div class="blue-18-bold pt-3 pl-3">Auto distribution</div>-->
          <!--<div class="row mx-0 pt-3">-->
          <!--<div class="col-12 col-lg-4 row">-->
          <!--<div class="col-12 orange-18-reg">18 day 22 hours 45 minutes</div>-->
          <!--<div class="col-6 pt-3 pt-lg-0 mx-0 row my-auto pt-2">-->
          <!--<div class="input-radio">-->
          <!--<input type="radio" name="exampleRadios" id="exampleRadios1"-->
          <!--value="option1" checked/>-->
          <!--<label for="exampleRadios1"></label>-->
          <!--</div>-->
          <!--<div class="pl-3 blue-18-reg">ON</div>-->
          <!--</div>-->
          <!--<div class="col-6 pt-3 pt-lg-0 mx-0 row my-auto pt-2">-->
          <!--<div class="input-radio">-->
          <!--<input type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>-->
          <!--<label for="exampleRadios2"></label>-->
          <!--</div>-->
          <!--<div class="pl-3 blue-18-reg">OFF</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="col-12 col-lg-2 pt-4 pt-lg-0">-->
          <!--<div class="blue-18-bold text-center">Amount</div>-->
          <!--<div class="orange-24-bold text-center pt-2">85 ETH</div>-->
          <!--</div>-->
          <!--</div>-->
          <div class="row mx-0 pt-3">

          </div>
          <div class="row mx-0 pt-5">
            <div class="col-6 col-lg-2 orange-24-16-bold px-0 order-1"> Total filled</div>
            <div class="col-12 col-lg-4 pt-1 order-3 order-lg-2 px-0">
              <div class="w-100">
                <range-slider
                  class="slider w-100 pt-1"
                  min="0"
                  :max="pool.maxPoolAllocation"
                  :disabled="true"
                  :step="pool.minContribution"
                  v-model="pool.balance">
                </range-slider>
              </div>
            </div>
            <div class="col-6 col-lg-2
                orange-24-16-bold px-0 order-2 order-lg-3 text-right text-lg-left">
              {{pool.balance}}/{{pool.maxPoolAllocation}} ETH
            </div>
          </div>

          <hr class="blue-hr-fullw my-5">

          <div class="d-flex flex-row flex-wrap">
            <div>
              <div class="o-border d-inline"></div>
              <div class="d-inline mt-5 blue-36-20-bold"> Advanced details
                <hr align="left" class="blue-hr-2">
              </div>
            </div>
            <div class="mx-3 mt-sm-3">
              <button class="btn white-submit px-4 mr-3" @click="showAdvancedDetails = !showAdvancedDetails">
                {{ showAdvancedDetails ? 'Hide' : 'Show'}}
              </button>
            </div>
          </div>

          <div class="row pt-4">
            <pool :pool="this.pool"
                  :disabled="true"
                  v-if="pool && showAdvancedDetails"
            />
          </div>

          <hr class="blue-hr-fullw my-5">

          <div class="o-border d-inline "></div>
          <div class="d-inline blue-36-20-bold"> Contributions
            <hr align="left" class="blue-hr-2">
          </div>
          <div class="row pt-4">
            <div class="col-1 d-none d-lg-flex"></div>
            <div class="col-12 col-lg-5 pt-1 pl-3">
              <div class="pl-3 px-0">
                <div class="d-lg-inline-block orange-18-bold pr-2 px-0">Amount in ETH:</div>
                <div class="d-lg-inline-block blue-18-reg px-0">
                  <input type="number" v-validate="'required|numeric|min_value:0'"
                         step="0.000001"
                         class="form-control input-text w-100" data-vv-name="Amount"
                         v-model="amount">
                </div>
              </div>
            </div>
            <!--<div class="col-12 col-lg-6 pl-5 row">-->
              <!--<div class="col-12 col-lg-6 row pt-4 pt-lg-0" v-for="contribution in contributions">-->
                <!--<div class="col-6 blue-18-reg">Tx1</div>-->
                <!--<div class="col-6 orange-18-bold">1000</div>-->

                <!--<div class="col-6 blue-18-reg">TxHash</div>-->
                <!--<div class="col-6 orange-18-bold">1000</div>-->

                <!--<div class="col-6 blue-18-reg">Amount</div>-->
                <!--<div class="col-6 orange-18-bold">{{contribution.amount.c[0] / 10000}}</div>-->
              <!--</div>-->
            <!--</div>-->
          </div>
          <div class="row mt-5">
            <div class="d-flex row justify-content-center w-100 py-5">
              <div class="text-center text-lg-right mx-2">
                <button class="btn px-4 blue-submit" @click="contribute">Deposit ETH</button>
              </div>

              <div class="text-center text-lg-left mx-2">
                <button class="btn px-4 blue-submit" @click="withdraw">Withdraw ETH</button>
              </div>

              <div class="text-center text-lg-left mx-2">
                <button class="btn px-4 white-submit" @click="withdrawTokens">Withdraw tokens</button>
              </div>

              <div class="text-center text-lg-left mx-2">
                <button class="btn px-4 white-submit" @click="withdrawRefund">Withdraw refund</button>
              </div>
            </div>
            <div class="d-flex flex-row justify-content-center col-12 col-lg-6 mx-auto pb-5">
              <input type="text" v-validate="'required|eth-address'" data-vv-name="Custom token"
                     class="form-control input-text w-100 mx-2"
                     v-model="customToken" placeholder="Custom token"/>
              <button class="btn px-4 blue-submit text-lg-center mx-2" @click="withdrawCustomToken">Withdraw custom token</button>
            </div>
          </div>


        </div>
        <div class="col-1"></div>
      </div>
    </div>
    <div class="d-none d-sm-flex col-1"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RangeSlider from 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';
import LocalPool from '../model/LocalPool';
import Pool from '../components/Pool.vue';

export default {
  data: () => ({
    address: '',
    pool: null,
    sliderTotalFilled: 20,
    amount: 0.000001,
    showAdvancedDetails: false,
    customToken: '',
    contributions: [],
  }),
  components: {
    RangeSlider,
    Pool,
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
        await this.fetchContributions();
      } else {
        this.$notify({
          type: 'error',
          title: 'Not found!',
          text: 'Pool not found by the given address!',
        });
      }
    },
    async fetchContributions() {
      this.contributions = await this.connectICO.pool.getContributionsByContributor(this.address, this.connectICO.account);
    },
    async contribute() {
      try {
        await this.connectICO.pool.contribute(this.address, this.amount);
        this.$notify({
          type: 'success',
          title: 'Successful deposit!',
          text: `${this.amount} ETH`,
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async withdraw() {
      try {
        await this.connectICO.pool.withdraw(this.address, this.amount);
        this.$notify({
          type: 'success',
          title: 'Successful withdraw!',
          text: `${this.amount} ETH`,
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async withdrawTokens() {
      try {
        await this.connectICO.pool.withdrawToken(this.address);
        this.$notify({
          type: 'success',
          text: 'Tokens successfully withdrawn!',
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async withdrawRefund() {
      try {
        await this.connectICO.pool.withdrawRefund(this.address);
        this.$notify({
          type: 'success',
          text: 'Refund successfully withdrawn!',
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async withdrawCustomToken() {
      try {
        await this.connectICO.pool.withdrawCustomToken(this.address, this.customToken);
        this.$notify({
          type: 'success',
          text: 'Token successfully withdrawn!',
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
  },
  mounted() {
    if (this.$route.params.address) {
      this.address = this.$route.params.address;
      this.search();
    }
  },
};
</script>

<style lang="scss">
  @import '../scss/mixins';

  .worldmap {
    position: absolute;
    @include breakpoint(md) {
      position: relative;
      width: 100%;
    }
  }

</style>
