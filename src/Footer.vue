<template>

<div>
    <div class="footer-top d-lg-none">
        <div class="text-center">
            <img class="w-50" src="./assets//3D_logo-mobile.png" alt="">
        </div>
        <div class="blue-18-bold w-50 text-center mx-auto my-4">
            We bring these two sides together, creating
            critical support for ICO founders and exclusive
            deals for our member all while giving our community
            a powerful voice in the ICO market.
        </div>
    </div>
    <footer>
        <div class="d-none d-lg-flex row justify-content-md-center h-100">
            <div class="col col-lg-5 my-auto row">
                <div class="col-2 pr-5">
                   <img src="./assets//3D_logo.png" alt="">
                </div>
                <div class="col col-lg-10 my-auto pt-5 pl-5">
                    <img src="./assets/connectico.png" alt="">
                    <p class="white-16-bold pt-4">
                        We bring these two sides together, creating
                        critical support for ICO founders and exclusive
                        deals for our member all while giving our community
                        a powerful voice in the ICO market.
                    </p>
                </div>
            </div>
            <div class="col-md-3 col-lg-2">
            </div>
            <div class="col col-lg-4 my-auto">
                <div class="white-36-bold pb-3 text-center">Get connected</div>
                <div class="text-center">
                    <span><a href="#"><img src="./assets/header/header-icon-1.png" alt=""></a></span>
                    <span class="px-3"><a href="#"><img src="./assets/header/header-icon-2.png" alt=""></a></span>
                    <span><a href="#"><img src="./assets/header/header-icon-3.png" alt=""></a></span>
                </div>
            </div>
        </div>
        <div class="d-lg-none">
            <div class="white-24-bold pb-3 text-center pt-5">Get connected</div>
            <div class="text-center pt-3">
               <span><a href="#"><img src="./assets/header/header-icon-1.png" alt=""></a></span>
               <span class="px-3"><a href="#"><img src="./assets/header/header-icon-2.png" alt=""></a></span>
               <span><a href="#"><img src="./assets/header/header-icon-3.png" alt=""></a></span>
            </div>
        </div>
    </footer>
    <div class="w-100 text-center blue-18-reg footer-bottom">
        All Rights Reserved Connectico Ltd. 2018.
    </div>
</div>
    
</template>

<script>
export default {
    
}
</script>

<style lang="scss">

footer {
    background-image: url('./assets/footer-bg.png');
    height: 550px;
    background-position: center;
    background-size: cover;
}
@media(max-width: 992px){
    footer {
        height: 250px;
    }
}

@media(max-width: 576px){
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


