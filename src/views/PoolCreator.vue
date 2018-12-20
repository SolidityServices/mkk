<template>
  <div>
    <div class="w-100 mb-4 mb-md-5">
      <div class="container d-none d-sm-block mt-5">
        <div class="blue-36-20-bold">Pool Creator</div>
        <hr align="left" class="d-none d-sm-block blue-hr">
      </div>

      <div class="d-sm-none mobile-back d-flex flex-row">
        <div class="d-flex justify-content-center align-items-center ml-3"><img src="../assets/chevron-left.png" alt="">
        </div>
        <div class="white-16-bold ml-2">Pool Creator</div>
      </div>
    </div>

    <div class="container d-flex flex-column">
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
                 v-model="pool.saleAddress" placeholder="Sale ETH address"/>
        </div>

        <div class="d-flex flex-column col-12">
          <div class="blue-24-16-bold py-3 pl-4"> Token address (optional):</div>
          <input type="text" v-validate="'eth-address'" data-vv-name="Sale ETH address"
                 class="form-control input-text"
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
                     v-model="pool.saleWithdrawFunctionSig" placeholder="pay()"/>
            </div>
          </div>

          <div class="col-12 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-4 blue-18-reg">Sale Withdraw Function Sig:</div>
            <div class="col-12 col-lg-8">
              <input type="text"
                     class="form-control input-text"
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
              <input type="number" v-validate="'required|numeric|min_value:0|max_value:100'"
                     data-vv-name="Creator fee"
                     class="form-control input-text w-100"
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

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Minimum pool goal in ETH</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'required|numeric|min_value:0'"
                     step="0.000001"
                     class="form-control input-text w-100" data-vv-name="Minimum pool goal"
                     v-model="pool.minPoolGoal">
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Max allocation in ETH</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'required|numeric|min_value:0'"
                     step="0.000001"
                     class="form-control input-text w-100" data-vv-name="Max allocation"
                     v-model="pool.maxPoolAllocation">
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 d-flex flex-row align-items-center">
              <div class="input-cb mr-3">
                <input type="checkbox" v-model="pool.whitelistPool" id="whitelistPool" name=""/>
                <label for="whitelistPool"></label>
              </div>
              <label class="blue-18-reg mb-0" for="whitelistPool">Whitelist pool</label>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Withdraw timelock</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'required|numeric|min_value:0'"
                     class="form-control input-text w-100" data-vv-name="Withdraw time lock"
                     v-model="pool.withdrawTimelock">
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Minimum ETH contribution (optional)</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'numeric|min_value:0'" min="0"
                     step="0.000001"
                     class="form-control input-text w-100" data-vv-name="Minimum contribution"
                     v-model="pool.minContribution"/>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Maximum ETH contribution (optional)</div>
            <div class="col-12 col-lg-6">
              <input type="number" v-validate="'numeric|min_value:0'" min="0"
                     step="0.000001"
                     class="form-control input-text" data-vv-name="Maximum contribution"
                     v-model="pool.maxContribution"/>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Country blacklist:</div>
            <div class="col-12 col-lg-6">
              <b-form-select
                multiple
                v-model="pool.countryBlackList"
                class="form-control input-dd"
                value-field="alpha3Code"
                text-field="name"
                :options="countries"
              />
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Selected countries:</div>
            <div class="col-12 col-lg-6">{{pool.countryBlackList.join(', ')}}</div>
          </div>


          <div class="col-12 d-flex flex-column mt-3 flex-wrap">
            <div class="row mx-0">
              <div class="col-12 col-lg-4 blue-18-reg d-flex flex-row mt-2">
                <span>Admin addresses: </span>
                <span class="ml-2"><i class="fa fa-plus" @click="addAddress(pool.adminAddresses)"></i></span>
              </div>
              <div class="col-12 col-lg-8 d-flex flex-column">
                <div class="d-flex flex-row align-items-center mt-3 flex-shrink-0"
                     v-for="(adminAddress, index) in pool.adminAddresses" :key="index">
                  <input type="text" v-validate="'required|eth-address'" data-vv-name="Admin address"
                         class="form-control input-text w-100"
                         v-model="pool.adminAddresses[index]" placeholder="Admin address"/>
                  <i class="fa fa-minus ml-2 orange-18-reg" @click="removeAddress(pool.adminAddresses, index)"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 d-flex flex-column mt-3 flex-wrap">
            <div class="row mx-0">
              <div class="col-12 col-lg-4 blue-18-reg d-flex flex-row mt-2">
                <span>Whitelist addresses: </span>
                <span class="ml-2"><i class="fa fa-plus" @click="addAddress(pool.whiteListAddresses)"></i></span>
              </div>
              <div class="d-flex flex-column col-12 col-lg-8">
                <div class="d-flex flex-row align-items-center mt-3 flex-shrink-0"
                     v-for="(whiteListAddress, index) in pool.whiteListAddresses" :key="index">
                  <input type="text" v-validate="'required|eth-address'" data-vv-name="Whitelist address"
                         class="form-control input-text w-100"
                         v-model="pool.whiteListAddresses[index]" placeholder="Whitelist address"/>
                  <i class="fa fa-minus ml-2 orange-18-reg" @click="removeAddress(pool.whiteListAddresses, index)"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <hr class="blue-hr-fullw my-5 w-100" v-if="calculatedFee">

      <div class="d-flex flex-column ml-sm-5 mt-3" v-if="calculatedFee">
        <div>
          <div class="o-border d-inline"></div>
          <div class="d-inline mt-5 blue-36-20-bold"> Transaction details
            <hr align="left" class="blue-hr-2">
          </div>
        </div>
        <div class="d-flex flex-row flex-wrap">
          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-6 orange-18-reg">Flat fee:</div>
            <div class="col-6 orange-18-reg text-right text-lg-left">{{ calculatedFee.flatFee }}</div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-6 orange-18-reg">Pool fee:</div>
            <div class="col-6 orange-18-reg text-right text-lg-left">{{ calculatedFee.poolFee }}</div>
          </div>
        </div>
        <div class="d-flex flex-row flex-wrap justify-content-center">
          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-6 orange-18-reg">Transfer value:</div>
            <div class="col-6 orange-18-reg text-right text-lg-left">{{ calculatedFee.transferValue }}</div>
          </div>
        </div>
      </div>

      <div class="d-flex flex-row justify-content-center my-5">
        <button class="btn white-submit px-4 mr-3" @click="calculateFee" :disabled="submitDisabled">
          Calculate fee
        </button>
        <button class="btn blue-submit px-4" @click="submit" :disabled="submitDisabled">
          Submit
        </button>
      </div>

      <div class="d-flex flex-row justify-content-center my-5" v-if="poolAddress">
        <div class="orange-24-bold">{{ poolAddress }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import datePicker from 'vue-bootstrap-datetimepicker';
import LocalPool from '../model/LocalPool';

export default {
  components: {
    datePicker,
  },
  data() {
    return {
      pool: null,
      datepickerOptions: {
        format: 'DD/MM/YYYY H:mm',
        useCurrent: false,
        sideBySide: true,
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
      return !window.ethInitSuccess;
    },
    ...mapGetters([
      'connectICO',
      'countries',
    ]),
  },
  methods: {
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
      const transferValue = await this.getTransferDetails().transferValue;
      if (typeof this.pool.saleStartDate === 'string') {
        this.pool.saleStartDate = moment(this.pool.saleStartDate, this.datepickerOptions.format);
      }
      if (typeof this.pool.saleEndDate === 'string') {
        this.pool.saleEndDate = moment(this.pool.saleEndDate, this.datepickerOptions.format);
      }

      const response = await this.connectICO.poolFactory.createPool(this.pool, transferValue);
      if (response) {
        this.poolAddress = response;
        this.$notify({
          type: 'success',
          title: 'Pool created!',
          text: `${response}`,
        });
      }
    },
    async calculateFee() {
      this.calculatedFee = await this.getTransferDetails();
    },
    removeAddress(object, index) {
      object.splice(index, 1);
    },
    addAddress(object) {
      object.push('');
    },
  },
};
</script>

<style lang="scss">

</style>
