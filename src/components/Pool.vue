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
          <span v-if="errors.has('Sale ETH address')" v-text="errors.first('Sale ETH address')" class="text-danger"></span>
        </div>

        <div class="d-flex flex-column col-12">
          <div class="blue-24-16-bold py-3 pl-4"> Token address (optional):</div>
          <input type="text" v-validate="'eth-address'" data-vv-name="Token address"
                 class="form-control input-text"
                 :disabled="disabled"
                 v-model="pool.tokenAddress" placeholder="Token ETH address"/>
          <span v-if="errors.has('Token address')" v-text="errors.first('Token address')" class="text-danger"></span>
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
                     :disabled="disabled"
                     placeholder="0.12"
                     step="0.01"
                     min="0"
                     max="100"
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
              <span v-if="errors.has('Minimum pool goal')" v-text="errors.first('Minimum pool goal')" class="text-danger"></span>
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
              <span v-if="errors.has('Max allocation')" v-text="errors.first('Max allocation')" class="text-danger"></span>
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
              <span v-if="errors.has('Withdraw time lock')" v-text="errors.first('Withdraw time lock')" class="text-danger"></span>
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
              <span v-if="errors.has('Minimum contribution')" v-text="errors.first('Minimum contribution')" class="text-danger"></span>
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
              <span v-if="errors.has('Maximum contribution')" v-text="errors.first('Maximum contribution')" class="text-danger"></span>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 d-flex flex-row align-items-center">
              <div class="input-cb mr-3">
                <input type="checkbox" v-model="pool.strictlyTrustlessPool" id="trustlessPool" name="" :disabled="true"/>
                <label for="trustlessPool"></label>
              </div>
              <label class="blue-18-reg mb-0" for="trustlessPool">Trustless Pool</label>
            </div>
          </div>

          <div class="d-flex flex-row justify-content-center my-5 w-100" v-if="!disabled">
            <button class="btn blue-submit px-4" @click="submit" :disabled="submitDisabled">
              Update
            </button>
          </div>

          <div v-if="!disabled && pool.strictlyTrustlessPool">
            <hr class="blue-hr-fullw my-5 w-100">

            <div class="col-12 d-flex flex-row mt-3 align-items-center flex-wrap" v-if="!disabled && pool.strictlyTrustlessPool">
              <div class="col-12 col-md-7">
                <input type="text" class="form-control input-text" v-model="sendToSaleWithCalldataSig"/>
              </div>

              <div class="col-12 col-md-5 d-flex flex-row flex-wrap">
                <button class="btn blue-submit px-4 w-100" @click="sendSaleParticipateWithCalldata">
                  Send Sale Participate With Calldata
                </button>
              </div>
            </div>

            <div class="col-12 d-flex flex-row mt-3 align-items-center flex-wrap" v-if="!disabled && pool.strictlyTrustlessPool">
              <div class="col-12 col-md-7">
                <input type="text" class="form-control input-text" v-model="withdrawFromSaleWithCalldataSig"/>
              </div>

              <div class="col-12 col-md-5 d-flex flex-row flex-wrap">
                <button class="btn blue-submit px-4 w-100" @click="sendSaleWithdrawRequestWithCalldata">
                  Send Sale Withdraw Request With Calldata
                </button>
              </div>
            </div>
          </div>

          <hr class="blue-hr-fullw my-5 w-100">

          <div class="col-12 d-flex flex-row mt-3 flex-wrap">
            <div class="col-12 col-lg-3 blue-18-reg mb-1">Pool Country blacklist:</div>
            <div class="col-12 col-lg-9">{{ blacklistedCountriesText }}</div>
          </div>

          <div class="col-12 d-flex flex-row mt-3 align-items-center flex-wrap" v-if="!disabled">
              <div class="col-12 col-md-8 mb-2 mb-lg-0">
                <country-select
                        multiple
                        v-model="countriesToAdd"
                        :options="selectableCountries"/>
              </div>

              <div class="col-12 col-md-4 d-flex flex-row flex-wrap">
                <button class="btn blue-submit px-4 w-100" @click="addToBlacklist">
                  Add to blacklist
                </button>
              </div>
          </div>

          <div class="col-12 d-flex flex-row mt-3 align-items-center flex-wrap" v-if="!disabled">
            <div class="col-12 col-md-8  mb-2 mb-lg-0">
              <country-select
                      multiple
                      v-model="countriesToRemove"
                      :options="blacklistedCountries"/>
            </div>

            <div class="col-12 col-md-4 d-flex flex-row flex-wrap">
              <button class="btn blue-submit px-4 w-100" @click="removeFromBlacklist">
                Remove from blacklist
              </button>
            </div>
          </div>

          <hr class="blue-hr-fullw my-5 w-100">

          <div v-if="!disabled">
            <div class="w-100">
              <div class="col-12 d-flex flex-row mt-3 flex-wrap">
                <div class="col-12 blue-18-reg">Admin addresses:</div>
                <div class="col-12">{{ adminAddressesText }}</div>
              </div>
            </div>

            <!--v-if="!disabled && isCreator"-->
            <div class="w-100">
              <div class="col-12 d-flex flex-row mt-3 align-items-center flex-wrap" v-if="!disabled">
                <div class="col-12 col-md-8 mb-2 mb-lg-0">
                  <multiselect
                          class="w-100"
                          v-validate="'eth-address-array'"
                          data-vv-name="Admin addresses"
                          v-model="adminAddressesToAdd"
                          :multiple="true"
                          :options="[]"
                          :taggable="true"
                          @tag="addAdminAddressToAdd">
                  </multiselect>
                  <span v-if="errors.has('Add Admin addresses')" v-text="errors.first('Add Admin addresses')" class="text-danger"></span>
                </div>

                <div class="col-12 col-md-4 d-flex flex-row flex-wrap">
                  <button class="btn btn-block blue-submit px-4 w-100" @click="addAdminAddresses">
                    Add Admin addresses
                  </button>
                </div>
              </div>
            </div>

            <div class="w-100">
              <div class="col-12 d-flex flex-row mt-3 align-items-center flex-wrap" v-if="!disabled">
                <div class="col-12 col-md-8 mb-2 mb-lg-0">
                  <multiselect
                          class="w-100"
                          v-validate="'eth-address-array'"
                          data-vv-name="Add Admin addresses"
                          v-model="adminAddressesToRemove"
                          :multiple="true"
                          :options="adminAddresses">
                  </multiselect>
                  <span v-if="errors.has('Admin addresses')" v-text="errors.first('Admin addresses')" class="text-danger"></span>
                </div>

                <div class="col-12 col-md-4 d-flex flex-row flex-wrap">
                  <button class="btn btn-block blue-submit px-4 w-100" @click="removeAdminAddresses">
                    Remove Admin addresses
                  </button>
                </div>
              </div>
            </div>

            <hr class="blue-hr-fullw my-5 w-100">
          </div>

          <div class="w-100">
            <div class="col-12 d-flex flex-row mt-3 flex-wrap">
              <div class="col-12 blue-18-reg">Whitelist addresses:</div>
              <div class="col-12">{{ whitelistAddressesText }}</div>
            </div>
          </div>

          <!--v-if="!disabled"-->
          <div class="w-100">
            <div class="col-12 d-flex flex-row mt-3 align-items-center flex-wrap" v-if="!disabled">
              <div class="col-12 col-md-8 mb-2 mb-lg-0">
                <multiselect
                        class="w-100"
                        v-validate="'eth-address-array'"
                        data-vv-name="Add Whitelist addresses"
                        v-model="whitelistAddressesToAdd"
                        :multiple="true"
                        :options="[]"
                        :taggable="true"
                        @tag="addWhitelistAddressToAdd">
                </multiselect>
                <span v-if="errors.has('Add Whitelist addresses')" v-text="errors.first('Add Whitelist addresses')" class="text-danger"></span>
              </div>

              <div class="col-12 col-md-4 d-flex flex-row flex-wrap">
                <button class="btn btn-block blue-submit px-4 w-100" @click="addWhitelistAddresses">
                  Add Whitelist addresses
                </button>
              </div>
            </div>
          </div>

          <div class="w-100">
            <div class="col-12 d-flex flex-row mt-3 align-items-center flex-wrap" v-if="!disabled">
              <div class="col-12 col-md-8 mb-2 mb-lg-0">
                <multiselect
                        class="w-100"
                        v-validate="'eth-address-array'"
                        data-vv-name="Whitelist addresses"
                        v-model="whitelistAddressesToRemove"
                        :multiple="true"
                        :options="whitelistAddresses">
                </multiselect>
                <span v-if="errors.has('Whitelist addresses')" v-text="errors.first('Whitelist addresses')" class="text-danger"></span>
              </div>

              <div class="col-12 col-md-4 d-flex flex-row flex-wrap">
                <button class="btn btn-block blue-submit px-4 w-100" @click="removeWhitelistAddresses">
                  Remove Whitelist addresses
                </button>
              </div>
            </div>
          </div>

          <hr class="blue-hr-fullw my-5 w-100">

          <div class="w-100">
            <div class="o-border d-inline "></div>
            <div class="d-inline blue-36-20-bold"> Automations
              <hr align="left" class="blue-hr-2">
            </div>
          </div>

          <div class="w-100">
            <div class="col-12 d-flex flex-row mt-3 align-items-center flex-wrap" v-if="!disabled">
              <div class="col-12 col-md-3 d-flex justify-content-end">
                <div class="d-lg-inline-block orange-18-bold pr-2 px-0">Add auto send to sale GAS price in GWEI:</div>
              </div>

              <div class="col-12 col-md-3 mb-2 mb-lg-0">
                <input type="number" v-validate="`required|decimal`"
                       step="0.000001"
                       class="form-control input-text w-100" data-vv-name="Gwei amount"
                       v-model="sendToSaleGweiValue">
                <span v-if="errors.has('Gwei amount')" v-text="errors.first('Gwei amount')" class="text-danger"></span>
              </div>

              <div class="col-12 col-md-3 mb-2 mb-lg-0">
                <date-picker v-model="sendToSaleTime"
                             :config="datepickerOptions"
                             class="form-control input-text w-100"
                             :disabled="disabled"
                ></date-picker>
              </div>

              <div class="col-12 col-md-3 d-flex flex-row flex-wrap">
                <button class="btn px-4 blue-submit btn-block" @click="addAutoSendToSale">Add auto send to sale</button>
              </div>
            </div>
          </div>

          <hr class="blue-hr-fullw my-5 w-100">
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
import Web3 from 'web3';
import LocalPool from '../model/LocalPool';
import CountrySelect from './form/CountrySelect.vue';

