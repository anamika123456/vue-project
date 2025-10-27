<template>
    <div>
        <loader v-if="pageLoader"></loader>
        <div class="mid_scroll_content">
            <div class="pageContent border-0" v-if="Object.keys(getCardDetails).length > 0 && Object.keys(card_account_details).length > 0">
                <div class="add-card-main">
                    <div class="addCards activation topup bg-white border round-sm">
                        <h4 class="mb-4 pb-3 border-bottom d-flex align-items-center">
                            <RouterLink class="mr-2 d-flex align-items-center" :to="{path : 'card-dashboard', query:{cardId: $route.query.cardId}}"><img  src="/assets/website/images/theme-back-arrow.svg"> </RouterLink>
                            Manage Card
                        </h4>
                        <div class="row justify-content-between flex-column-reverse flex-lg-row">
                            <div class="col-lg-7 col-xxxl-7 position-static">
                                <h5 class="textcolor regular mb-2 mt-1">Payment Configuration</h5>
                                <p class="mb-3 pb-1">In this section, you can manage the wallet linked to your card. You can unlink the current wallet and link another available wallet with sufficient balance to support your card transactions.</p>
                                <h5 class="green regular mb-4 pb-1">Linked wallet to Top-up Card</h5>
                                <div class="walletsList borderTop">
                                    <div class="walletItem border-0">
                                        <div class="leftSec d-flex align-items-start">
                                            <div class="img-wrap">
                                                <img :src="'/assets/website/images/crypto_logos/'+card_account_details.currency.toLowerCase() +'.png'" alt="Coin" class="d-block cryptoCoin" width="38" height="38" />
                                            </div>
                                            <div class="text-sec">
                                                <h5 class="medium themecolor f-16 mb-0">{{card_account_details.currency}}</h5>
                                                <p class="textcolor mb-0">{{card_account_details.availableBalance.hAmount}} {{card_account_details.currency}}</p>
                                            </div>
                                        </div>
                                        <div class="rightSec d-flex align-items-center">
                                            <!-- <feather class="green" type="link" /> -->
                                            <RouterLink class="cap_btn extra_small_btn border-btn-secondary round-sm"  :to="{path : 'card-top-up', query:{cardId:$route.query.cardId}}">
                                                Top up Card
                                            </RouterLink>
                                        </div>
                                    </div>
                                    <h5 class="regular red mt-4 py-1 mb-2">Link from Available Wallets</h5>
                                </div>
                                <div class="walletsList" v-if="Object.keys(card_wallets1).length > 0 && card_wallets1.accounts && Object.keys(card_wallets1.accounts).length > 0">
                                    <div class="walletItem" v-for="list in card_wallets1.accounts" v-show="list.linkedCardId.toLowerCase() == 'unlinked'">
                                        <div class="leftSec d-flex align-items-start">
                                            <div class="img-wrap">
                                                <img :src="'/assets/website/images/crypto_logos/'+list.currency.toLowerCase() +'.png'" alt="Coin" class="d-block cryptoCoin" width="38" height="38" />
                                            </div>
                                            <div class="text-sec">
                                                <h5 class="medium themecolor f-16 mb-0">{{list.currency}}</h5>
                                                <p class="textcolor mb-0">{{list.availableBalance.hAmount}} {{list.currency}}</p>
                                            </div>
                                        </div>
                                        <div class="rightSec d-flex align-items-center">
                                            <RouterLink class="cap_btn border-btn-secondary extra_small_btn round-sm d-flex align-items-center justify-content-center" :to="{path : 'card-withdraw', query:{cardId:$route.query.cardId}}">
                                                <svg class="mr-2" width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 11C21 16.52 16.52 21 11 21C5.48 21 1 16.52 1 11C1 5.48 5.48 1 11 1M21 5V1M21 1H17M21 1L16 6" stroke="#7D7BF7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                Withdraw
                                            </RouterLink>
                                            <button class="cap_btn extra_small_btn border-btn-secondary round-sm"  @click="linkAccountFunc(list.accountId)">Link</button>
                                        </div>
                                    </div>

                                    <!-- <div class="walletItem">
                                        <div class="leftSec d-flex align-items-start">
                                            <div class="img-wrap">
                                                <img src="/assets/website/images/crypto_logos/btc.png" alt="Coin" class="d-block cryptoCoin" width="38" height="38" />
                                            </div>
                                            <div class="text-sec">
                                                <h5 class="medium themecolor f-16 mb-0">Bitcoin</h5>
                                                <p class="textcolor mb-0">15,369.27 BTC</p>
                                            </div>
                                        </div>
                                        <div class="rightSec d-flex align-items-center">
                                            <RouterLink class="cap_btn border-btn-secondary extra_small_btn round-sm d-flex align-items-center justify-content-center" to="/">
                                                <svg class="mr-2" width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 11C21 16.52 16.52 21 11 21C5.48 21 1 16.52 1 11C1 5.48 5.48 1 11 1M21 5V1M21 1H17M21 1L16 6" stroke="#7D7BF7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                Withdraw
                                            </RouterLink>
                                            <button class="cap_btn extra_small_btn border-btn-secondary round-sm">Link</button>
                                        </div>
                                    </div>

                                    <div class="walletItem">
                                        <div class="leftSec d-flex align-items-start">
                                            <div class="img-wrap">
                                                <img src="/assets/website/images/crypto_logos/btc.png" alt="Coin" class="d-block cryptoCoin" width="38" height="38" />
                                            </div>
                                            <div class="text-sec">
                                                <h5 class="medium themecolor f-16 mb-0">Bitcoin</h5>
                                                <p class="textcolor mb-0">15,369.27 BTC</p>
                                            </div>
                                        </div>
                                        <div class="rightSec d-flex align-items-center">
                                            <RouterLink class="cap_btn border-btn-secondary extra_small_btn round-sm d-flex align-items-center justify-content-center" to="/">
                                                <svg class="mr-2" width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 11C21 16.52 16.52 21 11 21C5.48 21 1 16.52 1 11C1 5.48 5.48 1 11 1M21 5V1M21 1H17M21 1L16 6" stroke="#7D7BF7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                Withdraw
                                            </RouterLink>
                                            <button class="cap_btn extra_small_btn border-btn-secondary round-sm">Link</button>
                                        </div>
                                    </div>

                                    <div class="walletItem">
                                        <div class="leftSec d-flex align-items-start">
                                            <div class="img-wrap">
                                                <img src="/assets/website/images/crypto_logos/btc.png" alt="Coin" class="d-block cryptoCoin" width="38" height="38" />
                                            </div>
                                            <div class="text-sec">
                                                <h5 class="medium themecolor f-16 mb-0">Bitcoin</h5>
                                                <p class="textcolor mb-0">15,369.27 BTC</p>
                                            </div>
                                        </div>
                                        <div class="rightSec d-flex align-items-center">
                                            <RouterLink class="cap_btn border-btn-secondary extra_small_btn round-sm d-flex align-items-center justify-content-center" to="/">
                                                <svg class="mr-2" width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 11C21 16.52 16.52 21 11 21C5.48 21 1 16.52 1 11C1 5.48 5.48 1 11 1M21 5V1M21 1H17M21 1L16 6" stroke="#7D7BF7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                Withdraw
                                            </RouterLink>
                                            <button class="cap_btn extra_small_btn border-btn-secondary round-sm">Link</button>
                                        </div>
                                    </div>

                                    <div class="walletItem">
                                        <div class="leftSec d-flex align-items-start">
                                            <div class="img-wrap">
                                                <img src="/assets/website/images/crypto_logos/btc.png" alt="Coin" class="d-block cryptoCoin" width="38" height="38" />
                                            </div>
                                            <div class="text-sec">
                                                <h5 class="medium themecolor f-16 mb-0">Bitcoin</h5>
                                                <p class="textcolor mb-0">15,369.27 BTC</p>
                                            </div>
                                        </div>
                                        <div class="rightSec d-flex align-items-center">
                                            <RouterLink class="cap_btn border-btn-secondary extra_small_btn round-sm d-flex align-items-center justify-content-center" to="/">
                                                <svg class="mr-2" width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 11C21 16.52 16.52 21 11 21C5.48 21 1 16.52 1 11C1 5.48 5.48 1 11 1M21 5V1M21 1H17M21 1L16 6" stroke="#7D7BF7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                Withdraw
                                            </RouterLink>
                                            <button class="cap_btn extra_small_btn border-btn-secondary round-sm">Link</button>
                                        </div>
                                    </div> -->
                                </div>
                            </div>

                            <div class="col-lg-5 col-xxl-5">
                                <div class="sliderSec text-center mb-4 mb-lg-0">
                                    
                                    <div id="carouselExampleIndicators" class="carousel slide card-slider mt-3" data-ride="carousel">
                                        <card-detail :card_account_details="cardImageJson" :page="'manage-card'" />
                                        <!-- <ol class="carousel-indicators">
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
                                        </div> -->
                                    </div>

                                    <RouterLink class="cap_btn border-btn-secondary extra_small_btn f-16 text-nowrap mx-auto" :to="{path : 'card-dashboard', query:{cardId: $route.query.cardId}}">Go to dashboard</RouterLink>

                                    <h2 class="green text-center semibold mt-4 pt-2">{{card_account_details.availableBalance.hFiatEquivalentBalance}} {{card_account_details.availableBalance.fiatCurrency}}</h2>
                                    <h4 class=" text-center semibold mb-1" v-if="card_account_details.currency.toLowerCase() !== 'eur'">({{card_account_details.availableBalance.hAmount}} {{card_account_details.currency}}) </h4>
                                    <h6 class="semibold textcolor mb-3">Available Balance</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <!-- <div class="modal" tabindex="-1" id="cancelInvoice" role="dialog" aria-hidden="true" >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-body text-center">
                    <h3 class="text-center medium d-block lh-normal mb-4 mt-4">Are you sure to unlink this account?</h3>
                </div>
                <div class="modal-footer border-0 d-flex align-items-center pt-0 mb-4">
                    <RouterLink to="/card-activation" class="cap_btn border-btn large_btn mb-0 m-auto">No</RouterLink>
                    <RouterLink to="/card-activation" class="cap_btn large_btn mb-0 m-auto">Yes</RouterLink>
                </div>
                </div>
            </div>
        </div> -->

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
    import { cardsMixins } from "@/plugins/cards";
    import cardDetail from "./card-detail.vue";
    import moment from "moment";
    export default {
        name: "card-dashboard",
        mixins: [cardsMixins],
        data() {
          return {
            pageLoader: false,
            blockchainDepositAddress: '',
            getCardDetails: {},
            cardImageJson: {},
            getCards : {},
            card_wallets1 : {}
          };
        },
        components: { cardDetail },
        methods: {
            getAllCardsofParticularUserFunc(){
                let input_json = {
                    'globalParams': {
                        "userId": this.getCardDetails.userId,
                        "limit": 10,
                        "offset": 0,
                        "orderByTimestamp": "DESC"
                    },
                    'localParams': { "parameter": this }
                }
                this._runGetCardsByUserId(input_json)
            },
            linkAccountFunc(getAccIid){
                let input_json = {
                    'globalParams': {
                        "cardId": this.$route.query.cardId,
                        "accountId": (getAccIid != '') ? getAccIid : this.getCardDetails.linkedAccountId
                    },
                    'localParams': { "parameter": this }
                }
                this._runLinkAccount(input_json)
            },
            cardDetails() {
                let input_json = {
                    'globalParams': {
                        "card_id": this.$route.query.cardId,
                        // "user_id": this.$route.query.userId
                    },
                    'localParams': { "parameter": this,  'page': 'card-manage' }
                }
                this._runGetCardDetails(input_json)
            },
            cardAccountDetails() {
                let input_json = {
                    'globalParams': {
                        "userId": this.getCardDetails.userId,
                        "accountId": this.getCardDetails.linkedAccountId
                    },
                    'localParams': { "parameter": this,'page': 'manage-card' }
                }
                this._runGetAccountDetails(input_json)
            },
            getAllCardWalletByUser(){
                let input_json = {
                  'globalParams': {
                    "walletId": this.getCardDetails.parentWalletId,
                    "userId": this.getCardDetails.userId,
                    // "startDate": "1656622800000",
                    // "endDate": "1656622800000",
                    // "page": 1
                  },
                  'localParams': { "parameter": this }
                }
                this._runGetAllWalletById(input_json)
                //this._runGetAllCardWalletByUser(input_json)
            },
        },
        created() {
            this.cardDetails();
        },
    };
 </script>