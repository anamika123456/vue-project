<template>
    <div>
        <loader v-if="pageLoader"></loader>
        <div class="addCards activation bg-white border round-sm mh-calc" v-if="!cardPermission()">
            <h4 class="mb-4 pb-3 border-bottom">Card Activation </h4>
            <Form @submit="cardActivate()" ref="regform" class="mt-4">
                <div v-if="Object.keys(card_wallets).length > 0 && card_wallets.wallets && card_wallets.wallets.length > 0 &&  card_wallets.wallets[0].accounts && Object.keys(card_wallets.wallets[0].accounts).length > 0">
                    <div class="row justify-content-between">
                        <div class="col-lg-7 col-xxxl-6 position-static mt-4">
                            <div class="form-group mb-4">
                                <label class="labeltext">Select Crypto </label>
                                <!-- <input type="hidden" class="form-control" id="" name="currency"  v-model="currency"   /> -->
                                <div class="position-relative selectDropMenu destinationDropMenu">
                                    <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
                                        <div class="d-flex align-items-center" v-if="Object.keys(accountDetail).length > 0">
                                            <img :src="'/assets/website/images/crypto_logos/'+accountDetail.currency.toLowerCase() +'.png'" alt="Coin" class="d-block cryptoCoin" width="38" height="38" />
                                            <div class="pl-2 pl-sm-3">
                                            <p class="medium themecolor mb-0 text-left"> {{accountDetail.currency}}</p>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center w-100" v-else>
                                            <p class="medium textcolor mb-0 text-left themecolor">Select currency to link your card</p>
                                        </div>
                                        <feather type="chevron-down" class="ml-2" size="20px"></feather>
                                    </a>
                                    
                                    <ul class="dropdown-menu scrollbar" >
                                        <input type="text" placeholder="Search here..." class="dropdownSearch" v-model="searchCurr"  /> 
                                        <li v-for="list in currencyListFunc()" @click.prevent="checkAccountDetailFunc(list)" >
                                            <a href="javascript:void(0)" class="px-2 px-xl-3">
                                            <div class="d-flex align-items-center">
                                                <img :src="'/assets/website/images/crypto_logos/'+list.currency.toLowerCase() +'.png'" alt="Coin" class="d-block cryptoCoin" width="38" height="38" /> 
                                               
                                                <div class="pl-2 pl-sm-3" >
                                                    <p class="medium themecolor mb-0 text-left">{{list.currency}} </p>
                                                </div>
                                            </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="btn-wrap addFunds text-right" v-if="Object.keys(card_account_details).length > 0 && parseFloat(card_account_details.availableBalance.hFiatEquivalentBalance) > 0" >
                                <button class="btn mb-4" @click.prevent="checkAccountDetailFunc(accountDetail) ; addFund = !addFund">Add Funds</button>
                            </div>

                            <div v-if="Object.keys(bankDetails).length > 0 && parseFloat(card_account_details.availableBalance.hFiatEquivalentBalance).toFixed(2) <= 0.00">
                                <div class="bankDetails border round-sm mb-4">
                                    <div class="detailItem d-flex justify-content-between">
                                        <p class="m-0 medium themecolor">Bank Country {{getAccountApiHit()}}</p>
                                        <p class="m-0 textcolor d-flex align-items-center valueText">{{bankDetails.bankCountry}} <feather type="copy" class="ml-3" size="20px" @click.prevent="handleCopy(bankDetails.bankCountry,'data has been copied')"></feather></p>
                                    </div>
                                    <div class="detailItem d-flex justify-content-between">
                                        <p class="m-0 medium themecolor">Bank Address</p>
                                        <p class="m-0 textcolor d-flex align-items-center valueText">{{bankDetails.bankAddress}} <feather type="copy" class="ml-3" size="20px" @click.prevent="handleCopy(bankDetails.bankAddress,'data has been copied')"></feather></p>
                                    </div>
                                    <div class="detailItem d-flex justify-content-between">
                                        <p class="m-0 medium themecolor">Iban</p>
                                        <p class="m-0 textcolor d-flex align-items-center valueText">{{bankDetails.iban}} <feather type="copy" class="ml-3" size="20px" @click.prevent="handleCopy(bankDetails.iban,'data has been copied')"></feather></p>
                                    </div>
                                    <div class="detailItem d-flex justify-content-between">
                                        <p class="m-0 medium themecolor">Bic</p>
                                        <p class="m-0 textcolor d-flex align-items-center valueText">{{bankDetails.bic}} <feather type="copy" class="ml-3" size="20px" @click.prevent="handleCopy(bankDetails.bic,'data has been copied')"></feather></p>
                                    </div>
                                    <div class="detailItem d-flex justify-content-between">
                                        <p class="m-0 medium themecolor">Account Number</p>
                                        <p class="m-0 textcolor d-flex align-items-center valueText">{{bankDetails.accountNumber}} <feather type="copy" class="ml-3" size="20px" @click.prevent="handleCopy(bankDetails.accountNumber,'data has been copied')"></feather></p>
                                    </div>
                                    <div class="detailItem d-flex justify-content-between">
                                        <p class="m-0 medium themecolor">Bank Name</p>
                                        <p class="m-0 textcolor d-flex align-items-center valueText">{{bankDetails.bankName}} <feather type="copy" class="ml-3" size="20px" @click.prevent="handleCopy(bankDetails.bankName,'data has been copied')"></feather></p>
                                    </div>
                                    <div class="detailItem d-flex justify-content-between">
                                        <p class="m-0 medium themecolor">Bank Account Holder Name</p>
                                        <p class="m-0 textcolor d-flex align-items-center valueText">{{bankDetails.bankAccountHolderName}}<feather type="copy" class="ml-3" size="20px" @click.prevent="handleCopy(bankDetails.bankAccountHolderName,'data has been copied')"></feather></p>
                                    </div>
                                    <div class="detailItem d-flex justify-content-between">
                                        <p class="m-0 medium themecolor">Provider</p>
                                        <p class="m-0 textcolor d-flex align-items-center valueText">{{bankDetails.provider}} <feather type="copy" class="ml-3" size="20px" @click.prevent="handleCopy(bankDetails.provider,'data has been copied')"></feather></p>
                                    </div>
                                </div>
                                <div class="timerWrap">
                                    <h2 id="countdown">
                                        <span id="timer">20</span>  : <span id="timer1">00</span>
                                    </h2>
                                </div>
                                <p class="mb-4">To activate your virtual card, Your linked wallet must have a minimum 20 euros. Add the required funds to proceed with card activation.</p>
                                <RouterLink class="textcolor fixBtn d-inline-flex align-items-center justify-content-center" to="/crypto-debit-cards"><feather type="arrow-left" class="mr-2" size="20px"></feather> Back to all cards</RouterLink>
                            </div>

                            <div class="" v-if="(Object.keys(accountDetail).length > 0 && accountDetail.currency.toLowerCase() != 'eur' &&   card_wallets.wallets[0].accounts[accountDetail.currency].enriched == true && Object.keys(card_account_details).length > 0 && parseFloat(card_account_details.availableBalance.hFiatEquivalentBalance).toFixed(2) <= 0.00) ">

                                <div class="qr-sec d-flex align-items-center flex-column border round-sm mb-4 position-relative">
                                    <div class="qr-wrap d-flex align-items-center justify-content-center">
                                        <!-- <img class="img-fluid" src="/assets/website/images/activation-qr.png"> -->
                                        <QRCodeVue3 :value="card_wallets.wallets[0].accounts[accountDetail.currency].blockchainDepositAddress"  v-if="card_wallets.wallets[0].accounts[accountDetail.currency].enriched == true"/>
                                        <QRCodeVue3 :value="blockchainDepositAddress" v-else />
                                    </div>
                                    <p class="mb-0 semibold secondarycolor" v-if="card_wallets.wallets[0].accounts[accountDetail.currency].enriched == true">{{card_wallets.wallets[0].accounts[accountDetail.currency].blockchainDepositAddress}}</p>
                                    <p class="mb-0 semibold secondarycolor" v-else>{{blockchainDepositAddress}}</p>
                                    
                                    <button class="cap_btn border-btn-secondary extra_small_btn" @click.prevent="handleCopy(card_wallets.wallets[0].accounts[accountDetail.currency].blockchainDepositAddress,'The deposit address has been copied')" v-if="card_wallets.wallets[0].accounts[accountDetail.currency].enriched == true"><feather type="copy" class="mr-2" size="14px"></feather>Copy</button>
                                    <button class="cap_btn border-btn-secondary extra_small_btn" @click.prevent="handleCopy(blockchainDepositAddress,'The deposit address has been copied')" v-else><feather type="copy" class="mr-2" size="14px"></feather>Copy</button>
                                </div>
                                {{getAccountApiHit()}}
                                <div class="timerWrap">
                                    <h2 id="countdown">
                                        <span id="timer">20</span>  : <span id="timer1">00</span>
                                    </h2>
                                </div>

                                <p class="mb-4">To activate your virtual card, Your linked wallet must have a minimum 20 euros. Add the required funds to proceed with card activation.</p>
                                <RouterLink class="textcolor fixBtn d-inline-flex align-items-center justify-content-center" to="/crypto-debit-cards"><feather type="arrow-left" class="mr-2" size="20px"></feather> Back to all cards</RouterLink>
                            </div>


                            
                            <div class="successMessage d-flex" v-if="Object.keys(card_account_details).length > 0 && parseFloat(card_account_details.availableBalance.hFiatEquivalentBalance) > 0">
                                <div class="img-wrap w20">
                                    <img class="img-fluid" src="/assets/website/images/greencheck.svg">
                                </div>
                                <div class="content-wrap">
                                    <!-- <h3 class="medium">Success!</h3>
                                    <p class="themecolor mb-4">You have successfully activated your card<br>
                                        ending 4564</p> -->
                                    <p class="themecolor mb-1">Available Balance </p>
                                    <h2 class="semibold green">{{card_account_details.availableBalance.hFiatEquivalentBalance}} {{card_account_details.availableBalance.fiatCurrency}}</h2>
                                    <h4 class="semibold ">({{card_account_details.availableBalance.hAmount}} {{card_account_details.currency}})</h4>
                                </div>
                            </div>

                            <!--  -->
                            <div class="row" v-if="Object.keys(accountDetail).length > 0 &&  card_wallets.wallets[0].accounts[accountDetail.currency].enriched == true && Object.keys(card_account_details).length > 0 && parseFloat(card_account_details.availableBalance.hFiatEquivalentBalance) > 0">
                                <div class="col-md-12">
                                    <div class="form-group mb-4">
                                        <label class="labeltext d-flex align-items-center">
                                            Create Password 
                                            <feather type="info" size="17px" class="themecolor ml-2 pointer" data-toggle="tooltip" data-placement="top" :title="passVlidation"></feather>
                                        </label>
                                        <div class="d-flex justify-content-between align-items-center border round-sm" >
                                            <!-- <input :type="show_create_pass" class="form-control border-0" placeholder="*******" v-model="password" /> -->
                                            <Field :type="show_create_pass" class="form-control border-0" name="password" placeholder="*******" v-model="password" :rules='{ required : true , regex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#;:?&*()+=/\,.{}]).{8,20}$/ }' />
                                            <div class="mr-3">
                                            <a href="javascript:void(0);" class="d-block">
                                                <feather type="eye" size="20px" class="d-block textcolor" v-if="show_create_pass === 'text'" @click.prevent="passwordIconChangeFunc('password','password')"></feather>
                                                <feather type="eye-off" size="20px" class="d-block textcolor" v-if="show_create_pass === 'password'" @click.prevent="passwordIconChangeFunc('password','text')"></feather>
                                            </a>
                                            </div>
                                        </div>
                                        <ErrorMessage name="password" class="text-danger" />
                                        <div class="successMessage-report pt-3">
                                            <div class="charactersMessage">
                                              <p class="mb-1">Your password must have</p>
                                              <ul class="flex-wrap d-flex justify-content-between align-items-center">
                                                <li :class="testing('capital') ? 'text-success' : ''"> * 1 uppercase character </li>
                                                <li :class="testing('length') ? 'text-success' : ''"> * 8 or more characters </li>
                                                <li :class="testing('Number') ? 'text-success' : ''"> * Number </li>
                                                <li :class="testing('Letters') ? 'text-success' : ''"> * Letters </li>
                                                <li :class="testing('Special_char') ? 'text-success' : ''"> * Special characters </li>
                                              </ul>
                                            </div>
                                          </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group mb-1">
                                        <label class="labeltext">Confirm Password</label>
                                        <div class="d-flex justify-content-between align-items-center border round-sm" >
                                            <!-- <input :type="show_conf_pass" class="form-control border-0" placeholder="*******" v-model="confirm_password" /> -->
                                            <Field :type="show_conf_pass" class="form-control border-0" name="confirm_password" placeholder="*******" v-model="confirm_password" rules="required|confirmed:password" />
                                            <div class="mr-3">
                                            <a href="javascript:void(0);" class="d-block">
                                                <feather type="eye" size="20px" class="d-block textcolor" v-if="show_conf_pass === 'text'" @click.prevent="passwordIconChangeFunc('confirm_password','password')"></feather>
                                                <feather type="eye-off" size="20px" class="d-block textcolor" v-if="show_conf_pass === 'password'" @click.prevent="passwordIconChangeFunc('confirm_password','text')"></feather>
                                            </a>
                                            </div>
                                        </div>
                                        <ErrorMessage name="confirm_password" class="text-danger" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div id="carouselExampleIndicators" class="carousel slide card-slider pt-2 mt-4" data-ride="carousel">
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
                        </div>
                    </div> 
                     
                    <!-- <input type="button" v-if="Object.keys(card_wallets).length > 0 && card_wallets.wallets && card_wallets.wallets.length > 0 && card_wallets.wallets[0].accounts[currency].enriched == false" value="get Card Address" class="cap_btn large_btn mb-0" @click="getCardAddress()" /> -->
                    
                    <input type="submit" class="cap_btn large_btn fixBtn mt-4"  value="Activate your card" v-if="Object.keys(accountDetail).length > 0  && card_wallets.wallets[0].accounts[accountDetail.currency].enriched == true && Object.keys(card_account_details).length > 0 && parseFloat(card_account_details.availableBalance.hFiatEquivalentBalance) > 0" />
                </div>
            </Form>

            <div class="modal" tabindex="-1" id="cancelInvoice" role="dialog" aria-hidden="true" v-if="Popup == true" >
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-body text-center">
                            <div class="img-wrap mt-4">
                                <img width="65" height="65" class="img-fluid" src="/assets/website/images/checkIcon.svg" alt="check icon">
                            </div>
                            <h3 class="text-center medium d-block lh-normal mb-4 pb-2 mt-4">You have successfully activated your card.</h3>
                            <RouterLink class="cap_btn large_btn mb-4 mx-auto" :to="{path : 'card-dashboard', query:{cardId: responseId}}">Show Card Details</RouterLink>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal" tabindex="-1" id="cancelInvoice" role="dialog" aria-hidden="true" v-if="addFund == true" >
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        
                         <div class="modal-header border-0 d-block text-right">
                            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="addFund = false">
                            <feather type="x" size="22px"></feather>
                            </a>
                        </div>
                        <div class="modal-body text-center">
                            <!-- <div class="img-wrap mt-4">
                                <img width="65" height="65" class="img-fluid" src="/assets/website/images/checkIcon.svg" alt="check icon">
                            </div> -->
                            <div class="qr-sec d-flex align-items-center flex-column border round-sm mb-4 position-relative">
                                <div class="qr-wrap d-flex align-items-center justify-content-center">
                                    <!-- <img class="img-fluid" src="/assets/website/images/activation-qr.png"> -->
                                    <QRCodeVue3 :value="card_wallets.wallets[0].accounts[accountDetail.currency].blockchainDepositAddress"  v-if="card_wallets.wallets[0].accounts[accountDetail.currency].enriched == true"/>
                                    <QRCodeVue3 :value="blockchainDepositAddress" v-else />
                                </div>
                                <p class="mb-0 semibold secondarycolor" v-if="card_wallets.wallets[0].accounts[accountDetail.currency].enriched == true">{{card_wallets.wallets[0].accounts[accountDetail.currency].blockchainDepositAddress}}</p>
                                <p class="mb-0 semibold secondarycolor" v-else>{{blockchainDepositAddress}}</p>
                                
                                <button class="cap_btn border-btn-secondary extra_small_btn" @click.prevent="handleCopy(card_wallets.wallets[0].accounts[accountDetail.currency].blockchainDepositAddress,'The deposit address has been copied')" v-if="card_wallets.wallets[0].accounts[accountDetail.currency].enriched == true"><feather type="copy" class="mr-2" size="14px"></feather>Copy</button>
                                <button class="cap_btn border-btn-secondary extra_small_btn" @click.prevent="handleCopy(blockchainDepositAddress,'The deposit address has been copied')" v-else><feather type="copy" class="mr-2" size="14px"></feather>Copy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        <div class="bg-white border round-sm cryptoCards position-relative mh-calc"  v-else-if="cardPermission()">
            <div class="head-sec d-flex align-items-center justify-content-between flex-wrap mb-0 pb-0">
                <h4 class="mb-0 pb-3 border-bottom w-100">Card Activation Status</h4>
            </div>
            <div class="body-sec" >
                <div class="employeeList" id="myUL">
                  <div class="employeeItem"   >
                    <div class="itemHead" :class="(card_users_by_id.cards == undefined || card_users_by_id.cards.length == 0  ) ? 'align-items-center' : ''">
                      <div class="userItem statuses d-flex align-items-center " :class="(card_users_by_id.cards == undefined || card_users_by_id.cards.length == 0  ) ? 'pending ': 'active'">
                        <div class="img-wrap">
                            <img class="img-fluid" src="/assets/website/images/dummy-user.svg">
                        </div>
                        <div class="content-sec">
                            <h5 class="medium mb-0">{{ card_users_by_id.first_name }} {{ card_users_by_id.last_name }} </h5>
                             <p class="medium mb-0"> {{ card_users_by_id.email }}</p>
                        </div>
                      </div>
                      <div class="badges" v-if="card_users_by_id.cards == undefined || card_users_by_id.cards.length == 0 " >
                        <p class="badge-item yellow"  @click="activatePopup = true">Card Activation Pending</p>
                      </div>
                      
                    </div>
                  </div>
                </div>
            </div>
        </div>

        <div v-if="activatePopup">
            <div class="mid_scroll_content">
                <div class="pageContent border-0">
                    <div class="img-wrap">
                        <img class="img-fluid d-block w-100" src="/assets/website/images/dashboard-blur.png">
                    </div>

                    <div class="pending-activation-popup">
                        <img width="70" class="img-fluid mb-3" src="/assets/website/images/greencheck.svg">
                        <h3 class="text-center medium d-block lh-normal mb-0">Pending card activation</h3>
                        <p class="mt-2 mb-3 regular textcolor">Your virtual card requires to be activated by the account administrator</p>
                        <a href="#" class="cap_btn large_btn mb-0 m-auto" @click="activatePopup = false">Go Back</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import { cardsMixins } from "@/plugins/cards";
  import QRCodeVue3 from "qrcode-vue3";
  import { inject } from 'vue' ;
  import CryptoJS from 'crypto-js' ;
  import { RouterLink } from 'vue-router';
  import { Const } from "@/plugins/cards/provider/lib/const.cls.ts";
  import { Form, Field, ErrorMessage } from "vee-validate";
  // const cryptojs = inject('cryptojs') as typeof CryptoJS ;
  export default {
    name: "step-four",
    mixins: [cardsMixins],
    data() {
      return {
        pageLoader: false,
        activatePopup : false,

        blockchainDepositAddress : '',

        accountDetail : {},

        password: "",
        confirm_password: "",
        show_create_pass: "password",
        show_conf_pass: "password",
        searchCurr: "",
        Popup : false,
        cardType: 'own',
        timeInSecs: 0,
        ticker: 0,
        passVlidation : 'A strong password used to authenticate this card on online transactions - 8-36 characters containing only the allowed charset A-Z a-z 0-9 ! " # ; : ? & * ( ) + = / \ , . [ ] { }',
        bankDetails: {},
        responseId : '',
        addFund : false
      };
    },
    components: { Form, Field, ErrorMessage, QRCodeVue3 },
    methods: {
        testing(type) {
            var num = /[0-9]/g;
            var Lett = /[a-z A-Z]/g;
            var uppercase = /[A-Z]/g;
            var Special_char = /[!"#;:?&*()+=/\,.{}]/g;
            if (type == "length") {
              return this.password.length >= 8;
            } else if (type == "Number") {
              return num.test(this.password);
            } else if (type == "Letters") {
              return Lett.test(this.password);
            } else if (type == "Special_char") {
              return Special_char.test(this.password);
            } else if (type == "capital") {
              return uppercase.test(this.password);
            }
        },
        getAccountApiHit(){
            const _that = this;
            if(Object.keys(_that.accountDetail).length > 0){
                setTimeout(function() { 
                    _that.cardAccountDetails('hit after 2 min')
                }, 120000);
            }
        },
        startTimer(secs){
            
            let input_json = {
                'globalParams': {
                    "eventType": "Demo50",
                    "userId": 1750,
                    "message": "This is test event-2"
                },
                'localParams': { "parameter": this, 'sse':'sse' }
            }
            this._runGetNotificationEvents(input_json)

            const _that = this;
            clearInterval(timerInterval);
            var timeLimitInMinutes = 20;
            var timeLimitInSeconds = timeLimitInMinutes * 60;
            var timerElement = document.getElementById('timer');
            var timerElement1 = document.getElementById('timer1');
            function startTimer() {
              timeLimitInSeconds--;
              var minutes = Math.floor(timeLimitInSeconds / 60);
              var seconds = timeLimitInSeconds % 60;

              if (timeLimitInSeconds < 0) {
               _that.$router.push({path : '/crypto-debit-cards'})
                timerElement.textContent = '00';
                timerElement1.textContent = '00';
                clearInterval(timerInterval);
                return;
              }

              if (minutes < 10) {
                minutes = '0' + minutes;
              }
              if (seconds < 10) {
                seconds = '0' + seconds;
              }

              timerElement.textContent = minutes ;
              timerElement1.textContent = seconds;
            }

            var timerInterval = setInterval(startTimer, 1000);
        },
        currencyListFunc(){
            let returnData = [], count =0 ;
            for(let key in this.card_wallets.wallets[0].accounts){
                count++
                let value= this.card_wallets.wallets[0].accounts[key];
                // if(value.linkedCardId.toLowerCase() == 'unlinked'){
                    
                // }
                returnData.push(value)
                if(count == Object.keys(this.card_wallets.wallets[0].accounts).length){
                    var search = this.searchCurr.toLowerCase();
                    return returnData.filter((val) => this.searchCurr ? (val.currency.toLowerCase().includes(search)) : true);
                }
            }
        },
        //1
        checkAccountDetailFunc(getData){
            this.password= ""
            this.confirm_password= ""
            let cardActivateState = {};
            cardActivateState[this.$route.query.userId] = getData ;
            localStorage.setItem("cardActivateState", JSON.stringify(cardActivateState));
            this.bankDetails = {}
            this.accountDetail = getData
            this.cardAccountDetails('')
        },
        cardAccountDetails(getData) {
            let input_json = {
                'globalParams': {
                    "userId": this.card_users_by_id.str_user_id,
                    "accountId": this.accountDetail.accountId
                },
                'localParams': { "parameter": this,'page': 'card-top-up', 'module': getData }
            }
            this._runGetAccountDetails(input_json)
        },
        checkEnrichFlag(getData){
            if(this.card_account_details.enriched == false){
                this.getCardAddress()
            }else{
                if(this.card_account_details.currency.toLowerCase() == 'eur'){
                    this.bankDetails = this.card_account_details.bankingDetails
                }else{
                    // this.resetTimer(getData)
                }
                this.resetTimer(getData)
            }
        },
        resetTimer(getData){
            const _that = this ;
            if(getData == 'hit after 2 min'){

            }else{
               setTimeout(function() { 
                    var timerElement = document.getElementById('timer');
                    var timerElement1 = document.getElementById('timer1');
                    clearInterval(timerElement);
                    clearInterval(timerElement1);
                    timerElement.textContent = '20' ;
                    timerElement1.textContent = '00';
                    _that.startTimer() 
                }, 2000); 
            }
        },
        getAllCardUsersFunc(userId,getStep){
            let input_json = {
              'globalParams': {
                "userId": userId
              },
              'localParams': { "parameter": this, "steps": getStep }
            }
            this._runGetCardUserById(input_json)
        },
        getAllCardWalletByUser(){
            if(this.$route.query.flag && this.$route.query.flag == 'wallet'){
                let input_json = {
                  'globalParams': {
                    "userId": this.card_users_by_id.str_user_id,
                    "includeCustodyOnlyAssets": false
                  },
                  'localParams': { "parameter": this }
                }
                this._runCardWalletCreate(input_json)
            }else{
                let input_json = {
                  'globalParams': {
                    "userId": this.card_users_by_id.str_user_id,
                    "startDate": "1656622800000",
                    "endDate": "1656622800000",
                    "page": 1
                  },
                  'localParams': { "parameter": this }
                }
                this._runGetAllCardWalletByUser(input_json)
            }
        },
        getCardAddress(){
            let input_json = {
              'globalParams': {
                "userId": this.card_users_by_id.str_user_id,
                "accountId": this.accountDetail.accountId
              },
              'localParams': { "parameter": this  ,'page': 'card-activation', 'currency': this.card_account_details.currency}
            }
            this._runGetCardAddress(input_json)
        },
        cardActivate(){
            const _that = this;
            const ENC_KEY = "F*V(I)e^E#1108@3" ;
            const encryptedPassword = this.$CryptoJS.AES.encrypt(_that.password, ENC_KEY).toString()
            let input_json = {
              'globalParams': {
                "user_id": this.get_user.id.toString(),
                "nameOnCard": this.card_users_by_id.first_name+' '+this.card_users_by_id.last_name,
                "userId": this.card_users_by_id.str_user_id,
                "address": {
                    "addressLine1": this.card_users_by_id.address,
                    "addressLine2": '',
                    "postalCode": this.card_users_by_id.postal_code,
                    "city": this.card_users_by_id.city,
                    "countryCode": this.card_users_by_id.country,
                    "dispatchMethod" : "TRACKED"
                },
                "accountIdToLink": this.accountDetail.accountId,
                "type": "VIRTUAL",
                "threeDSecurePassword": _that.password
              },
              'localParams': { "parameter": this }
            }
            this._runCardActivate(input_json)
        },
        passwordIconChangeFunc(getMode, getType) {
            if (getMode == 'password') {
              this.show_create_pass = getType
            } else if (getMode == 'confirm_password') {
              this.show_conf_pass = getType
            }
        },
    },
    created(){
        this.$store.commit(Const.SET_CARD_ACCOUNT_DETAILS, {});
        this.getAllCardUsersFunc(this.card_users_by_id.str_user_id, 8)
        this.getAllCardWalletByUser()

        if(localStorage.getItem("cardActivateState")){
            let cardActivateState = JSON.parse(localStorage.getItem("cardActivateState"));
            if(cardActivateState.hasOwnProperty(this.$route.query.userId)) {
                // console.log('new code ', cardActivateState[this.$route.query.userId])
                this.checkAccountDetailFunc(cardActivateState[this.$route.query.userId])
            }
        }
        // setInterval(_that.startTimer(5*60), 3000); 
    }
  };
</script>