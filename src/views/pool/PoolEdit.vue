<template>
  <div class="container pt-4">
    <div class="mb-5">
      <div class="row mb-3">
        <div class="col-6 col-lg-3 mb-2 mb-lg-0">
          <button class="btn btn-block blue-submit" @click="sendFundsToSale" :disabled="!pool || pool.isSentToSale || pool.isStopped">
            Send funds to sale
          </button>
        </div>

        <div class="col-6 col-lg-3 mb-2 mb-lg-0">
          <button class="btn btn-block blue-submit" @click="stopPool" :disabled="(!pool || pool.isStopped) || (pool && pool.isSentToSale)">
            Stop pool
          </button>
        </div>

        <div class="col-6 col-lg-3 mb-2 mb-lg-0">
          <button class="btn btn-block blue-submit" @click="confirmTokensReceived" :disabled="!pool || !pool.isSentToSale">
            Confirms token received
          </button>
        </div>

        <div class="col-6 col-lg-3 mb-2 mb-lg-0">
          <button class="btn btn-block blue-submit" @click="creatorWithdraw">
            Creator withdraw
          </button>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-12 col-lg-6 mb-2 mb-lg-0">
          <input type="text" v-validate="'required|eth-address'" data-vv-name="Recipient address"
                 class="form-control input-text"
                 v-model="recipientAddress" placeholder="Recipient address"/>
        </div>

        <div class="col-12 col-lg-6 mb-2 mb-lg-0">
          <button class="btn btn-block blue-submit" @click="pushOutTokens">
            Push out tokens
          </button>
        </div>
      </div>
    </div>

    <pool :pool="this.pool" :disabled="false" v-if="pool" />
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
    async loadPool() {
      try {
        await this.connectICO.pool.pool.at(this.address);
        this.pool = new LocalPool(this.address);
      } catch (e) {
        this.$notify({
          type: 'error',
          text: 'Pool not found by the given address!',
          duration: 5000,
        });

        // console.log(e);
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
            duration: 5000,
          });
        }

        if (this.mode === 'mew') {
          const url = mewLinkBuilder(
            this.address,
            response.callData,
            0,
            await window.web3.eth.net.getNetworkType(),
            response.gasLimit,
          );
          openMewUrl(url);
        }

        this.loadPool();
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
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
            duration: 5000,
          });
        }

        if (this.mode === 'mew') {
          const url = mewLinkBuilder(
            this.address,
            response.callData,
            0,
            await window.web3.eth.net.getNetworkType(),
            response.gasLimit,
          );
          openMewUrl(url);
        }

        this.loadPool();
      } catch (e) {
        this.$notify({
          type: 'error',
          text: e.message,
          duration: 5000,
        });

        // console.log(e);
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
            duration: 5000,
          });
        }

        if (this.mode === 'mew') {
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
          duration: 5000,
        });

        // console.log(e);
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
            duration: 5000,
          });
        }

        if (this.mode === 'mew') {
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
          duration: 5000,
        });

        // console.log(e);
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
            duration: 5000,
          });
        }

        if (this.mode === 'mew') {
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
          duration: 5000,
        });

        // console.log(e);
      }
    },
  },
  created() {
    if (this.$route.params.address) {
      this.address = this.$route.params.address;
      this.loadPool();
    }
  },
};
</script>
