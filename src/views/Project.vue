<template>
  <div class="container">
    <div v-if="pool">
      <section class="mb-4">
        <div class="d-none d-sm-block mt-5 blue-36-20-bold">{{pool.poolAddress}}</div>

        <hr align="left" class="d-none d-sm-block blue-hr">

        <div class="d-sm-none mobile-back row mx-0">
          <div class="my-auto pl-3"><img src="../assets/chevron-left.png" alt=""></div>
          <div class="white-16-bold my-auto">Project Name</div>
        </div>

        <router-link class="btn blue-submit px-4 mr-3" :to="{name: 'project.edit', params: {address: pool.poolAddress}}" v-if="pool && pool.creator === connectICO.account">
          Edit pool
        </router-link>
      </section>

      <section class="mb-4">
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
      </section>

      <section class="mb-4">
        <div class="o-border d-inline "></div>

        <div class="d-inline blue-36-20-bold"> Deal Details
          <hr align="left" class="blue-hr-2">
        </div>

          <div class="row mx-0 mb-4">
            <div class="col-12 col-lg-6">
                <div class="blue-18-bold mb-4">Parameters</div>

                <div>
                    <div class="orange-24-16-bold d-flex justify-content-between">
                        <span class="blue-18-reg">Fee</span>
                        <span class="orange-18-bold text-right">{{pool.creatorFeeRate}} %</span>
                    </div>

                    <div class="orange-24-16-bold d-flex justify-content-between">
                        <span class="blue-18-reg">ConnectICO Fee</span>
                        <span class="orange-18-bold text-right">{{pool.providerFeeRate}} %</span>
                    </div>

                    <div class="orange-24-16-bold d-flex justify-content-between">
                        <span class="blue-18-reg">Individual Min</span>
                        <span class="orange-18-bold text-right">{{pool.minContribution}} ETH</span>
                    </div>

                    <div class="orange-24-16-bold d-flex justify-content-between">
                        <span class="blue-18-reg">Individual Max:</span>
                        <span class="orange-18-bold text-right">{{pool.maxContribution}} ETH</span>
                    </div>

                    <div class="orange-24-16-bold d-flex justify-content-between">
                        <span class="blue-18-reg">Min pool goal:</span>
                        <span class="orange-18-bold text-right">{{pool.minPoolGoal}} ETH</span>
                    </div>

                    <div class="orange-24-16-bold d-flex justify-content-between">
                        <span class="blue-18-reg">Max allocation:</span>
                        <span class="orange-18-bold text-right">{{pool.maxPoolAllocation}} ETH</span>
                    </div>

                    <div class="orange-24-16-bold d-flex justify-content-between">
                        <span class="blue-18-reg">Tokens Confirmed:</span>
                        <span class="orange-18-bold text-right">
                            <i class="fa fa-check" v-if="tokensConfirmed"></i>
                            <i class="fa fa-times" v-if="!tokensConfirmed"></i>
                        </span>
                    </div>

                    <div class="orange-24-16-bold d-flex justify-content-between" v-if="tokensConfirmed">
                        <span class="blue-18-reg">Pool Tokens:</span>
                        <span class="orange-18-bold text-right">
                            {{ tokenBalance }} {{ tokenSymbol }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mx-0 mb-4">
            <div class="col-12 col-lg-12">
                <div class="orange-24-16-bold d-flex justify-content-between">
                    <span>Total filled</span>
                    <span>{{pool.allGrossContributions}}/{{pool.maxPoolAllocation}} ETH</span>
                </div>

                <div class="pt-1 px-0">
                    <range-slider
                            class="slider w-100 p-0"
                            min="0"
                            :max="pool.maxPoolAllocation"
                            :disabled="true"
                            step="0.0000001"
                            v-model="pool.allGrossContributions">
                    </range-slider>
                </div>
            </div>
        </div>

        <div class="row mx-0 mb-4">
          <div class="col-12 col-lg-3 blue-18-reg mb-1">Pool Country blacklist:</div>
          <div class="col-12 col-lg-9">{{ blacklistedCountriesText }}</div>
        </div>

        <div class="row mx-0 mb-4">
          <div class="col-12 col-lg-3 blue-18-reg mb-1">Time until end of sale:</div>
          <div class="col-12 col-lg-9">
            <countdown :time="timeUntilSaleEnd" :interval="1000" tag="p">
              <template slot-scope="props">{{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes, {{ props.seconds }} seconds. </template>
            </countdown>
          </div>
        </div>

        <hr class="blue-hr-fullw my-5">
      </section>

      <section class="mb-4">
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

        <div class="" v-if="pool && showAdvancedDetails">
          <pool :pool="this.pool" :disabled="true" />
        </div>

        <hr class="blue-hr-fullw my-5">
      </section>

      <section class="mb-4">
        <div class="o-border d-inline "></div>
        <div class="d-inline blue-36-20-bold"> Automations
          <hr align="left" class="blue-hr-2">
        </div>

        <div class="row mx-0">
          <div class="col-12 col-lg-4 mb-2 mb-lg-0">
            <span class="orange-18-bold">Auto token withdraw order GAS Price in GWEI:</span>
          </div>

          <div class="col-12 col-lg-4 mb-2 mb-lg-0">
            <input type="number" v-validate="`required|decimal|min_value:1`"
                   step="0.000001"
                   class="form-control input-text w-100" data-vv-name="Gwei amount"
                   v-model="autoTokenWithDrawGweiValue">
            <span v-if="errors.has('Gwei amount')" v-text="errors.first('Gwei amount')" class="text-danger"></span>
          </div>

          <div class="col-12 col-lg-4 mb-2 mb-lg-0">
            <button class="btn blue-submit btn-block" @click="addPushOutToken" :disabled="pool.isStopped">
              Add auto push out tokens
            </button>
          </div>
        </div>

        <hr class="blue-hr-fullw mb-5">
      </section>

      <section class="mb-4">
        <div class="o-border d-inline "></div>
        <div class="d-inline blue-36-20-bold">
            Contributions
            <hr align="left" class="blue-hr-2">
        </div>

        <div class="mb-4">
            <div class="row mx-0 mb-3">
                <div class="col-12 col-lg-6 mb-2 mb-lg-0">
                    <span class="orange-18-bold">Deposit Amount in ETH:</span>
                </div>

                <div class="col-12 col-lg-3 mb-2 mb-lg-0">
                    <input type="number" v-validate="`required|decimal|max-deposit`"
                           min="0"
                           step="0.000001"
                           class="form-control input-text w-100" data-vv-name="Deposit amount"
                           v-model="depositAmount"
                           :disabled="pool.isStopped || pool.isSentToSale">
                    <span v-if="errors.has('Deposit amount')" v-text="errors.first('Deposit amount')" class="text-danger"></span>
                </div>

                <div class="col-12 col-lg-3 mb-2 mb-lg-0">
                    <button class="btn px-4 blue-submit btn-block" @click="contribute" :disabled="pool.isStopped || pool.isSentToSale">
                        Deposit ETH
                    </button>
                </div>
            </div>

            <div class="row mx-0 mb-3">
                <div class="col-12 col-lg-6 mb-2 mb-lg-0">
                    <span class="orange-18-bold">Withdraw Amount in ETH:</span>
                </div>

                <div class="col-12 col-lg-3 mb-2 mb-lg-0">
                    <input type="number" v-validate="`required|max-withdraw`"
                           min="0"
                           step="0.000001"
                           class="form-control input-text w-100" data-vv-name="Withdraw amount"
                           v-model="withdrawAmount"
                           :disabled="!pool.isStopped && pool.isSentToSale">
                    <span v-if="errors.has('Withdraw amount')" v-text="errors.first('Withdraw amount')" class="text-danger"></span>
                </div>

                <div class="col-12 col-lg-3 mb-2 mb-lg-0">
                    <button class="btn px-4 blue-submit btn-block" @click="withdraw" :disabled="!pool.isStopped && pool.isSentToSale">
                        Withdraw ETH
                    </button>
                </div>
            </div>

            <div class="row mx-0 mb-3">
                <div class="col-12 col-lg-6 mb-2 mb-lg-0">
                    <span class="orange-18-bold">Withdraw all ETH:</span>
                </div>

                <div class="col-12 col-lg-6 mb-2 mb-lg-0">
                    <button class="btn px-4 blue-submit btn-block" @click="withdrawAll" :disabled="(!pool.isStopped && pool.isSentToSale) || !(parseFloat(userContribution) > 0)">
                        Withdraw all ETH
                    </button>
                </div>
            </div>
        </div>

        <div>
            <div class="row mx-0 mb-3">
                <div class="col-12 col-lg-6 mb-2 mb-lg-0">
                    <span class="orange-18-bold">Available tokens to withdraw: {{ userTokens }} {{ tokenSymbol }}</span>
                </div>
            </div>

            <div class="row mx-0 mb-3">
                <div class="col-12 col-lg-6 mb-2 mb-lg-0">
                    <button class="btn btn-block px-4 white-submit" @click="withdrawTokens" :disabled="!pool.isSentToSale">
                        Withdraw tokens
                    </button>
                </div>

                <div class="col-12 col-lg-6 mb-2 mb-lg-0">
                    <button class="btn btn-block px-4 white-submit" @click="withdrawRefund" :disabled="!withDrawRefundAvailable">
                        Withdraw refund
                    </button>
                </div>
            </div>
        </div>

        <div>
            <div class="row mx-0 mb-3">
                <div class="col-12 col-lg-6 mb-2 mb-lg-0">
                    <input type="text"
                           v-validate="'required|eth-address'"
                           data-vv-name="Custom token"
                           class="form-control input-text w-100"
                           v-model="customToken" placeholder="Custom token"
                           :disabled="!pool.isSentToSale"/>
                </div>

                <div class="col-12 col-lg-6 mb-2 mb-lg-0">
                    <button class="btn btn-block px-4 blue-submit text-lg-center" @click="withdrawCustomToken" :disabled="!pool.isSentToSale">
                        Withdraw custom token
                    </button>
                </div>
            </div>
        </div>

        <hr class="blue-hr-fullw my-5">
      </section>
    </div>
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
    depositAmount: 0.000001,
    withdrawAmount: 0.000001,
    showAdvancedDetails: false,
    customToken: '',
    blacklistedCountries: [],
    withDrawRefundAvailable: false,
    userContribution: 0,
    userMaxDeposit: 0,
    autoTokenWithDrawDate: '',
    autoTokenWithDrawGweiValue: 0,
    tokensConfirmed: false,
    tokenSymbol: '',
    tokenBalance: 0,
    userTokens: 0,
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
    async initWithDrawRefundAvailable() {
      this.withDrawRefundAvailable = await this.checkWithDrawRefundAvailable();
    },
    async initUserContributions() {
      const userContribution = await this.connectICO.pool.getGrossContributionByContributor(this.address, this.connectICO.account);

      this.userContribution = Web3.utils.fromWei((userContribution).toString(), 'ether');
    },
    async initTokens() {
      this.tokensConfirmed = await this.connectICO.pool.areTokensReceivedConfirmed(this.address);

      if (this.tokensConfirmed) {
        this.tokenSymbol = await this.connectICO.erc.getSymbol(this.pool.tokenAddress);
        this.tokenBalance = await this.connectICO.erc.getBalance(this.pool.tokenAddress, this.address);
        this.userTokens = await this.connectICO.pool.getTokensOwedToContributor(this.address, this.connectICO.account);
      }
    },
    async loadPool() {
      try {
        await this.connectICO.pool.pool.at(this.address);
        this.pool = new LocalPool(this.address);
      } catch (e) {
        this.$notify({
          type: 'error',
          title: 'Not found!',
          text: 'Pool not found by the given address!',
          duration: -1,
        });

        console.log(e);
      }
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
            duration: -1,
          });
        } else if (this.mode === 'mew') {
          const network = await window.web3.eth.net.getNetworkType();
          const to = this.address;

          const url = mewLinkBuilder(
            to,
            response.callData,
            this.depositAmount,
            network,
            response.gasLimit,
          );
          openMewUrl(url);
        }
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: -1,
        });

        console.log(e);
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
            duration: -1,
          });
        }

        if (this.mode === 'mew') {
          const url = mewLinkBuilder(
            this.address,
            response.callData,
            this.withdrawAmount,
            await window.web3.eth.net.getNetworkType(),
            response.gasLimit,
          );
          openMewUrl(url);
        }

        this.loadPool();
        this.initUserContributions();
        this.initWithDrawRefundAvailable();
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: -1,
        });

        console.log(e);
      }
    },
    async withdrawAll() {
      try {
        const response = await this.connectICO.pool.withdraw(this.address, 0);
        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            title: 'All your ETH Successfully withdrawn!',
            duration: -1,
          });
        }

        if (this.mode === 'mew') {
          const url = mewLinkBuilder(
            this.address,
            response.callData,
            this.withdrawAmount,
            await window.web3.eth.net.getNetworkType(),
            response.gasLimit,
          );
          openMewUrl(url);
        }

        this.loadPool();
        this.initUserContributions();
        this.initWithDrawRefundAvailable();
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: -1,
        });

        console.log(e);
      }
    },
    async withdrawTokens() {
      try {
        const response = await this.connectICO.pool.withdrawToken(this.address);
        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Tokens successfully withdrawn!',
            duration: -1,
          });
        } else if (this.mode === 'mew') {
          const url = mewLinkBuilder(
            this.address,
            response.callData,
            0,
            await window.web3.eth.net.getNetworkType(),
            response.gasLimit,
          );
          openMewUrl(url);
        }
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: -1,
        });

        console.log(e);
      }
    },
    async withdrawRefund() {
      try {
        const response = await this.connectICO.pool.withdrawRefund(this.address);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Refund successfully withdrawn!',
            duration: -1,
          });
        } else if (this.mode === 'mew') {
          const url = mewLinkBuilder(
            this.address,
            response.callData,
            0,
            await window.web3.eth.net.getNetworkType(),
            response.gasLimit,
          );
          openMewUrl(url);
        }
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: -1,
        });

        console.log(e);
      }
    },
    async withdrawCustomToken() {
      try {
        const response = await this.connectICO.pool.withdrawCustomToken(this.address, this.customToken);
        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Token successfully withdrawn!',
            duration: -1,
          });
        } else if (this.mode === 'mew') {
          const url = mewLinkBuilder(
            this.address,
            response.callData,
            0,
            await window.web3.eth.net.getNetworkType(),
            response.gasLimit,
          );
          openMewUrl(url);
        }
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: -1,
        });

        console.log(e);
      }
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
    async addPushOutToken() {
      try {
        const gasPrice = Web3.utils.toWei((this.autoTokenWithDrawGweiValue).toString(), 'gwei');
        const response = await this.connectICO.automations.addPushOutToken(this.address, this.connectICO.account, gasPrice);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Auto push out tokens successfully added!',
            duration: -1,
          });
        } else if (this.mode === 'mew') {
          const gasCost = await this.connectICO.automations.getPushGasCost();
          const value = gasPrice * gasCost;
          const url = mewLinkBuilder(
            this.address,
            response.callData,
            value,
            await window.web3.eth.net.getNetworkType(),
            response.gasLimit,
          );
          openMewUrl(url);
        }

        console.log(response);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: -1,
        });

        console.log(e);
      }
    },
  },
  mounted() {
    if (this.$route.params.address) {
      this.address = this.$route.params.address;
      this.loadPool();
      this.initUserContributions();
      this.initCountryData();
      this.initWithDrawRefundAvailable();
      this.initTokens();

      const self = this;

      this.connectICO.pool.watchContributionEvents(this.address, null, () => {
        self.loadPool();
        self.initUserContributions();
        self.initWithDrawRefundAvailable();
      });
    }
  },
  beforeUpdate() {
    this.$validator.extend('max-deposit', {
      getMessage: (field) => {
        if (this.userContribution === this.pool.maxContribution && this.pool.maxContribution > 0) {
          return 'You reached the maximum contribution';
        }

        if (this.pool.maxContribution > 0) {
          return `The ${field} must between ${this.pool.minContribution} and ${(parseFloat(this.pool.maxContribution) - parseFloat(this.userContribution))}.`;
        }

        if (this.pool.maxPoolAllocation > 0) {
          return `The ${field} must between ${this.pool.minContribution} and ${parseFloat(this.pool.maxPoolAllocation)}.`;
        }

        return `The ${field} must bigger than ${this.pool.minContribution}`;
      },
      validate: (value) => {
        if (this.userContribution === this.pool.maxContribution && this.pool.maxContribution > 0) {
          return false;
        }

        if (this.pool.maxContribution > 0) {
          return value > 0 && value >= this.pool.minContribution && value <= (parseFloat(this.pool.maxContribution) - parseFloat(this.userContribution));
        }

        if (this.pool.maxPoolAllocation > 0) {
          return value > 0 && value >= this.pool.minContribution && value <= parseFloat(this.pool.maxPoolAllocation);
        }

        return value > 0 && value >= this.pool.minContribution;
      },
    }, {
      immediate: false,
    });

    this.$validator.extend('max-withdraw', {
      getMessage: (field) => {
        if (this.pool.isStopped) {
          return `The ${field} must bigger than 0 and lesser or equal ${this.userContribution}.`;
        }
        if (this.userContribution > 0) {
          return `The ${field} must bigger than 0 and lesser or equal ${this.userContribution - this.pool.minContribution}.`;
        }

        return 'You must deposit ETH first if you want a withdraw';
      },
      validate: (value) => {
        if (this.pool.isStopped) {
          return value > 0 && value <= this.userContribution;
        }

        if (this.userContribution > 0) {
          return value > 0 && value <= (this.userContribution - this.pool.minContribution);
        }

        return value > 0 && value <= 0;
      },
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
