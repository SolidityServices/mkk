<template>
  <div>
    <app-header class="d-lg-none"></app-header>
    <main class="main">
      <div class="container">
        <div class="d-none d-lg-flex justify-content-between py-4">
          <div></div>
          <div><img src="../assets/logo.png" alt=""></div>
          <div>
            <span><a href="#"><img src="../assets/header/header-icon-1.png" alt=""></a></span>
            <span class="px-3"><a href="#"><img src="../assets/header/header-icon-2.png" alt=""></a></span>
            <span><a href="#"><img src="../assets/header/header-icon-3.png" alt=""></a></span>
          </div>
        </div>
      </div>
      <div class="d-lg-none mobile-back row mx-0">
        <div class="my-auto pl-3"><img src="../assets/chevron-left.png" alt=""></div>
        <dir class="white-16-bold my-auto">Pool Creator</dir>
      </div>
      <div class="container">
        <div class="content mt-3">
          <div class="mx-5">
            <div class="d-none d-lg-block py-5">
              <button class="btn display-btn"> Display Contract</button>
            </div>

            <div class="row">
              <div class="col-12 col-lg-6 ">
                <div class="white-36-bold text-center pb-5">Manual</div>
                <div class="o-border-right pr-5">
                  <div class="white-24-bold">Sender address</div>
                  <input class="input-deploy" type="text" placeholder="Sender address">
                  <hr class="orange-hr mb-5">
                  <div class="white-24-bold">Receiver address</div>
                  <input class="input-deploy" type="text" placeholder="Receiver address">
                  <hr class="orange-hr mb-5">
                  <div class="white-24-bold">Gas Limit</div>
                  <input class="input-deploy" type="text" placeholder="Gas Limit">
                  <hr class="orange-hr mb-5">
                  <div class="white-24-bold">Data</div>
                  <input class="input-deploy" type="text" placeholder="Data">
                  <hr class="orange-hr mb-5">
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="white-36-bold text-center pb-5">Automatic</div>
                <div class="pl-0 pl-lg-5">
                  <div class="row mb-5">
                    <div class="col-8 white-24-bold pt-2">Metamask
                      <hr class="orange-hr">
                    </div>
                    <div class="col-4">
                      <div class="grey-box"></div>
                    </div>
                  </div>
                  <div class="row mb-5">
                    <div class="col-8 white-24-bold pt-2">MEW
                      <hr class="orange-hr">
                    </div>
                    <div class="col-4">
                      <div class="grey-box"></div>
                    </div>
                  </div>
                  <div class="row mb-5">
                    <div class="col-8 white-24-bold pt-2">Mycrypto
                      <hr class="orange-hr">
                    </div>
                    <div class="col-4">
                      <div class="grey-box"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pb-4 d-none d-lg-block">
              <div class="text-center">
                <img src="../assets/logo-small.png" alt="">
              </div>
              <div class="text-center white-18-reg">Once tx received auto redirect to contributor page</div>
            </div>
          </div>

        </div>
      </div>
      <div class="deploy-footer bg-white d-none d-lg-block">
        <div class="container">
          <div class="d-flex">
            <div class="p-2 w-100 pt-4">
              <img class="w-40" src="../assets/logo-blue.png" alt="">
              <div class="text-center ml-5">
                <hr align="left" class="d-none d-sm-block blue-hr ml-5">
                <div class="blue-16-bold ml-5 text-left">
                  We bring these two sides together, creating critical support for ICO founders and exclusive
                  deals for our member all while giving our community a powerful voice in the ICO market
                </div>
              </div>
            </div>
            <div class="px-4 w-40 pt-5 flex-shrink-1">
              <div class=" text-center blue-24-bold">Get Connected</div>
              <div class="text-center">
                <span><a href="#"><img src="../assets/footer/blue-icon-1.png" alt=""></a></span>
                <span class="px-3"><a href="#"><img src="../assets/footer/blue-icon-2.png" alt=""></a></span>
                <span><a href="#"><img src="../assets/footer/blue-icon-3.png" alt=""></a></span>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center blue-16-reg pt-5">
          All Rights Reserved Connectico Ltd. 2018.
        </div>

      </div>

    </main>
    <app-footer class="d-lg-none pt-4"></app-footer>
  </div>

</template>

<script>
  export default {};
</script>

<style lang="scss">

  @import '../scss/main';

  .main {
    background-image: url('../assets/conectico_hero_img.png');
    background-position: center top;
    background-size: 100% 100%;
    .content {
      border: 1px solid $orange;
      border-bottom: 0;
      border-radius: 20px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      background-color: rgba(255, 255, 255, 0.2);
      @include breakpoint(sm) {
        border: none;
        background-color: transparent;
      }
      .grey-box {
        height: 90px;
        width: 90px;
        background-color: grey;
      }
    }
    .deploy-footer {
      height: 300px;;
    }
  }

</style>
