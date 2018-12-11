<template>
    <div class="d-flex flex-column w-100">
      <div class="d-flex flex-row">
        <div class="active-block white-12-bold">ACTIVE</div>
      </div>
      <div class="d-flex flex-row flex-wrap">
        <div class="col-12 col-lg-3 border-right">
          <div class="px-4 pt-1">
            <div class="orange-24-bold">Sparkster
              <span class="pl-3 d-inline">
                <img src="../assets/heart.png" alt=""/>
              </span>
            </div>
            <div class="d-flex pt-1">
              <div class="pr-1"><img src="../assets/b-icon-1.png" alt=""></div>
              <div class="pr-1"><img src="../assets/b-icon-2.png" alt=""></div>
              <div class="pr-1"><img src="../assets/b-icon-3.png" alt=""></div>
            </div>
            <div class="d-flex pt-2">
              <div class="pr-1"><img src="../assets/alarm.png" alt=""></div>
              <div class="pl-2 blue-16-reg">Counter:</div>
              <div class="blue-16-bold">18:05:60</div>
            </div>
            <div class="d-flex mt-2">
              <div class="my-2">
                <button class="btn blue-btn-2 blue-10-bold">Show Details</button>
              </div>
              <div class="my-2 ml-3">
                <button class="btn blue-btn-2 blue-10-bold px-3">Pledge</button>
              </div>
            </div>

          </div>
        </div>

        <div class="col-12 col-lg-3 border-right">
          <div class="px-4 pt-2">
            <div class="blue-16-reg">Deal type</div>
            <div class="orange-16-bold">AFFILIATE</div>
            <div class="d-flex pt-3">
              <div class="blue-16-reg">Bonus:</div>
              <div class="blue-16-bold">20%</div>
            </div>
            <div class="d-flex">
              <div class="blue-16-reg">Max allocation:</div>
              <div class="blue-16-bold">200 ETH</div>
            </div>
            <div class="d-flex">
              <div class="blue-16-reg">Hard cap:</div>
              <div class="blue-16-bold">20M USD</div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-6">
          <div class="row mx-0 px-4 pt-0 pt-xl-2">
            <div>
              <div class="d-flex">
                <div class="blue-16-reg">Vesting:</div>
                <div class="blue-16-bold">3 months</div>
              </div>
              <div class="d-flex">
                <div class="blue-16-reg">Min. contribution:</div>
                <div class="blue-16-bold">1 ETH</div>
              </div>
              <div class="d-flex">
                <div class="blue-16-reg">Max. contribution:</div>
                <div class="blue-16-bold">10 ETH</div>
              </div>
              <div class="d-flex">
                <div class="blue-16-reg">Fee:</div>
                <div class="blue-16-bold">4%</div>
              </div>
            </div>
            <div class="ml-auto position-relative">
              <div class="profile-img"
                   :style="{'background-image': 'url(' + require('../assets/casey.jpg') + ')'}">
                <div class="profile-filter"></div>
              </div>
              <div class="profile-name white-12-bold">Casey Neistat</div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-row">
        <hr class="blue-hr-fullw w-100">
      </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
  @import '../scss/variables';
  @import '../scss/mixins';
  @import '../scss/main';

  .active-block {
    background-color: $orange;
    display: block;
    padding: 5px 10px;
    width: 100px;
    text-align: right;
  }

  .border-right {
    border-right: 1px solid $blue !important;
  }

  .profile-img {
    height: 110px;
    width: 110px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    border: 2px solid $blue;
  }

  .profile-filter {
    position: absolute;
    background-color: rgba(253, 83, 52, 0.4);
    height: 110px;
    width: 110px;
    border-radius: 50%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .profile-name {
    position: absolute;
    left: -80px;
    bottom: -10px;
    background-color: $orange;
    padding: 5px 30px;
    width: 150px;
    text-align: center
  }

  .blue-btn-2 {
    border: 2px solid $blue;
    height: 30px;
    border-radius: 20px;
    background-color: $white;
    color: $blue;
    font-weight: 700;
    &:hover, &:focus, &:active {
      color: $white;
      background-color: $blue;
    }
  }

  @media (min-width: 1367px) {
    .col-2xl-4 {
      -ms-flex: 0 0 33.333333%;
      -webkit-box-flex: 0;
      flex: 0 0 33.333333%;
      max-width: 33.333333%;
    }
    .col-2xl-3 {
      -ms-flex: 0 0 25%;
      -webkit-box-flex: 0;
      flex: 0 0 25%;
      max-width: 25%;
    }
    .col-2xl-7 {
      -webkit-box-flex: 0;
      flex: 0 0 58.333333%;
      max-width: 58.333333%;
    }
  }
</style>