export default {
  components: {
    datePicker,
    Multiselect,
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
      adminAddresses: [],
      adminAddressesToAdd: [],
      adminAddressesToRemove: [],
      whitelistAddresses: [],
      whitelistAddressesToAdd: [],
      whitelistAddressesToRemove: [],
      sendToSaleTime: '',
      sendToSaleGweiValue: 0,
      sendToSaleWithCalldataSig: '',
      withdrawFromSaleWithCalldataSig: '',
    };
  },
  mounted() {
    this.initCountryData();
    this.initAddresses();
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
    adminAddressesText() {
      return this.adminAddresses.join(', ');
    },
    whitelistAddressesText() {
      return this.whitelistAddresses.join(', ');
    },
  },
  methods: {
    async initAddresses() {
      this.adminAddressesToAdd = [];
      this.adminAddressesToRemove = [];
      this.whitelistAddressesToAdd = [];
      this.whitelistAddressesToRemove = [];
      this.adminAddresses = await this.connectICO.pool.getAdmins(this.pool.poolAddress);
      this.whitelistAddresses = await this.connectICO.pool.getWhitelist(this.pool.poolAddress);
    },
    async addAdminAddressToAdd(address) {
      const isEthAddress = await this.$validator.validate('Add Admin addresses', [address]);
      const isKycAddress = await this.connectICO.KYC.checkKYC(address);

      if (!isKycAddress) {
        const field = this.$validator.fields.find({ name: 'Add Admin addresses' });

        this.$validator.errors.add({
          id: field.id,
          field: 'Add Admin addresses',
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

      if (!this.adminAddressesToAdd.includes(address)) {
        this.adminAddressesToAdd.push(address);
      }
    },
    async addAdminAddresses() {
      try {
        await this.connectICO.pool.addAdmin(this.pool.poolAddress, this.adminAddressesToAdd);
        await this.initAddresses();

        this.$notify({
          type: 'success',
          text: 'Admin addresses successfully added!',
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async removeAdminAddresses() {
      try {
        await this.connectICO.pool.removeAdmin(this.pool.poolAddress, this.adminAddressesToRemove);
        await this.initAddresses();

        this.$notify({
          type: 'success',
          text: 'Admin addresses successfully removed!',
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async addWhitelistAddressToAdd(address) {
      const isEthAddress = await this.$validator.validate('Add Whitelist addresses', [address]);
      const isKycAddress = await this.connectICO.KYC.checkKYC(address);

      if (!isKycAddress) {
        const field = this.$validator.fields.find({ name: 'Add Whitelist addresses' });

        this.$validator.errors.add({
          id: field.id,
          field: 'Add Whitelist addresses',
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

      if (!this.whitelistAddressesToAdd.includes(address)) {
        this.whitelistAddressesToAdd.push(address);
      }
    },
    async addWhitelistAddresses() {
      try {
        await this.connectICO.pool.addWhitelist(this.pool.poolAddress, this.whitelistAddressesToAdd);
        await this.initAddresses();

        this.$notify({
          type: 'success',
          text: 'Whitelist addresses successfully added!',
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async removeWhitelistAddresses() {
      try {
        await this.connectICO.pool.removeWhitelist(this.pool.poolAddress, this.whitelistAddressesToRemove);
        await this.initAddresses();

        this.$notify({
          type: 'success',
          text: 'Whitelist addresses successfully removed!',
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async initCountryData() {
      const data = await this.connectICO.pool.getKycCountryBlacklist(this.pool.poolAddress);

      this.countriesToAdd = [];
      this.countriesToRemove = data || [];
      this.selectableCountries = (data) ? this.countries.filter(option => !data.includes(option.alpha3Code)) : [];
      this.blacklistedCountries = (data) ? this.countries.filter(option => data.includes(option.alpha3Code)) : [];
    },
    async addToBlacklist() {
      try {
        await this.connectICO.pool.addCountryBlacklist(this.pool.poolAddress, this.countriesToAdd);
        await this.initCountryData();

        this.$notify({
          type: 'success',
          text: 'Countries successfully added to blacklist.',
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async removeFromBlacklist() {
      try {
        await this.connectICO.pool.removeCountryBlacklist(this.pool.poolAddress, this.countriesToRemove);
        await this.initCountryData();

        this.$notify({
          type: 'success',
          text: 'Countries successfully removed from blacklist.',
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
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
    async addAutoSendToSale() {
      try {
        const date = moment(this.sendToSaleTime, this.datepickerOptions.format);
        const gasPrice = Web3.utils.toWei(Web3.toBigNumber(this.sendToSaleGweiValue), 'gwei');
        const response = await this.connectICO.automations.addSendToSale(this.pool.poolAddress, date, gasPrice);

        console.log(response);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
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
    async sendSaleParticipateWithCalldata() {
      try {
        const response = await this.connectICO.pool.sendToSaleWithCalldataParameter(this.pool.poolAddress, this.sendToSaleWithCalldataSig);

        console.log(response);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async sendSaleWithdrawRequestWithCalldata() {
      try {
        console.log(this.address);

        const response = await this.connectICO.pool.withdrawFromSaleWithCalldataParameter(this.pool.poolAddress, this.sendToSaleWithCalldataSig);

        console.log(response);
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
