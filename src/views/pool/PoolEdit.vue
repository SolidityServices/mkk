<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row justify-content-center pt-3">
      <button class="btn blue-submit px-4 mx-3" @click="sendFundsToSale">
        Send funds to sale
      </button>

      <button class="btn blue-submit px-4 mx-3" @click="stopPool">
        Stop pool
      </button>

      <button class="btn blue-submit px-4 mx-3" @click="confirmTokensReceived">
        Confirms token received
      </button>

      <button class="btn blue-submit px-4 mx-3" @click="creatorWithdraw">
        Creator withdraw
      </button>
    </div>

    <div class="d-flex flex-row justify-content-center col-12 col-lg-6 m-auto pt-3">
      <input type="text" v-validate="'required|eth-address'" data-vv-name="Recipient address"
             class="form-control input-text"
             v-model="recipientAddress" placeholder="Recipient address"/>

      <button class="btn blue-submit px-4 mx-3" @click="pushOutTokens">
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
import mewLinkBuilder from '../../utils/mewLinkBuilder';
import openMewUrl from '../../utils/openMewUrl';

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
    async sendFundsToSale() {
      try {
        const response = await this.connectICO.pool.sendToSale(this.pool.poolAddress);

        console.log(response);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Successfully sent funds to sale!',
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
    async stopPool() {
      try {
        const response = await this.connectICO.pool.stopPool(this.pool.poolAddress);

        console.log(response);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Pool successfully stopped!',
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
    async confirmTokensReceived() {
      try {
        const response = await this.connectICO.pool.confirmTokensReceived(this.pool.poolAddress, 0);

        console.log(response);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: response,
            duration: -1,
          });
        } else if (this.mode === 'mew') {
          // @TODO
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
    async creatorWithdraw() {
      try {
        const response = await this.connectICO.pool.creatorWithdraw(this.pool.poolAddress);

        console.log(response);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Successful creator withdraw!',
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
    async pushOutTokens() {
      try {
        const response = await this.connectICO.pool.pushOutToken(this.pool.poolAddress, this.recipientAddress);

        console.log(response);

        if (this.mode === 'mm') {
          this.$notify({
            type: 'success',
            text: 'Successful sale token push out!',
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
  },
  mounted() {
    if (this.$route.params.address) {
      this.address = this.$route.params.address;
      this.search();
    }
  },
};
</script>
