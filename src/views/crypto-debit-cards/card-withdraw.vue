<template>
  <div>
    <loader v-if="pageLoader"></loader>
    <div class="modal" tabindex="-1" id="payouts-limits" role="dialog" aria-labelledby="payouts-limits" aria-hidden="true" v-if="payouts_limit">
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
            <!-- <div class="mt-3"><a href="javascript:void(0);" class="textDecoration medium mb-0">Increase Limits</a></div> -->
          </div>
        </div>
      </div>
    </div>
    <section class="mid_scroll_content">
      <div class="pageContent border-0">
        <div class="d-flex justify-content-end pb-2">
          <a href="javascript:void(0);" data-toggle="modal" data-target="#payouts-limits" @click="payouts_limit = true" class="d-flex align-items-center">
            <feather type="info" size="16px" class="textcolor d-block"></feather>
            <p class="f-14 mb-0 pl-2 d-block">Payout Limits</p>
          </a>
        </div>
        <div class="bg-white border round-sm cryptoCards position-relative mb-5">
          <div class="withdrawHead border-bottom d-flex align-items-center flex-wrap justify-content-between pb-4 mb-5">
              <h4 class="mb-0">Withdraw</h4>
              <div class="noSec text-right">
                  <p class="bold mb-3 text-transform-uppercase lh-1">CARD NUMBER</p>
                  <h5 class="mb-0 lh-1" v-if="Object.keys(getCardDetails).length > 0">{{getCardDetails.maskedCardNumber}}</h5>
              </div>
          </div>
          <!-- <div class="text-center"> -->
            <!-- <ul class="defaultTab d-inline-flex justify-content-center align-items-center">
              <li>
                <a href="javascript:void(0);" class="links" :class="[{ active: tab == 1 }]" @click.prevent="tab = 1">Crypto Payout</a>
              </li>
              <li v-if="parseInt(get_user.settings.fiat_payout) == 1">
                <a href="javascript:void(0);" class="links" :class="[{ active: tab == 2 }]" @click.prevent="tab = 2">Fiat Payout</a>
              </li>
            </ul> -->
          <!-- </div> -->
          <crypto-payout v-if="tab == 1"></crypto-payout>
          <!-- <fiat-payout v-if="tab == 2"></fiat-payout> -->
        </div>
        <div class="mt-5">
          <div class="d-block d-sm-flex justify-content-between align-items-center">
            <div class="d-flex align-items-start">
              <h3 class="mb-0">Recent Payouts</h3>
            </div>
            <a href="/transaction-history" class="secondarycolor seeAllLink mt-3 mt-sm-0 d-block">See All Transactions</a>
          </div>
          <withdrawal-list :fromPage="'payouts'"></withdrawal-list>
          <div class="pt-4">
            <p class="themecolor medium mb-0"> Did you notice that a payout has not been submitted? <router-link to="/help-centre" class="highlightlink">Contact Us</router-link>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import cryptoPayout from "./crypto_payout.vue";
  import fiatPayout from "./fiat_payout.vue";
  import withdrawalList from "./list.vue";
  import tradingMixins from "@/plugins/trading";
  import { cardsMixins } from "@/plugins/cards";
  export default {
    data() {
      return {
        pageLoader: false,
        currencies: false,
        notification_msg: "",
        notification_type: "",
        type: "2",
        page: "1",
        searchOrderNumber: "",
        pageLimit: "10",
        search: "",
        transactiontab: 1,
        filters: false,
        paginationmenu: false,
        thisdate: false,
        tab: 1,
        destinationwallet: false,
        destinationaddress: false,
        payoutMode: 1,
        everypayout: false,
        selectpercentage: false,
        payoutAccountCurrency: false,
        destinationAddressModal: false,
        payouts_limit: false,

        getCardDetails: {},
      };
    },
    mixins: [tradingMixins, cardsMixins],
    components: {
      cryptoPayout,
      fiatPayout,
      withdrawalList
    },
    methods:{
      getAllCardWalletByUser(){
          let input_json = {
            'globalParams': {
              "userId": this.getCardDetails.userId,
              "startDate": "1656622800000",
              "endDate": "1656622800000",
              "page": 1
            },
            'localParams': { "parameter": this }
          }
          this._runGetAllCardWalletByUser(input_json)
      },
      cardDetails(getcardId) {
        let input_json = {
            'globalParams': {
                "card_id": this.$route.query.cardId
            },
            'localParams': { "parameter": this ,  'page': 'card-manage'}
        }
        this._runGetCardDetails(input_json)
      },
      cardAccountDetails() {
          let input_json = {
              'globalParams': {
                  "userId": this.getCardDetails.userId,
                  "accountId": this.getCardDetails.linkedAccountId
              },
              'localParams': { "parameter": this }
          }
          this._runGetAccountDetails(input_json)
      },
    },
    created() {
      this._runTradingAccount({globalParams: {}, localParams: {  parameter: this, page : "payouts" }})
      if (this.$route.query.withdraw) {
        this.tab = this.$route.query.tab
        this.$router.replace({ query: "" });
      }

      if (this.$route.query.cardId) {
        this.cardDetails('');
      }
    },
  };
</script>