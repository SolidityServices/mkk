<template>
  <div>
    <div class="w-100 mb-4 mb-md-5">
      <div class="container d-none d-sm-block mt-5">
        <div class="blue-36-20-bold">Pool Creator</div>
        <hr align="left" class="d-none d-sm-block blue-hr">
      </div>

      <div class="d-sm-none mobile-back d-flex flex-row">
        <div class="d-flex justify-content-center align-items-center ml-3"><img src="../../assets/chevron-left.png" alt="">
        </div>
        <div class="white-16-bold ml-2">Pool Creator</div>
      </div>
    </div>

    <div class="container d-flex flex-column">
      <div class="d-flex flex-column">
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
                 v-model="pool.saleAddress" placeholder="0x0000000000000000000000000000000000000000"/>
          <span v-if="errors.has('Sale ETH address')" v-text="errors.first('Sale ETH address')" class="text-danger"></span>
        </div>

        <div class="d-flex flex-column col-12">
          <div class="blue-24-16-bold py-3 pl-4"> Token address (optional):</div>
          <input type="text" v-validate="'eth-address'" data-vv-name="Token address"
                 class="form-control input-text"
                 v-model="pool.tokenAddress" placeholder="0x0000000000000000000000000000000000000000"/>
          <span v-if="errors.has('Token address')" v-text="errors.first('Token address')" class="text-danger"></span>
        </div>
      </div>

      <hr class="blue-hr-fullw my-5 w-100">

      <div class="d-flex flex-column mt-3">
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
                     v-model="pool.saleParticipateFunctionSig"/>
            </div>
          </div>

          <div class="col-12 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-4 blue-18-reg">Sale Withdraw Function Sig:</div>
            <div class="col-12 col-lg-8">
              <input type="text"
                     class="form-control input-text"
                     v-model="pool.saleWithdrawFunctionSig"/>
            </div>
          </div>

        </div>
      </div>

      <hr class="blue-hr-fullw my-5 w-100">

      <div class="d-flex flex-column">
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
                rows="4"
                v-model="pool.poolDescription"
                v-validate="'required'"
                data-vv-name="Description"
                placeholder="Please write a description"
              ></textarea>
              <span v-if="errors.has('Description')" v-text="errors.first('Description')" class="text-danger"></span>
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
                     step="0.01"
                     min="0"
                     max="0.1"
                     placeholder="0"
                     v-model="pool.creatorFeeRate">
              <span v-if="errors.has('Creator fee')" v-text="errors.first('Creator fee')" class="text-danger"></span>
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
                           @dp-change="saleStartDateChanged"
              ></date-picker>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Sale end date</div>
            <div class="col-12 col-lg-6">
              <date-picker v-model="pool.saleEndDate"
                           :config="datepickerOptions"
                           class="form-control input-text w-100"
              ></date-picker>
            </div>
          </div>

        </div>
      </div>

      <hr class="blue-hr-fullw my-5 w-100">

      <div class="d-flex flex-column">
        <div>
          <div class="o-border d-inline"></div>
          <div class="d-inline mt-5 blue-36-20-bold"> Pool Details
            <hr align="left" class="blue-hr-2">
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Minimum pool goal in ETH</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'decimal|min_value:0'"
                     step=0.01
                     placeholder="10,00"
                     class="form-control input-text w-100" data-vv-name="Minimum pool goal"
                     v-model="pool.minPoolGoal">
              <span v-if="errors.has('Minimum pool goal')" v-text="errors.first('Minimum pool goal')" class="text-danger"></span>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Max allocation in ETH</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'required|decimal|min_value:0.01'"
                     step=0.01
                     min=0.01
                     placeholder="1000"
                     class="form-control input-text w-100" data-vv-name="Max allocation"
                     v-model="pool.maxPoolAllocation">
              <span v-if="errors.has('Max allocation')" v-text="errors.first('Max allocation')" class="text-danger"></span>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Withdraw timelock in hours</div>
            <div class="col-12 col-lg-6">
              <input type="number"
                     v-validate="'required|numeric|min_value:0|max_value:72'" data-vv-name="Withdraw time lock"
                     placeholder="0"
                     class="form-control input-text w-100"
                     v-model="pool.withdrawTimelock">
              <span v-if="errors.has('Withdraw time lock')" v-text="errors.first('Withdraw time lock')" class="text-danger"></span>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Soft cap ETH (optional)</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'decimal|min_value:0'" min="0"
                     step="0.000001"
                     placeholder="0,10"
                     class="form-control input-text w-100" data-vv-name="Soft cap"
                     v-model="pool.minContribution"/>
              <span v-if="errors.has('Soft cap')" v-text="errors.first('Soft cap')" class="text-danger"></span>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Hard cap ETH (optional)</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'decimal|min_value:0'" min="0"
                     step="0.000001"
                     placeholder="100"
                     class="form-control input-text" data-vv-name="Hard cap"
                     v-model="pool.maxContribution"/>
              <span v-if="errors.has('Hard cap')" v-text="errors.first('Hard cap')" class="text-danger"></span>
            </div>
          </div>
        </div>
      </div>


      <hr class="blue-hr-fullw my-5 w-100">


      <div class="d-flex flex-column mb-5">
        <div class="mb-5">
          <div class="o-border d-inline"></div>
          <div class="d-inline mt-5 blue-36-20-bold"> Other Parameters
            <hr align="left" class="blue-hr-2">
          </div>
        </div>

        <div class="d-flex flex-row flex-wrap">

          <div class="d-flex flex-column ml-4 mb-3">
            <div class="d-flex flex-row align-items-center mb-3">
              <div class="input-cb mr-3">
                <input type="checkbox" v-model="pool.whitelistPool" id="whitelistPool" name=""/>
                <label for="whitelistPool"></label>
              </div>
              <label class="blue-18-reg mb-0" for="whitelistPool">Whitelist pool</label>
            </div>

            <div class="d-flex flex-row align-items-center">
              <div class="input-cb mr-3">
                <input type="checkbox" v-model="pool.strictlyTrustlessPool" id="trustlessPool" name=""/>
                <label for="trustlessPool"></label>
              </div>
              <label class="blue-18-reg mb-0" for="trustlessPool">Trustless Pool</label>
            </div>
          </div>

          <div class="col-12 d-flex flex-wrap mt-3 align-items-center">
            <div class="col-12 col-lg-3 blue-18-reg">Country blacklist:</div>
            <div class="col-12 col-lg-9">
              <country-select
                      multiple
                      v-model="pool.countryBlackList"
                      :options="countries"
                      :disabled="false" />
            </div>
          </div>

          <div class="col-12 d-flex flex-wrap mt-3 align-items-center">
              <div class="col-12 col-lg-3 blue-18-reg">Admin addresses:</div>

              <div class="col-12 col-lg-9">
                  <multiselect
                          v-validate="'eth-address-array'"
                          data-vv-name="Admin addresses"
                          v-model="pool.adminAddresses"
                          :multiple="true"
                          :options="[]"
                          :taggable="true"
                          @tag="addAdminAddress">
                  </multiselect>
                <span v-if="errors.has('Admin addresses')" v-text="errors.first('Admin addresses')" class="text-danger"></span>
              </div>
          </div>

          <div class="col-12 d-flex flex-wrap mt-3 align-items-center">
              <div class="col-12 col-lg-3 blue-18-reg">Whitelist addresses:</div>

              <div class="col-12 col-lg-9">
                  <multiselect
                          v-validate="'eth-address-array'"
                          data-vv-name="Whitelist addresses"
                          v-model="pool.whiteListAddresses"
                          :multiple="true"
                          :options="[]"
                          :taggable="true"
                          @tag="addWhitelistAddress">
                  </multiselect>
                <span v-if="errors.has('Whitelist addresses')" v-text="errors.first('Whitelist addresses')" class="text-danger"></span>
              </div>
          </div>
        </div>
      </div>

      <hr class="blue-hr-fullw my-5 w-100" v-if="calculatedFee">

      <div class="d-flex flex-column mt-3" v-if="calculatedFee">
        <div>
          <div class="o-border d-inline"></div>
          <div class="d-inline mt-5 blue-36-20-bold"> Transaction details
            <hr align="left" class="blue-hr-2">
          </div>
        </div>

        <div>
          <div class="d-flex flex-row flex-wrap mb-2">
            <div class="col-12 col-lg-6 d-flex flex-row align-items-center justify-content-between flex-wrap">
              <span class="orange-18-reg">Flat fee:</span>
              <span class="orange-18-reg">{{ calculatedFee.flatFee }} ETH</span>
            </div>
          </div>

          <div class="d-flex flex-row flex-wrap mb-2">
            <div class="col-12 col-lg-6 d-flex flex-row align-items-center justify-content-between flex-wrap">
              <span class="orange-18-reg">Pool fee:</span>
              <span class="orange-18-reg">{{ calculatedFee.poolFee }} ETH</span>
            </div>
          </div>

          <div class="d-flex flex-row flex-wrap mb-2">
            <div class="col-12 col-lg-6 d-flex flex-row align-items-center justify-content-between flex-wrap">
              <span class="orange-18-reg">Transfer value:</span>
              <span class="orange-18-reg">{{ calculatedFee.transferValue }} ETH</span>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex flex-row justify-content-center my-5">
        <button class="btn white-submit px-4 mr-3" @click="calculateFee" :disabled="submitDisabled">Calculate fee</button>
        <button class="btn blue-submit px-4" @click="submit" :disabled="submitDisabled" v-text="submitText"></button>
      </div>

      <div class="d-flex flex-row justify-content-center my-5" v-if="poolAddress">
        <div class="card">
          <div class="card-header">
            Created pool address
          </div>
          <div class="card-body orange-24-bold">
            <a target="_blank" :href="`https://etherscan.io/address/${poolAddress}`">
              {{ poolAddress }}
            </a>
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
import Multiselect from 'vue-multiselect';
import CountrySelect from '../../components/form/CountrySelect.vue';
import LocalPool from '../../model/LocalPool';
import mewLinkBuilder from '../../utils/mewLinkBuilder';
import openMewUrl from '../../utils/openMewUrl';

