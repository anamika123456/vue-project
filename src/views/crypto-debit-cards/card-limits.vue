<template>
    <div>
        <div class="mid_scroll_content">
            <div class="pageContent border-0">
                <div class="add-card-main">
                    <div class="addCards activation topup bg-white border round-sm">
                        <h4 class="mb-4 pb-3 border-bottom">Card Limits</h4>
                        <div class="row justify-content-between flex-column-reverse flex-lg-row">

                            <div class="col-lg-6 col-xxxl-5 position-static">
                                <div class="content-sec">
                                    <p class="mb-4 mt-3">You can find all details of your card and change card limits.</p>

                                    <div class="cardItemsWrap round-sm border">
                                        <div class="itemWrap">
                                            <div class="topSec">
                                                <h6 class="mb-0 themecolor medium f-16">Bank Account Number:</h6>
                                                <p class="mb-0">7384-97238-8934-2897</p>
                                            </div>
                                        </div>

                                        <div class="itemWrap">
                                            <div class="topSec">
                                                <div class="left-sec">
                                                    <label class="toggleSwitch"><input type="checkbox"><span class="slider round"></span></label>
                                                    <div class="textSec">
                                                        <h6 class="mb-0 themecolor medium f-16">ATM Daily Withdrawal Limit</h6>
                                                        <p class="mb-0">2,50,000 USD</p>
                                                    </div>
                                                </div>
                                                <button class="cap_btn extra_small_btn border-btn-secondary round-sm">Change</button>
                                            </div>

                                            <!-- <div class="changeLimit mt-4">
                                                <h6 class="mb-2 themecolor medium f-16">New Limit:</h6>
                                                <input type="text" placeholder="50,000 USD" class="form-control" />
                                                <p class="my-2 py-1">Min 5,000 USD, Max 5,00,000 USD</p>
                                                <button type="submit" class="cap_btn large_btn mb-2">Update</button>
                                            </div> -->

                                        </div>

                                        <div class="itemWrap">
                                            <div class="topSec">
                                                <div class="left-sec">
                                                    <label class="toggleSwitch"><input type="checkbox"><span class="slider round"></span></label>
                                                    <div class="textSec">
                                                        <h6 class="mb-0 themecolor medium f-16">Merchant Outlet Limit</h6>
                                                        <p class="mb-0">2,50,000 USD</p>
                                                    </div>
                                                </div>
                                                <button class="cap_btn extra_small_btn border-btn-secondary round-sm">Change</button>
                                            </div>
                                        </div>
 
                                        <div class="itemWrap">
                                            <div class="topSec">
                                                <div class="left-sec">
                                                    <label class="toggleSwitch"><input type="checkbox"><span class="slider round"></span></label>
                                                    <div class="textSec">
                                                        <h6 class="mb-0 themecolor medium f-16">Contactless Transactions Limit</h6>
                                                        <p class="mb-0">2,50,000 USD</p>
                                                    </div>
                                                </div>
                                                <button class="cap_btn extra_small_btn border-btn-secondary round-sm">Change</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-5 col-xxl-5">
                                <div class="sliderSec text-center mb-4 mb-lg-0">
                                    <div id="carouselExampleIndicators" class="carousel slide card-slider mt-3" data-ride="carousel">
                                        <ol class="carousel-indicators">
                                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                        </ol>
                                        <div class="carousel-inner blur">
                                            <div class="carousel-item active ">
                                            <img class="d-block w-100" src="/assets/website/images/slidercard-front.png" alt="First slide">
                                            </div>
                                            <div class="carousel-item">
                                            <img class="d-block w-100" src="/assets/website/images/slidercard-back.png" alt="Second slide">
                                            </div>
                                        </div>
                                    </div>

                                    <button class="cap_btn border-btn-secondary extra_small_btn f-16 text-nowrap mx-auto">Show Card Details</button>

                                    <h2 class="green text-center semibold mb-1 mt-4 pt-2">156,854.69 USD</h2>
                                    <h6 class="semibold textcolor mb-3">Available Balance</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="modal" tabindex="-1" id="fa-password-two" role="dialog" aria-labelledby="fa-password-two" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content googleAuthenticationModal">
                <div class="modal-header border-0 d-block text-right">
                    <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="reset()">
                    <feather type="x" size="22px"></feather>
                    </a>
                </div>
                <div class="modal-body pt-0">
                    <div class="mb-4">
                    <img src="/assets/website/images/google-authenticator.png" alt="Google Authentication" class="d-block m-auto" width="96" height="96" />
                    <h6 class="themecolor mt-4 mb-0 text-center">Google Authentication Code</h6>
                    </div>
                    <div class="form-group">
                    <input type="text" placeholder="Enter 2FA Code" class="form-control" />
                    </div>
                    
                </div>
                <div class="modal-footer justify-content-center pt-4 border-0">
                    <a class="cap_btn blue px-4 large_btn mb-0" href="javascript:void(0);">Submit</a>
                </div>
                </div>
            </div>
        </div> -->
    </div>

</template>
<script>
import { RouterLink } from 'vue-router';

    export default {
        name: "card-limits",

        data() {
            return {
                pageLoader: false,
            };
        },
    };
</script>