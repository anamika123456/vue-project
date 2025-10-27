<template>
  <div>
    <loader v-if="pageLoader"></loader>
    <div class="modal" tabindex="-1" id="crypto-payout-confirmation" role="dialog" aria-labelledby="crypto-payout-confirmation" aria-hidden="true" v-if="showPopup == 1">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document"> 
        <div class="modal-content">
          <div class="modal-header border-0 d-flex justify-content-between align-items-center">
            <!-- <a href="javascript:void(0);"><feather type="chevron-left" size="22px"></feather></a> -->
            <div class="modal-title">
              <h3 class="semibold mb-0">Crypto Payout</h3>
            </div>
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="reset()">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body pt-2 pt-md-0">
            <div class="d-flex justify-content-center align-items-center">
              <img :src="'/assets/website/images/crypto_logos/' +selected_currency.toLowerCase() +'.png'" alt="Coin" class="d-block" width="80" height="80" />
            </div>
            <div class="d-flex justify-content-center pt-4">
              <h6 class="textcolor semibold mb-0">You spend</h6>
              <h6 class="semibold mb-0 ml-1">
                {{ withdraw_amount }} {{ selected_currency }}
              </h6>
            </div>
            <div class="text-center pt-3">
              <h6 class="textcolor medium mb-0">To</h6>
            </div>
            <div class="pt-3 d-block d-sm-flex justify-content-center text-center">
              <h6 class="textcolor medium mb-0 pr-2 word-break">
                {{ crypto_addess }}
              </h6>
              <!-- <h6 class="medium mb-0 themecolor">(Mareena)</h6> -->
            </div>



            <div class="pt-4">
              <div class="d-block d-sm-flex justify-content-between border-bottom pb-4 pt-4">
                <h6 class="medium mb-0">Network Fees</h6>
                <h6 class="medium mb-0">network fees applies on execution</h6>
              </div>
              <div class="d-block d-sm-flex justify-content-between border-bottom pb-4 pt-4">
                <h6 class="medium mb-0">Total Withdrawal Amount</h6>
                <h6 class="medium mb-0">
                  {{ withdraw_amount ? withdraw_amount - 0 : "0" }}
                  {{ selected_currency }}
                </h6>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 pt-2">
            <div class="d-flex justify-content-center w-100 align-items-center">
              <a href="javascript:void(0);" class="cap_btn large_btn mb-0" data-dismiss="modal" aria-label="Close" @click="withdrawal_req_otp()">Confirm</a>
              <!-- <div class="d-flex convertClock text-center ml-3 align-items-center justify-content-center"><p class="mb-0 pt-2 themecolor medium">59</p></div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" tabindex="-1" id="fa-password-two" role="dialog" aria-labelledby="fa-password-two" aria-hidden="true" v-if="showPopup == 2">
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
              <input type="text" placeholder="Enter 2FA Code" class="form-control" v-model="otp" />
            </div>
            
          </div>
          <div class="modal-footer justify-content-center pt-4 border-0">
            <a class="cap_btn blue px-4 large_btn mb-0" href="javascript:void(0);" @click="withdrawal_req_otp_check()">Submit</a>
          </div>
        </div>
      </div>
    </div>
    <div class="modal double-modal" tabindex="-1" id="withdrawal-message" role="dialog" aria-labelledby="withdrawal-message" aria-hidden="true" v-if="showPopup == 3">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content pb-0">
          <div class="modal-body">
            <h3 class="text-center mt-4 mb-0 medium d-block lh-normal"> Withdrawal request has been submitted. </h3>
            <h3 class="text-center mt-4 mb-0 medium d-block lh-normal"> {{currencyNameFunc(selected_currency.toUpperCase())}} ({{selected_currency}}) </h3>
          </div>
          <div class="modal-footer border-0 pt-0">
            <div class="d-flex justify-content-center w-100">
              <router-link :to="{name: 'view',  query: { id: ticket_id }}" class="cap_btn large_btn border-btn mb-0" data-dismiss="modal" aria-label="Close">MORE DETAILS <feather type="chevron-right"></feather></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="pt-2 pt-md-4 col-12 col-xl-10 col-xxl-8 col-xxxl-7">
        <Form @submit="checkWithdraw()" ref="regform">
          <!-- <div class="d-block d-md-flex justify-content-center conversionsRow mb-0 mb-md-4"><div class="conversionsText d-none d-md-block">&nbsp;</div><div class="conversionsInput text-right"><a href="javascript:void(0);" class="secondarycolor semibold f-18" data-toggle="modal" data-target="#schedule-your-payout">Schedule Your Payout</a></div></div> -->
          <div class="d-block d-md-flex justify-content-center conversionsRow mb-2 mb-md-4">
            <div class="conversionsText pt-3 pb-2 pb-md-3">
              <p class="themecolor medium mb-0">Insert Amount</p>
            </div>
            <div class="conversionsInput"> 
              <div class="d-flex border round-sm lightgrayBG">
                <div class="inputField inputHeight d-flex align-items-center">
                  <!--v-validate="{required: true,decimal: 8,max_value: currentBal,regex: /^(?=.*[1-9])\d+(\.\d+)?$/,}" required=""--->
                  <Field type="text" class="form-control border-0 px-3 lightgrayBG" id="" name="Withdraw amount" placeholder="Enter Amount" v-model="withdraw_amount"   :rules="{ required : true , regex: /^(?=.*[1-9])\d+(\.\d+)?$/, max_value: currentBal, decimal: 8 }"  />
                </div>
                <div class="selectField border-left d-flex align-items-center selectCurrency">
                  <div class="selectDropMenu destinationDropMenu position-relative round-sm w-100">
                    <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink inputHeight border-0 py-0" data-toggle="dropdown">  
                     

                      <img :src="'/assets/website/images/crypto_logos/' +selected_currency.toLowerCase() +'.png'" alt="Coin" class="d-block cryptoCoin destinationdropImg h-auto" width="38" height="38" v-if="selected_currency != ''" />


                      <div class="d-flex align-items-center justify-content-between w-100">
                        <p class="medium themecolor mb-0 text-left pl-1 pl-sm-2" v-if="selected_currency != ''">
                          {{ selected_currency }}
                        </p>
                        <p class="medium themecolor mb-0 text-left" v-else>Select Crypto</p>
                        <feather type="chevron-down" size="18px" class="ml-1"></feather>
                      </div>
                    </a>
                    <ul class="dropdown-menu scrollbar">
                      <input type="text" placeholder="Search here..." class="dropdownSearch" v-model="searchCurr" />
                      <li v-for="value in marginList()" v-show="marginList().length > 0" @click="currencyListNameFunc(value.symbol, '')">
                        <a href="javascript:void(0)" class="">
                          <div class="d-flex align-items-center">
                            <img :src="'/assets/website/images/crypto_logos/'+value.symbol.toLowerCase()+'.png'" alt="Coin" class="d-block cryptoCoin destinationdropImg h-auto" width="38" height="38" />
                            <div class="pl-1 pl-sm-2">
                              <p class="medium themecolor mb-0 text-left lh-normal" v-if="$env_var.restricted_currencies.hasOwnProperty(value.symbol)">{{ $env_var.restricted_currencies[value.symbol].currency_name}}</p>
                              <p class="medium themecolor mb-0 text-left lh-normal" v-else>
                                {{ value.symbol }}  - {{currencyNameFunc(value.symbol)}}
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li v-if="marginList().length == 0" class="d-flex align-items-center justify-content-center pt-2 pb-3">
                        <feather type="alert-circle" class="mr-2 textcolor" size="18px"></feather>
                        <p class="d-block textcolor mb-0">No Data Available</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="conversionsPercent d-flex justify-content-between pt-3">
                <p class="textcolor medium mb-0 lh-normal conversionsBalance mt-3 mt-sm-0">(Balance: <span class="green">{{ currentBaShow }} {{ selected_currency }}</span>) </p>
                <ul class="mb-0 d-flex justify-content-start justify-content-sm-end">
                  <li>
                    <a href="javascript:void(0);" :class="percentage == 25 ? 'active' : ''" @click="getAmount(25)">25%</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" :class="percentage == 50 ? 'active' : ''" @click="getAmount(50)">50%</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" :class="percentage == 75 ? 'active' : ''" @click="getAmount(75)">75%</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" :class="percentage == 100 ? 'active' : ''" @click="getAmount(100)">100%</a>
                  </li>
                </ul>
              </div>
              <ErrorMessage name="Withdraw amount" class="text-danger" />
              <div v-if="withdraw_amount && amount_usd ">
                <Field type="hidden" class="form-control border-0 px-3 lightgrayBG" id="" name="amount_in_usd" placeholder=" " v-model="amount_usd" :rules="{ required : true , regex: /^(?=.*[1-9])\d+(\.\d+)?$/,  min_value: 10, decimal: 8 }" readonly />
                <ErrorMessage name="amount_in_usd" class="text-danger" />
              </div>
            </div>
          </div>

          <div class="d-block d-md-flex justify-content-center conversionsRow mb-4">
            <div class="conversionsText pt-3 pb-2 pb-md-3">
              <p class="themecolor medium mb-0">Destination Address</p>
            </div>
            <div class="conversionsInput">
              <div class="d-flex border round-sm lightgrayBG position-relative selectmenu destinationdrop destinationdropdown">
                <Field type="text" class="form-control border-0 px-3 lightgrayBG" id="" name="Crypto_address" placeholder="Enter Crypto Address" v-model="crypto_addess" rules="required" />
              </div>
              <ErrorMessage name="Crypto_address" class="text-danger" />
            </div>
          </div>

          <div class="d-block d-md-flex justify-content-center conversionsRow mb-4">
            <div class="conversionsText pt-3 pb-2 pb-md-3">
              <p class="themecolor medium mb-0">Comment</p>
            </div>
            <div class="conversionsInput">
              <div
                class="d-flex border round-sm lightgrayBG position-relative selectmenu destinationdrop destinationdropdown">
                <Field type="hidden"  id="" name="comment"  v-model="comment" rules="required" />
                  <textarea class="form-control border-0 px-3 lightgrayBG" v-model="comment" name="comment"
					        maxlength="500"></textarea>
              </div>
              <ErrorMessage name="comment" class="text-danger" />
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
            <div class="conversionsInput">
              <input type="submit" class="cap_btn large_btn border-0 mb-0" data-toggle="modal" data-target="#crypto-payout-confirmation" value="Review Transaction" />
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  import { depositWithdrawalMixins } from "@/plugins/depositWithdrawal";
  import tradingMixins from "@/plugins/trading";
  import moment from "moment";
  import { Form,Field,ErrorMessage } from "vee-validate";
  import {  Const } from "@/plugins/vue-provider-cache/const.mod";
  export default {
    name: "deposit-section",
    mixins: [depositWithdrawalMixins, tradingMixins],
    data() {
      return {
        pageLoader: false,
        destinationwallet: false,
        destinationaddress: false,
        margin_list: {},
        selected_currency: "",
        searchCurr: "",
        withdraw_amount: "",
        crypto_addess: "",
        otp: "",
        showPopup: -1,
        ticket_id : -1,
        act_account_id: "",
        percentage: '',
        amount_usd: '',
        comment: ''
      };
    },
    components: {Form,Field,ErrorMessage},
    computed: {
      instruments() {
        try {
          // console.log('this.instruments-----',this.instruments)
          this.$store.getters[Const.GET_HEARTBEATS]["priceFeed"];
          return this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].iCache.asKeysValueArrayAll();
        } catch (ex) {
          return [];
        }
      },
      currentBal() {
        try {
          let sendCurr = this.selected_currency, outerCount = 0, returnData = 0;
          if(this.selected_currency != ''){
            for (let key in this.marginInfoList) {
              outerCount++;
              if (sendCurr == this.marginInfoList[key].currency && parseFloat(this.marginInfoList[key].amount) > 0) {
                returnData = this.marginInfoList[key].amount;
              }
              if (outerCount == Object.keys(this.marginInfoList).length) {
                return this.numberFormat1(returnData,'',sendCurr);
              }
            }
          }else{
            return returnData;
          }
        } catch (e) {
          return 0;
        }
      },
      currentBaShow() {
        try {
          let sendCurr = this.selected_currency, outerCount = 0, returnData = 0;
          if(this.selected_currency != ''){
            for (let key in this.marginInfoList) {
              outerCount++;
              if (sendCurr == this.marginInfoList[key].currency && parseFloat(this.marginInfoList[key].amount) > 0) {
                returnData = this.marginInfoList[key].amount;
              }
              if (outerCount == Object.keys(this.marginInfoList).length) {
                return this.numberFormat(returnData,'',sendCurr);
              }
            }
          }else{
            return returnData;
          }
        } catch (e) {
          return 0;
        }
      }
    },
    watch: {
      selected_currency(value) { 
        this.withdraw_amount = this.numberFormat1(this.currentBal * (this.percentage / 100), 8);
      },

      withdraw_amount(value) { 
        this.getConvertedValue(this.selected_currency, 'USD')
      }
    },
    methods: {
      getConvertedValue(getCryptoCurrency, currency) {
        if (getCryptoCurrency == currency) {
          this.amount_usd = this.withdraw_amount;
        } else {
          let amount = 0;
          if (this.instruments[getCryptoCurrency + "-" + currency]) {
            amount = this.instruments[getCryptoCurrency + "-" + currency].A;
          } else if (this.instruments[currency + "-" + getCryptoCurrency]) {
            amount = 1 / this.instruments[currency + "-" + getCryptoCurrency].A;
          } else {
            let basePrice = null, reversebasePrice = null, pairValue = null, revpairValue = null;
            if (currency == "USD") {
              basePrice = this.instruments[getCryptoCurrency + "-BTC"];
              reversebasePrice = this.instruments["BTC-" + getCryptoCurrency];
              pairValue = this.instruments["BTC-" + currency];
            } else {
              basePrice = this.instruments[getCryptoCurrency + "-USD"];
              reversebasePrice = this.instruments["USD-" + getCryptoCurrency];
              pairValue = this.instruments["USD-" + currency];
            }
            if (basePrice && pairValue) {
              amount = pairValue.A * basePrice.A;
            } else if (reversebasePrice && pairValue) {
              amount = pairValue.A / reversebasePrice.A;
            } else {
              amount = 0;
            }
          }
          if (currency == "USD") {
            this.amount_usd = this.numberFormat1(amount * this.withdraw_amount, 8);
          } else {
            this.amount_usd = this.numberFormat1(amount * this.withdraw_amount, 8);
          }
        }
      },
      getAmount(getamount) {
        this.percentage = getamount;
        this.withdraw_amount =  this.numberFormat1(this.currentBal * (getamount / 100), 8);
      },
      checkWithdraw() {
        var account_id = "";
        this.tradingAccount[0].subAccounts.forEach((value) => {
          if (this.selected_currency == value.currency) {
            this.act_account_id = value.act_account_id;
          }
        });
        if (this.act_account_id == "") {
          let selected_currency = (this.$env_var.restricted_currencies[this.selected_currency]) ? this.$env_var.restricted_currencies[this.selected_currency].currency_name : this.selected_currency 
          this.$notify({
            text: selected_currency + " currency has no available balance to withdraw.",
            duration: 10000,
            pauseOnHover: true,
            type: "error",
          });
        } else {
          const _that = this;
          _that.showPopup = 1;
        }
      },
      withdrawal_req_otp() {
        const _that = this;
        _that.showPopup = 2;
      },
      withdrawal_req_otp_check() {
        if (this.pageLoader) {
          return;
        }
        const _that = this;
        var sendCurr = _that.selected_currency;
        var inputJson = {
          globalParams: {
            act_account_id: _that.act_account_id,
            amount: _that.withdraw_amount,
            address: _that.crypto_addess,
            crypto: sendCurr,
            method_id: "",
            withdrawal_method: "",
            otp: _that.otp,
            comment: _that.comment 
          },
          localParams: {
            parameter: _that
          },
        };
        this._runWithdrawalCheckOtp(inputJson);
      },
      formatfloat(num) {
        if (num) {
          num = parseFloat(num);
          return num.toFixed(8);
        } else {
          return 0;
        }
      },
      marginList() {
        let returnData = [];
        if(Object.keys(this.walletCurrencyList).length > 0 && this.walletCurrencyList.payout.length > 0){
          for (let i = 0; i <= this.walletCurrencyList.payout.length - 1; i++) {
            let data = this.walletCurrencyList.payout[i];
            if (!(this.$env_var.fiatCurrencyList.hasOwnProperty(data.symbol.toUpperCase()))) {
              returnData.push(data);
            }
            
            if (i == this.walletCurrencyList.payout.length - 1) {
              var search = this.searchCurr.toLowerCase();
              return returnData.filter((val) => this.searchCurr ? val.symbol.toLowerCase().includes(search) || val.currency_name.toLowerCase().includes(search) : true);
            }
          }
        }else{
          return returnData ;
        }
      },
      currencyListNameFunc(value, requesType) {
        if(requesType == 'request_initiate' || this.selected_currency == ''){
          this.getAmount(25)
        }
        this.selected_currency = value;
        this.destinationwallet = false;
        this.searchCurr = "";
      },
      reset() {
        this.destinationwallet = false;
        this.destinationaddress = false;
        this.margin_list = {};
        this.selected_currency = "BTC";
        this.searchCurr = "";
        this.withdraw_amount = "";
        this.crypto_addess = "";
        this.otp = "";
        this.showPopup = -1;
        this.act_account_id = "";
        this.percentage = "";
      },
    },
    created() {
      if (this.$route.query.withdraw) {
        this.currencyListNameFunc(this.$route.query.withdraw,'request_initiate')
      }
    },
  };
</script>