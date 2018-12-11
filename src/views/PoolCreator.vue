<template>
  <main>
    <div class="row">
      <div class="d-none d-sm-flex col-1"></div>
      <div class="col-12 col-sm-10">
        <div class="d-none d-sm-block mt-5 blue-36-20-bold">Pool Creator</div>
        <hr align="left" class="d-none d-sm-block blue-hr">
        <div class="d-sm-none mobile-back row mx-0">
          <div class="my-auto pl-3"><img src="../assets/chevron-left.png" alt=""></div>
          <div class="white-16-bold my-auto">Pool Creator</div>
        </div>

        <div class="row">
          <div class="col-1"></div>
          <div class="col-10 mt-5 ">
            <!-- Creator -->
            <div class="o-border d-inline "></div>
            <div class="d-inline blue-36-20-bold"> Creator
              <hr align="left" class="blue-hr-2">
            </div>
            <div class="pl-3 blue-24-16-bold pt-3"> Sale ETH address:</div>
            <div class="row mx-0 pt-3">
              <div class="input-group w-100 w-sm-100">
                <input type="text" class="form-control input-dd"
                       v-model="pool.sale_address" placeholder="Sale ETH address"/>
              </div>
            </div>

            <div class="pl-3 blue-24-16-bold pt-3"> Token address (optional):</div>
            <div class="row mx-0 pt-3">
              <div class="input-group w-100 w-sm-100">
                <input type="text" class="form-control input-dd"
                       v-model="pool.token_address" placeholder="Token ETH address"/>
              </div>
            </div>

            <hr class="blue-hr-fullw my-5">

            <!-- Deal Details -->
            <div class="o-border d-inline"></div>
            <div class="d-inline mt-5 blue-36-20-bold"> Deal Details
              <hr align="left" class="blue-hr-2">
            </div>
            <div class="row pt-3">
              <div class="d-none d-lg-flex col-12 col-lg-12 row my-auto">
                <div class="col-12 col-lg-6 my-auto blue-18-reg">Creator fee (%):</div>
                <div class="col-12 col-lg-6 pt-3 pt-lg-0">
                  <input type="text" class="form-control input-text w-100 w-lg-80"
                         placeholder="2%" min="0" max="100" v-model="pool.fee">
                </div>
              </div>
            </div>
            <div class="row pt-3">
              <div class="d-none d-lg-flex col-12 col-lg-12 row my-auto">
                <div class="col-12 col-lg-2 my-auto blue-18-reg">Sale start date</div>
                <div class="col-12 col-lg-4 pt-3 pt-lg-0">
                  <input type="datetime-local" class="form-control input-text w-100 w-lg-80"
                         placeholder="2%" v-model="pool.start_date">
                </div>
                <div class="col-12 col-lg-2 my-auto blue-18-reg">Sale end date</div>
                <div class="col-12 col-lg-4 pt-3 pt-lg-0">
                  <input type="datetime-local" class="form-control input-text w-100 w-lg-80"
                         placeholder="2%" v-model="pool.end_date">
                </div>
              </div>
            </div>
            <div class="row pt-3">
              <div class="d-none d-lg-flex col-12 col-lg-12 row my-auto">
                <div class="col-12 col-lg-2 my-auto blue-18-reg">Minimum pool goal</div>
                <div class="col-12 col-lg-4 pt-3 pt-lg-0">
                  <input type="number" class="form-control input-text w-100 w-lg-80"
                         v-model="pool.min_pool_goal">
                </div>
                <div class="col-12 col-lg-2 my-auto blue-18-reg">Max allocation</div>
                <div class="col-12 col-lg-4 pt-3 pt-lg-0">
                  <input type="number" class="form-control input-text w-100 w-lg-80"
                         v-model="pool.max_allocation">
                </div>
              </div>
            </div>
            <div class="row my-auto mx-0 pt-3">
              <div class="input-cb">
                <input type="checkbox" v-model="pool.whitelist" id="autoWithdraw" name=""/>
                <label for="autoWithdraw"></label>
              </div>
              <div class="pl-3 blue-18-reg">Whitelist pool</div>
            </div>
            <div class="row my-auto mx-0 pt-3">
              <div class="col-12 col-lg-2 my-auto blue-18-reg">Withdraw timelock</div>
              <div class="col-12 col-lg-4 pt-3 pt-lg-0">
                <input type="datetime-local" class="form-control input-text w-100 w-lg-80"
                       v-model="pool.withdraw_time_lock">
              </div>
            </div>
            <div class="row pt-3">
              <div class="d-none d-lg-flex col-12 row my-auto">
                <div class="col-12 col-lg-5 blue-18-reg pt-3 pt-lg-0">
                  Minimum contribution (optional)
                </div>
                <div class="col-12 col-lg-7">
                  <input type="number" class="form-control input-dd"
                         v-model="pool.individual_min"/>
                </div>
                <div class="col-12 col-lg-5 blue-18-reg pt-3 pt-lg-0">
                  Maximum contribution (optional)
                </div>
                <div class="col-12 col-lg-7">
                  <input type="number" class="form-control input-dd"
                         v-model="pool.individual_max"/>
                </div>
              </div>
            </div>

            <div class="row pt-3 pb-5">
              <div class="col-6 col-lg-3 orange-18-reg">ConnectICO fee:</div>
              <div class="col-6 col-lg-5 orange-18-reg text-right text-lg-left">0,5%</div>
            </div>
            <div class="d-lg-none col-12 mx-0 px-0 row my-auto">
              <div class="col-12 col-lg-5 blue-18-reg pt-3 pt-lg-0">
                Minimum contribution (optional)
              </div>
              <div class="col-12 col-lg-7">
                <input type="number" class="form-control input-dd"
                       v-model="pool.individual_min"/>
              </div>
            </div>
            <div class="d-lg-none col-12 mx-0 px-0 row my-auto">
              <div class="col-12 col-lg-5 blue-18-reg pt-3 pt-lg-0">
                Maximum contribution (optional)
              </div>
              <div class="col-12 col-lg-7">
                <input type="number" class="form-control input-dd"
                       v-model="pool.individual_max"/>
              </div>
            </div>

            <div class="text-center my-5">
              <button class="btn blue-submit px-4" @click="submit">Submit</button>
            </div>

          </div>
          <div class="col-1"></div>
        </div>

      </div>
      <div class="d-none d-lg-flex col-1"></div>

    </div>
  </main>

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