export default {
  components: {
    datePicker,
    Multiselect,
    CountrySelect,
  },
  data() {
    return {
      loading: false,
      pool: null,
      datepickerOptions: {
        format: 'DD/MM/YYYY H:mm',
        useCurrent: false,
        sideBySide: true,
        minDate: moment().startOf('day'),
      },
      calculatedFee: null,
      poolAddress: null,
      showFuncSig: false,
    };
  },
  created() {
    this.pool = new LocalPool();
  },
  computed: {
    submitDisabled() {
      return !window.ethInitSuccess || this.loading;
    },
    submitText() {
      return this.loading ? 'Creating new pool...' : 'Create new pool';
    },
    ...mapGetters([
      'connectICO',
      'countries',
      'mode',
    ]),
  },
  methods: {
    async getTransferDetails() {
      const factoryParams = await this.connectICO.poolFactory.getAllPoolFactoryParams();
      const poolFee = parseInt(await window.web3.utils.toWei((factoryParams.maxAllocationFeeRate * this.pool.maxPoolAllocation / 1000).toString(), 'ether'), 10);
      const transferValue = factoryParams.flatFee + poolFee;

      return {
        flatFee: factoryParams.flatFee,
        poolFee,
        transferValue,
      };
    },
    async getTransferDetailsETH() {
      const factoryParams = await this.connectICO.poolFactory.getAllPoolFactoryParams();
      return {
        flatFee: parseFloat(await window.web3.utils.fromWei(factoryParams.flatFee.toString(), 'ether'), 10),
        poolFee: factoryParams.maxAllocationFeeRate * this.pool.maxPoolAllocation / 1000,
        transferValue: (
          parseFloat(await window.web3.utils.fromWei(factoryParams.flatFee.toString(), 'ether'), 10)
          + factoryParams.maxAllocationFeeRate * this.pool.maxPoolAllocation / 1000
        ),
      };
    },
    async calculateFee() {
      this.calculatedFee = await this.getTransferDetailsETH();
    },
    saleStartDateChanged(event) {
      this.pool.saleEndDate = moment(event.date.add(7, 'days'), this.datepickerOptions.format);
    },
    async addAdminAddress(address) {
      const isEthAddress = await this.$validator.validate('Admin addresses', [address]);
      const isKycAddress = await this.connectICO.KYC.checkKYC(address);

      if (!isKycAddress) {
        const field = this.$validator.fields.find({ name: 'Admin addresses' });

        this.$validator.errors.add({
          id: field.id,
          field: 'Admin addresses',
          msg: 'The given address is not a KYC Address',
        });

        field.setFlags({
          invalid: true,
          valid: false,
          validated: true,
        });
      }

      if (!isEthAddress || !isKycAddress) {
        return;
      }

      if (!this.pool.adminAddresses.includes(address)) {
        this.pool.adminAddresses.push(address);
      }
    },
    async addWhitelistAddress(address) {
      const isEthAddress = await this.$validator.validate('Whitelist addresses', [address]);
      const isKycAddress = await this.connectICO.KYC.checkKYC(address);

      if (!isKycAddress) {
        const field = this.$validator.fields.find({ name: 'Whitelist addresses' });

        this.$validator.errors.add({
          id: field.id,
          field: 'Whitelist addresses',
          msg: 'The given address is not a KYC Address',
        });

        field.setFlags({
          invalid: true,
          valid: false,
          validated: true,
        });
      }

      if (!isEthAddress || !isKycAddress) {
        return;
      }

      if (!this.pool.whiteListAddresses.includes(address)) {
        this.pool.whiteListAddresses.push(address);
      }
    },
    async submit() {
      const validationResponse = await this.$validator.validateAll();

      if (!validationResponse) {
        this.errors.items.forEach((item) => {
          this.$notify({
            type: 'error',
            title: `${item.field}`,
            text: `${item.msg}`,
            duration: -1,
          });
        });
        return;
      }

      this.loading = true;
      this.$notify({
        type: 'warn',
        text: '<i class="fa fa-spin fa-circle-o-notch"></i> Creating new pool...',
        duration: -1,
      });

      if (typeof this.pool.saleStartDate === 'string') {
        this.pool.saleStartDate = moment(this.pool.saleStartDate, this.datepickerOptions.format);
      }
      if (typeof this.pool.saleEndDate === 'string') {
        this.pool.saleEndDate = moment(this.pool.saleEndDate, this.datepickerOptions.format);
      }

      const ethTransferDetails = await this.getTransferDetailsETH();
      const weiTransferValue = await window.web3.utils.toWei((ethTransferDetails.transferValue).toString(), 'ether');
      const ethTransferValue = ethTransferDetails.transferValue;

      try {
        const response = await this.connectICO.poolFactory.createPool(this.pool, weiTransferValue);

        if (this.mode === 'mm') {
          if (response) {
            this.poolAddress = response;

            this.$notify({ clean: true });

            this.$notify({
              type: 'success',
              title: 'Pool created!',
              text: `${response}`,
              duration: -1,
            });

            // this.$router.push({ name: 'project', params: { address: this.poolAddress } });
          }
        }

        if (this.mode === 'mew') {
          const network = await window.web3.eth.net.getNetworkType();

          const url = mewLinkBuilder(
            this.connectICO.poolFactory.poolFactory.address,
            response.callData,
            ethTransferValue,
            network,
            response.gasLimit,
          );

          this.$notify({ clean: true });

          openMewUrl(url);
        }

        this.pool = new LocalPool();
        this.loading = false;
      } catch (e) {
        this.$notify({ clean: true });
        this.$notify({
          type: 'error',
          text: e.message,
          duration: -1,
        });
        this.loading = false;
        throw e;
      }
    },
  },
};
</script>
