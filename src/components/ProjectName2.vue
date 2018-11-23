<template>

  <main>
    <app-header></app-header>
    <div class="row">
      <div class="d-none d-sm-flex col-1"></div>
      <div class="col-12 col-sm-10">
        <div class="d-none d-sm-block mt-5 blue-36-20-bold">Project Name</div>
        <hr align="left" class="d-none d-sm-block blue-hr">
        <div class="d-sm-none mobile-back row mx-0">
          <div class="my-auto pl-3"><img src="../assets/chevron-left.png" alt=""></div>
          <dir class="white-16-bold my-auto">Project Name</dir>
        </div>

        <div class="row">
          <div class="col-1"></div>
          <div class="col-10 mt-5 ">
            <div class="o-border d-inline "></div>
            <div class="d-inline blue-36-20-bold"> Project Description
              <div class="d-lg-none orange-20-reg d-inline edit-mobile mx-2">edit</div>
              <div class="d-none d-lg-block edit orange-14-reg">edit</div>
              <hr align="left" class="blue-hr-2">
            </div>
            <div class="blue-18-reg pl-3">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit,
                vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus,
                ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique,
                tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris
                sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio,
                elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis.
                Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus
                varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem
                sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris,
                malesuada quis ornare accumsan, blandit sed diam.
              </p>

            </div>

            <hr class="blue-hr-fullw my-5">

            <!-- Deal Details -->

            <div class="o-border d-inline "></div>
            <div class="d-inline blue-36-20-bold"> Deal Details
              <hr align="left" class="blue-hr-2">
            </div>
            <div class="row mx-0">
              <div class="col-12 col-lg-3 pt-3">
                <div class="blue-18-bold text-center text-lg-left">Creator</div>
                <div class="creator-block mt-3 mx-auto"></div>
                <div class="d-none d-lg-block text-center pt-3">
                  <button class="btn white-submit">Send the found</button>
                </div>

              </div>
              <div class="col-12 col-lg-4 pt-3">
                <div class="blue-18-bold">Parameters
                  <div class="d-lg-none orange-20-reg d-inline edit-mobile mx-2">edit</div>
                </div>
                <div class="row">

                  <div class="py-1 col-12 d-none d-lg-block orange-18-reg">edit</div>

                  <div class="py-1 col-8 blue-18-reg">Net amount (ETH):</div>
                  <div class="py-1 col-4 orange-18-bold text-right">1000</div>

                  <div class="py-1 col-8 blue-18-reg">Fee</div>
                  <div class="py-1 col-4 orange-18-bold text-right">3%</div>

                  <div class="py-1 col-8 blue-18-reg">ConnectICO Fee</div>
                  <div class="py-1 col-4 orange-18-bold text-right">0,5%</div>

                  <div class="py-1 col-8 blue-18-reg">Individual Min</div>
                  <div class="py-1 col-4 orange-18-bold text-right">5</div>

                  <div class="py-1 col-8 blue-18-reg">Individual Max:</div>
                  <div class="py-1 col-4 orange-18-bold text-right">2000</div>
                </div>
              </div>
              <div class="col-12 col-lg-5 pt-3">
                <div class="blue-18-bold">Others</div>
                <div class="blue-18-bold pt-2">KYC</div>
                <div class="position-relative">
                  <img class="worldmap" src="../assets/worldmap.png" alt="">
                </div>
              </div>
            </div>
            <div class="blue-18-bold pt-3 pl-3 mt-3">Auto distribution</div>
            <div class="row mx-0 pt-3">
              <div class="col-12 col-lg-4 row">
                <div class="col-12 orange-18-reg">18 day 22 hours 45 minutes</div>
                <div class="col-6 pt-3 pt-lg-0 mx-0 row my-auto pt-2">
                  <div class="input-radio">
                    <input type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
                    <label for="exampleRadios1"></label>
                  </div>
                  <div class="pl-3 blue-18-reg">ON</div>
                </div>
                <div class="col-6 pt-3 pt-lg-0 mx-0 row my-auto pt-2">
                  <div class="input-radio">
                    <input type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
                    <label for="exampleRadios2"></label>
                  </div>
                  <div class="pl-3 blue-18-reg">OFF</div>
                </div>
              </div>
              <div class="col-12 col-lg-2 pt-4 pt-lg-0">
                <div class="blue-18-bold text-center">Amount</div>
                <div class="orange-24-bold text-center pt-2">85 ETH</div>
              </div>
            </div>
            <div class="row mx-0 pt-3">

            </div>
            <div class="row mx-0 pt-5">
              <div class="col-6 col-lg-2 orange-24-16-bold px-0 order-1"> Total filled</div>
              <div class="col-12 col-lg-4 pt-1 order-3 order-lg-2 px-0">
                <div class="w-100">
                  <range-slider
                    class="slider w-100 pt-1"
                    min="0"
                    max="100"
                    step="1"
                    v-model="sliderTotalFilled">
                  </range-slider>
                </div>
              </div>
              <div class="col-6 col-lg-2 orange-24-16-bold px-0 order-2 order-lg-3 text-right text-lg-left"> 60/100
                ETH
              </div>
            </div>

            <hr class="blue-hr-fullw my-5">

            <!-- My contributions -->

            <div class="o-border d-inline "></div>
            <div class="d-inline blue-36-20-bold"> Contributions
              <hr align="left" class="blue-hr-2">
            </div>
            <div class="row py-4 ">
              <div class="col-12 col-lg-6 row mx-0 px-0">
                <div class="col-12 col-lg-6 row pt-4 pt-lg-0 mx-0 px-0">
                  <div class="col-6 blue-18-reg">Tx1</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">TxHash</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">Amount</div>
                  <div class="col-6 orange-18-bold">1000</div>
                </div>
                <div class="col-12 col-lg-6 row pt-4 pt-lg-0 mx-0 px-0">
                  <div class="col-6 blue-18-reg">Tx2</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">TxHash</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">Amount</div>
                  <div class="col-6 orange-18-bold">1000</div>
                </div>
              </div>
              <div class="col-12 col-lg-6 row mx-0 px-0">
                <div class="col-12 col-lg-6 row pt-4 pt-lg-0 mx-0 px-0">
                  <div class="col-6 blue-18-reg">Tx1</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">TxHash</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">Amount</div>
                  <div class="col-6 orange-18-bold">1000</div>
                </div>
                <div class="col-12 col-lg-6 row pt-4 pt-lg-0 mx-0 px-0">
                  <div class="col-6 blue-18-reg">Tx2</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">TxHash</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">Amount</div>
                  <div class="col-6 orange-18-bold">1000</div>
                </div>
              </div>
            </div>
            <div class="row py-4">
              <div class="col-12 col-lg-6 row mx-0 px-0">
                <div class="col-12 col-lg-6 row pt-4 pt-lg-0 mx-0 px-0">
                  <div class="col-6 blue-18-reg">Tx1</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">TxHash</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">Amount</div>
                  <div class="col-6 orange-18-bold">1000</div>
                </div>
                <div class="col-12 col-lg-6 row pt-4 pt-lg-0 mx-0 px-0">
                  <div class="col-6 blue-18-reg">Tx2</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">TxHash</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">Amount</div>
                  <div class="col-6 orange-18-bold">1000</div>
                </div>
              </div>
              <div class="col-12 col-lg-6 row mx-0 px-0">
                <div class="col-12 col-lg-6 row pt-4 pt-lg-0 mx-0 px-0">
                  <div class="col-6 blue-18-reg">Tx1</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">TxHash</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">Amount</div>
                  <div class="col-6 orange-18-bold">1000</div>
                </div>
                <div class="col-12 col-lg-6 row pt-4 pt-lg-0 mx-0 px-0">
                  <div class="col-6 blue-18-reg">Tx2</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">TxHash</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">Amount</div>
                  <div class="col-6 orange-18-bold">1000</div>
                </div>
              </div>
            </div>
            <div class="row py-4 mb-5">
              <div class="col-12 col-lg-6 row mx-0 px-0">
                <div class="col-12 col-lg-6 row pt-4 pt-lg-0 mx-0 px-0">
                  <div class="col-6 blue-18-reg">Tx1</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">TxHash</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">Amount</div>
                  <div class="col-6 orange-18-bold">1000</div>
                </div>
                <div class="col-12 col-lg-6 row pt-4 pt-lg-0 mx-0 px-0">
                  <div class="col-6 blue-18-reg">Tx2</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">TxHash</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">Amount</div>
                  <div class="col-6 orange-18-bold">1000</div>
                </div>
              </div>
              <div class="col-12 col-lg-6 row mx-0 px-0">
                <div class="col-12 col-lg-6 row pt-4 pt-lg-0 mx-0 px-0">
                  <div class="col-6 blue-18-reg">Tx1</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">TxHash</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">Amount</div>
                  <div class="col-6 orange-18-bold">1000</div>
                </div>
                <div class="col-12 col-lg-6 row pt-4 pt-lg-0 mx-0 px-0">
                  <div class="col-6 blue-18-reg">Tx2</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">TxHash</div>
                  <div class="col-6 orange-18-bold">1000</div>

                  <div class="col-6 blue-18-reg">Amount</div>
                  <div class="col-6 orange-18-bold">1000</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-1"></div>
        </div>
      </div>
      <div class="d-none d-sm-flex col-1"></div>
    </div>

    <app-footer></app-footer>
  </main>

</template>

<script>
import RangeSlider from 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';

export default {
  data() {
    return {
      sliderTotalFilled: 20,
      sliderETH: 50,
    };
  },
  components: {
    RangeSlider,
  },
};
</script>

<style lang="scss">
  @import '../scss/mixins';
  @import '../scss/variables';

  .worldmap {
    position: absolute;
    @include breakpoint(md) {
      position: relative;
      width: 100%;
    }
  }

  .edit {
    position: absolute;
    left: 190px;
    margin-top: -10px;
  }

  .edit-mobile {
    border-left: 4px solid $blue;
    padding: 0px 15px 0px 10px;
  }

</style>
