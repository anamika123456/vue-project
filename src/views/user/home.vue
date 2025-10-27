<template>
  <div>
    <div class="modal" tabindex="-1" id="wallet-account-status" role="dialog" aria-labelledby="wallet-account-status" aria-hidden="true" v-if="trans_limit">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header border-0">
            <div class="modal-title text-left">
              <h5 class="mb-0">Transaction Limits</h5>
            </div>
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="trans_limit = false">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body pt-0">
            <div class="border-top pt-3 border-bottom">
              <div class="d-flex justify-content-between">
                <p class="medium">Daily Accepted Payments</p>
                <p class="themecolor medium">Unlimited</p>
              </div>
              <div class="d-flex justify-content-between">
                <p class="medium">Daily Submitted Payouts</p>
                <p class="themecolor medium">Unlimited</p>
              </div>
            </div>
            <div class="mt-2">
              <a href="javascript:void(0);" class="textDecoration medium"> Increase Limits </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader v-if="pageLoader"></loader>
    <div class="mid_scroll_content">
      <div class="pageContent border-0">
        <div class="row">
          <div class="col-12 col-sm-7 col-lg-5 col-xl-4 col-xxl-5">
            <div class="border round-sm bg-white balanceViewBox">
              <h4 class="heading">Balance Overview</h4>
              <div class="row">
                <div class="col-12 col-sm-6">
                  <p class="mb-0 mb-sm-2">Balance in BTC</p>
                  <h5 class="mb-0 rb_medium">₿{{ numberFormat(totalValue('BTC'), 8,'BTC') }}</h5>
                </div>
                <div class="col-12 col-sm-6 balanceValueTwo border-left mt-2 mt-sm-0">
                  <p class="mb-0 mb-sm-2">Balance in USD</p>
                  <h5 class="mb-0 rb_medium">${{ numberFormat(totalValue('USD'), 8, 'USD') }}</h5>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-5 col-lg-3 col-xl-3 col-xxl-3 mt-4 mt-sm-0">
            <div class="border round-sm bg-white quicklinkBox">
              <h4 class="heading">Quick Links</h4>
              <div class="d-flex text-center">
                <a href="javascript:void(0)" class="quicklinkCircle" @click="userRolePermission($env_var.permissions.payments , {path : '/deposits'})">
                  <div class="borderbg rounded-circle quickLinkIcon d-flex align-items-center justify-content-center m-auto">
                    <feather type="arrow-down" size="20px" class="themecolor"></feather>
                  </div>
                  <p class="themecolor mb-0 pt-1">Receive</p>
                </a>
                <a href="javascript:void(0)" class="d-block quicklinkCircle" @click="userRolePermission($env_var.permissions.payouts , {path : '/payouts'})">
                  <div class="borderbg rounded-circle quickLinkIcon d-flex align-items-center justify-content-center m-auto">
                    <feather type="arrow-up" size="20px" class="themecolor"></feather>
                  </div>
                  <p class="themecolor mb-0 pt-1">Send</p>
                </a>
                <a href="javascript:void(0)" class="d-block" @click="userRolePermission('', {path : '/conversions'}, 'conversion')">
                  <div class="borderbg rounded-circle quickLinkIcon d-flex align-items-center justify-content-center m-auto">
                    <img src="/assets/website/images/convertIcon.svg" alt="Convert" class="d-block" width="18" />
                  </div>
                  <p class="themecolor mb-0 pt-1">Convert</p>
                </a>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-lg-4 col-xl-5 col-xxl-4 mt-4 mt-lg-0">
            <div class="border round-sm bg-white transactionBox">
              <div class="heading">
                <h4 class="mb-0">Transaction Limits</h4>
                <!-- <router-link :to="(parseInt(get_user.is_registered) == 0) ? '/verification-steps' : parseInt(get_user.is_registered) == 5 ? { name: 'help_centre', query: { ticketData: 1, innerData: 11 }} :  {name: 'view' , query: { 'id': ticket_id}}" class="seeAllLink secondarycolor medium d-block">Increase Limits </router-link> -->
              </div>
              <div class="d-block">
                <div class="d-block d-sm-flex justify-content-between align-items-center border-bottom pb-2">
                  <p class="mb-0">Daily Accepted Payments</p>
                  <p class="mb-0 themecolor medium">Unlimited</p>
                </div>
                <div class="d-block d-sm-flex justify-content-between align-items-center pt-2">
                  <p class="mb-0">Daily Submitted Payouts</p>
                  <p class="mb-0 themecolor medium">30 BTC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="row mt-4">
          <div class="col-12 col-sm-7 col-lg-5 col-xl-8 col-xxl-8 d-flex">
            <revenueChart />
          </div>
          <div class="col-12 col-sm-12 col-lg-4 col-xl-4 col-xxl-4 d-flex" v-if="Object.keys(marginInfoList).length > 0 ">
            <div class="border round-sm bg-white chartDiv-wrap w-100">
              <h4 class="heading">Wallets  </h4>
              <currencyChart :currency_list="curencyUsdValList" />
            </div>
          </div>
        </div> -->

       



        <div class="mt-4 mt-sm-5">
          <div class="d-flex justify-content-between align-items-center">
            <h3 class="mb-0">Wallets</h3>
            <a href="javascript:void(0);" class="cap_btn secondaryBG" data-toggle="modal" data-target="#enable-new-wallet" @click="addWallet()">Enable Wallets</a>
          </div>
          <wallets></wallets>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import tradingMixins from "@/plugins/trading";
  import depositWithdrawalMixins from "@/plugins/depositWithdrawal";
  import wallets from "../wallet/wallets.vue";
  import { Const } from "@/plugins/vue-provider-cache/const.mod";
  import { format } from 'mathjs'
  import moment from "moment";

  // import currencyChart from "../chart/currencyChart.vue";
  // import revenueChart from "../chart/revenueChart.vue";
  export default {
    name: "index",
    mixins: [tradingMixins, depositWithdrawalMixins],
    data() {
      return {
        curencyUsdValList: [],
        totalUsdValue: 10,
        enableTicketJsonFlag: false,
        availableCurrencies: ["BTC", "USD"],
        selectedCurrency: "USD",
        pageLoader: false,
        tab: 1,
        thisdates: false,
        activeWallets: "currency",
        tableFilter: false,
        targetTime: false,
        notification_msg: "",
        notification_type: "",
        exchangeTypeS: {
          M: "Market",
          S: "Stop",
          L: "Limit",
          SL: "Stop Limit",
        },
        type: "2",
        currency: "",
        freeMargin: 0,
        free_Margin: 0,
        tab: "deposit",
        searchcrypto: "",
        errImage: [],
        fev_list: [],
        margin_list: {}, // currency with ammount available in account
        curencyUsdValList: [],
        currencies: false,
        settings: {
          dots: true,
          focusOnSelect: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          touchThreshold: 1,
        },
        thisdate: false,
        trans_limit: false
      };
    },
    components: {
      wallets,
      //currencyChart, revenueChart,
    },
    computed: {
      instruments() {
        try {
          this.$store.getters[Const.GET_HEARTBEATS]["priceFeed"];
          return this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].iCache.asKeysValueArrayAll();
        } catch (ex) {
          return [];
        }
      }
    },
    methods: {
      changeCurencyUsdValList() {
        this.currencyData();
        setTimeout(() => {
          this.currencyData();
        }, 5000);
      },
      
      addWallet() {
        this._runWalletCurrencyJsonList({
          globalParams: {},
          localParams: {
            parameter: this
          }
        });
        this.userRolePermission(this.$env_var.permissions.enableWallets, '', 'enableWallets')
      },
      subscribe(subscribeArray) {
        try {
          /*let subscribeArray = [ "BTC-USD", "ETH-USD", "LTC-USD", "BCH-USDT", "ADA-USD", "EOS-USD" ];*/
          this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].seeders["S_PF_PF"].subscribe(subscribeArray);
        } catch (e) {}
      },
      totalValue(getCurrency) {
        try {
          let amount = 0;
          for (const item in this.marginInfoList) {
            amount += this.getConvertedValue(this.marginInfoList[item], getCurrency);
          }
          return amount;
        } catch (e) {
          return "N/A";
        }
      },
      getConvertedValue(item, currency) {
        if (item.currency == currency) {
          return item.amount;
        } else {
          let amount = 0;
          if (this.instruments[item.currency + "-" + currency]) {
            amount = this.instruments[item.currency + "-" + currency].A;
          } else if (this.instruments[currency + "-" + item.currency]) {
            amount = 1 / this.instruments[currency + "-" + item.currency].A;
          } else {
            let basePrice = null,
              reversebasePrice = null,
              pairValue = null,
              revpairValue = null;
            if (currency == "USD") {
              basePrice = this.instruments[item.currency + "-BTC"];
              reversebasePrice = this.instruments["BTC-" + item.currency];
              pairValue = this.instruments["BTC-" + currency];
            } else {
              basePrice = this.instruments[item.currency + "-USD"];
              reversebasePrice = this.instruments["USD-" + item.currency];
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
            return (amount * item.amount);
          } else {
            return (amount * item.amount);
          }
        }
      },
      formatfloat(num) {
        if (num) {
          num = parseFloat(num);
          try {
            return format(num, {
              notation: "fixed"
            }) || "";
          } catch (e) {
            try {
              return num.toFixed(8);
            } catch (e) {
              return "";
            }
          }
        } else {
          return 0;
        }
      }
    },
    created() {
      // const number = 56496.06366386;
      // const clm = require('country-locale-map');
      // let localeName = clm.getLocaleByAlpha2('IN')
      // console.log(clm.getAllCountries()); //returns 'CAN'
      // console.log(number.toLocaleString())
      // const locale = navigator.language; 
      // console.log('locale==',locale);


// console.log('india==',new Intl.NumberFormat("en-IN").format(number));
// console.log('uk==',new Intl.NumberFormat("en-UK").format(number));
// console.log('German==',new Intl.NumberFormat("de-DE").format(number));
// 1,23,456.789



    }
  };
</script>