<template>
    <div class="row mx-0 my-4">
        <div class="col-12 row mx-0">
            <div class="d-none d-xl-flex col-xl-2"></div>
            <div class="pl-5 pl-lg-0 col-lg-2 col-xl-1 px-0 d-flex py-2">
                <div class="my-auto px-2 input-radio">
                    <input type="radio" name="exampleRadios" id="exampleRadios1"
                            value="option1" checked/>
                    <label for="exampleRadios1"></label>
                </div>
                <div class="pl-1 my-auto blue-14-bold">Active</div>
            </div>
            <div class="pl-5 pl-lg-0 col-lg-2 col-xl-1 px-0 d-flex py-2">
                <div class="my-auto px-2 input-radio">
                    <input type="radio" name="exampleRadios" id="exampleRadios2"
                            value="option1" checked/>
                    <label for="exampleRadios2"></label>
                </div>
                <div class="pl-1 my-auto blue-14-bold">Upcoming</div>
            </div>
            <div class="pl-5 pl-lg-0 col-lg-2 col-xl-1 px-0 d-flex py-2">
                <div class="my-auto px-2 input-radio">
                    <input type="radio" name="exampleRadios" id="exampleRadios3"
                            value="option1" checked/>
                    <label for="exampleRadios3"></label>
                </div>
                <div class="pl-1 my-auto blue-14-bold">Closed</div>
            </div>
            <div class="pl-5 pl-lg-0 col-lg-2 col-xl-1 px-0 d-flex py-2">
                <div class="my-auto px-2 input-radio">
                    <input type="radio" name="exampleRadios" id="exampleRadios4"
                            value="option1" checked/>
                    <label for="exampleRadios4"></label>
                </div>
                <div class="pl-1 my-auto blue-14-bold">Waiting for tokens</div>
            </div>
            <div class="d-none d-lg-flex col-lg-1"></div>
            <div class="col-12 col-lg-3 col-2xl-2 py-2">
                <form class="form-inline my-2 my-lg-0">
                    <input class="w-75 form-control search-form" type="search" placeholder="Search" aria-label="Search">
                    <button class="w-25 search-form-btn my-2 my-sm-0 text-right" type="submit"><img src="../assets/search.png" alt=""></button>
                </form>
            </div>
            <div class="d-none d-xl-flex col-xl-2 col-2xl-3"></div>
            
            <div class="d-none d-xl-flex col-lg-2"></div>
            <div class="col-lg-12 col-xl-8 col-2xl-7 mb-5 mt-3">
                <hr class="blue-hr-fullw w-100">
            </div>
            <div class="d-none d-xl-flex col-xl-2 col-2xl-3"></div>



            <pool-list-item></pool-list-item>
            <pool-list-item></pool-list-item>
            <pool-list-item></pool-list-item>

            
        </div>
    </div>
    
</template>

<script>
import PoolListItem from '../components/PoolListItem.vue';
export default {
components: {
    'pool-list-item': PoolListItem,
  },
  data() {
    return {

    };
  },
}
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';
@import '../scss/main';
    .search-form {
        border: 1px solid $blue;
        border-radius: 0;
        border-right: none;
        height: 30px;
        &:focus {
            border-color: $blue;
            box-shadow: none;
        }
    }
    .search-form-btn {
        border: 1px solid $blue;
        border-radius: 0;
        border-left: none;
        height: 30px;
        background-color: transparent;
        &:focus {
            outline: none;
        }
    }
        // Input Radio
    input[type=radio] {
        visibility: hidden;
    }
    .input-radio {
        width: 26px;
        height: 26px;
        background: $blue;
        border-radius: 50%;
        position: relative;
    }
    .input-radio label {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 100px;
        transition: all .5s ease;
        cursor: pointer;
        position: absolute;
        top: 3px;
        left: 3px;
        z-index: 1;
        background: $white;
        box-shadow:inset 0px 0px 1px 6px white;
    }
    .input-radio input[type=radio]:checked + label {
        background: $orange;
        width: 20px;
        height: 20px;
    }

    @media (min-width: 1367px) {
        .col-2xl-2 {
            -ms-flex: 0 0 16.66666%;
            -webkit-box-flex: 0;
            flex: 0 0 16.66666%;
            max-width: 16.66666%;
        }
        .col-2xl-3 {
            -ms-flex: 0 0 25%;
            -webkit-box-flex: 0;
            flex: 0 0 25%;
            max-width: 25%;
        }
    }

</style>


