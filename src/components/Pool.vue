<template>
  <div>
    <section class="mb-4">
      <div class="w-100 mb-4" v-if="!disabled">
        <div class="d-none d-sm-block">
          <div class="blue-36-20-bold">{{pool.poolAddress}}</div>
          <hr align="left" class="d-none d-sm-block blue-hr">
        </div>

        <div class="d-sm-none mobile-back d-flex flex-row">
          <div class="d-flex justify-content-center align-items-center ml-3"><img src="../assets/chevron-left.png" alt="">
          </div>
          <div class="white-16-bold ml-2">{{pool.poolAddress}}</div>
        </div>
      </div>
    </section>

    <section class="mb-4">
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
                 :disabled="disabled || pool.isStopped || pool.isSentToSale"
                 v-model="pool.saleAddress" placeholder="Sale ETH address"/>
          <span v-if="errors.has('Sale ETH address')" v-text="errors.first('Sale ETH address')" class="text-danger"></span>
        </div>

        <div class="d-flex flex-column col-12">
          <div class="blue-24-16-bold py-3 pl-4"> Token address (optional):</div>
          <input type="text" v-validate="'eth-address'" data-vv-name="Token address"
                 class="form-control input-text"
                 :disabled="disabled || pool.isStopped || pool.isSentToSale"
                 v-model="pool.tokenAddress" placeholder="Token ETH address"/>
          <span v-if="errors.has('Token address')" v-text="errors.first('Token address')" class="text-danger"></span>
        </div>
      </div>

      <hr class="blue-hr-fullw my-5 w-100">
    </section>

    <section class="mb-4">
      <div class="d-flex flex-column">
        <div class="d-flex flex-row flex-wrap">
          <div>
            <div class="o-border d-inline"></div>
            <div class="d-inline mt-5 blue-36-20-bold"> Function signatures
              <hr align="left" class="blue-hr-2">
            </div>
          </div>
          <div class="mx-3 mt-sm-3">
            <button class="btn white-submit px-4 mr-3" @click="showFuncSig = !showFuncSig">{{ showFuncSig ? 'Hide' : 'Show'}}</button>
          </div>
        </div>

        <div class="d-flex flex-row flex-wrap" v-if="showFuncSig">
          <div class="col-12 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-4 blue-18-reg">Sale Participate Function Sig:</div>
            <div class="col-12 col-lg-8">
              <input type="text"
                     class="form-control input-text"
                     :disabled="true"
                     v-model="pool.saleWithdrawFunctionSig"/>
            </div>
          </div>

          <div class="col-12 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-4 blue-18-reg">Sale Withdraw Function Sig:</div>
            <div class="col-12 col-lg-8">
              <input type="text"
                     class="form-control input-text"
                     :disabled="true"
                     v-model="pool.saleWithdrawFunctionSig"/>
            </div>
          </div>
        </div>
      </div>

      <hr class="blue-hr-fullw my-5 w-100">
    </section>

    <section class="mb-4">
      <div class="row">
        <div class="col-12">
          <div class="o-border d-inline"></div>
          <div class="d-inline mt-5 blue-36-20-bold"> Deal Details
            <hr align="left" class="blue-hr-2">
          </div>
        </div>

        <div class="row mx-0">
          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Description:</div>
            <div class="col-12 col-lg-6">
              <textarea
                      class="form-control input-text w-100"
                      :disabled="disabled || pool.isStopped || pool.isSentToSale"
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
              <input type="number" v-validate="'required|decimal|min_value:0|max_value:15'"
                     data-vv-name="Creator fee"
                     class="form-control input-text w-100"
                     :disabled="disabled || pool.isStopped || pool.isSentToSale"
                     placeholder="0.12"
                     step="0.01"
                     min="0.01"
                     max="15"
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
                           :disabled="disabled || pool.isStopped || pool.isSentToSale"
              ></date-picker>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Sale end date</div>
            <div class="col-12 col-lg-6">
              <date-picker v-model="pool.saleEndDate"
                           :config="datepickerOptions"
                           class="form-control input-text w-100"
                           :disabled="disabled || pool.isStopped || pool.isSentToSale"
              ></date-picker>
            </div>
          </div>

          <div class="col-12 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 d-flex flex-row align-items-center">
              <div class="input-cb mr-3">
                <input type="checkbox" :disabled="disabled || pool.isStopped || pool.isSentToSale" v-model="pool.whitelistPool" id="whitelistPool" name=""/>
                <label for="whitelistPool"></label>
              </div>
              <label class="blue-18-reg mb-0" for="whitelistPool">Whitelist pool</label>
            </div>
          </div>


          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Minimum contribution</div>
            <div class="col-12 col-lg-6">
              <input type="number"
                     :disabled="disabled || pool.isStopped || pool.isSentToSale"
                     v-validate="'decimal|min_value:0'"
                     data-vv-name="Minimum contribution"
                     min="0"
                     step="0.000001"
                     class="form-control input-text w-100"
                     v-model="pool.minContribution"/>
              <span v-if="errors.has('Minimum contribution')" v-text="errors.first('Minimum contribution')" class="text-danger"></span>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Maximum contribution</div>
            <div class="col-12 col-lg-6">
              <input type="number"
                     :disabled="disabled || pool.isStopped || pool.isSentToSale"
                     v-validate="'decimal|min_value:0'"
                     min="0"
                     step="0.000001"
                     class="form-control input-text" data-vv-name="Maximum contribution"
                     v-model="pool.maxContribution"/>
              <span v-if="errors.has('Maximum contribution')" v-text="errors.first('Maximum contribution')" class="text-danger"></span>
            </div>
          </div>

          <div class="col-12 col-lg-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Withdraw timelock</div>
            <div class="col-12 col-lg-6">
              <input type="number"
                     :disabled="disabled || pool.isStopped || pool.isSentToSale"
                     v-validate="'required|decimal|min_value:0'"
                     data-vv-name="Withdraw time lock"
                     class="form-control input-text w-100"
                     v-model="pool.withdrawTimelock">
              <span v-if="errors.has('Withdraw time lock')" v-text="errors.first('Withdraw time lock')" class="text-danger"></span>
            </div>
          </div>

          <div class="col-12 col-lg-6">

          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Soft Cap</div>
            <div class="col-12 col-lg-6">
              <input type="number"
                     :disabled="disabled || pool.isStopped || pool.isSentToSale"
                     v-validate="'required|decimal|min_value:0'"
                     data-vv-name="Soft Cap"
                     step=0.01
                     class="form-control input-text w-100"
                     v-model="pool.minPoolGoal">
              <span v-if="errors.has('Soft Cap')" v-text="errors.first('Soft Cap')" class="text-danger"></span>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Hard Cap</div>
            <div class="col-12 col-lg-6">
              <input type="number"
                     :disabled="disabled || pool.isStopped || pool.isSentToSale"
                     v-validate="'decimal|min_value:0'"
                     data-vv-name="Hard Cap"
                     step=0.01
                     min=0
                     class="form-control input-text w-100"
                     v-model="pool.maxPoolAllocation">
              <span v-if="errors.has('Hard Cap')" v-text="errors.first('Hard Cap')" class="text-danger"></span>
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
        </div>
      </div>

      <hr class="blue-hr-fullw my-5 w-100">
    </section>

    <section class="mb-4" v-if="!disabled && pool.strictlyTrustlessPool">
      <div class="row mx-0 mb-2">
        <div class="col-12 col-md-6 mb-2 mb-lg-0">
          <input type="text" class="form-control input-text" v-model="sendToSaleWithCalldataSig"/>
        </div>

        <div class="col-12 col-md-6 mb-2 mb-lg-0">
          <button class="btn blue-submit btn-block" @click="sendSaleParticipateWithCalldata">
            Send Sale Participate With Calldata
          </button>
        </div>
      </div>

      <div class="row mx-0 mb-2">
        <div class="col-12 col-md-6 mb-2 mb-lg-0">
          <input type="text" class="form-control input-text" v-model="withdrawFromSaleWithCalldataSig"/>
        </div>

        <div class="col-12 col-md-6 mb-2 mb-lg-0">
          <button class="btn blue-submit btn-block" @click="sendSaleWithdrawRequestWithCalldata">
            Send Sale Withdraw Request With Calldata
          </button>
        </div>
      </div>

      <hr class="blue-hr-fullw my-5 w-100">
    </section>

    <section class="mb-4">
      <div>
        <div class="row mx-0 mb-2">
          <div class="col-12 col-lg-3 blue-18-reg mb-1">Pool Country blacklist:</div>
          <div class="col-12 col-lg-9">{{ blacklistedCountriesText }}</div>
        </div>

        <div class="row mx-0 mb-2" v-if="!disabled">
          <div class="col-12 col-md-8 mb-2 mb-lg-0">
            <country-select
                    multiple
                    v-model="countriesToAdd"
                    :options="selectableCountries"
                    :disabled="pool.isStopped || pool.isSentToSale" />
          </div>

          <div class="col-12 col-md-4 mb-2 mb-lg-0">
            <button class="btn btn-block blue-submit" @click="addToBlacklist" :disabled="pool.isStopped || pool.isSentToSale">
              Add to blacklist
            </button>
          </div>
        </div>

        <div class="row mx-0 mb-2" v-if="!disabled">
          <div class="col-12 col-md-8 mb-2 mb-lg-0">
            <country-select
                    multiple
                    v-model="countriesToRemove"
                    :options="blacklistedCountries"
                    :disabled="pool.isStopped || pool.isSentToSale"/>
          </div>

          <div class="col-12 col-md-4 mb-2 mb-lg-0">
            <button class="btn btn-block blue-submit" @click="removeFromBlacklist" :disabled="pool.isStopped || pool.isSentToSale">
              Remove from blacklist
            </button>
          </div>
        </div>

        <hr class="blue-hr-fullw my-5 w-100">
      </div>

      <div v-if="!disabled">
        <div class="row mx-0 mb-2">
            <div class="col-12 blue-18-reg">Admin addresses:</div>
            <div class="col-12">{{ adminAddressesText }}</div>
        </div>

        <div class="row mx-0 mb-2" v-if="!disabled">
          <div class="col-12 col-md-8 mb-2 mb-lg-0">
            <multiselect
                    class="w-100"
                    v-validate="'eth-address-array'"
                    data-vv-name="Admin addresses"
                    v-model="adminAddressesToAdd"
                    :multiple="true"
                    :options="[]"
                    :taggable="true"
                    @tag="addAdminAddressToAdd"
                    :disabled="pool.isStopped || pool.isSentToSale">
            </multiselect>
            <span v-if="errors.has('Add Admin addresses')" v-text="errors.first('Add Admin addresses')" class="text-danger"></span>
          </div>

          <div class="col-12 col-md-4 mb-2 mb-lg-0">
            <button class="btn btn-block blue-submit" @click="addAdminAddresses" :disabled="pool.isStopped || pool.isSentToSale">
              Add Admin addresses
            </button>
          </div>
        </div>

        <div class="row mx-0 mb-2" v-if="!disabled">
          <div class="col-12 col-md-8 mb-2 mb-lg-0">
            <multiselect
                    class="w-100"
                    v-validate="'eth-address-array'"
                    data-vv-name="Add Admin addresses"
                    v-model="adminAddressesToRemove"
                    :multiple="true"
                    :options="adminAddresses"
                    :disabled="pool.isStopped || pool.isSentToSale">
            </multiselect>
            <span v-if="errors.has('Admin addresses')" v-text="errors.first('Admin addresses')" class="text-danger"></span>
          </div>

          <div class="col-12 col-md-4 mb-2 mb-lg-0">
            <button class="btn btn-block blue-submit" @click="removeAdminAddresses" :disabled="pool.isStopped || pool.isSentToSale">
              Remove Admin addresses
            </button>
          </div>
        </div>

        <hr class="blue-hr-fullw my-5 w-100">
      </div>

      <div>
        <div class="row mx-0 mb-2">
          <div class="col-12 blue-18-reg">Whitelist addresses:</div>
          <div class="col-12">{{ whitelistAddressesText }}</div>
        </div>

        <!--v-if="!disabled"-->
        <div class="row mx-0 mb-2" v-if="!disabled">
            <div class="col-12 col-md-8 mb-2 mb-lg-0">
              <multiselect
                      class="w-100"
                      v-validate="'eth-address-array'"
                      data-vv-name="Add Whitelist addresses"
                      v-model="whitelistAddressesToAdd"
                      :multiple="true"
                      :options="[]"
                      :taggable="true"
                      @tag="addWhitelistAddressToAdd"
                      :disabled="pool.isStopped || pool.isSentToSale">
              </multiselect>
              <span v-if="errors.has('Add Whitelist addresses')" v-text="errors.first('Add Whitelist addresses')" class="text-danger"></span>
            </div>

            <div class="col-12 col-md-4 mb-2 mb-lg-0">
              <button class="btn btn-block blue-submit" @click="addWhitelistAddresses" :disabled="pool.isStopped || pool.isSentToSale">
                Add Whitelist addresses
              </button>
            </div>
        </div>

        <div class="row mx-0 mb-2" v-if="!disabled">
          <div class="col-12 col-md-8 mb-2 mb-lg-0">
            <multiselect
                    class="w-100"
                    v-validate="'eth-address-array'"
                    data-vv-name="Whitelist addresses"
                    v-model="whitelistAddressesToRemove"
                    :multiple="true"
                    :options="whitelistAddresses"
                    :disabled="pool.isStopped || pool.isSentToSale">
            </multiselect>
            <span v-if="errors.has('Whitelist addresses')" v-text="errors.first('Whitelist addresses')" class="text-danger"></span>
          </div>

          <div class="col-12 col-md-4 mb-2 mb-lg-0">
            <button class="btn btn-block blue-submit" @click="removeWhitelistAddresses" :disabled="pool.isStopped || pool.isSentToSale">
              Remove Whitelist addresses
            </button>
          </div>
        </div>

        <hr class="blue-hr-fullw my-5 w-100">
      </div>
    </section>

    <section class="mb-4">
      <div class="w-100" v-if="!disabled">
        <div class="w-100">
          <div class="o-border d-inline "></div>
          <div class="d-inline blue-36-20-bold"> Automations
            <hr align="left" class="blue-hr-2">
          </div>
        </div>

        <div class="row mx-0 mb-2">
          <div class="col-12">
            <span class="d-lg-inline-block orange-18-bold pr-2 px-0">Add auto send to sale GAS price in GWEI:</span>
          </div>
        </div>

        <div class="row mx-0 mb-2">
          <div class="col-12 col-md-4 mb-2 mb-lg-0">
            <input type="number" v-validate="`required|decimal`"
                   step="0.000001"
                   class="form-control input-text w-100" data-vv-name="Gwei amount"
                   v-model="sendToSaleGweiValue"
                   :disabled="pool.isStopped || pool.isSentToSale">
            <span v-if="errors.has('Gwei amount')" v-text="errors.first('Gwei amount')" class="text-danger"></span>
          </div>

          <div class="col-12 col-md-4 mb-2 mb-lg-0">
            <date-picker v-model="sendToSaleTime"
                         :config="datepickerOptions"
                         class="form-control input-text w-100"
                         :disabled="pool.isStopped || pool.isSentToSale">
            </date-picker>
          </div>

          <div class="col-12 col-md-4 d-flex flex-row flex-wrap">
            <button class="btn px-4 blue-submit btn-block" @click="addAutoSendToSale" :disabled="pool.isStopped || pool.isSentToSale">
              Add auto send to sale
            </button>
          </div>
        </div>

        <hr class="blue-hr-fullw my-5 w-100">
      </div>
    </section>

    <section class="mb-4">
      <div class="mb-4">
        <div class="o-border d-inline"></div>
        <div class="d-inline blue-36-20-bold"> Advanced Sale details
          <hr align="left" class="blue-hr-2">
        </div>
      </div>

      <div class="row mx-0 mb-2" v-if="!disabled">
        <div class="col-12 col-md-6 mb-2 mb-lg-0">
          <button class="btn px-4 blue-submit btn-block" @click="sendToSaleWithCalldata" :disabled="pool.isSentToSale || pool.isStopped">
            Send to sale with predefined calldata
          </button>
        </div>

        <div class="col-12 col-md-6 mb-2 mb-lg-0">
          <button class="btn px-4 blue-submit btn-block" @click="withdrawFromSaleWithCalldata" :disabled="!pool.isSentToSale">
            Withdraw with predefined calldata
          </button>
        </div>
      </div>

      <div class="row mx-0 mb-2" v-if="!disabled">
        <div class="col-12 col-md-6 mb-2 mb-lg-0">
          <input type="text" class="form-control input-text" v-model="sendToSaleCalldataFunctionSig" :disabled="pool.isSentToSale || pool.isStopped" />
        </div>

        <div class="col-12 col-md-6 mb-2 mb-lg-0">
          <button class="btn blue-submit px-4 w-100" @click="setSaleParticipateCalldata" :disabled="pool.isSentToSale || pool.isStopped">
            Set send to sale calldata
          </button>
        </div>
      </div>

      <div class="row mx-0 mb-2" v-if="!disabled">
        <div class="col-12 col-md-6 mb-2 mb-lg-0">
          <input type="text" class="form-control input-text" v-model="saleWithdrawCalldataFunctionSig" :disabled="!pool.isSentToSale" />
        </div>

        <div class="col-12 col-md-6 mb-2 mb-lg-0">
          <button class="btn blue-submit px-4 w-100" @click="setSaleWithdrawCalldata" :disabled="!pool.isSentToSale">
            Set withdraw calldata
          </button>
        </div>
      </div>

      <div class="row mx-0 mb-2" v-if="!disabled">
        <div class="col-12 col-md-6 mb-2 mb-lg-0">
          <input type="text" class="form-control input-text" v-model="sendToSaleWithCalldataParameterFunctionSig" :disabled="pool.isSentToSale || pool.isStopped" />
        </div>

        <div class="col-12 col-md-6 mb-2 mb-lg-0">
          <button class="btn blue-submit px-4 w-100" @click="sendToSaleWithCalldataParameter" :disabled="pool.isSentToSale || pool.isStopped">
            Send to sale with dynamic calldata
          </button>
        </div>
      </div>

      <div class="row mx-0 mb-2" v-if="!disabled">
        <div class="col-12 col-md-6 mb-2 mb-lg-0">
          <input type="text" class="form-control input-text" v-model="withdrawFromSaleWithCalldataParameterFunctionSig" :disabled="!pool.isSentToSale" />
        </div>

        <div class="col-12 col-md-6 mb-2 mb-lg-0">
          <button class="btn blue-submit px-4 w-100" @click="withdrawFromSaleWithCalldataParameter" :disabled="!pool.isSentToSale">
            Withdraw with dynamic calldata
          </button>
        </div>
      </div>
    </section>
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
import mewLinkBuilder from '../utils/mewLinkBuilder';
import openMewUrl from '../utils/openMewUrl';

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
      sendToSaleCalldataFunctionSig: '',
      saleWithdrawCalldataFunctionSig: '',
      sendToSaleWithCalldataParameterFunctionSig: '',
      withdrawFromSaleWithCalldataParameterFunctionSig: '',
    };
  },
  mounted() {
    this.initCountryData();
    this.initAddresses();
  },
  computed: {
    submitDisabled() {
      return !window.ethInitSuccess || this.pool.isStopped || this.pool.isSentToSale;
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
          duration: 5000,
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
      }
    },
    async removeAdminAddresses() {
      try {
        await this.connectICO.pool.removeAdmin(this.pool.poolAddress, this.adminAddressesToRemove);
        await this.initAddresses();

        this.$notify({
          type: 'success',
          text: 'Admin addresses successfully removed!',
          duration: 5000,
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
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
          duration: 5000,
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
      }
    },
    async removeWhitelistAddresses() {
      try {
        await this.connectICO.pool.removeWhitelist(this.pool.poolAddress, this.whitelistAddressesToRemove);
        await this.initAddresses();

        this.$notify({
          type: 'success',
          text: 'Whitelist addresses successfully removed!',
          duration: 5000,
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
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
          duration: 5000,
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
      }
    },
    async removeFromBlacklist() {
      try {
        await this.connectICO.pool.removeCountryBlacklist(this.pool.poolAddress, this.countriesToRemove);
        await this.initCountryData();

        this.$notify({
          type: 'success',
          text: 'Countries successfully removed from blacklist.',
          duration: 5000,
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
      }
    },
    async addAutoSendToSale() {
      try {
        const date = moment(this.sendToSaleTime, this.datepickerOptions.format).unix();
        const gasPrice = Web3.utils.toWei((this.sendToSaleGweiValue).toString(), 'gwei');
        const response = await this.connectICO.automations.addSendToSale(this.pool.poolAddress, date, gasPrice);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Auto send to sale successfully added!',
            duration: 5000,
          });
        } else if (this.mode === 'mew') {
          const gasCost = await this.connectICO.automations.getSendToSaleGasCost();
          const value = (gasPrice * gasCost).toString();
          const url = mewLinkBuilder(this.address, response.callData, value, await window.web3.eth.net.getNetworkType(), response.gasLimit);
          openMewUrl(url);
        }

        console.log(response);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
      }
    },
    async submit() {
      const validationResponse = await this.$validator.validateAll();
      if (!validationResponse) {
        this.errors.items.forEach((item) => {
          this.$notify({
            type: 'error',
            text: `${item.field}: ${item.msg}`,
            duration: 5000,
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
            text: 'Pool edit succesful!',
            duration: 5000,
          });
        }
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
      }
    },
    async sendSaleParticipateWithCalldata() {
      try {
        const response = await this.connectICO.pool.sendToSaleWithCalldataParameter(this.pool.poolAddress, this.sendToSaleWithCalldataSig);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Successful Send to Sale Participate With Calldata!',
            duration: 5000,
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

        console.log(response);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
      }
    },
    async sendSaleWithdrawRequestWithCalldata() {
      try {
        const response = await this.connectICO.pool.withdrawFromSaleWithCalldataParameter(this.pool.poolAddress, this.sendToSaleWithCalldataSig);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Successful Send to Sale Withdraw Request With Calldata!',
            duration: 5000,
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

        console.log(response);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
      }
    },
    async sendToSaleWithCalldata() {
      try {
        const response = await this.connectICO.pool.sendToSaleWithCalldata(this.pool.poolAddress);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Successful SendToSale with predefined calldata!',
            duration: 5000,
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

        console.log(response);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
      }
    },
    async withdrawFromSaleWithCalldata() {
      try {
        const response = await this.connectICO.pool.withdrawFromSaleWithCalldata(this.pool.poolAddress);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Successful Withdraw with predefined calldata!',
            duration: 5000,
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

        console.log(response);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
      }
    },
    async setSaleParticipateCalldata() {
      try {
        const response = await this.connectICO.pool.setSaleParticipateCalldata(this.pool.poolAddress, this.sendToSaleCalldataFunctionSig);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Successful Set SendToSale calldata!',
            duration: 5000,
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

        console.log(response);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
      }
    },
    async setSaleWithdrawCalldata() {
      try {
        const response = await this.connectICO.pool.setSaleWithdrawCalldata(this.pool.poolAddress, this.saleWithdrawCalldataFunctionSig);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Successful Set Withdraw calldata!',
            duration: 5000,
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

        console.log(response);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
      }
    },
    async sendToSaleWithCalldataParameter() {
      try {
        const response = await this.connectICO.pool.sendToSaleWithCalldataParameter(this.pool.poolAddress, this.sendToSaleWithCalldataParameterFunctionSig);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Successful SendToSale with dynamic calldata!',
            duration: 5000,
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

        console.log(response);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
      }
    },
    async withdrawFromSaleWithCalldataParameter() {
      try {
        const response = await this.connectICO.pool.withdrawFromSaleWithCalldataParameter(this.pool.poolAddress, this.withdrawFromSaleWithCalldataParameterFunctionSig);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Successful Withdraw with dynamic calldata!',
            duration: 5000,
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

        console.log(response);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
      }
    },
  },
};
</script>

<style lang="scss">

</style>
