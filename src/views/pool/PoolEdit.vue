<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row justify-content-center pt-3">
      <button class="btn white-submit px-4 mx-3" @click="sendFundsToSale">
        Send funds to sale
      </button>

      <button class="btn white-submit px-4 mx-3" @click="stopPool">
        Stop pool
      </button>

      <button class="btn white-submit px-4 mx-3" @click="confirmTokensReceived">
        Confirms token received
      </button>

      <button class="btn white-submit px-4 mx-3" @click="creatorWithdraw">
        Creator withdraw
      </button>

    </div>

    <div class="d-flex flex-row justify-content-center col-12 col-lg-6 m-auto pt-3">
      <input type="text" v-validate="'required|eth-address'" data-vv-name="Recipient address"
             class="form-control input-text"
             v-model="recipientAddress" placeholder="Recipient address"/>

      <button class="btn white-submit px-4 mx-3" @click="pushOutTokens">
        Push out tokens
      </button>
    </div>

    <pool :pool="this.pool"
          :disabled="false"
          v-if="pool"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import 'vue-range-slider/dist/vue-range-slider.css';
import LocalPool from '../../model/LocalPool';
import Pool from '../../components/Pool.vue';

export default {
  data: () => ({
    address: '',
    pool: null,
    recipientAddress: '',
  }),
  components: {
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
      } else {
        this.$notify({
          type: 'error',
          title: 'Not found!',
          text: 'Pool not found by the given address!',
        });
      }
    },
    async sendFundsToSale() {
      try {
        await this.connectICO.pool.sendToSale(this.pool.poolAddress);
        this.$notify({
          type: 'success',
          text: 'Successfully sent funds to sale!',
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async stopPool() {
      try {
        await this.connectICO.pool.stopPool(this.pool.poolAddress);
        this.$notify({
          type: 'success',
          text: 'Pool successfully stopped!',
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async confirmTokensReceived() {
      try {
        const response = await this.connectICO.pool.areTokensReceivedConfirmed(this.pool.poolAddress);
        this.$notify({
          type: 'success',
          text: response,
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async creatorWithdraw() {
      try {
        await this.connectICO.pool.creatorWithdraw(this.pool.poolAddress);
        this.$notify({
          type: 'success',
          text: 'Successful creator withdraw!',
        });
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
        });
      }
    },
    async pushOutTokens() {
      try {
        await this.connectICO.pool.pushOutToken(this.pool.poolAddress, this.recipientAddress);
        this.$notify({
          type: 'success',
          text: 'Successful sale token push out!',
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
