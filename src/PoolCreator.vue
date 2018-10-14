<template>

    <main>
        <app-header></app-header>
        <div class="row">
            <div class="d-none d-sm-flex col-1"></div>
            <div class="col-12 col-sm-10">
                <div class="d-none d-sm-block mt-5 blue-36-20-bold">Pool Creator</div>
                <hr align="left" class="d-none d-sm-block blue-hr">
                <div class="d-sm-none mobile-back row mx-0">
                    <div class="my-auto pl-3"><img src="./assets/chevron-left.png" alt=""></div>
                    <dir class="white-16-bold my-auto">Pool Creator</dir>
                </div>

                <div class="row">
                    <div class="col-1"></div>
                    <div class="col-10 mt-5 ">

                        <!-- Creator -->

                        <div class="o-border d-inline "></div>
                        <div class="d-inline blue-36-20-bold"> Creator
                            <hr align="left" class="blue-hr-2">
                        </div>
                        <div class="pl-3 blue-24-16-bold pt-3"> Select ETH address:</div>
                        <div class="row mx-0 pt-3">
                            <div class="input-group w-100 w-sm-40">
                                <input type="text" class="form-control input-dd" placeholder="Eth address 1">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary dropdown-toggle input-dd-btn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                    <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                    <div role="separator" class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Separated link</a>
                                    </div>
                                </div>
                            </div>
                            <div class="d-inline pt-3 pt-sm-0 mx-auto"> <button class="btn blue-btn px-4 mx-4"> Add new wallet </button> </div>
                        </div>

                        <hr class="blue-hr-fullw my-5">

                        <!-- Deal Details -->

                        <div class="o-border d-inline"></div>
                        <div class="d-inline mt-5 blue-36-20-bold"> Deal Details
                            <hr align="left" class="blue-hr-2">
                        </div>
                        <div class="row pt-3">
                            <div class="col-12 col-lg-3 my-auto blue-18-reg">Net amount (ETH):</div>
                            <div class="col-12 col-lg-3 pt-3 pt-lg-0">
                                <input type="text" class="form-control input-text w-100 w-lg-80" placeholder="1000">
                            </div>
                            <div class="d-none d-lg-flex col-12 col-lg-6 row my-auto">
                                <div class="col-12 col-lg-5 blue-18-reg pt-3 pt-lg-0">Individual Min</div>
                                <div class="col-12 col-lg-7">
                                    <range-slider
                                        class="slider w-100 pt-2"
                                        min="0"
                                        max="100"
                                        step="1"
                                        v-model="sliderIndMin">
                                    </range-slider>
                                </div>                                   
                            </div>
                        </div>
                        <div class="row pt-3">
                            <div class="col-12 col-lg-3 my-auto blue-18-reg">Fee (%):</div>
                            <div class="col-12 col-lg-3 pt-3 pt-lg-0">
                                <input type="text" class="form-control input-text w-100 w-lg-80" placeholder="2%">
                            </div>
                            <div class="d-none d-lg-flex  col-12 col-lg-6 row my-auto">
                                <div class="col-12 col-lg-5 blue-18-reg pt-3 pt-lg-0">Individual Max</div>
                                <div class="col-12 col-lg-7">
                                    <range-slider
                                        class="slider w-100 pt-2"
                                        min="0"
                                        max="100"
                                        step="1"
                                        v-model="sliderIndMax">
                                    </range-slider>
                                </div>                                   
                            </div>
                        </div>
                        <div class="row pt-3 pb-5">
                            <div class="col-6 col-lg-3 orange-18-reg">ConnectiCO fee:</div>
                            <div class="col-6 col-lg-5 orange-18-reg text-right text-lg-left">0,5%</div>
                        </div>
                        <div class="d-lg-none col-12 mx-0 px-0 row my-auto">
                            <div class="col-12 col-lg-5 blue-18-reg pt-3 pt-lg-0">Individual Min</div>
                            <div class="col-12 col-lg-7">
                                <range-slider
                                    class="slider w-100 pt-2"
                                    min="0"
                                    max="100"
                                    step="1"
                                    v-model="sliderIndMin">
                                </range-slider>
                            </div>                                   
                        </div>
                        <div class="d-lg-none col-12 mx-0 px-0 row my-auto">
                                <div class="col-12 col-lg-5 blue-18-reg pt-3 pt-lg-0">Individual Max</div>
                                <div class="col-12 col-lg-7">
                                    <range-slider
                                        class="slider w-100 pt-2"
                                        min="0"
                                        max="100"
                                        step="1"
                                        v-model="sliderIndMax">
                                    </range-slider>
                                </div>                                   
                            </div>
                        <hr align="left" class="blue-hr-2 ml-0 d-none d-lg-block">
                        <div class="row pt-3 pt-lg-0">
                            <div class="col-6 col-lg-3 blue-24-16-bold">Gross Amount</div>
                            <div class="col-6 col-lg-5 orange-24-16-bold text-right text-lg-left">1020ETH</div>
                        </div>
                        <div class="row pt-3 pt-lg-0">
                            <div class="col-6 col-lg-3 blue-24-16-bold">Total Fee</div>
                            <div class="col-6 col-lg-5 orange-24-16-bold text-right text-lg-left">2,5%</div>
                        </div>

                        <hr class="blue-hr-fullw my-5">

                        <!-- Transaction Setup -->

                        <div class="o-border d-inline"></div>
                        <div class="d-inline mt-5 blue-36-20-bold"> Transaction Setup
                            <hr align="left" class="blue-hr-2">
                        </div>
                        <div class="row pt-3" >
                            <div class="col-12 col-lg-3 my-auto blue-18-reg">Receiver Address:</div>
                            <div class="col-12 col-lg-3 pt-3 pt-lg-0">
                                <input type="text" class="form-control input-text w-100 w-lg-80" placeholder="Receiver Address">
                            </div>
                            <div class="col-12 col-lg-6 pt-3 pt-lg-0 mx-0 row my-auto">
                                <div class="input-cb">
                                    <input type="checkbox" value="1" id="receiverAdrress" name="" />
                                    <label for="receiverAdrress"></label>                             
                                </div>
                                <div class="pl-3 blue-18-reg">Not know yet</div>
                            </div>
                        </div>
                        <div class="row pt-5 pt-lg-3 pb-4">
                            <div class="col-12 col-lg-3 my-auto blue-18-reg">Block withdraw for:</div>
                            <div class="col-12 col-lg-3 pt-3 pt-lg-0 my-auto">
                                <range-slider
                                    class="slider w-100 w-lg-80 pt-2"
                                    min="0"
                                    max="100"
                                    step="1"
                                    v-model="blockWithdraw">
                                </range-slider>
                            </div>
                            <div class="col-12 col-lg-6 pt-3 pt-lg-0 mx-0 row my-auto pb-3 pb-lg-0">
                                <div class="input-cb">
                                    <input type="checkbox" value="1" id="blockWithdraw" name="" />
                                    <label for="blockWithdraw"></label>                             
                                </div>
                                <div class="pl-3 blue-18-reg">Not know yet</div>
                            </div>
                        </div>
                        <hr align="left" class="blue-hr-2 ml-0 pb-3 pt-3 pt-lg-0">
                        <div class="row my-auto mx-0">
                            <div class="input-cb">
                                <input type="checkbox" value="1" id="autoTransfer" name="" />
                                <label for="autoTransfer"></label>                             
                            </div>
                            <div class="pl-3 blue-18-bold">Auto transfer</div>
                        </div>
                        <div class="row mx-0 pt-3">
                            <div class="col-12 col-lg-3 row my-auto">
                                <div class="input-cb">
                                    <input type="checkbox" value="1" id="cbTime" name="" />
                                    <label for="cbTime"></label>                             
                                </div>
                                <div class="pl-3 blue-18-reg">Time</div>
                            </div>
                            <div class="col-12 col-lg-3 pt-3 pt-lg-0 row my-auto">
                                <div class="input-cb">
                                    <input type="checkbox" value="1" id="cbAmount" name="" />
                                    <label for="cbAmount"></label>                             
                                </div>
                                <div class="pl-3 blue-18-reg">Amount</div>
                            </div>
                        </div>
                        <div class="row mx-0 pt-3">
                            <div class="w-100 w-lg-10 blue-18-reg my-auto"> Time </div>
                            <div class="w-100 w-lg-20 input-group pt-3 pt-lg-0">
                                <input type="text" class="form-control input-dd" placeholder="4/22/2018">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary dropdown-toggle input-dd-btn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                    <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                    <div role="separator" class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Separated link</a>
                                    </div>
                                </div>
                            </div>
                            <div class="w-100 w-lg-40 row ml-0 ml-lg-5 my-auto pt-3 pt-lg-0">
                                <div class="blue-18-reg">Amount</div>
                                <div class="w-100 w-lg-80">
                                <range-slider
                                    class="slider w-100 w-lg-80 pt-1"
                                    min="0"
                                    max="100"
                                    step="1"
                                    v-model="blockWithdraw">
                                </range-slider>
                                </div>
                            </div>
                        </div>
                        
                        <hr class="blue-hr-fullw my-5">

                        <!-- Other Parameters -->

                        <div class="o-border d-inline"></div>
                        <div class="d-inline mt-5 blue-36-20-bold"> Other Parameters
                            <hr align="left" class="blue-hr-2">
                        </div>
                        <div class="row my-auto mx-0 pt-3">
                            <div class="input-cb">
                                <input type="checkbox" value="1" id="autoWithdraw" name="" />
                                <label for="autoWithdraw"></label>                             
                            </div>
                            <div class="pl-3 blue-18-reg">Auto Withdraw</div>
                        </div>
                        <div class="row my-auto mx-0 pt-3">
                            <div class="input-cb">
                                <input type="checkbox" value="1" id="filterMembers" name="" />
                                <label for="filterMembers"></label>                             
                            </div>
                            <div class="pl-3 blue-18-reg">Filter members</div>
                        </div>
                        <div class="row mx-0 pt-3">
                            <div class="w-100 w-lg-20 input-group">
                                <input type="text" class="form-control input-dd" placeholder="Options">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary dropdown-toggle input-dd-btn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                    <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                    <div role="separator" class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Separated link</a>
                                    </div>
                                </div>
                            </div>
                            <div class="blue-18-reg my-auto pl-5 pt-3 pt-lg-0">Multiple selection to Exclude countries(chips solution?)</div>
                        </div>
                        <div class="row my-auto mx-0 pt-3">
                            <div class="input-cb">
                                <input type="checkbox" value="1" id="extraAdmin1" name="" />
                                <label for="extraAdmin1"></label>                             
                            </div>
                            <div class="pl-3 blue-18-reg">Extra Admin</div>
                        </div>
                        <div class="row my-auto mx-0 pt-3">
                            <div class="input-cb">
                                <input type="checkbox" value="1" id="extraAdmin2" name="" />
                                <label for="extraAdmin2"></label>                             
                            </div>
                            <div class="pl-3 blue-18-reg">Extra Admin</div>
                        </div>
                        <div class="row pt-3">
                            <div class="col-12 col-lg-3 my-auto blue-18-reg">Add ETH address</div>
                            <div class="col-12 col-lg-3 pt-2 pt-lg-0">
                                <input type="text" class="form-control input-text w-100 w-lg-80" placeholder="add ETH address">
                            </div>
                        </div>
                        <div class="row pt-3">
                            <div class="col-12 col-lg-3 my-auto blue-18-reg">Add ETH address</div>
                            <div class="col-12 col-lg-3 pt-2 pt-lg-0">
                                <input type="text" class="form-control input-text w-100 w-lg-80" placeholder="add ETH address">
                            </div>
                        </div>
                        <div class="row pt-3">
                            <div class="col-12 col-lg-3 my-auto blue-18-reg">Add ETH address</div>
                            <div class="col-12 col-lg-3 pt-2 pt-lg-0">
                                <input type="text" class="form-control input-text w-100 w-lg-80" placeholder="add ETH address">
                            </div>
                        </div>


                        <div class="text-center my-5">
                            <button class="btn blue-submit px-4">Submit</button>
                        </div>

                    </div>                    
                    <div class="col-1"></div>
                </div>
                
            </div>
            <div class="d-none d-lg-flex col-1"></div>

        </div>
        <app-footer></app-footer>
    </main>
    
</template>

<script>

import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
  data () {
    return {
      sliderIndMin: 20,
      sliderIndMax: 70,
      blockWithdraw: 50,
    }
  },
  components: {
    RangeSlider
  }
}
</script>

<style lang="scss">

</style>


