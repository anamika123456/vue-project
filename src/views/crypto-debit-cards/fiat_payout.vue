<template>
  <div>
    <loader v-if="pageLoader"></loader>
    <div class="modal" id="add-payment-method" tabindex="-1" role="dialog" aria-labelledby="add-payment-method" aria-hidden="true" v-if="modal == 'add-bank'">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-0">
            <div class="modal-title">
              <h3 class="text-left mb-0">Add New Payment Method</h3>
            </div>
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="reset()">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body pt-0">
            <add-bank :pageNameData="'withdrawalFiat'"></add-bank>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fiat-payout-confirmation" tabindex="-1" id="fiat-payout-confirmation" role="dialog" aria-labelledby="fiat-payout-confirmation" aria-hidden="true" v-if="modal == 'confirm_withdrawal'">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 d-flex justify-content-between align-items-center">
            <!-- <a href="javascript:void(0);"><feather type="chevron-left" size="22px"></feather></a> -->
            <div class="modal-title">
              <h3 class="semibold">Fiat Payout</h3>
            </div>
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="reset()">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body pt-2 pt-md-4">
            <div class="d-flex justify-content-center align-items-center">
              <div class="lightgrayBG px-2 py-2 d-flex justify-content-center rounded-circle p-3">
                <img :src="
                    '/assets/website/images/crypto_logos/' +
                    currency.toLowerCase() +
                    '.png'
                  " alt="Coin" class="d-block" width="44" height="46" />
              </div>
            </div>
            <div class="d-flex justify-content-center pt-4">
              <h6 class="textcolor semibold mb-0">You spend</h6>
              <h6 class="semibold mb-0 ml-1">{{ amount }} {{ currency }}</h6>
            </div>
            <div class="text-center pt-3">
              <h6 class="textcolor medium mb-0">To</h6>
            </div>
            <div class="pt-3 d-flex justify-content-center align-items-center">
              <!-- <img src="/assets/website/images/santanderIcon.svg" alt="bank Icon" class="d-block mr-2" width="33" height="33" /> -->
              <h6 class="medium mb-0 themecolor">
                {{ selected_method.bank_name }} ({{ selected_method.account_no.substring(0, 2)
                }}XXXX{{ selected_method.account_no.substring(
                    selected_method.account_no.length - 2
                  )
                }})
              </h6>
            </div>
            <div class="pt-5">
              <div class="d-block d-sm-flex justify-content-between border-bottom py-2 py-sm-4">
                <div class="d-flex align-items-center">
                  <h6 class="medium mb-0">Transaction Fees</h6>
                  <a href="javascript:void(0);" class="ml-1">
                    <feather type="info" size="18px" class="d-block textcolor" data-toggle="tooltip" data-placement="top" data-html="true" title="1% applies on the fiat withdrawal amount"></feather>
                  </a>
                </div>
                <h6 class="medium mb-0">
                  {{ parseFloat(amount * transaction_fees).toFixed(2) }}
                  {{ currency }}
                </h6>
              </div>
              <div class="d-block d-sm-flex justify-content-between align-items-start border-bottom py-2 py-sm-4 modalprocessingFees">
                <h6 class="medium mb-0">Processing Fees</h6>
                <p class="mb-0 textcolor text-left text-sm-right w-50"> Additonal fees may be applied by the banking parties while processing the withdrawal </p>
              </div>
              <div class="d-block d-sm-flex justify-content-between align-items-start border-bottom py-2 py-sm-4">
                <h6 class="medium mb-0">Total Withdrawal Amount</h6>
                <h6 class="medium mb-0">
                  {{ parseFloat(amount - amount * transaction_fees).toFixed(2)
                  }}
                  {{ currency }}
                </h6>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 pt-2">
            <div class="d-flex justify-content-center w-100">
              <a href="javascript:void(0);" class="cap_btn large_btn mb-0" data-toggle="modal" data-target="#fa-password-two" aria-label="Close" @click="fiatWithdrawal_req_otp()">Confirm</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" tabindex="-1" id="fa-password-two" role="dialog" aria-labelledby="fa-password-two" aria-hidden="true" v-if="modal == 'otp_screen'">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content googleAuthenticationModal">
          <div class="modal-header border-0 d-block text-right">
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="reset()">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body pt-4">
            <div class="mb-4">
              <img src="/assets/website/images/google-authenticator.png" alt="Google Authentication" class="d-block m-auto" width="96" height="96" />
              <h6 class="themecolor mt-4 mb-0 text-center"> Google Authentication Code </h6>
            </div>
            <div class="mb-4">
              <div class="form-group">
                <div class="position-relative">
                  <input type="text" placeholder="Enter 2FA Code" class="form-control" v-model="otp" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-center pt-4 border-0">
            <a href="javascript:void(0);" class="cap_btn large_btn mb-0" data-toggle="modal" data-target="#withdrawal-message" aria-label="Close" @click="fiatWithdrawal_req()">Submit</a>
          </div>
        </div>
      </div>
    </div>
    <div class="modal double-modal" tabindex="-1" id="withdrawal-message" role="dialog" aria-labelledby="withdrawal-message" aria-hidden="true" v-if="modal == 'confirm_withdrawal_success'">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content pb-0">
          <div class="modal-body">
            <h3 class="text-center mt-4 mb-0 medium d-block lh-normal"> Your withdrawal request has been processed. It should be credited to your account within 1-3 business days </h3>
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
        <Form @submit="reviewWithdrawal()" ref="regform">
          <div class="d-block d-md-flex justify-content-center conversionsRow mb-2 mb-md-4">
            <div class="conversionsText pt-3 pb-2 pb-md-0">
              <p class="themecolor medium mb-0">Insert Amount</p>
            </div>
            <div class="conversionsInput">
              <div class="d-flex border round-sm lightgrayBG">
                <div class="inputField inputHeight d-flex align-items-center">
                  <Field type="text" class="form-control border-0 px-3 lightgrayBG" id="" name="amount" placeholder="Enter Amount" v-model="amount" :rules="{ required : true , regex: /^(?=.*[1-9])\d+(\.\d+)?$/, max_value: getMarginBalance, min_value: minimum_withdrawal_allowed, decimal: 2 }" />
                </div>
                <!-- <Field type="hidden" name="methodId" v-model="methodId" :rules="{ required : true  }"/> -->
                <div class="selectField border-left selectCurrency">
                  <div class="position-relative selectDropMenu destinationDropMenu round-sm">
                    <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink inputHeight border-0 py-0" data-toggle="dropdown">
                      <img :src="'/assets/website/images/crypto_logos/' + currency.toLowerCase() + '.png'" alt="Coin" class="d-block cryptoCoin destinationdropImg h-auto" width="38" height="38" v-if="currency != ''" />
                        <div class="d-flex align-items-center justify-content-between w-100">
                          <p class="medium themecolor mb-0 text-left pl-1 pl-sm-2" v-if="currency != ''">
                            {{ currency }}
                          </p>
                          <p class="medium themecolor mb-0 text-left" v-else>Select Currency</p>
                          <feather type="chevron-down" size="18px" class="ml-1"></feather>
                        </div>
                      
                    </a>
                    <ul class="dropdown-menu scrollbar">
                      <Field type="hidden" class="form-control border-0 px-3 lightgrayBG" id="" name="currency" v-model="currency" :rules="{ required : true }" />
                      <input type="text" placeholder="Search here..." class="dropdownSearch" v-model="searchCurr" />
                      <li v-for="list in marginList()" v-show="marginList().length > 0">
                        <a href="javascript:void(0)" @click="currency = list; destinationwallet = false;">
                          <div class="d-flex align-items-center">
                            <img :src="'/assets/website/images/crypto_logos/' + list.toLowerCase() + '.png'" alt="Coin" class="d-block cryptoCoin destinationdropImg h-auto" width="38" height="38" />
                            <div class="pl-1 pl-sm-2">
                              <p class="medium themecolor mb-0 text-left lh-normal">
                                {{ list }}   - {{currencyNameFunc(list)}}
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
                <p class="textcolor medium mb-0 lh-normal conversionsBalance mt-3 mt-sm-0">(Balance: <span class="green">{{ getMarginBalanceShow }} {{ currency }}</span>) </p>
                <ul class="mb-0 d-flex justify-content-start justify-content-sm-end">
                  <li>
                    <a href="javascript:void(0);" :class="getAmountFlag == 25 ? 'active' : ''" @click="getAmount(25)">25%</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" :class="getAmountFlag == 50 ? 'active' : ''" @click="getAmount(50)">50%</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" :class="getAmountFlag == 75 ? 'active' : ''" @click="getAmount(75)">75%</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" :class="getAmountFlag == 100 ? 'active' : ''" @click="getAmount(100)">100%</a>
                  </li>
                </ul>
              </div>
              <ErrorMessage name="amount" class="text-danger" />
              <ErrorMessage name="currency" class="text-danger" />
            </div>
          </div>
          <div class="d-block d-md-flex justify-content-center conversionsRow mb-4">
            <div class="conversionsText pb-2 pb-md-0 pt-3">
              <p class="themecolor medium mb-0">Payment Methods</p>
            </div>
            <div class="py-3 d-flex border round-sm lightgrayBG conversionsInput px-3">
              <div class="bankIcon d-flex justify-content-center align-items-center bg-white rounded-circle">
                <img src="/assets/website/images/bankIcon.svg" alt="bank Icon" class="d-block" width="28" height="29" />
              </div>
              <div class="ml-3 ml-md-4">
                <h6 class="mb-1">Bank Account</h6>
                <p class="f-14 mb-0">Fill in your bank account details (all fields are mandatory) SWIFT OR SEPA transfers enabled and click on Add bank account to enable withdrawal. </p>
              </div>
            </div>
          </div>
          <div class="d-block d-md-flex justify-content-center align-items-end conversionsRow mb-0 mb-md-4">
            
            <div class="conversionsInput">
              <div class="conversionsPercent d-flex justify-content-end my-2">
                <a href="javascript:void(0);" data-toggle="modal" data-target="#add-payment-method" class="cap_btn extra_small_btn border-btn" @click="addBankFunc()">
                  <feather type="plus" size="18px" class="d-block pr-1 medium"></feather>
                  Add a Bank Account
                  <h6 class="mb-0 pl-1 themecolor medium"></h6>
                </a>
              </div>
            </div>
          </div>
          <div class="d-block d-md-flex justify-content-center conversionsRow mb-4">
            <div class="conversionsText pb-2 pb-md-0 pt-0 pt-md-3">
              <p class="themecolor medium mb-0">Payout Account</p>
            </div>
            <div class="conversionsInput">
              <div class="d-block d-sm-flex border round-sm lightgrayBG position-relative selectDropMenu payoutAccountDropMenu">
                <div class="inputFieldTwo inputHeight d-flex align-items-center">
                  <input type="text" class="form-control border-0 px-3 lightgrayBG" placeholder="Select Account" v-if="Object.keys(selected_method).length == 0" />
                  <p class="mb-0 pl-3 pr-2" v-if="Object.keys(selected_method).length > 0">
                    {{ selected_method.bank_name }} - ({{ selected_method.account_no.substring(0, 2)}}XXXX{{ selected_method.account_no.substring(selected_method.account_no.length - 2)}})
                  </p>
                </div>
                <div class="inputHeight border-left selectFieldTwo">
                  <a href="javascript:void(0)" class="d-flex justify-content-between align-items-center selectDropMenuLink border-0" data-toggle="dropdown">
                    <p class="medium themecolor mb-0 text-left">Saved Bank Account</p>
                    <feather type="chevron-down" size="18px" class="ml-2"></feather>
                  </a>
                  <ul class="dropdown-menu scrollbar"> 
                  <li v-for="list in getBankDataFunc('active_banks')" @click=" selected_method = list; methodId = list.id;" v-show="getBankData.totalRecords > 0">
                    <a href="javascript:void(0)" class="form-group mb-0">
                      <label class="customRadioButton d-flex align-items-center">
                        
                        <div class="d-block d-sm-flex align-items-center">
                          <img src="/assets/website/images/bankIcon.svg" alt="bank Icon" class="d-block" width="28" height="29" />
                          <h6 class="pl-0 pl-sm-3 mb-0">
                              {{ list.bank_name }} UK ({{ list.account_no.substring(0, 2) }}XXXX{{ list.account_no.substring(list.account_no.length - 2 )}})
                          </h6>
                          <p class="textcolor mb-0 pl-0 pl-sm-2 lh-normal">1-3 Business Days </p>
                        </div>
                      </label>
                    </a>
                  </li>
                  <li v-if="getBankData.totalRecords == 0" class="d-flex align-items-center justify-content-center pt-2 pb-3">
                    <feather type="alert-circle" class="mr-2 textcolor" size="18px"></feather>
                    <p class="d-block textcolor mb-0">No Data Available</p>
                  </li>
                </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div class="d-block d-md-flex justify-content-center align-items-center conversionsRow mb-3 pb-2">
            <div class="conversionsText">
              <div class="d-flex mb-0 align-items-center">
                <label class="themecolor mb-0 medium">Estimated Fees</label>
                <a href="javascript:void(0);" class="ml-1">
                  <feather type="info" size="16px" class="d-block textcolor ml-1" data-toggle="tooltip" data-placement="top" data-html="true" title="1% applies on the fiat withdrawal amount"></feather>
                </a>
              </div>
            </div>
            <div class="d-flex justify-content-start justify-content-md-end conversionsInput">
              <span class="medium f-16 themecolor">{{ parseFloat(amount * transaction_fees).toFixed(2) }}
                {{ currency }}</span>
            </div>
          </div>
          <div class="d-block d-md-flex justify-content-center align-items-center conversionsRow" v-if="Object.keys(selected_method).length > 0"> <!---->
            <div class="conversionsText d-none d-md-block">&nbsp;</div>
            <div class="conversionsInput">
              <input type="submit" class="cap_btn large_btn border-0" data-toggle="modal" data-target="#fiat-payout-confirmation" value="Review Transaction"  />
            </div>
          </div>
        </Form>
      </div>
    </div>
    <div class="p-3 border round-sm mt-3 mt-md-4">
      <h6 class="mb-2 textcolor">Disclaimer:</h6>
      <p class="mb-0">The name on the bank account you are withdrawing to must match the name on the account you are withdrawing from. Wire transfer fees are not displayed and may be applied by the intermediary banks involved in the transaction.</p>
    </div>
  </div>
