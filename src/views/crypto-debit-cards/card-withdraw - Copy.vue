<template>
    <div>
        <div class="mid_scroll_content">
            <div class="pageContent border-0">
                <div class="d-flex justify-content-end pb-2">
                    <a href="javascript:void(0);" data-toggle="modal" data-target="#payouts-limits" @click="payouts_limit = true" class="d-flex align-items-center">
                        <feather type="info" size="16px" class="textcolor d-block"></feather>
                        <p class="f-14 mb-0 pl-2 d-block">Payout Limits</p>
                    </a>
                </div>

                <div class="card-dashboard withdraw">
                    <div class="bg-white border round-sm cryptoCards position-relative mb-5">
                        <div class="withdrawHead border-bottom d-flex align-items-center flex-wrap justify-content-between pb-4 mb-5">
                            <h4 class="mb-0">Withdraw</h4>
                            <div class="noSec text-right">
                                <p class="bold mb-3 text-transform-uppercase lh-1">CARD NUMBER</p>
                                <h5 class="mb-0 lh-1">3425 9785 2465 2646</h5>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="pt-2 col-12 col-xl-10 col-xxl-8 col-xxxl-7">
                                <Form >
                                    <div class="d-block d-md-flex justify-content-center conversionsRow mb-2 mb-md-4">
                                        <div class="conversionsText pt-3 pb-2 pb-md-3">
                                        <p class="themecolor medium mb-0">Insert Amount</p>
                                        </div>
                                        <div class="conversionsInput"> 
                                        <div class="d-flex border round-sm lightgrayBG">
                                            <div class="inputField inputHeight d-flex align-items-center">
                                                <input type="text" class="form-control border-0 px-3 lightgrayBG" value="0.5520" placeholder="Enter Amount" />
                                            </div>
                                            <div class="selectField border-left d-flex align-items-center selectCurrency">
                                                <div class="selectDropMenu destinationDropMenu position-relative round-sm w-100">
                                                    <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink inputHeight border-0 py-0" data-toggle="dropdown">  
                                                    <img src="/assets/website/images/crypto_logos/btc.png" alt="Coin" class="d-block cryptoCoin destinationdropImg h-auto" width="38" height="38" v-if="selected_currency != ''" />
        
        
                                                    <div class="d-flex align-items-center justify-content-between w-100">
                                                        <p class="medium themecolor mb-0 text-left pl-1 pl-sm-2" v-if="selected_currency != ''">
                                                        BTC
                                                        </p>
                                                        <p class="medium themecolor mb-0 text-left" v-else>Select Crypto</p>
                                                        <feather type="chevron-down" size="18px" class="ml-1"></feather>
                                                    </div>
                                                    </a>
                                                    <ul class="dropdown-menu scrollbar">
                                                    <input type="text" placeholder="Search here..." class="dropdownSearch"  />
                                                    <li>
                                                        <a href="javascript:void(0)" class="">
                                                        <div class="d-flex align-items-center">
                                                            <img src="/assets/website/images/crypto_logos/btc.png" alt="Coin" class="d-block cryptoCoin destinationdropImg h-auto" width="38" height="38" />
                                                            <div class="pl-1 pl-sm-2">
                                                            <p class="medium themecolor mb-0 text-left lh-normal">
                                                                BTC - Bitcoin
                                                            </p>
                                                            </div>
                                                        </div>
                                                        </a>
                                                    </li>
                                                    <!-- <li class="d-flex align-items-center justify-content-center pt-2 pb-3">
                                                        <feather type="alert-circle" class="mr-2 textcolor" size="18px"></feather>
                                                        <p class="d-block textcolor mb-0">No Data Available</p>
                                                    </li> -->
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="conversionsPercent d-flex justify-content-between pt-3">
                                            <p class="textcolor medium mb-0 lh-normal conversionsBalance mt-3 mt-sm-0">(Balance: <span class="green">2.20811482 ETH</span>) </p>
                                            <ul class="mb-0 d-flex justify-content-start justify-content-sm-end">
                                            <li>
                                                <a href="javascript:void(0);" class="">25%</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" class="active">50%</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" class="">75%</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" class="">100%</a>
                                            </li>
                                            </ul>
                                        </div>
                                        <!-- <ErrorMessage name="Withdraw amount" class="text-danger" /> -->
                                        <!-- <div v-if="withdraw_amount && amount_usd ">
                                            <Field type="hidden" class="form-control border-0 px-3 lightgrayBG" id="" name="amount_in_usd" placeholder=" " v-model="amount_usd" :rules="{ required : true , regex: /^(?=.*[1-9])\d+(\.\d+)?$/,  min_value: 10, decimal: 8 }" readonly />
                                            <ErrorMessage name="amount_in_usd" class="text-danger" />
                                        </div> -->
                                        </div>
                                    </div>
        
                                    <div class="d-block d-md-flex justify-content-center conversionsRow mb-4">
                                        <div class="conversionsText pt-3 pb-2 pb-md-3">
                                        <p class="themecolor medium mb-0">Destination Address</p>
                                        </div>
                                        <div class="conversionsInput">
                                        <div class="d-flex border round-sm lightgrayBG position-relative selectmenu destinationdrop destinationdropdown">
                                            <input type="text" class="form-control border-0 px-3 lightgrayBG" id="" name="Crypto_address" placeholder="Enter Crypto Address" />
                                        </div>
                                        <!-- <ErrorMessage name="Crypto_address" class="text-danger" /> -->
                                        </div>
                                    </div>
        
                                    <div class="d-block d-md-flex justify-content-center align-items-center conversionsRow mb-3 pb-0 pb-md-2">
                                        <div class="conversionsText">
                                        <p class="themecolor medium mb-0">Estimated Fees</p>
                                        </div>
                                        <div class="d-flex justify-content-start justify-content-md-end conversionsInput">
                                        <p class="mb-0 medium pl-0 pl-md-3">network fees apply on execution</p>
                                        </div>
                                    </div>
        
                                    <div class="d-block d-md-flex justify-content-center align-items-center conversionsRow">
                                        <div class="conversionsText d-none d-md-block">&nbsp;</div>
                                        <div class="conversionsInput mb-1">
                                        <input type="submit" class="cap_btn large_btn border-0 mb-2" data-toggle="modal" data-target="#crypto-payout-confirmation" value="Withdraw" />
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>

                    <!-- Transacyion History -->
                    <h4 class="mb-0 pb-4">Transaction History</h4>
                    <div class="bg-white border round-sm cryptoCards position-relative">
                        <div class="transHistory withdraw">
                            <div class="subHeadSec d-flex align-items-center justify-content-between flex-wrap mb-4">
                                <div class="d-block d-sm-flex align-items-center dateSec">
                                    <div class="border px-2 tableDate round-sm">
                                    <input type="date" class="border-0 textcolor" />
                                    </div>
                                    <div class="px-3 text-center py-2 py-sm-0">
                                    <p class="mb-0 themecolor medium">To</p>
                                    </div>
                                    <div class="border px-2 tableDate round-sm">
                                    <input type="date" class="border-0 textcolor" />
                                    </div>
                                </div>
                                <div class="filtersSec d-flex align-items-center">
                                    <div class="form-group position-relative searchTable mb-0">
                                        <input type="text" placeholder="Search..." class="form-control"/>
                                        <span class="searchIco">
                                            <feather type="search" />
                                        </span>
                                    </div>

                                    <div class="d-flex align-items-center position-relative">
                                        <a class="icnBtn" @click.prevent="filters ^= true" href="javascript:void(0)">
                                            <img src="/assets/website/images/filterIcn.svg" alt="Filter Icon" class="d-block" width="22" height="22" />
                                        </a>
                                        <div class="dropdown_menu filter_dropdown_menu dropdown_menu--animated" :class="{ show: filters }">
                                            <div class="d-flex justify-content-between align-items-center px-3 pb-1 pb-md-2">
                                            <p class="medium themecolor mb-0">Filters</p>
                                            <div>
                                            <a href="javascript:void(0);" class="redBG round-lg text-white px-3 f-11 mr-1 py-1"  >Cancel</a>
                                            <a href="javascript:void(0);" class="secondaryBG round-lg text-white px-3 f-11 py-1" >Apply</a>
                                            </div>
                                            </div> 
                                            <ul class="mb-0">
                                            <li class="py-2 lightgrayBG">
                                                <label class="customCheckbox mb-0 themecolor">Status <input type="checkbox"/>
                                                <span class="checkmark"></span>
                                                </label>
                                                <div class="selectmenu filterselectmenu position-relative pt-1">
                                                <a @click.prevent="thisdate ^= true" href="javascript:void(0)" class="btn d-flex justify-content-between align-items-center bg-white rounded">
                                                    <span class="mr-2" >Pending</span>
                                                    <feather type="chevron-down" class="ml-2" size="20px"></feather>
                                                </a>
                                                <ul class="dropdown_menu dropdown_menu--animated dropdown_menu-6 scrollbar" :class="{ show: thisdate }">
                                                    <li><a href="javascript:void(0)">Status One</a></li>
                                                    <li><a href="javascript:void(0)">Status two</a></li>
                                                    <li><a href="javascript:void(0)">Status three</a></li>
                                                </ul>
                                                </div>
                                            </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <button class="btn downoadBtn icnBtn">
                                        <img src="/assets/website/images/download-icon.svg" alt="Download Icon" class="d-block" width="22" height="22" />
                                    </button>
                                </div>

                            </div>
                            
                            
                            <div class="itemsWrap scrollbar">
                                <div class="transItem">
                                    <div class="left-sec">
                                        <img class="arrow-img" src="/assets/website/images/green-down.svg"/>
                                        <h5 class="mb-1">€156.01 EUR</h5>
                                        <p class="f-13 mb-0 d-flex align-items-center">€005.00 EUR <span>Top-Up Card</span></p>
                                    </div>
                                    <div class="right-sec d-flex align-items-center badges">
                                        <p class="mb-0">2022/02/10</p>
                                        <span class="round-lg border-0 badge-item yellow">Pending</span>
                                    </div>
                                </div>

                                <div class="transItem">
                                    <div class="left-sec">
                                        <img class="arrow-img" src="/assets/website/images/green-down.svg"/>
                                        <h5 class="mb-1">€156.01 EUR</h5>
                                        <p class="f-13 mb-0 d-flex align-items-center">€005.00 EUR <span>Top-Up Card</span></p>
                                    </div>
                                    <div class="right-sec d-flex align-items-center badges">
                                        <p class="mb-0">2022/02/10</p>
                                        <span class="round-lg border-0 badge-item red"><feather type="info" size="18"/> Failed</span>
                                    </div>
                                </div>

                                <div class="transItem">
                                    <div class="left-sec">
                                        <img class="arrow-img" src="/assets/website/images/red-up.svg"/>
                                        <h5 class="mb-1">€156.01 EUR</h5>
                                        <p class="f-13 mb-0 d-flex align-items-center">€005.00 EUR <span>Top-Up Card</span></p>
                                    </div>
                                    <div class="right-sec d-flex align-items-center badges">
                                        <p class="mb-0">2022/02/10</p>
                                        <span class="round-lg border-0 badge-item green">Complete</span>
                                    </div>
                                </div>

                                <div class="transItem">
                                    <div class="left-sec">
                                        <img class="arrow-img" src="/assets/website/images/red-up.svg"/>
                                        <h5 class="mb-1">€156.01 EUR</h5>
                                        <p class="f-13 mb-0 d-flex align-items-center">€005.00 EUR <span>Top-Up Card</span></p>
                                    </div>
                                    <div class="right-sec d-flex align-items-center badges">
                                        <p class="mb-0">2022/02/10</p>
                                        <span class="round-lg border-0 badge-item green">Complete</span>
                                    </div>
                                </div>

                                <div class="transItem">
                                    <div class="left-sec">
                                        <img class="arrow-img" src="/assets/website/images/red-up.svg"/>
                                        <h5 class="mb-1">€156.01 EUR</h5>
                                        <p class="f-13 mb-0 d-flex align-items-center">€005.00 EUR <span>Top-Up Card</span></p>
                                    </div>
                                    <div class="right-sec d-flex align-items-center badges">
                                        <p class="mb-0">2022/02/10</p>
                                        <span class="round-lg border-0 badge-item green">Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- <div class="modal" tabindex="-1" id="crypto-payout-confirmation" role="dialog" aria-labelledby="crypto-payout-confirmation" aria-hidden="true" >
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document"> 
                <div class="modal-content">
                <div class="modal-header border-0 d-flex justify-content-between align-items-center">
                    <div class="modal-title">
                    <h3 class="semibold mb-0">Crypto Payout</h3>
                    </div>
                    <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close">
                    <feather type="x" size="22px"></feather>
                    </a>
                </div>
                <div class="modal-body pt-2 pt-md-0">
                    <div class="d-flex justify-content-center align-items-center">
                    <img src="/assets/website/images/crypto_logos/btc.png" alt="Coin" class="d-block" width="80" height="80" />
                    </div>
                    <div class="d-flex justify-content-center pt-4">
                    <h6 class="textcolor semibold mb-0">You spend</h6>
                    <h6 class="semibold mb-0 ml-1">
                        1.5673 BTC
                    </h6>
                    </div>
                    <div class="text-center pt-3">
                    <h6 class="textcolor medium mb-0">To</h6>
                    </div>
                    <div class="pt-3 d-block d-sm-flex justify-content-center text-center">
                    <h6 class="textcolor medium mb-0 pr-2 word-break">
                        33qoecVfu6Qyw4MnczZJyDLXJBaoCPmFLG
                    </h6>
                    </div>
                    <div class="pt-4">
                    <div class="d-block d-sm-flex justify-content-between border-bottom pb-4 pt-4">
                        <h6 class="medium mb-0">Network Fees</h6>
                        <h6 class="medium mb-0">0.000982 ETH</h6>
                    </div>
                    <div class="d-block d-sm-flex justify-content-between border-bottom pb-4 pt-4">
                        <h6 class="medium mb-0">Total Withdrawal Amount</h6>
                        <h6 class="medium mb-0">
                            1.5663 ETH
                        </h6>
                    </div>
                    </div>
                </div>
                <div class="modal-footer border-0 pt-2">
                    <div class="d-flex justify-content-center w-100 align-items-center">
                    <a href="javascript:void(0);" class="cap_btn large_btn mb-0" data-dismiss="modal" aria-label="Close" >Confirm</a>
                    </div>
                </div>
                </div>
            </div>
        </div> -->


        <!-- <div class="modal" tabindex="-1" id="fa-password-two" role="dialog" aria-labelledby="fa-password-two" aria-hidden="true" >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content googleAuthenticationModal">
                <div class="modal-header border-0 d-block text-right">
                    <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close">
                    <feather type="x" size="22px"></feather>
                    </a>
                </div>
                <div class="modal-body pt-0">
                    <div class="mb-4">
                    <img src="/assets/website/images/google-authenticator.png" alt="Google Authentication" class="d-block m-auto" width="96" height="96" />
                    <h6 class="themecolor mt-4 mb-0 text-center">Google Authentication Code</h6>
                    </div>
                    <div class="form-group">
                    <input type="text" placeholder="Enter 2FA Code" class="form-control"/>
                    </div>
                    
                </div>
                <div class="modal-footer justify-content-center pt-4 border-0">
                    <a class="cap_btn blue px-4 large_btn mb-0" href="javascript:void(0);" >Submit</a>
                </div>
                </div>
            </div>
        </div> -->


        <!-- <div class="modal" tabindex="-1" id="payouts-limits" role="dialog" aria-labelledby="payouts-limits" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header border-0 pb-3">
                    <div class="modal-title text-left">
                    <h5 class="mb-0">Payouts Limits:</h5>
                    </div>
                    <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="payouts_limit = false">
                    <feather type="x" size="22px"></feather>
                    </a>
                </div>
                <div class="modal-body pt-0">
                    <div class="border-top pt-3">
                    <div class="d-flex justify-content-between">
                        <p class="medium">Minimum Payouts</p>
                        <p class="themecolor medium">0.00036656 BTC ($10.00)</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p class="medium mb-0 lh-normal">Maximum Payouts</p>
                        <p class="themecolor medium mb-0 lh-normal">30 BTC ($100,000.00)</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div> -->

    </div>
 
 </template>
 <script>
 import { RouterLink } from 'vue-router';
 
  export default {
    name: "card-withdraw",
   
    data() {
      return {
        selected_currency: '',
        filters: false,
        thisdate: false,
        pageLoader: false,
      };
    },
  };
 </script>