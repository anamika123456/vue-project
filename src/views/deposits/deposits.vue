<template>
  <div>
    <loader v-if="pageLoader"></loader>
    <div class="modal" tabindex="-1" id="deposit-limits" role="dialog" aria-labelledby="deposit-limits" aria-hidden="true" v-if="deposit_limit">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 pb-3">
            <div class="modal-title text-left">
              <h5 class="mb-0">Deposit Limits:</h5>
            </div>
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="deposit_limit = false">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body pt-0">
            <div class="border-top pt-3">
              <div class="d-flex justify-content-between">
                <p class="medium">Minimum Deposit</p>
                <p class="themecolor medium">0.0001 BTC</p>
              </div>
              <div class="d-flex justify-content-between">
                <p class="medium mb-0 lh-normal">Maximum Deposit</p>
                <p class="themecolor medium mb-0 lh-normal">Unlimited</p>
              </div>
            </div>
            <!-- <div class="mt-3"><a href="javascript:void(0);" class="textDecoration medium mb-0">Increase Limits</a></div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="mid_scroll_content pageDpst">
      <loader v-if="pageLoader"></loader>
      <div class="pageContent border-0">
        <div class="d-flex justify-content-end pb-2">
          <a href="javascript:void(0);" data-toggle="modal" data-target="#deposit-limits" @click="deposit_limit = true" class="d-flex align-items-center">
            <feather type="info" size="16px" class="textcolor d-block"></feather>
            <p class="f-14 mb-0 pl-2 d-block">Deposit Limits</p>
          </a>
        </div>
        <div class="depositsMainBox">
          <div class="depositsLeftBox">
            <div class="bg-white border round-sm p-4 depositsBox">
              <div id="tabs" class="text-center mb-0 walletTab currencyTab mb-3 mb-sm-4 pb-3">
                <ul class="d-flex align-items-center m-0">
                  <li>
                    <a href="javascript:void(0);" class="links" :class="[{'active':tab == 1}]" @click.prevent="tab = 1">Crypto Deposit</a>
                  </li>
                  <!-- <li>
                    <a href="javascript:void(0);" class="links" :class="[{'active':tab == 2}]" @click.prevent="tab = 2">Fiat Deposit</a>
                  </li> -->
                </ul>
              </div>
              <div v-if="tab == 1">
                <div class="row">
                  <div class="col-12 col-sm-6">
                    <div class="form-group mb-3">
                      <label class="labeltext">Select Crypto</label>
                      <div class="position-relative selectDropMenu destinationDropMenu">
                        <!-- <v-select class="form-control" v-model="residence_country" :options="Object.values(country)" :reduce="country => country.iso2" label="name" placeholder="Country"></v-select> -->

                        <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
                          <div class="d-flex align-items-center" v-if="selected_currency != ''">
                            <img :src="'/assets/website/images/crypto_logos/' +selected_currency.toLowerCase() +'.png'" alt="Coin" class="d-block cryptoCoin" width="38" height="38" />
                            <div class="pl-2 pl-sm-3">
                              <p class="medium themecolor mb-0 text-left">
                                {{ ($env_var.restricted_currencies.hasOwnProperty( selected_currency )) ? $env_var.restricted_currencies[selected_currency].currency_name : selected_currency }}
                              </p>
                            </div>
                          </div>
                          <div class="d-flex align-items-center w-100" v-else>
                            <p class="medium textcolor mb-0 text-left themecolor">Select Crypto</p>
                          </div>
                          <feather type="chevron-down" class="ml-2" size="20px"></feather>
                        </a>
                        <ul class="dropdown-menu scrollbar">
                          <input type="text" placeholder="Search here..." class="dropdownSearch" v-model="searchCurr" /> 
                          <li v-for="value in marginList()" v-show="marginList().length > 0" @click.prevent="currencyListNameFunc(value.symbol, 'secondFuncCall') ; selectcrypto = false ">
                            <a href="javascript:void(0)" class="px-2 px-xl-3">
                              <div class="d-flex align-items-center">
                                <img :src="'/assets/website/images/crypto_logos/' +value.symbol.toLowerCase() +'.png' " alt="Coin" class="d-block cryptoCoin" width="38" height="38" /> 
                                <div class="pl-2 pl-sm-3" v-if=" $env_var.restricted_currencies.hasOwnProperty( value.symbol )
                                    ">
                                  <p class="medium themecolor mb-0 text-left">{{ $env_var.restricted_currencies[value.symbol].currency_name}}</p>
                                </div>
                                <div class="pl-2 pl-sm-3" v-else>
                                  <p class="medium themecolor mb-0 text-left">{{ value.symbol }} - {{currencyNameFunc(value.symbol)}}</p>
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
                  <div class="col-12 col-sm-6">
                    <div class="form-group mb-3">
                      <label class="labeltext">Select Network</label>
                      <div class="position-relative dropdown selectDropMenu destinationdrop" :class="deposit_network_flag != '' ? 'disabled' : ''">
                        <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
                          <p class="medium textcolor mb-0 text-left themecolor" v-if="deposit_network_flag != ''">{{deposit_network_flag}}</p>
                          <p class="medium textcolor mb-0 text-left themecolor" v-else>Select Network</p>
                          <feather type="chevron-down" class="ml-2" size="20px"></feather>
                        </a>
                        <ul class="dropdown-menu scrollbar">
                          <li >
                            <a href="javascript:void(0)" class="px-2 px-xl-3">
                              <p class="medium themecolor mb-0 text-left">{{ deposit_network }}</p>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p class="medium mb-0" v-if="selected_currency != ''">(Current Balance: <span class="mb-0 green">{{ currentBal }} {{ ($env_var.restricted_currencies.hasOwnProperty( selected_currency )) ? $env_var.restricted_currencies[selected_currency].currency_name  : selected_currency }}</span>) </p>
                <div class="bg-white p-4 border round-sm cryptoDepositBox mt-3" v-if="generateWalletAddress1">
                  <div class="m-auto text-center depositsQRCode">
                    <QRCodeVue3 :value="generateWalletAddress1" />
                  </div>
                  <div class="d-flex flex-wrap justify-content-center align-items-center mt-4">
                    <p class="secondarycolor medium mb-0 mr-3 word-break text-center">
                      {{ generateWalletAddress1 ? generateWalletAddress1 : "-"}}
                    </p>
                    <a href="javascript:void(0);" class="d-flex align-items-center secondaryBorder mb-0 px-3 py-1 m-0 round-lg mx-2" v-if="generateWalletAddress1" @click="handleCopy(generateWalletAddress1,'The address has been copied')">
                      <feather type="copy" size="12px" class="secondarycolor d-block"></feather>
                      <span class="secondarycolor medium mb-0 f-13 ml-1" >Copy</span>
                    </a>
                    <a href="javascript:void(0);" class="d-flex align-items-center secondaryBorder mb-0 px-3 py-1 m-0 round-lg" v-if="generateWalletAddress1 && parseInt(get_user.lead_type) == 2" @click="getAddress(1)">
                      <!-- <feather type="copy" size="12px" class="secondarycolor d-block"></feather> -->
                      <span class="secondarycolor medium mb-0 f-13 ml-1" >Generate New Address</span>
                    </a>
                  </div>
                </div>
                <div class="bg-white p-4 border round-sm cryptoDepositBox d-flex justify-content-center align-items-center mt-3" v-else>
                  <div class="d-block">
                    <span class="noData-img my-3">
                      <img src="/assets/website/images/no-data.png" alt="Icon" />
                    </span>
                    <p class="text-center mb-0">Select crypto to get deposit address</p>
                  </div>
                </div>
              </div>
              <!-- <div v-if="tab == 2">
                <h6 class="mb-4">Deposit Bank Details</h6>
                <ul class="depositBankList">
                  <li>
                    <p>Bank Name:</p>
                    <p>HSBC UK</p>
                  </li>
                  <li>
                    <p>Bank Account Number:</p>
                    <p>00120003456</p>
                  </li>
                  <li>
                    <p>Bank IFSC Code:</p>
                    <p>HBUKGB4B546</p>
                  </li>
                </ul>
              </div> -->
            </div>
          </div>
          <div class="pt-3 pt-md-0 depositsRightBox mt-4 mt-lg-0">
            <div class="bg-white p-4 border round-sm depositsBox">
              <p class="themecolor semibold">Before completing a transaction: </p>
              <ul class="listStyle">
                <li>
                  <p>
                    <span class="themecolor medium pr-1">Address:</span> Double-check the destination address before confirming a transaction. Funds may be irretrievable if sent to a wrong address.
                  </p>
                </li>
                <li>
                  <p>
                    <span class="themecolor medium pr-1">Currency type and Network:</span> Verify the currency type and the network before sending a transaction. Sending a cryptocurrency to the wrong currency or network may result in the permanent loss of your funds.
                  </p>
                </li>
              </ul>
              <p class="themecolor semibold pt-3">When making a transaction:</p>
              <ul class="listStyle">
                <li>
                  <p>
                    <span class="themecolor medium pr-1">Transaction delays:</span> Transactions on the blockchain network may take some time to process. Please be patient and do not attempt to resend the same transaction again, as this may result in double-spending and loss of funds.
                  </p>
                </li>
                <li>
                  <p class="mb-0">
                    <span class="themecolor medium pr-1">Transactions are irreversible:</span> Double-check the transaction details before confirming a transaction. Once a transaction is confirmed, it cannot be reversed or cancelled.
                  </p>
                </li>
                <li>
                  <p class="mt-1">
                    <span class="themecolor medium pr-1">Expiration Time:</span>Please be aware that this address is only valid for a period of 72 hours from the time of issuance. After this time frame, the address will expire and no longer be accessible. Ensure that all necessary actions or communications are completed within this period to avoid any inconvenience.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="d-flex flex-wrap justify-content-between align-items-center mt-5">
          <h3 class="mb-0 pr-2 pb-2 pb-sm-0">Recent Deposits</h3>
          <a href="/transaction-history" class="secondarycolor seeAllLink" target="_blank">See All Transactions</a>
        </div>
        <deposit-list :fromPage="'payments'"></deposit-list>
        <div class="pt-4">
          <p class="themecolor mb-0"> Did you notice that a deposit has not been received? <a href="/help-centre" class="highlightlink medium" target="_blank">Contact Us</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {depositWithdrawalMixins} from "@/plugins/depositWithdrawal";
  import tradingMixins from "@/plugins/trading";
  import depositList from "./list.vue";
  import QRCodeVue3 from "qrcode-vue3";
  export default {
    name: "deposit-section",
    mixins: [depositWithdrawalMixins, tradingMixins],
    data() {
      return {
        pageLoader: false,
        selectcrypto: false,
        selectnetwork: false,
        tab: 1,
        errImage: [],
        crypto: false,
        margin_list: {},
        showCurr: false,
        selected_currency: "",
        searchCurr: "",
        deposit_network: "",
        deposit_network_flag: "",
        generateWalletAddress1: "",
        deposit_limit: false
      };
    },
    components: {depositList, QRCodeVue3},
    computed: {
      currentBal() {
        try {
          let sendCurr = this.selected_currency,
            outerCount = 0,
            returnData = 0;
          if (this.selected_currency != '') {
            for (let key in this.marginInfoList) {
              outerCount++;
              if (sendCurr == this.marginInfoList[key].currency && parseFloat(this.marginInfoList[key].amount) > 0) {
                returnData = this.marginInfoList[key].amount;
              }
              if (outerCount == Object.keys(this.marginInfoList).length) {
                return this.numberFormat(returnData,'',sendCurr);
              }
            }
          } else {
            return returnData;
          }
        } catch (e) {
          return 0;
        }
      },
    },
    methods: {
      marginList() {
        let returnData = [];
        if (Object.keys(this.walletCurrencyList).length > 0 && this.walletCurrencyList.payment.length > 0) {
          for (let i = 0; i <= this.walletCurrencyList.payment.length - 1; i++) {
            let data = this.walletCurrencyList.payment[i];
            returnData.push(data);
            if (i == this.walletCurrencyList.payment.length - 1) {
              var search = this.searchCurr.toLowerCase();
              return returnData.filter((val) => this.searchCurr ? (val.symbol.toLowerCase().includes(search) || val.currency_name.toLowerCase().includes(search)) : true);
            }
          }
        }else{
          return returnData ; 
        }
      },
      currencyListNameFunc(value, secondParameter) {
        // console.log('currencyListNameFunc===',value)
        this.generateWalletAddress1 = ""
        this.selected_currency = value;
        // if (this.$env_var.restricted_currencies.hasOwnProperty(value)) {
        //   this.selected_currency = this.$env_var.restricted_currencies[value].currency_name;
        // }
        this.getDepositNetwork(value, secondParameter);
        this.searchCurr = "";
        // this.transactionLimitCurrency();
      },
      getDepositNetwork(value, secondParameter) {
        this.deposit_network_flag = ''
        for (let i = 0; i <= this.walletCurrencyList.currencies.length - 1; i++) {
          if (this.walletCurrencyList.currencies[i].symbol == value && this.walletCurrencyList.currencies[i].keyType != "") {
            this.deposit_network = this.walletCurrencyList.currencies[i].keyType;
            this.deposit_network_flag = this.walletCurrencyList.currencies[i].keyType;
          } else if (this.walletCurrencyList.currencies[i].symbol == value && this.walletCurrencyList.currencies[i].keyType == "") {
            this.deposit_network = this.walletCurrencyList.currencies[i].currency_name;
            this.deposit_network_flag = this.walletCurrencyList.currencies[i].currency_name;
          }

          if(i == this.walletCurrencyList.currencies.length - 1 && secondParameter != ''){
            this.deposit_network_flag = this.deposit_network  ; 
            this.selectnetwork = false 
            this.transactionLimitCurrency()
          }
        }
      },
      transactionLimitCurrency() {
        let selected_currency = this.selected_currency.toUpperCase();
        // for (let key in this.$env_var.restricted_currencies) {
        //   if (this.$env_var.restricted_currencies[key].currency_name == this.selected_currency) {
        //     selected_currency = this.$env_var.restricted_currencies[key].orginal_name;
        //   }
        // }
        this.getDepositNetwork(this.selected_currency, '');
        if (this.$env_var.fiatCurrencyList.hasOwnProperty(selected_currency)) {
          this.crypto = false;
        } else {
          this.crypto = true;
          this.getAddress(0);
        }
      },
      getAddress(getData) {
        var account_id = "";
        var sendCurr = this.selected_currency;
        // console.log('sendCurr===',sendCurr)
        if (this.tradingAccount.length > 0) {
          this.tradingAccount[0].subAccounts.forEach((value) => {
            if (this.$env_var.restricted_currencies.hasOwnProperty(value.currency) && this.$env_var.restricted_currencies[value.currency].currency_name == this.selected_currency) {
              account_id = value.act_account_id;
            } else if (this.selected_currency == value.currency) {
              account_id = value.act_account_id;
            }
          });
        }
        // if (this.deposit_network != '' && this.deposit_network == 'ERC20') {
        //   sendCurr = 'ETH'
        // } else if (this.deposit_network != '' && this.deposit_network == 'TRC20') {
        //   sendCurr = 'TRX'
        // } else {
          // for (let key in this.$env_var.restricted_currencies) {
          //   if (this.$env_var.restricted_currencies[key].currency_name == this.selected_currency) {
          //     sendCurr = this.$env_var.restricted_currencies[key].orginal_name;
          //   }
          // }
        //}
        this._runGenerateWalletAddress({
          globalParams: {
            currency: sendCurr,
            act_account_id: account_id,
            "renew": getData
          },
          localParams: {
            parameter: this
          },
        });
      }
    },
    created() {
      if (this.$route.query.deposit) {
        this.currencyListNameFunc(this.$route.query.deposit, 'secondFuncCall')
        this.$router.replace({ query: "" });
      }
      this._runTradingAccount({globalParams: {}, localParams: {  parameter: this, page : "deposit" }})
    },
  };
</script>
<style>
  .firstName.currErr {
    margin-right: 12px;
    width: 35px;
    height: 35px;
  }
</style>