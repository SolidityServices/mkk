<template>
  <header class="d-flex justify-content-center">
    <div class="d-flex flex-row w-80 h-100">
      <div class="d-flex align-items-center justify-content-center justify-content-sm-start col-12 col-sm">
        <img src="../assets/logo.png" alt="">
      </div>

      <div class="align-items-center d-none d-sm-flex col-sm ml-auto justify-content-end">
        <span><a href="#"><img src="../assets/header/header-icon-1.png" alt=""></a></span>
        <span class="px-3">
                 <a href="#"><img src="../assets/header/header-icon-2.png" alt=""></a>
               </span>
        <span><a href="#"><img src="../assets/header/header-icon-3.png" alt=""></a></span>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss">

  header {
    height: 170px;
    background: url('../assets/header/header-bg.png') center;
    background-size: cover;
  }

  @media(max-width: 576px) {
    header {
      height: 110px;

      .header-logo {
        img {
          width: 50%;
        }
      }
    }
  }
</style>
