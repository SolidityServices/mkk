<template>
  <div>
    <div class="d-lg-none my-4 flex-column justify-content-center">
      <div class="w-50 mx-auto text-center">
        <img class="img-fluid" src="../assets/3D_logo.png" alt="">
      </div>
      <div class="blue-18-bold w-50 text-center mx-auto mt-4">
        We bring these two sides together, creating critical support for ICO founders and exclusive
        deals for our member all while giving our community a powerful voice in the ICO market.
      </div>
    </div>

    <footer class="d-flex justify-content-center">
      <div class="d-flex flex-row w-80">
        <div class="d-none d-lg-flex flex-row col-6">
          <div class="d-flex align-items-center justify-content-center col-2">
            <img src="../assets/3D_logo.png" alt="">
          </div>

          <div class="col col-lg-10 my-auto pt-5 pl-5">
            <img src="../assets/connectico.png" alt="">
            <p class="white-16-bold pt-4">
              We bring these two sides together, creating
              critical support for ICO founders and exclusive
              deals for our member all while giving our community
              a powerful voice in the ICO market.
            </p>
          </div>
        </div>
        <div class="d-flex flex-column justify-content-center mx-auto mr-lg-0">
          <div class="white-36-bold pb-3 text-center d-none d-lg-flex">Get connected</div>
          <div class="white-24-bold pb-3 text-center d-flex d-lg-none">Get connected</div>
          <div class="text-center">
            <span><a href="#"><img src="../assets/header/header-icon-1.png" alt=""></a></span>
            <span class="px-3">
              <a href="#"><img src="../assets/header/header-icon-2.png" alt=""></a>
            </span>
            <span>
              <a href="#"><img src="../assets/header/header-icon-3.png" alt=""></a>
            </span>
          </div>
        </div>
      </div>
    </footer>

    <div class="w-100 text-center blue-18-reg footer-bottom">
      All Rights Reserved Connectico Ltd. 2018.
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">

  footer {
    height: 550px;
    background: url('../assets/footer-bg.png') center;
    background-size: cover;
  }

  @media(max-width: 992px) {
    footer {
      height: 250px;
    }
  }

  @media(max-width: 576px) {
    footer {
      .header-logo {
        img {
          width: 50%;
        }
      }
    }
  }

  .footer-bottom {
    height: 40px;
    line-height: 40px;
  }

</style>
