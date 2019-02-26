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
            <div class="col-12 col-lg-6 pt-3">
              <div class="blue-18-bold">Parameters</div>
              <div class="row pt-3">
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

          <div class="d-flex flex-row mt-5 flex-wrap">
              <div class="col-12 col-lg-3 blue-18-reg mb-1">Pool Country blacklist:</div>
              <div class="col-12 col-lg-9">{{ blacklistedCountriesText }}</div>
          </div>

          <div class="d-flex flex-row mt-3 flex-wrap">
            <div class="col-12 col-lg-3 blue-18-reg mb-1">Time until end of sale:</div>
            <div class="col-12 col-lg-9">
              <countdown :time="timeUntilSaleEnd" :interval="1000" tag="p">
                <template slot-scope="props">{{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes, {{ props.seconds }} seconds. </template>
              </countdown>
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
          <div class="d-inline blue-36-20-bold"> Automations
            <hr align="left" class="blue-hr-2">
          </div>

          <div class="d-flex flex-row align-items-center mb-3">
            <div class="col-12 col-md-4 d-flex justify-content-end">
              <div class="d-lg-inline-block orange-18-bold pr-2 px-0">Auto token withdraw order GAS Price in GWEI:</div>
            </div>

            <div class="col-12 col-md-8 d-flex flex-row align-items-center">
              <div class="col-12 col-md-8">
                <input type="number" v-validate="`required|decimal|min_value:1`"
                       step="0.000001"
                       class="form-control input-text w-100" data-vv-name="Gwei amount"
                       v-model="autoTokenWithDrawGweiValue">
                <span v-if="errors.has('Gwei amount')" v-text="errors.first('Gwei amount')" class="text-danger"></span>
              </div>

              <button class="btn px-4 blue-submit btn-block" @click="addPushOutToken">Add auto push out tokens</button>
            </div>
          </div>

          <hr class="blue-hr-fullw my-5">

          <div class="o-border d-inline "></div>
          <div class="d-inline blue-36-20-bold"> Contributions
            <hr align="left" class="blue-hr-2">
          </div>

          <div class="d-flex flex-row align-items-center mb-3">
            <div class="col-12 col-md-4 d-flex justify-content-end">
              <div class="d-lg-inline-block orange-18-bold pr-2 px-0">Deposit Amount in ETH:</div>
            </div>

            <div class="col-12 col-md-8 d-flex flex-row align-items-center">
              <div class="col-12 col-md-8">
                <input type="number" v-validate="`required|decimal|max-deposit`"
                       step="0.000001"
                       class="form-control input-text w-100" data-vv-name="Deposit amount"
                       v-model="depositAmount">
                <span v-if="errors.has('Deposit amount')" v-text="errors.first('Deposit amount')" class="text-danger"></span>
              </div>

              <button class="btn px-4 blue-submit btn-block" @click="contribute">Deposit ETH</button>
            </div>
          </div>

          <div class="d-flex flex-row align-items-center mb-3">
            <div class="col-12 col-md-4 d-flex justify-content-end">
              <div class="d-lg-inline-block orange-18-bold pr-2 px-0">Withdraw Amount in ETH:</div>
            </div>

            <div class="col-12 col-md-8 d-flex flex-row align-items-center">
              <div class="col-12 col-md-8">
                <input type="number" v-validate="`required|max-withdraw`"
                       step="0.000001"
                       class="form-control input-text w-100" data-vv-name="Withdraw amount"
                       v-model="withdrawAmount">
                <span v-if="errors.has('Withdraw amount')" v-text="errors.first('Withdraw amount')" class="text-danger"></span>
              </div>

              <button class="btn px-4 blue-submit btn-block" @click="withdraw">Withdraw ETH</button>
            </div>
          </div>

          <div class="row mt-5">
            <div class="d-flex row justify-content-center w-100 py-5">
              <div class="text-center text-lg-left mx-2">
                <button class="btn px-4 white-submit" @click="withdrawTokens" :disabled="!withdrawTokensAvailable">Withdraw tokens</button>
              </div>


              <div class="text-center text-lg-left mx-2">
                <button class="btn px-4 white-submit" @click="withdrawRefund" :disabled="!withDrawRefundAvailable">Withdraw refund</button>
              </div>
            </div>
            <div class="d-flex flex-row justify-content-center col-12 col-lg-6 mx-auto pb-5">
              <input type="text"
                     v-validate="'required|eth-address'"
                     data-vv-name="Custom token"
                     class="form-control input-text w-100 mx-2"
                     v-model="customToken" placeholder="Custom token"
                     :disabled="!withdrawCustomTokenAvailable"/>
              <button class="btn px-4 blue-submit text-lg-center mx-2" @click="withdrawCustomToken" :disabled="!withdrawCustomTokenAvailable">Withdraw custom token</button>
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
import Web3 from 'web3';
import moment from 'moment';
import LocalPool from '../model/LocalPool';
import Pool from '../components/Pool.vue';
import mewLinkBuilder from '../utils/mewLinkBuilder';
import openMewUrl from '../utils/openMewUrl';

export default {
  components: {
    RangeSlider,
    Pool,
  },
  data: () => ({
    datepickerOptions: {
      format: 'DD/MM/YYYY H:mm',
      useCurrent: false,
      sideBySide: true,
    },
    address: '',
    pool: null,
    sliderTotalFilled: 20,
    depositAmount: 0.000001,
    withdrawAmount: 0.000001,
    showAdvancedDetails: false,
    customToken: '',
    contributions: [],
    blacklistedCountries: [],
    withDrawRefundAvailable: false,
    withdrawTokensAvailable: false,
    withdrawCustomTokenAvailable: false,
    userContribution: 0,
    userMaxDeposit: 0,
    autoTokenWithDrawDate: '',
    autoTokenWithDrawGweiValue: 0,
  }),
  computed: {
    ...mapGetters([
      'connectICO',
      'mode',
    ]),
    blacklistedCountriesText() {
      return this.blacklistedCountries.join(', ');
    },
    timeUntilSaleEnd() {
      if (this.pool && this.pool.saleEndDate) {
        return moment(this.pool.saleEndDate, 'DD/MM/YYYY HH:mm:ss').diff(moment(moment(), 'DD/MM/YYYY HH:mm:ss'));
      }

      return 0;
    },
  },
  methods: {
    async initCountryData() {
      this.blacklistedCountries = await this.connectICO.pool.getKycCountryBlacklist(this.address);
    },
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
      const isValid = await this.$validator.validate('Deposit amount', this.depositAmount);

      if (!isValid) {
        return;
      }

      try {
        const response = await this.connectICO.pool.contribute(this.address, this.depositAmount);
        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            title: 'Successful deposit!',
            text: `${this.depositAmount} ETH`,
          });
        } else if (this.mode === 'mew') {
          const url = mewLinkBuilder(
            this.connectICO.pool.pool.address,
            response,
            this.depositAmount,
            await window.web3.eth.net.getNetworkType(),
          );
          openMewUrl(url);
        }
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async withdraw() {
      const isValid = await this.$validator.validate('Withdraw amount', this.withdrawAmount);

      if (!isValid) {
        return;
      }

      try {
        const response = await this.connectICO.pool.withdraw(this.address, this.withdrawAmount);
        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            title: 'Successful withdraw!',
            text: `${this.withdrawAmount} ETH`,
          });
        } else if (this.mode === 'mew') {
          const url = mewLinkBuilder(
            this.connectICO.pool.pool.address,
            response,
            this.withdrawAmount,
            await window.web3.eth.net.getNetworkType(),
          );
          openMewUrl(url);
        }
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async withdrawTokens() {
      try {
        const response = await this.connectICO.pool.withdrawToken(this.address);
        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Tokens successfully withdrawn!',
          });
        } else if (this.mode === 'mew') {
          const url = mewLinkBuilder(
            this.connectICO.pool.pool.address,
            response,
            0,
            await window.web3.eth.net.getNetworkType(),
          );
          openMewUrl(url);
        }
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async withdrawRefund() {
      try {
        const response = await this.connectICO.pool.withdrawRefund(this.address);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Refund successfully withdrawn!',
          });
        } else if (this.mode === 'mew') {
          const url = mewLinkBuilder(
            this.connectICO.pool.pool.address,
            response,
            0,
            await window.web3.eth.net.getNetworkType(),
          );
          openMewUrl(url);
        }
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async withdrawCustomToken() {
      try {
        const response = await this.connectICO.pool.withdrawCustomToken(this.address, this.customToken);
        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Token successfully withdrawn!',
          });
        } else if (this.mode === 'mew') {
          const url = mewLinkBuilder(
            this.connectICO.pool.pool.address,
            response,
            0,
            await window.web3.eth.net.getNetworkType(),
          );
          openMewUrl(url);
        }
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async initWithdrawCustomTokenAvailable() {
      const isSentToSale = await this.connectICO.pool.isSentToSale(this.address);

      this.withdrawCustomTokenAvailable = isSentToSale;
    },
    async initWithdrawTokensAvailable() {
      const isSentToSale = await this.connectICO.pool.isSentToSale(this.address);

      this.withdrawTokensAvailable = isSentToSale;
    },
    async checkWithDrawRefundAvailable() {
      const isSentToSale = await this.connectICO.pool.isSentToSale(this.address);

      if (isSentToSale) {
        const poolBalance = this.connectICO.pool.getPoolBalance(this.address);
        const creatorStash = this.connectICO.pool.getCreatorStash(this.address);
        const providerStash = this.connectICO.pool.getProviderStash(this.address);

        if (poolBalance > (creatorStash + providerStash)) {
          return true;
        }
      }
      return false;
    },
    async initWithDrawRefundAvailable() {
      this.withDrawRefundAvailable = await this.checkWithDrawRefundAvailable();
    },
    async initUserContributions() {
      try {
        let userContribution = await this.connectICO.pool.getGrossContributionByContributor(this.address, this.connectICO.account);

        userContribution /= 1000000000000000000;

        this.userContribution = userContribution;
        this.userMaxDeposit = parseFloat(this.pool.maxContribution) - parseFloat(userContribution);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async addPushOutToken() {
      try {
        const gasPrice = Web3.utils.toWei(Web3.toBigNumber(this.autoTokenWithDrawGweiValue), 'gwei');
        const response = await this.connectICO.automations.addPushOutToken(this.address, this.connectICO.account, gasPrice);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Auto push out tokens successfully added!',
          });
        } else if (this.mode === 'mew') {
          const gasCost = await this.connectICO.automations.getPushGasCost();
          const value = gasPrice * gasCost;
          const url = mewLinkBuilder(this.address, response, value, await window.web3.eth.net.getNetworkType());
          openMewUrl(url);
        }

        console.log(response);
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
      this.initCountryData();
      this.initWithdrawTokensAvailable();
      this.initWithDrawRefundAvailable();
    }
  },
  beforeUpdate() {
    this.initUserContributions();

    this.$validator.extend('max-deposit', {
      getMessage: field => `The ${field} must between ${this.pool.minContribution} and ${this.userMaxDeposit}.`,
      validate: value => value >= this.pool.minContribution && value <= this.userMaxDeposit,
    }, {
      immediate: false,
    });

    this.$validator.extend('max-withdraw', {
      getMessage: field => `The ${field} must bigger than 0 and lesser or equal ${this.userContribution}.`,
      validate: value => value > 0 && value <= (this.userContribution - this.pool.minContribution),
    }, {
      immediate: false,
    });
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
