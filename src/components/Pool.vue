<template>
  <div>
    <div class="w-100 mb-4 mb-md-5" v-if="!disabled">
      <div class="container d-none d-sm-block mt-5">
        <div class="blue-36-20-bold">{{pool.poolAddress}}</div>
        <hr align="left" class="d-none d-sm-block blue-hr">
      </div>

      <div class="d-sm-none mobile-back d-flex flex-row">
        <div class="d-flex justify-content-center align-items-center ml-3"><img src="../assets/chevron-left.png" alt="">
        </div>
        <div class="white-16-bold ml-2">{{pool.poolAddress}}</div>
      </div>
    </div>

    <div class="container d-flex flex-column mb-5">
      <div class="d-flex flex-column ml-sm-5">
        <div>
          <div class="o-border d-inline"></div>
          <div class="d-inline blue-36-20-bold"> Creator
            <hr align="left" class="blue-hr-2">
          </div>
        </div>

        <div class="d-flex flex-column col-12">
          <div class="blue-24-16-bold py-3 pl-4"> Sale ETH address:</div>
          <input type="text" v-validate="'required|eth-address'" data-vv-name="Sale ETH address"
                 class="form-control input-text"
                 :disabled="disabled"
                 v-model="pool.saleAddress" placeholder="Sale ETH address"/>
        </div>

        <div class="d-flex flex-column col-12">
          <div class="blue-24-16-bold py-3 pl-4"> Token address (optional):</div>
          <input type="text" v-validate="'eth-address'" data-vv-name="Sale ETH address"
                 class="form-control input-text"
                 :disabled="disabled"
                 v-model="pool.tokenAddress" placeholder="Token ETH address"/>
        </div>
      </div>

      <hr class="blue-hr-fullw my-5 w-100">

      <div class="d-flex flex-column ml-sm-5 mt-3">
        <div class="d-flex flex-row flex-wrap">
          <div>
            <div class="o-border d-inline"></div>
            <div class="d-inline mt-5 blue-36-20-bold"> Function signatures
              <hr align="left" class="blue-hr-2">
            </div>
          </div>
          <div class="mx-3 mt-sm-3">
            <button class="btn white-submit px-4 mr-3" @click="showFuncSig = !showFuncSig">{{ showFuncSig ? 'Hide' :
              'Show'}}
            </button>
          </div>
        </div>
        <div class="d-flex flex-row flex-wrap" v-if="showFuncSig">
          <div class="col-12 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-4 blue-18-reg">Sale Participate Function Sig:</div>
            <div class="col-12 col-lg-8">
              <input type="text"
                     class="form-control input-text"
                     :disabled="true"
                     v-model="pool.saleWithdrawFunctionSig" placeholder="pay()"/>
            </div>
          </div>

          <div class="col-12 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-4 blue-18-reg">Sale Withdraw Function Sig:</div>
            <div class="col-12 col-lg-8">
              <input type="text"
                     class="form-control input-text"
                     :disabled="true"
                     v-model="pool.saleWithdrawFunctionSig" placeholder="withdraw()"/>
            </div>
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
            <div class="col-12 col-lg-6 blue-18-reg">Description:</div>
            <div class="col-12 col-lg-6">
              <textarea
                class="form-control input-text w-100"
                :disabled="disabled"
                rows="4"
                v-model="pool.poolDescription"
                v-validate="'required'"
                data-vv-name="Description"
              />
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg"></div>
            <div class="col-12 col-lg-6"></div>
          </div>


          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Creator fee in %:</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'required|decimal|min_value:0|max_value:100'"
                     data-vv-name="Creator fee"
                     class="form-control input-text w-100"
                     :disabled="disabled"
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
                           class="form-control input-text w-100"
                           :disabled="disabled"
              ></date-picker>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Sale end date</div>
            <div class="col-12 col-lg-6">
              <date-picker v-model="pool.saleEndDate"
                           :config="datepickerOptions"
                           class="form-control input-text w-100"
                           :disabled="disabled"
              ></date-picker>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Minimum pool goal in ETH</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'required|decimal|min_value:0'"
                     step="0.000001"
                     class="form-control input-text w-100"
                     :disabled="disabled"
                     data-vv-name="Minimum pool goal"
                     v-model="pool.minPoolGoal">
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Max allocation in ETH</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'required|decimal|min_value:0'"
                     step="0.000001"
                     class="form-control input-text w-100"
                     :disabled="disabled"
                     data-vv-name="Max allocation"
                     v-model="pool.maxPoolAllocation">
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 d-flex flex-row align-items-center">
              <div class="input-cb mr-3">
                <input type="checkbox" :disabled="disabled" v-model="pool.whitelistPool" id="whitelistPool" name=""/>
                <label for="whitelistPool"></label>
              </div>
              <label class="blue-18-reg mb-0" for="whitelistPool">Whitelist pool</label>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Withdraw timelock</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'required|decimal|min_value:0'"
                     class="form-control input-text w-100"
                     :disabled="disabled"
                     data-vv-name="Withdraw time lock"
                     v-model="pool.withdrawTimelock">
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Minimum ETH contribution (optional)</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'decimal|min_value:0'" min="0"
                     step="0.000001"
                     class="form-control input-text w-100"
                     :disabled="disabled"
                     data-vv-name="Minimum contribution"
                     v-model="pool.minContribution"/>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Maximum ETH contribution (optional)</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'decimal|min_value:0'" min="0"
                     step="0.000001"
                     class="form-control input-text"
                     :disabled="disabled"
                     data-vv-name="Maximum contribution"
                     v-model="pool.maxContribution"/>
            </div>
          </div>

          <div class="d-flex flex-row justify-content-center my-5 w-100" v-if="!disabled">
            <button class="btn blue-submit px-4" @click="submit" :disabled="submitDisabled">
              Update
            </button>
          </div>

          <div class="col-12 d-flex flex-row mt-3 flex-wrap">
            <div class="col-12 col-lg-3 blue-18-reg mb-1">Pool Country blacklist:</div>
            <div class="col-12 col-lg-9">{{ blacklistedCountriesText }}</div>
          </div>

          <div class="col-12 d-flex flex-row mt-3 align-items-center flex-wrap" v-if="!disabled">
              <div class="col-12 col-md-6 mb-2 mb-lg-0">
                <country-select
                        multiple
                        v-model="countriesToAdd"
                        :options="selectableCountries"/>
              </div>

              <div class="col-12 col-md-3 d-flex flex-row flex-wrap">
                <button class="btn blue-submit px-4 w-100" @click="addToBlacklist">
                  Add to blacklist
                </button>
              </div>
          </div>

          <div class="col-12 d-flex flex-row mt-3 align-items-center flex-wrap" v-if="!disabled">
            <div class="col-12 col-md-6  mb-2 mb-lg-0">
              <country-select
                      multiple
                      v-model="countriesToRemove"
                      :options="blacklistedCountries"/>
            </div>

            <div class="col-12 col-md-3 d-flex flex-row flex-wrap">
              <button class="btn blue-submit px-4 w-100" @click="removeFromBlacklist">
                Remove from blacklist
              </button>
            </div>
          </div>

          <div class="col-12 d-flex flex-column mt-3 flex-wrap" v-if="!disabled && isCreator">
            <div class="row mx-0 mt-3">
              <div class="col-12 col-lg-3 blue-18-reg d-flex flex-row">
                <span>Admin address: </span>
              </div>
              <div class="col-12 col-lg-9 d-flex flex-row">
                <input type="text" v-validate="'required|eth-address'" data-vv-name="Admin address"
                       class="form-control input-text w-100"
                       v-model="newAdminAddress" placeholder="Admin address"/>
              </div>
            </div>
          </div>

          <div class="w-100 d-flex flex-row align-items-center mt-2 flex-wrap justify-content-center" v-if="!disabled && isCreator">
            <button class="btn white-submit px-4 mr-3" @click="addAdminAddress">
              Add address
            </button>
            <button class="btn white-submit px-4 mr-3" @click="removeAdminAddress">
              Remove address
            </button>
          </div>

          <div class="col-12 d-flex flex-column mt-3 flex-wrap" v-if="!disabled">
            <div class="row mx-0 mt-3">
              <div class="col-12 col-lg-3 blue-18-reg d-flex flex-row">
                <span>Whitelist addresses: </span>
              </div>
              <div class="d-flex flex-row col-12 col-lg-9">
                <input type="text" v-validate="'eth-address'" data-vv-name="Whitelist address"
                       class="form-control input-text w-100"
                       :disabled="disabled"
                       v-model="newWhitelistAddress" placeholder="Whitelist address"/>
              </div>
            </div>
          </div>

          <div class="w-100 d-flex flex-row align-items-center mt-2 flex-wrap justify-content-center" v-if="!disabled">
            <button class="btn white-submit px-4 mr-3" @click="addWhitelistAddress">
              Add address
            </button>
            <button class="btn white-submit px-4 mr-3" @click="removeWhitelistAddress">
              Remove address
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import datePicker from 'vue-bootstrap-datetimepicker';
import LocalPool from '../model/LocalPool';
import CountrySelect from './form/CountrySelect.vue';

