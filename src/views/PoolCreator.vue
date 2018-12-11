<template>
  <div>
    <div class="w-100 mb-4">
      <div class="container d-none d-sm-block mt-5">
        <div class="blue-36-20-bold">Pool Creator</div>
        <hr align="left" class="d-none d-sm-block blue-hr">
      </div>

      <div class="d-sm-none mobile-back d-flex flex-row">
        <div class="d-flex justify-content-center align-items-center ml-3"><img src="../assets/chevron-left.png" alt=""></div>
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
          <div class="col-12 blue-24-16-bold py-3 pl-4"> Sale ETH address:</div>
          <div class="col-12 input-group w-100">
            <input type="text" class="form-control input-text"
                   v-model="pool.sale_address" placeholder="Sale ETH address"/>
          </div>
        </div>

        <div class="d-flex flex-column col-12">
          <div class="col-12 blue-24-16-bold py-3 pl-4"> Token address (optional):</div>
          <div class="col-12 input-group w-100">
            <input type="text" class="form-control input-text"
                   v-model="pool.token_address" placeholder="Token ETH address"/>
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
            <div class="col-12 col-lg-6 blue-18-reg">Creator fee (%):</div>
            <div class="col-12 col-lg-6">
              <input type="text" class="form-control input-text w-100"
                     placeholder="2%" min="0" max="100" v-model="pool.fee">
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg"></div>
            <div class="col-12 col-lg-6"></div>
          </div>


          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Sale start date</div>
            <div class="col-12 col-lg-6">
              <input type="datetime-local" class="form-control input-text w-100"
                     placeholder="2%" v-model="pool.start_date">
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Sale end date</div>
            <div class="col-12 col-lg-6">
              <input type="datetime-local" class="form-control input-text w-100"
                     placeholder="2%" v-model="pool.end_date">
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Minimum pool goal</div>
            <div class="col-12 col-lg-6">
              <input type="number" class="form-control input-text w-100"
                     v-model="pool.min_pool_goal">
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Max allocation</div>
            <div class="col-12 col-lg-6">
              <input type="number" class="form-control input-text w-100"
                     v-model="pool.max_allocation">
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 d-flex flex-row align-items-center">
              <div class="input-cb mr-3">
                <input type="checkbox" v-model="pool.whitelist" id="autoWithdraw" name=""/>
                <label for="autoWithdraw"></label>
              </div>
              <div class="blue-18-reg">Whitelist pool</div>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Withdraw timelock</div>
            <div class="col-12 col-lg-6">
              <input type="datetime-local" class="form-control input-text w-100"
                     v-model="pool.withdraw_time_lock">
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Minimum contribution (optional)</div>
            <div class="col-12 col-lg-6">
              <input type="number" class="form-control input-text w-100"
                     v-model="pool.individual_min"/>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg">Maximum contribution (optional)</div>
            <div class="col-12 col-lg-6">
              <input type="number" class="form-control input-text"
                     v-model="pool.individual_max"/>
            </div>
          </div>

          <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
            <div class="col-12 col-lg-6 blue-18-reg"></div>
            <div class="col-12 col-lg-6">

            </div>
          </div>

        </div>
      </div>

      <div class="d-flex flex-row ml-sm-5 mt-3">
        <div class="col-12 col-md-6 d-flex flex-row align-items-center mt-3 flex-wrap">
          <div class="col-6 orange-18-reg">ConnectICO fee:</div>
          <div class="col-6 orange-18-reg text-right text-lg-left">0,5%</div>
        </div>
      </div>

      <div class="d-flex flex-row justify-content-center my-5">
        <button class="btn blue-submit px-4" @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pool: {
        sale_address: '0x0000000000000000000000000000000000000000',
        token_address: '0x0000000000000000000000000000000000000000',
        net_amount: 0,
        individual_min: 0,
        individual_max: 0,
        fee: 2,
        start_date: null,
        end_date: null,
        whitelist: false,
        receiver_address: null,
        auto_transfer: false,
        time: false,
        amount: false,
        min_pool_goal: 0,
        max_allocation: 0,
        withdraw_time_lock: null,
      },
      blockWithdraw: 50,
    };
  },
  computed: {
    transferValue() {
      return (
        window.connectICO.getFlatFee()
        + window.connectICO.getMaxAllocationFeeRate()
        * this.pool.max_allocation / 1000
      );
    },
  },
  methods: {
    submit() {
      window.connectICO.createPool(
        this.pool.sale_address,
        this.pool.token_address,
        this.pool.fee,
        this.pool.start_date,
        this.pool.end_date,
        this.pool.individual_min,
        this.pool.individual_max,
        this.pool.min_pool_goal,
        this.pool.max_allocation,
        this.pool.withdraw_time_lock,
        this.pool.whitelist,
        this.transferValue,
      );
      /*
      createPool(
    saleAddress,
    tokenAddress,
    creatorFeeRate,
    saleStartDate,
    saleEndDate,
    minContribution,
    maxContribution,
    minPoolGoal,
    maxPoolAllocation,
    withdrawTimelock,
    whitelistPool,
    transferValue,
       */
    },
  },
};
</script>

<style lang="scss">

</style>