</template>
<script>
  import {
    depositWithdrawalMixins
  } from "@/plugins/depositWithdrawal";
  import tradingMixins from "@/plugins/trading";
  import settingsMixins from "@/plugins/settings";
  import addBank from "../settings/files/bank/add-bank.vue";
  import {
    Form,
    Field,
    ErrorMessage
  } from "vee-validate";
  export default {
    name: "deposit-section",
    mixins: [depositWithdrawalMixins, tradingMixins, settingsMixins],
    data() {
      return {
        pageLoader: false,
        modal: "",
        ticket_id : -1,
        destinationwallet: false,
        destinationaddress: false,
        currency: "",
        amount: "",
        account_id: "",
        act_account_id: "",
        transaction_fees: 0.01,
        methodId: "",
        otp: "",
        selected_method: {},
        getMarginBalance: 0,
        getMarginBalanceShow: 0,
        page: "1",
        pageLimit: "10",
        minimum_withdrawal_allowed: 10,
        getAmountFlag: "",
        searchCurr : ""
      };
    },
    components: {
      addBank,
      Form,
      Field,
      ErrorMessage
    },
    computed: {},
    watch: {
      currency(value) {
        // console.log('this.tradingAccount==', this.tradingAccount)
        this.account_id = this.tradingAccount[0].account_id;
        let outerCount = 0,
          returnData = 0;
        for (let key in this.marginInfoList) {
          outerCount++;

          if(value == this.marginInfoList[key].currency){
            this.act_account_id = key;
          }
          
          if (value == this.marginInfoList[key].currency && parseFloat(this.marginInfoList[key].amount) > 0) {
            // console.log(this.marginInfoList[key].amount, 'value===> ', value)
            returnData = this.marginInfoList[key].amount;
          }
          if (outerCount == Object.keys(this.marginInfoList).length) {
            // console.log(this.account_id,'==act_account_id==', this.act_account_id)
            this.getMarginBalance = this.numberFormat1(returnData,'',value);
            this.getMarginBalanceShow = this.numberFormat(returnData,'',value);
          }
        }
      },
      selected_method(value) {
        this.destinationaddress = false;
      },
    },
    methods: {
      addBankFunc(){
        this.userRolePermission(this.$env_var.permissions.addBank , '' , 'addBank')
      },
      getBankDataFunc(getData) {
        let arradyData = [];
        if (parseInt(this.getBankData.totalRecords) > 0) {
          for (let i = 0; i <= this.getBankData.records.length - 1; i++) {
            if (getData == "active_banks" && parseInt(this.getBankData.records[i].is_deleted) == 0 && parseInt(this.getBankData.records[i].status) == 1) {
              arradyData.push(this.getBankData.records[i]);
            }
            if (getData == "inactive_banks" && parseInt(this.getBankData.records[i].is_deleted) == 1) {
              arradyData.push(this.getBankData.records[i]);
            }
            if (getData == "pending_banks" && parseInt(this.getBankData.records[i].status) == 0 && parseInt(this.getBankData.records[i].is_deleted) == 0) {
              arradyData.push(this.getBankData.records[i]);
            }
            if (i == this.getBankData.records.length - 1) {
              return arradyData;
            }
          }
        } else {}
      },
      marginList() {
        let returnData = [];
        // console.log('iiii', this.walletCurrencyList)
        if(Object.keys(this.walletCurrencyList).length > 0){
          for (let i = 0; i <= this.walletCurrencyList.fiat_payout.length - 1; i++) {
            let data = this.walletCurrencyList.fiat_payout[i];
            returnData.push(data);
            if (i == this.walletCurrencyList.fiat_payout.length - 1) {
              var search = this.searchCurr.toLowerCase();
              return returnData.filter((val) => this.searchCurr ? val.toLowerCase().includes(search) : true);
            }
          }
        }
      },
      getAmount(getamount) {
        this.getAmountFlag = getamount;
        this.amount = ((this.getMarginBalance * getamount) / 100).toFixed(2);
      },
      listing() {
        let json = {
          globalParams: {
            filter: {},
            sort: [],
            search: "",
            page: this.page,
            perPage: this.pageLimit,
          },
          localParams: {
            parameter: this,
            pagename: "withdrawalFiat"
          },
        };
        this._runGetBankDetails(json);
      },
      reviewWithdrawal() {
        const _that = this;
        if (parseFloat(_that.amount) >= parseFloat(_that.minimum_withdrawal_allowed)) {
          _that.modal = "confirm_withdrawal";
        }
      },
      fiatWithdrawal_req_otp() {
        const _that = this;
        _that.modal = "otp_screen";
      },
      fiatWithdrawal_req() {
        const _that = this;
        var inputJson = {
          globalParams: {
            otp: _that.otp,
            act_account_id: _that.act_account_id.toString(),
            amount: _that.amount.toString(),
            address: "",
            crypto: _that.currency,
            method_id: _that.selected_method.id.toString(),
            withdrawal_method: "2",
          },
          localParams: {
            parameter: _that,
            account_id: _that.account_id
          },
        };
        _that._runFiatWithdrawalRequest(inputJson);
      },
      reset() {
        this.modal = "";
        this.destinationwallet = false;
        this.destinationaddress = false;
        this.currency = "";
        this.amount = "";
        this.account_id = "";
        this.act_account_id = "";
        this.transaction_fees = 0.01;
        this.methodId = "";
        this.otp = "";
        this.selected_method = {};
        this.getMarginBalance = 0;
        this.page = "1";
        this.pageLimit = "10";
        this.minimum_withdrawal_allowed = 10;
        this.getAmountFlag = "";
      },
    },
    created() {
      if (this.$route.query.withdraw) {
        this.currency = this.$route.query.withdraw
      }
      this.listing();
      // this.checkBalanceExsitsInCurrency();
    },
  };
</script>
