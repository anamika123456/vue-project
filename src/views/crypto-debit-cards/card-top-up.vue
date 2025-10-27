<template>
    <div>
        <loader v-if="pageLoader"></loader>
        <div class="mid_scroll_content">
            <div class="pageContent border-0">
                <div class="add-card-main">
                    <div class="addCards activation topup bg-white border round-sm">
                        <h4 class="mb-4 pb-3 border-bottom d-flex align-items-center">
                            <RouterLink class="mr-2 d-flex align-items-center" :to="{path : 'card-dashboard', query:{cardId: $route.query.cardId}}"><img  src="/assets/website/images/theme-back-arrow.svg"> </RouterLink>
                            Card Top-Up
                        </h4>
                        <div class="row justify-content-between flex-column-reverse flex-lg-row" v-if="Object.keys(card_account_details).length > 0">

                            <div class="col-lg-6 col-xxxl-5 position-static">
                                <div class="qr-sec-main">
                                    <p class="mb-4" v-if="Object.keys(bankDetails).length == 0 ">Scan this QR code to add funds in your card</p>
                                    <div class="form-group mb-4">
                                        <div class="position-relative selectDropMenu destinationDropMenu">
                                            <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
                                                <div class="d-flex align-items-center">
                                                    <img :src="'/assets/website/images/crypto_logos/'+card_account_details.currency.toLowerCase() +'.png'" alt="Coin" class="d-block cryptoCoin" width="38" height="38" />
                                                    <div class="pl-2 pl-sm-3">
                                                    <p class="medium themecolor mb-0 text-left"> {{card_account_details.currency}}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    

                                    <div v-if="Object.keys(bankDetails).length > 0 ">
                                        <div class="bankDetails border round-sm" >
                                            <div class="detailItem d-flex justify-content-between">
                                                <p class="m-0 medium themecolor">Bank Country</p>
                                                <p class="m-0 textcolor d-flex align-items-center valueText">{{bankDetails.bankCountry}} <feather type="copy" class="ml-3" size="20px" @click="handleCopy(bankDetails.bankCountry,'data has been copied')"></feather></p>
                                            </div>
                                            <div class="detailItem d-flex justify-content-between">
                                                <p class="m-0 medium themecolor">Bank Address</p>
                                                <p class="m-0 textcolor d-flex align-items-center valueText">{{bankDetails.bankAddress}} <feather type="copy" class="ml-3" size="20px" @click="handleCopy(bankDetails.bankAddress,'data has been copied')"></feather></p>
                                            </div>
                                            <div class="detailItem d-flex justify-content-between">
                                                <p class="m-0 medium themecolor">Iban</p>
                                                <p class="m-0 textcolor d-flex align-items-center valueText">{{bankDetails.iban}} <feather type="copy" class="ml-3" size="20px" @click="handleCopy(bankDetails.iban,'data has been copied')"></feather></p>
                                            </div>
                                            <div class="detailItem d-flex justify-content-between">
                                                <p class="m-0 medium themecolor">Bic</p>
                                                <p class="m-0 textcolor d-flex align-items-center valueText">{{bankDetails.bic}} <feather type="copy" class="ml-3" size="20px" @click="handleCopy(bankDetails.bic,'data has been copied')"></feather></p>
                                            </div>
                                            <div class="detailItem d-flex justify-content-between">
                                                <p class="m-0 medium themecolor">Account Number</p>
                                                <p class="m-0 textcolor d-flex align-items-center valueText">{{bankDetails.accountNumber}} <feather type="copy" class="ml-3" size="20px" @click="handleCopy(bankDetails.accountNumber,'data has been copied')"></feather></p>
                                            </div>
                                            <div class="detailItem d-flex justify-content-between">
                                                <p class="m-0 medium themecolor">Bank Name</p>
                                                <p class="m-0 textcolor d-flex align-items-center valueText">{{bankDetails.bankName}} <feather type="copy" class="ml-3" size="20px" @click="handleCopy(bankDetails.bankName,'data has been copied')"></feather></p>
                                            </div>
                                            <div class="detailItem d-flex justify-content-between">
                                                <p class="m-0 medium themecolor">Bank Account Holder Name</p>
                                                <p class="m-0 textcolor d-flex align-items-center valueText">{{bankDetails.bankAccountHolderName}}<feather type="copy" class="ml-3" size="20px" @click="handleCopy(bankDetails.bankAccountHolderName,'data has been copied')"></feather></p>
                                            </div>
                                            <div class="detailItem d-flex justify-content-between">
                                                <p class="m-0 medium themecolor">Provider</p>
                                                <p class="m-0 textcolor d-flex align-items-center valueText">{{bankDetails.provider}} <feather type="copy" class="ml-3" size="20px" @click="handleCopy(bankDetails.provider,'data has been copied')"></feather></p>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="qr-sec text-center border round-sm mb-4" v-else>
                                        <div class="qr-wrap d-flex align-items-center justify-content-center">
                                            <!-- <img class="img-fluid" src="/assets/website/images/topup-qr.svg"> -->
                                            <QRCodeVue3 :value="card_account_details.blockchainDepositAddress"  v-if="Object.keys(card_account_details).length > 0 && card_account_details.enriched == true"/>
                                            <QRCodeVue3 :value="blockchainDepositAddress" v-else />
                                        </div>
                                        <div class="d-flex align-items-center justify-content-center">
                                            <p class="mb-0 pr-1 semibold secondarycolor" v-if="Object.keys(card_account_details).length > 0 && card_account_details.enriched == true">{{card_account_details.blockchainDepositAddress}}</p>
                                            <p class="mb-0 semibold secondarycolor" v-else>{{blockchainDepositAddress}}</p>

                                            <button class="cap_btn border-btn-secondary extra_small_btn ml-2" v-if="Object.keys(card_account_details).length > 0 && card_account_details.enriched == true" @click="handleCopy(card_account_details.blockchainDepositAddress,'The deposit address has been copied')"><feather type="copy" class="mr-2" size="14px"></feather>Copy</button>

                                            <button class="cap_btn border-btn-secondary extra_small_btn ml-2" @click="handleCopy(blockchainDepositAddress,'The deposit address has been copied')" v-else ><feather type="copy" class="mr-2" size="14px"></feather>Copy</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- <div class="col-lg-7 col-xxl-7">
                                <div class="successSec text-center mt-lg-5 pt-5 mb-4">
                                    <div class="img-wrap text-center">
                                        <img width="95" class="img-fluid" src="/assets/website/images/greencheck.svg">
                                    </div>
                                    <h3 class="medium themecolor mt-2 mb-4">Top-up amount added to your card</h3>
                                    <RouterLink class="cap_btn large_btn mx-auto" to="/card-dashboard">Proceed to Dashboard</RouterLink> 
                                </div>
                            </div> -->

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

                                    <!-- <button >Show Card Details</button> -->
                                    <RouterLink class="cap_btn border-btn-secondary extra_small_btn f-16 text-nowrap mx-auto"  type="button" :to="{path : 'card-dashboard', query:{cardId: $route.query.cardId}}">Go to dashboard</RouterLink>

                                    <h2 class="green text-center semibold mt-4 pt-2">{{card_account_details.availableBalance.hFiatEquivalentBalance}} {{card_account_details.availableBalance.fiatCurrency}} </h2>
                                    <h4 class=" text-center semibold mb-1" v-if="card_account_details.currency.toLowerCase() !== 'eur'">({{card_account_details.availableBalance.hAmount}} {{card_account_details.currency}})</h4>
                                    <h6 class="semibold textcolor mb-3">Available Balance</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import { RouterLink } from 'vue-router';
    import { cardsMixins } from "@/plugins/cards";
    import moment from "moment";
    import cardDetail from "./card-detail.vue";
    import QRCodeVue3 from "qrcode-vue3";
    export default {
        name: "card-dashboard",
        mixins: [cardsMixins],
        data() {
          return {
            pageLoader: false,
            blockchainDepositAddress: '',
            getCardDetails: {},
            bankDetails : {},
            cardImageJson: {},
            getCards : {},
          };
        },
        components: {QRCodeVue3, cardDetail},
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
            cardDetails() {
                let input_json = {
                    'globalParams': {
                        "card_id": this.$route.query.cardId,
                        // "user_id": this.$route.query.userId
                    },
                    'localParams': { "parameter": this,  'page': 'card-top-up' }
                }
                this._runGetCardDetails(input_json)
            },
            cardAccountDetails() {
                let input_json = {
                    'globalParams': {
                        "userId": this.getCardDetails.userId,
                        "accountId": this.getCardDetails.linkedAccountId
                        
                    },
                    'localParams': { "parameter": this,'page': 'card-top-up', 'currency': this.card_account_details.currency }
                }
                this._runGetAccountDetails(input_json)
            },
            checkEnrichFlag(){
                if(this.card_account_details.enriched == false){
                    this.getCardAddress()
                }else{
                    if(this.card_account_details.currency.toLowerCase() == 'eur'){
                        this.bankDetails = this.card_account_details.bankingDetails
                    }
                }
            },
           getCardAddress(){
            let input_json = {
              'globalParams': {
                "userId": this.getCardDetails.userId,
                "accountId": this.getCardDetails.linkedAccountId
              },
              'localParams': { "parameter": this,'page': 'card-top-up', 'currency': this.card_account_details.currency }
            }
            this._runGetCardAddress(input_json)
        },
        },
        created() {
            // this.getAllCardWalletByUser()
            this.cardDetails();
        },
    };
 </script>