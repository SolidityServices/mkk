<template>
  <header>
    <div class="d-none d-lg-flex row justify-content-md-center h-100">
      <div class="col col-lg-2 my-auto">
        <img src="../assets/logo.png" alt="">
      </div>
      <div class="col-md3-3 col-lg-6">
      </div>
      <div class="col col-lg-2 my-auto">
        <span><a href="#"><img src="../assets/header/header-icon-1.png" alt=""></a></span>
        <span class="px-3">
                 <a href="#"><img src="../assets/header/header-icon-2.png" alt=""></a>
               </span>
        <span><a href="#"><img src="../assets/header/header-icon-3.png" alt=""></a></span>
      </div>
    </div>
    <div class="d-lg-none row h-100">
      <div class="col-12 my-auto text-center header-logo">
        <img src="../assets/logo.png" alt="">
      </div>
    </div>
  </header>
</template>

<script>
export default {
};
</script>

<style lang="scss">

  header {
    background-image: url('../assets/header/header-bg.png');
    height: 170px;
    background-position: center;
    background-size: cover;
  }

  @media(max-width: 576px) {
    header {
      height: 110px;
    }
  }

  @media(max-width: 576px) {
    header {
      .header-logo {
        img {
          width: 50%;
        }
      }
    }
  }

</style>
