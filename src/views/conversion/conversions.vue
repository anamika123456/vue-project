<template>
  <div class="mid_scroll_content pageDpst p-0 conversionsPage">
    <loader v-if="pageLoader"></loader>
    <div class="modal" tabindex="-1" id="convert-confirmation" role="dialog" aria-labelledby="convert-confirmation" aria-hidden="true" v-show="[2].includes(parseInt(step))">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 d-flex justify-content-between align-items-center">
            <div class="modal-title">
              <h3 class="semibold mb-0">Convert</h3>
            </div>
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="closeStep()">
              <feather type="x" size="24px"></feather>
            </a>
          </div> 
          <div class="modal-body pt-0 pb-2">
            <div class="d-flex justify-content-center align-items-center">
              <img :src="
                        '/assets/website/images/crypto_logos/' +
                        send.currency.toLowerCase() +
                        '.png'
                        " alt="Coin" class="d-block conversionConfirmIcon" width="80" height="80" v-if="send != '' && checkImage(send.currency)" />
              <feather type="arrow-right" size="20px" class="px-3"></feather>
              <img :src="
                        '/assets/website/images/crypto_logos/' +
                        recive.toLowerCase() +
                        '.png'
                        " alt="Coin" class="d-block conversionConfirmIcon" width="80" height="80" v-if="recive != '' && checkImage(recive)" />
            </div>
            <div class="d-flex justify-content-center pt-4">
              <h6 class="textcolor semibold mb-0">You spend</h6>
              <h6 class="semibold mb-0 ml-1"> 
                {{ numberFormat(free_Margin  , 8, send.currency)}} {{ send.currency }}
             
              </h6>
            </div>
            <div class="text-center pt-5" v-if="get_depth.A && freeMargin">
              <h3 class="textcolor medium mb-2">You receive</h3>
              <h2 class="medium mb-0" v-if="recive"> 
                {{numberFormat(get_depth.A * free_Margin, 8, recive)}} {{ recive }}
              
              </h2>
            </div>
            <div class="pt-4">
              <div class="d-block d-sm-flex justify-content-between border-bottom pb-3 pt-3" v-if="get_depth.A && freeMargin">
                <h6 class="medium mb-0">Conversion Rate</h6>
                <h6 class="medium mb-0"> {{numberFormat(conversion_rate,8)}}
                </h6>
              </div>
              <div class="d-block d-sm-flex justify-content-between border-bottom pb-3 pt-3" v-if="get_depth.A && freeMargin">
                <h6 class="medium mb-0">Conversion Fees</h6>
                <h6 class="medium mb-0" v-if="tradePair">
                  {{ numberFormat(getCommission,8) }} {{ spliting(tradePair, 1) }}
                </h6>
              </div>
            </div>
            <div class="c_checkbox mt-4">
              <label class="customCheckbox mb-0">I have read and I accept the <a :href="$env_var.website_link+$env_var.entity_name+$env_var.terms_condition_link" style="text-decoration: underline" class="themecolor" target="_blank">Terms Of Use</a> and <a :href="$env_var.website_link+$env_var.entity_name+$env_var.privacy_policy_link" style="text-decoration: underline" class="themecolor" target="_blank">Privacy Policy</a>
                <Field type="checkbox" class="form-control" id="" name="is_agree" value="1" v-model="is_agree" rules="required" />
                <ErrorMessage name="is_agree" class="text-danger" />
                <!-- <input type="checkbox" class="form-control" /> -->
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="modal-footer border-0">
            <div class="d-flex justify-content-center align-items-center w-100">
              <a href="javascript:void(0);" class="cap_btn large_btn mb-0" data-toggle="modal" data-target="#successful-limit-order" :class="(orderPlacedSuccess || parseInt(is_agree) != 1) ? 'disabled' : ''" @click="submitFunc('2')">Confirm</a>
              <div class="d-flex convertClock text-center ml-3 align-items-center justify-content-center">
                <p class="mb-0 pt-2 themecolor medium">{{timer}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal double-modal" tabindex="-1" id="successful-limit-order" role="dialog" aria-labelledby="successful-limit-order" aria-hidden="true" v-show="[3, 4].includes(parseInt(step))">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document" v-if="parseInt(step) == 3">
        <div class="modal-content">
          <div class="modal-body pb-0">
            <h3 class="text-center medium d-block lh-normal mb-0"> Your order has expired. </h3>
          </div>
          <div class="modal-footer border-0">
            <div class="d-flex justify-content-center w-100">
              <a href="javascript:void(0);" class="cap_btn large_btn mb-0" @click.prevent="step = '1' ; timer = 0 ; downloadTimer = '' ; closeStep()">Replace Order</a>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document" v-if="parseInt(step) == 4">
        <div class="modal-content">
          <div class="modal-body pb-0">
            <h3 class="text-center medium d-block lh-normal mb-0"> Market Order has been placed successfully. </h3>
          </div>
          <div class="modal-footer border-0">
            <div class="d-flex justify-content-center w-100">
              <router-link :to="{ name: 'transaction-history', query: { transactiontab: 3}}" class="cap_btn large_btn mb-0">Go To Transaction Page</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal double-modal" tabindex="-1" id="enable-wallet-conversion" role="dialog" aria-labelledby="enable-wallet-conversion" aria-hidden="true" v-show="showErrorPopup != ''">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 d-flex justify-content-between align-items-center">
            <div class="modal-title">
              <h3 class="text-center medium d-block lh-normal mb-0">Please enable {{showErrorPopup}} wallet for conversion. </h3>
            </div>
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="showErrorPopup = ''">
              <feather type="x" size="24px"></feather>
            </a>
          </div>
          <div class="modal-footer border-0 pt-0">
            <div class="d-flex justify-content-center w-100">
              <router-link :to="{ path: '/dashboard' }" class="cap_btn large_btn mb-0">Go To Dashboard Page</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-block d-md-flex justify-content-between blueGradient align-items-center">
      <div class="d-block d-md-flex">
        <div class="conversionsTopSearch">
          <div class="round-lg inputField d-flex justify-content-between align-items-center bg-white position-relative">
            <div class="pr-2" v-if="Object.keys(send).length > 0 && send.currency != undefined">
              <img :src="'/assets/website/images/crypto_logos/' +send.currency.toLowerCase() +'.png'" alt="Coin" class="d-block iconOne position-absolute" width="37" height="37" />
              <img :src="'/assets/website/images/crypto_logos/' +recive.toLowerCase() +'.png'" alt="Coin" class="d-block iconTwo position-absolute" width="37" height="37" />
            </div>
            <h6 class="mb-0 pl-2">{{send.currency}}/{{recive}}</h6>
          </div>
        </div>
        <div class="d-block d-md-flex conversionsTopMainBox">
          <div class="conversionsTopBox">
            <h6 class="text-white mb-0">Current Price</h6>
            <h6 class="text-white mb-0 conversionsValue" v-if="get_depth.A && freeMargin">{{ numberFormat(get_depth.A,8, recive) }} {{ recive }}</h6>
            <h6 class="text-white mb-0" v-else>-</h6>
          </div>
          <div class="conversionsTopBox">
            <h6 class="text-white mb-0">24h Change</h6>
            <h6 class="mb-0 conversionsValue white" :class="[ { green: formatfloat(instruments[tradePair].CB,2) > 0 },{ conversionsRedColor: formatfloat(instruments[tradePair].CB,2) < 0 } ]" v-if="instruments[tradePair]">{{ numberFormat(instruments[tradePair].CB,2)  }}% </h6>
            <h6 class="text-white mb-0" v-else>-</h6>
          </div>
          <div class="conversionsTopBox" v-if="instruments[tradePair]">
            <h6 class="text-white mb-0">24h High/ Low </h6>
            <div class="d-block d-md-flex align-items-center pt-1" v-if="instruments[tradePair]">
              <p class="text-white mb-0 f-15 lh-normal">{{ numberFormat(instruments[tradePair].other['24h_high'],8) }} </p>
              <div class="progress customProgress conversionsProgress" v-if="get_depth.A && freeMargin && instruments[tradePair]">
                <div class="progress-bar redBG" :style="{ width: marketpercent()+'%'}"></div>
              </div>
              <p class="text-white mb-0 f-15 lh-normal">{{ numberFormat(instruments[tradePair].other['24h_low'],8) }} </p>
            </div>
            <div class="d-block d-md-flex align-items-center" v-else>-</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pageContent border-0">
      <div class="bg-white border round-sm p-3 p-md-4 p-xl-5" v-if="tab == 1">
        <div class="row justify-content-center">
          <div class="col-12 col-xl-10 col-xxl-8 col-xxxl-7">
            <div class="d-block d-md-flex justify-content-center align-items-center conversionsRow mb-4">
              <div class="conversionsText pb-2 pb-md-4 mb-0 mb-md-2">
                <p class="themecolor medium mb-0">Convert From</p>
              </div>
              <div class="conversionsInput">
                <div class="d-flex border round-sm lightgrayBG">
                  <div class="inputField inputHeight d-flex align-items-center">
                    <input type="text" class="form-control border-0 px-3 lightgrayBG" placeholder="" v-model="free_Margin" name="Margin" />
                  </div>
                  <div class="selectField border-left d-flex align-items-center">
                    <div class="selectDropMenu position-relative destinationDropMenu round-sm w-100">
                      <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between border-0 py-0 inputHeight selectDropMenuLink" v-if="send.currency" @click.prevent=" showSend = !showSend; showReceive = false;" data-toggle="dropdown">
                        <div class="d-flex align-items-center">
                          <img :src="'/assets/website/images/crypto_logos/' +send.currency.toLowerCase() +'.png'" alt="Coin" class="d-block destinationdropImg h-auto" width="38" height="38" v-if="send != '' && checkImage(send.currency)" />
                          <div class="pl-1 pl-sm-3" v-else-if="send != ''">
                            <p class="medium themecolor mb-0 text-left lh-normal">
                              {{ send.currency.charAt(0) }}
                            </p>
                          </div>
                          <p class="medium themecolor mb-0 text-left pl-2 lh-normal">
                            {{ send.currency }}
                          </p>
                        </div>
                        <feather type="chevron-down" size="20px"></feather>
                      </a>
                      <ul class="dropdown-menu scrollbar">
                        <input type="text" placeholder="Search here..." class="dropdownSearch" v-model="searchSend" />
                        <li v-for="value in marginSearch(marginInfoList)" @click.prevent=" ChangeSendData(value, value.act_account_id); searchSend = ''; showSend = false;" v-show=" marginSearch(marginInfoList).length > 0 ">
                          <a href="javascript:void(0)" class="px-1 px-sm-3" v-if="value.currency">
                            <div class="d-flex align-items-center">
                              <img :src=" '/assets/website/images/crypto_logos/' + value.currency.toLowerCase() + '.png'" v-if="checkImage(value.currency)" alt="Coin" class="d-block destinationdropImg h-auto" width="38" height="38" />
                              <span class="firstName" v-else>{{ value.currency.charAt(0) }}</span>
                              <div class="pl-1 pl-sm-2" v-if="$env_var.restricted_currencies.hasOwnProperty(  value.currency)">
                                <p class="medium themecolor mb-0 text-left lh-normal">{{ $env_var.restricted_currencies[ value.currency ].currency_name }}</p>
                                <p class="medium themecolor mb-0 text-left lh-normal">{{ value.currency }}</p>
                              </div>
                              <div class="pl-1 pl-sm-2" v-else>
                                <p class="medium themecolor mb-0 text-left lh-normal">{{ value.currency }}</p>
                                <p class="medium textcolor  mb-0 text-left lh-normal f-12 mt-1">{{ getCurrName(value.currency) }}</p>
                              </div>
                            </div>
                          </a>
                        </li>
                        <li v-if="marginSearch(marginInfoList).length == 0" class="d-flex align-items-center justify-content-center pt-2 pb-3">
                          <feather type="alert-circle" class="mr-2 textcolor" size="18px"></feather>
                          <p class="d-block textcolor mb-0">No Data Available</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="conversionsPercent d-flex justify-content-between pt-3">
                  <p class="textcolor medium mb-0 lh-normal conversionsBalance mt-3 mt-sm-0">(Balance: <span class="green">{{ numberFormat(freeMargin,8, send.currency) }} {{ send.currency }}</span>) </p>
                  <ul class="mb-0 d-flex justify-content-start justify-content-sm-end">
                    <li>
                      <a href="javascript:void(0);" :class="percentage == '25' ? 'active' : ''" @click="setPercentage(25)">25%</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" :class="percentage == '50' ? 'active' : ''" @click="setPercentage(50)">50%</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" :class="percentage == '75' ? 'active' : ''" @click="setPercentage(75)">75%</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" :class="percentage == '100' ? 'active' : ''" @click="setPercentage(100)">100%</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="d-block d-md-flex justify-content-center conversionsRow mb-4">
              <div class="conversionsText pt-0 pt-md-3 pb-2 pb-md-0">
                <p class="themecolor medium mb-0">Convert To</p>
              </div>
              <div class="conversionsInput">
                <div class="d-flex mb-2 border round-sm lightgrayBG">
                  <div class="inputField inputHeight d-flex align-items-center">
                    <!-- <input type="text" class="form-control border-0 px-3 lightgrayBG" placeholder="1,670.16" /> -->
                    <div class="cursiveright cur_value pr-2" v-if="get_depth && freeMargin">
                      <div class="d-flex align-items-center">
                        <div class="cur_type">
                          <span v-if="get_depth.A" contentEditable="false" class="px-3 textcolor rb_medium">{{ numberFormat(get_depth.A * free_Margin, 8, recive) }} </span>
                          <span v-else contentEditable="false" class="px-3 textcolor rb_medium">0</span>
                        </div>
                        <p class="cur_result" v-if="recive == ''"> Please Select Currency </p>
                      </div>
                    </div>
                    <div class="text-right cur_value pr-2" v-else>
                      <div class="cur_type">
                        <span contentEditable="false" v-if="get_depth">{{ numberFormat1(get_depth.A * free_Margin,8, recive) }} </span>
                        <p class="cur_result" v-if="recive == ''">Please Select Currency</p>
                        <p class="cur_result" v-else>Please Select Another Currency</p>
                      </div>
                    </div>
                  </div>
                  <div class="selectField border-left">
                    <div class="selectDropMenu position-relative destinationDropMenu round-sm">
                      <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between border-0 py-0 inputHeight selectDropMenuLink" data-toggle="dropdown">
                        <div class="d-flex align-items-center" v-if="recive">
                          <img :src="'/assets/website/images/crypto_logos/' +recive.toLowerCase() +'.png'" alt="Coin" class="d-block destinationdropImg h-auto" width="38" height="38" v-if="recive != '' && checkImage(recive)" />
                          <div class="pl-1 pl-sm-3" v-else-if="send != ''">
                            <p class="medium themecolor mb-0 text-left">
                              {{ recive.charAt(0) }}
                            </p>
                          </div>
                          <p class="medium themecolor mb-0 text-left pl-2">
                            {{ recive }}
                          </p>
                        </div>
                        <feather type="chevron-down" size="20px"></feather>
                      </a>
                      <ul class="dropdown-menu scrollbar">
                        <input type="text" placeholder="Search here..." class="dropdownSearch" v-model="searchRecive" />
                        <li v-for="value in uniqueCurrencyList( send, searchRecive)" @click.prevent=" showPopup(value.symbol)" :class="value.symbol == recive ? 'active' : ''" v-show=" send.currency != value  && uniqueCurrencyList( send, searchRecive).length > 0">
                          <a href="javascript:void(0)" class="" v-if="value.symbol">
                            <div class="d-flex align-items-center">
                              <img :src="'/assets/website/images/crypto_logos/' +value.symbol.toLowerCase() +'.png'" alt="Coin" class="d-block destinationdropImg h-auto" width="38" height="38" v-if="checkImage(value.symbol)" />
                              <span class="firstName" v-else>{{ value.symbol.charAt(0) }}</span>
                              <div class="pl-1 pl-sm-2" v-if="  $env_var.restricted_currencies.hasOwnProperty( value.symbol )  ">
                                <p class="medium themecolor mb-0 text-left lh-normal">{{ $env_var.restricted_currencies[value.symbol].currency_name }}</p>
                                <p class="medium textcolor mb-0 text-left lh-normal f-12 mt-1">{{ value.symbol }}</p>
                              </div>
                              <div class="pl-1 pl-sm-2" v-else>
                                <p class="medium themecolor mb-0 text-left lh-normal">{{ value.symbol }}</p>
                                <p class="medium textcolor mb-0 text-left lh-normal f-12 mt-1">{{ getCurrName(value.symbol) }}</p>
                              </div>
                            </div>
                          </a>
                        </li>
                        <li v-if="uniqueCurrencyList( send, searchRecive).length == 0" class="d-flex align-items-center justify-content-center pt-2 pb-3">
                          <feather type="alert-circle" class="mr-2 textcolor" size="18px"></feather>
                          <p class="d-block textcolor mb-0">No Data Available</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-block d-md-flex justify-content-center align-items-center conversionsRow mb-4 pb-0 pb-md-2">
              <div class="position-relative">
                <div class="d-flex align-items-center conversionsText pb-2 pb-md-0">
                  <div class="d-flex align-items-center">
                    <p class="themecolor medium mb-0">Market Order Price</p>
                    <a href="javascript:void(0);" class="d-block ml-2">
                      <feather size="16px" type="info" data-toggle="tooltip" data-placement="top" class="textcolor d-block " title="A Market Order is a Buy/Sell order at the market's current best available price. Market orders are optimal when the primary goal is to execute the trade immediately."></feather>
                    </a>
                  </div>
                </div>
              </div>
              <div class="d-flex border round-sm lightgrayBG conversionsInput">
                <div class="inputHeight w-100 d-flex align-items-center" v-if="get_depth.A && freeMargin">
                  <!-- <input type="text" class="form-control border-0 px-3 lightgrayBG" placeholder="29,406.20 USDT" /> -->
                  <span class="px-3 textcolor rb_medium">1 {{ send.currency }} ≈ {{ numberFormat(get_depth.A,8, recive) }} {{ recive }}</span>
                </div>
              </div>
            </div>
            <div class="d-block d-md-flex justify-content-center align-items-center conversionsRow">
              <div class="conversionsText d-none d-md-block">&nbsp;</div>
              <div class="conversionsInput">
                <a href="javascript:void(0);" class="cap_btn large_btn mb-0" @click.prevent="submitFunc('1')" :class="[{ disabled: !parseFloat(get_depth.A) }]">Submit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-block d-sm-flex justify-content-between align-items-center mt-5">
        <div class="d-flex align-items-center">
          <h3 class="mb-0">Recent Conversions</h3>
          <a href="javascript:void(0);" class="d-block ml-2">
            <feather size="18px" type="info" data-toggle="tooltip" data-placement="top" data-html="true" class="textcolor d-block" title="All information about Order Rates (Requested rates, Conversion rates, and Fees) are provided in the transaction history tab on menu. Click 
                     
                     
              
              <b>'See All Transactions'</b> to discover.">
            </feather>
          </a>
        </div>
        <router-link :to="{ name: 'transaction-history', query: { transactiontab: 3}}" class="secondarycolor seeAllLink mt-3 mt-sm-0 d-block">See All Transactions</router-link>
      </div>
      <conversion-list :fromPage="'conversion'" v-if="tradingAccount.length > 0 && tradingAccount[0].subAccounts.length > 0"></conversion-list>
    </div>
    <div class="h-vh overlayArea" v-if=" !pageLoader && marginSearch(marginInfoList, 'checkAssets').length == 0 ">
      <div class="overlayAreaBox" style="position: fixed; z-index: 999999;  left: 0; top: 0; width: 100%; display: flex; align-items: center; justify-content: center; text-align: center; height: 50%;">
        <div class="content round-sm sessionExpiredBox">
          <p class="my-3">
            <span class="themecolor medium pr-1">Disclaimer: </span>If no assets are available in holdings, please ensure you have sufficient crypto holdings in your account to use the conversion service.
          </p>
          <router-link to="/deposits" role="menuitem" class="cap_btn ">Deposit crypto here.</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import conversionList from "./list.vue";
  import {
    Const
  } from "@/plugins/vue-provider-cache/const.mod";
  import tradingMixins from "@/plugins/trading";
  import * as types from "@/types";
  import {
    Form,
    Field,
    ErrorMessage
  } from "vee-validate";
  export default {
    name: "smart-trading",
    mixins: [tradingMixins],
    data() {
      return {
        is_agree: 0,
        pageLoader: false,
        page: "1",
        pageLimit: "10",
        taskTab: "Price",
        charTab: "date",
        combinedData: "",
        notification_msg: "",
        notification_type: "",
        send: "",
        recive: "",
        margin_list: {},
        freeMargin: "",
        free_Margin: "",
        free_MarginShow: "",
        step: "1",
        searchSend: "",
        searchRecive: "",
        showSend: false,
        showReceive: false,
        percentage: 25,
        submitted: true,
        terms: false,
        timer: 0,
        downloadTimer: "",
        currentPrice: 0,
        purchasedQnt: 0,
        totalCommission: 0,
        purchasedTotal: 0,
        orderPending: {},
        tempIdRecived: {},
        orderPlacedSuccess: false,
        tradePair: "",
        conversion_rate: "",
        errImage: [],
        statusTypeList: {
          CREATED: {
            text: "Pending",
            class: "yellow",
          },
          FILLED: {
            text: "Approved",
            class: "green",
          },
          CANCELED: {
            text: "Rejected",
            class: "red",
          },
        },
        tab: 1,
        notCryptoCurrency: ["EURO", "USD", "AUD", "GBP", "JPY"],
        showErrorPopup: ''
      };
    },
    components: {
      conversionList,
      Form,
      Field,
      ErrorMessage
    },
    computed: {
      instruments() {
        try {
          this.$store.getters[Const.GET_HEARTBEATS]["priceFeed"];
          return this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].iCache.asKeysValueArrayAll();
        } catch (ex) {
          return {};
        }
      },
      get_depth() {
        try {
          this.$store.getters[Const.GET_HEARTBEATS]["priceFeed"];
          return this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].iCache.asKeysValueArray(this);
        } catch (ex) {
          return {};
        }
      },
      getCommission() {
        try {
          let side = 0;
          if (this.recive + "-" + this.send.currency == this.tradePair) {
            side = 1;
          }
          let total = this.free_Margin * (side || this.get_depth.A) * 0.005;
          if (this.notCryptoCurrency.includes(this.spliting(this.tradePair, 1))) {
            return total;
          } else {
            return total ;
          }
        } catch (e) {
          console.log("getCommission", e);
          return 0;
        }
      },
      totalReceive() {
        try {
          let side = 0;
          if (this.recive + "-" + this.send.currency == this.tradePair) {
            side = 1;
          }
          let total = this.free_Margin * this.get_depth.A - this.getCommission * (side ? this.get_depth.A : 1);
          if (this.notCryptoCurrency.includes(this.recive)) {
            return total;
          } else {
            return total;
          }
        } catch (e) {
          console.log("totalReceive", e);
          return 0;
        }
      },
    },
    watch: {
      marginInfoList(value) { //2 in use
        let changedSend = true;
        if (Object.keys(this.send).length > 0) {
          for (let key in value) {
            if (key == this.send.act_account_id && value[key].amount != 0) {
              this.send = value[key];
              changedSend = false;
            }
          }
        }
        if (changedSend) {
          if (this.$route.params.sendCurrency) {
            for (let key in value) {
              if (value[key].currency.toLowerCase().includes(this.$route.params.sendCurrency.toLowerCase())) {
                this.send = value[key];
                this.send.act_account_id = key;
              }
            }
          } else if (this.marginSearch(this.marginInfoList).length > 0) {
            let objData = this.marginSearch(this.marginInfoList)
            this.send = objData[0]
          }
        }
      },
      send(value) { //3 in use
        let amount = value.amount;
        this.freeMargin = amount;
        this.free_Margin = this.numberFormat1(amount * (this.percentage / 100), 8);
        this.free_MarginShow = this.numberFormat(amount * (this.percentage / 100), 8);
        // this.changeReciveCurr();
      },
      recive(value) {
        // console.log('receive value', value)
        // if (this.walletCurrencyList.enabled_coins.includes(value)) {
        this.subscribe();
        // }else{
        //   alert('please enable wallet then proceed further')
        //   this.$router.replace('/dashboard')
        // }
      },
      // combinedCurrency(value) {
      //   if (this.tradePair == "" && this.send.currency) {
      //     this.changeReciveCurr();
      //   }
      // },
    },
    methods: {
      subscribe() {
        let dataArr2 = this.send.currency + "-" + this.recive;
        let dataArr1 = this.recive + "-" + this.send.currency;
        if (this.walletCurrencyList.conversion.includes(dataArr1)) {
          // console.log('dataArr1', dataArr1)
          this.tradePair = dataArr1;
          this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].seeders["S_PF_PF"].subscribe([dataArr1]);
        } else if (this.walletCurrencyList.conversion.includes(dataArr2)) {
          // console.log('dataArr2', dataArr2)
          this.tradePair = dataArr2;
          this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].seeders["S_PF_PF"].subscribe([dataArr2]);
        } else {
          // console.log('dataArr2 else')
          this.tradePair = "";
          // this.displayError("no key found", "error");
        }
      },
      showPopup(value) {
        let flag = 0;
        for (let i = 0; i <= this.walletCurrencyList.payment.length - 1; i++) {
          if (value == this.walletCurrencyList.payment[i].symbol || value == 'USD') {
            flag = 1
          }
          if (i == this.walletCurrencyList.payment.length - 1) {
            if (flag == 1) {
              this.recive = value;
              this.searchRecive = '';
              this.showReceive = '';
            } else {
              this.showErrorPopup = value
            }
          }
        }
      },
      ChangeSendData(data, act_account_id) {
        this.send = data;
        this.send.act_account_id = act_account_id;
        this.recive = ''
      },
      //new
      marginSearch(margin_list, getModule) {
        let data = [],
          count = 0;
        if (Object.keys(margin_list).length > 0) {
          for (let key in margin_list) {
            count++
            for (let i = 0; i <= this.walletCurrencyList.conversion_coins.length - 1; i++) {
              if (this.walletCurrencyList.conversion_coins[i].symbol == margin_list[key].currency && margin_list[key].amount > 0) {
                let json = margin_list[key];
                json['currency_name'] = this.walletCurrencyList.conversion_coins[i].currency_name
                json['act_account_id'] = key
                data.push(json);
              }
            }
            if (count == Object.keys(margin_list).length) {
              if (getModule == 'checkAssets') {
                return data;
              } else {
                var search = this.searchSend.toLowerCase();
                return data.filter((val) => this.searchSend ? (val.currency.toLowerCase().includes(search) || val.currency_name.toLowerCase().includes(search)) : true);
              }
            }
          }
        } else {
          return data;
        }
      },
      //new
      uniqueCurrencyList(val, search) {
        // console.log('send==>',val)
        if (val != "" && val.currency && this.walletCurrencyList.conversion.length > 0) {
          var data = [];
          for (let i = 0; i <= this.walletCurrencyList.conversion.length - 1; i++) {
            for (let j = 0; j <= this.walletCurrencyList.enabled_coins.length - 1; j++) {
              if ((this.walletCurrencyList.conversion[i].split("-")[0] == val.currency && this.walletCurrencyList.enabled_coins[j].symbol == this.walletCurrencyList.conversion[i].split("-")[1]) || (this.walletCurrencyList.conversion[i].split("-")[1] == val.currency && this.walletCurrencyList.enabled_coins[j].symbol == this.walletCurrencyList.conversion[i].split("-")[0])) {
                data.push(this.walletCurrencyList.enabled_coins[j])
              }
            }
            if (i == this.walletCurrencyList.conversion.length - 1) {
              this.recive = (this.recive == '') ? (data.length > 0) ? data[0].symbol : '' : this.recive
              var search = this.searchRecive.toLowerCase();
              return data.filter((val) => this.searchRecive ? (val.symbol.toLowerCase().includes(search) || val.currency_name.toLowerCase().includes(search)) : true);
            }
          }
        } else {
          return [];
        }
      },
      //use for css width
      marketpercent() {
        let currenctPrice = this.get_depth.A
        let lowValue = this.instruments[this.tradePair].other['24h_low']
        let highValue = this.instruments[this.tradePair].other['24h_high']
        let calculate = ((currenctPrice - lowValue) / (highValue - lowValue)) * 100
        return calculate;
      },
      closeStep() {
        if (parseInt(this.step) == 2) {
          this.stopTimer();
        }
        this.step = "1";
      },
      formatfloat(num) {
        if (num) {
          num = parseFloat(num);
          return num.toFixed(8);
        } else {
          return 0;
        }
      },
      checkImage(val) {
        return this.errImage.includes(val) ? false : true;
      },
      submitFunc(step) {
        // alert('function')
        // alert('function',step)
        if (!this.get_depth.A) {
          // alert('function1')
          return;
        }
        const _that = this;
        _that.submitted = true;
        let side = 1;
        if (this.recive + "-" + this.send.currency == this.tradePair) {
          side = 1;
        } else if (this.send.currency + "-" + this.recive == this.tradePair) {
          side = 0;
        }
        if (_that.get_depth && step == "1") {
          if (parseFloat(_that.freeMargin) >= parseFloat(_that.free_Margin)) {
            _that.currentPrice = _that.numberFormat(_that.get_depth.A * _that.free_Margin,'', _that.recive);
            _that.totalCommission = _that.getCommission;
            _that.purchasedTotal = _that.totalReceive;
            _that.step = "2";
            _that.conversion_rate = 1 + _that.send.currency + '≈' + _that.numberFormat1(_that.get_depth.A) + _that.recive
            _that.startTimer();
          } else {
            _that.displayError("You can buy maximum sell upto" + _that.freeMargin + " " + _that.send.currency, "error");
          }
        } else if (step == "2") {
          let qty = _that.free_Margin;
          const tempOrderId = new Date().getTime();
          let orderJson = {
            symbol: _that.tradePair,
            quantity: qty,
            side: side,
            stop: 0,
            limit: 0,
            trail: 0,
            lifetime: "GTC",
            commentary: "Instant Fill",
            tempOrderId: tempOrderId,
            account_id: _that.tradingAccount[0].account_id,
            localParams: _that,
          };
          _that.orderPending = Object.assign({}, orderJson);
          _that.orderPending.free_Margin = _that.free_Margin;
          _that.orderPending.from = _that.send.currency;
          _that.orderPending.to = _that.recive;
          _that.orderPending.price = _that.currentPrice;
          _that.orderPending.commision = _that.totalCommission;
          _that.orderPending.estimatedPrice = _that.purchasedTotal;
          // console.log('orderJson===',orderJson)
          _that.$store.getters[Const.GET_PROVIDERS]["priceFeed"].seeders["S_PF_PF"].placeOrder(orderJson);
          _that.stopTimer();
        }
      },
      floatingValue(total, currency) {
        try {
          if (this.notCryptoCurrency.includes(currency)) {
            return parseFloat(total).toFixed(2);
          } else {
            return this.formatfloat(parseFloat(parseFloat(total).toFixed(8)));
          }
          // return this.formatPrice(total,!this.notCryptoCurrency.includes(currency))
        } catch (e) {
          return 0;
        }
      },
      successWs() {
        this.orderPlacedSuccess = true;
        let _that = this;
        let Timer = setInterval(function() {
          let orderMessage = localStorage.getItem("orderMessage");
          if (orderMessage) {
            let data = JSON.parse(orderMessage);
            if (data.tempOrderId == _that.orderPending.tempOrderId) {
              _that.orderPlacedSuccess = false;
              // _that.displayError(data.resp_msg, "success");
              _that.tempIdRecived = data;
              _that.step = "4";
              localStorage.removeItem("orderMessage");
              // _that.callMargin()
              clearInterval(Timer);
            }
          }
        }, 500);
      },
      startTimer() {
        // alert('timer innn')
        let timer = 15;
        this.timer = 15;
        var _that = this;
        this.downloadTimer = setInterval(() => {
          if (timer <= 0) {
            clearInterval(_that.downloadTimer);
            _that.step = "3";
          }
          timer -= 1;
          _that.timer = timer;
        }, 1000);
      },
      stopTimer() {
        clearInterval(this.downloadTimer);
        this.timer = 0;
      },
      failedWs() {
        this.displayError("faild to Place order", "error");
        // console.log('failed')
      },
      displayError(getMessage, type) {
        var _that = this;
        try {
          _that.$notify({
            // title: "Important message",
            text: getMessage,
            duration: 10000,
            pauseOnHover: true,
            type: type,
            classes: "Ucfirst"
          });
        } catch (e) {}
      },
      setPercentage(val) {
        this.percentage = val;
        this.free_Margin = this.numberFormat1(this.freeMargin * (val / 100), 8); //this.floatingValue(this.freeMargin * (val / 100), this.send.currency);
      },
    },
    created() {
      const _that = this;
      this._runGetEnableWallets({
        globalParams: {},
        localParams: {
          parameter: this,
          page: "conversion"
        }
      });
      this._runTradingAccount({
        globalParams: {},
        localParams: {
          parameter: this,
          page: "conversion"
        }
      });
      if (this.$route.query.conversion) {
        this.searchSend = this.$route.query.conversion
        let returnData = this.marginSearch(this.marginInfoList)
        this.ChangeSendData(Object.values(returnData), Object.keys(returnData))
        this.showSend = false
      }
    }
  };
</script>