export default {
  components: {
    datePicker,
    CountrySelect,
  },
  props: {
    pool: {
      type: LocalPool,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isCreator: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      datepickerOptions: {
        format: 'DD/MM/YYYY H:mm',
        useCurrent: false,
        sideBySide: true,
      },
      poolAddress: null,
      showFuncSig: false,
      selectableCountries: [],
      blacklistedCountries: [],
      countriesToAdd: [],
      countriesToRemove: [],
      newAdminAddress: '',
      newWhitelistAddress: '',
    };
  },
  mounted() {
    this.initCountryData();
  },
  computed: {
    submitDisabled() {
      return !window.ethInitSuccess;
    },
    ...mapGetters([
      'connectICO',
      'countries',
    ]),
    blacklistedCountriesText() {
      return this.blacklistedCountries.map(country => country.alpha3Code).join(', ');
    },
  },
  methods: {
    async initCountryData() {
      const data = await this.connectICO.pool.getKycCountryBlacklist(this.pool.poolAddress);
      this.countriesToAdd = [];
      this.countriesToRemove = data || [];
      this.selectableCountries = (data) ? this.countries.filter(option => !data.includes(option.alpha3Code)) : [];
      this.blacklistedCountries = (data) ? this.countries.filter(option => data.includes(option.alpha3Code)) : [];

      return data;
    },
    async addToBlacklist() {
      try {
        await this.connectICO.pool.addCountryBlacklist(this.pool.poolAddress, this.countriesToAdd);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }

      this.initCountryData();
    },
    async removeFromBlacklist() {
      try {
        await this.connectICO.pool.removeCountryBlacklist(this.pool.poolAddress, this.countriesToRemove);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }

      this.initCountryData();
    },
    async getTransferDetails() {
      const factoryParams = await this.connectICO.poolFactory.getAllPoolFactoryParams();
      return {
        flatFee: factoryParams.flatFee,
        poolFee: factoryParams.maxAllocationFeeRate * this.pool.maxPoolAllocation / 1000,
        transferValue: (
          factoryParams.flatFee
          + factoryParams.maxAllocationFeeRate
          * this.pool.maxPoolAllocation / 1000
        ),
      };
    },
    async submit() {
      const validationResponse = await this.$validator.validateAll();
      if (!validationResponse) {
        this.errors.items.forEach((item) => {
          this.$notify({
            type: 'error',
            title: `${item.field}`,
            text: `${item.msg}`,
          });
        });
        return;
      }

      if (typeof this.pool.saleStartDate === 'string') {
        this.pool.saleStartDate = moment(this.pool.saleStartDate, this.datepickerOptions.format);
      }
      if (typeof this.pool.saleEndDate === 'string') {
        this.pool.saleEndDate = moment(this.pool.saleEndDate, this.datepickerOptions.format);
      }

      try {
        const response = await this.connectICO.pool.setPoolParamsCreator(this.pool);
        if (response) {
          this.poolAddress = response;
          this.$notify({
            type: 'success',
            title: 'Pool created!',
            text: `${response}`,
          });
        }
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async addAdminAddress() {
      try {
        await this.connectICO.pool.addAdmin(this.pool.poolAddress, [this.newAdminAddress]);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async removeAdminAddress() {
      try {
        await this.connectICO.pool.removeAdmin(this.pool.poolAddress, [this.newAdminAddress]);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async addWhitelistAddress() {
      try {
        await this.connectICO.pool.addWhitelist(this.pool.poolAddress, [this.newAdminAddress]);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async removeWhitelistAddress() {
      try {
        await this.connectICO.pool.removeWhitelist(this.pool.poolAddress, [this.newAdminAddress]);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
  },
};
</script>

<style lang="scss">

</style>
