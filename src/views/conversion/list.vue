<template>
  <div class="mt-4 bg-white border round-sm">
    <div id="tabs" class="text-center mb-0 walletTab currencyTab pt-4 pb-2 px-4">
      <ul class="d-flex align-items-center m-0">
        <li>
          <a class="d-block" href="javascript:void(0)" :class="[{'active':transactionConversionstab == 1}]" @click.prevent="transactionConversionstab = 1">All</a>
        </li>
        <li>
          <a class="d-block" href="javascript:void(0)" :class="[{'active':transactionConversionstab == 2}]" @click.prevent="transactionConversionstab = 2">Pending</a>
        </li>
        <li>
          <a class="d-block" href="javascript:void(0)" :class="[{'active':transactionConversionstab == 3}]" @click.prevent="transactionConversionstab = 3">Completed</a>
        </li>
        <li>
          <a class="d-block" href="javascript:void(0)" :class="[{'active':transactionConversionstab == 4}]" @click.prevent="transactionConversionstab = 4">Rejected</a>
        </li>
      </ul>
    </div>
    <!-- <div class="d-md-flex d-block justify-content-between p-4"><div class="d-flex align-items-center"><div class="form-group position-relative includeIco searchTable mb-0"><input type="text" placeholder="Search Transaction" name="legal_name" class="form-control small" v-model="search"  /><span class="searchIco"><feather type="search" /></span></div><div class="d-flex align-items-center ml-3 position-relative"><a @click.prevent="filters ^= true" href="javascript:void(0)"><img src="/assets/website/images/filter-icon.svg" alt="Filter Icon" class="d-block" width="22" height="22" /></a><div class="dropdown_menu filter_dropdown_menu dropdown_menu--animated dropdown_menu-6" :class="{'show':filters}"><div class="d-flex justify-content-between align-items-center px-3 pb-3"><span class="f-14 medium">Filters</span><a href="javascript:void(0);" class="secondaryBG round-lg text-white px-3 f-11">Apply </a></div><ul class="mb-0"><li class="py-2"><label class="customCheckbox mb-0 themecolor">Currency <input type="checkbox" value="withdrawal" /><span class="checkmark"></span></label></li><li class="py-2 lightgrayBG"><label class="customCheckbox mb-0 themecolor">Status <input type="checkbox"  value="withdrawal"/><span class="checkmark"></span></label><div class="selectmenu position-relative pt-1"><a @click.prevent="thisdate ^= true" href="javascript:void(0)" class="btn d-flex justify-content-between align-items-center px-2 py-1 bg-white"><span class="mr-2">unconfirmed</span><feather type="chevron-down" class="ml-2"></feather></a><ul class="dropdown_menu dropdown_menu--animated dropdown_menu-6" :class="{'show':thisdate}"><li><a href="javascript:void(0)">unconfirmed</a></li><li><a href="javascript:void(0)">Confirmed</a></li><li><a href="javascript:void(0)">rejected</a></li></ul></div></li><li class="py-2"><label class="customCheckbox mb-0 themecolor">Transaction ID <input type="checkbox" value="withdrawal" /><span class="checkmark"></span></label></li><li class="py-2"><label class="customCheckbox mb-0 themecolor">Hash <input type="checkbox"  value="withdrawal"/><span class="checkmark"></span></label></li></ul></div></div></div><div class="d-block d-sm-flex align-items-center pt-3 pt-md-0"><div class="border px-2 py-1 rounded"><input type="date" class="border-0 textcolor" v-model="from" /></div><div class="px-3 text-center py-2 py-sm-0"><p class="mb-0 themecolor medium">To</p></div><div class="border px-2 py-1 rounded"><input type="date" class="border-0 textcolor" v-model="to" /></div></div></div> -->
    <div>
      <!-- <div class="d-md-flex d-block justify-content-between p-4"><div class="d-flex align-items-center"><div class="form-group position-relative includeIco searchTable mb-0"><input type="text" placeholder="Search Transaction" name="legal_name" class="form-control small" /><span class="searchIco"><feather type="search" /></span></div><div class="d-flex align-items-center ml-3 position-relative"><a @click.prevent="filters ^= true" href="javascript:void(0)"><img src="/assets/website/images/filter-icon.svg" alt="Filter Icon" class="d-block" width="22" height="22" /></a><div class="dropdown_menu filter_dropdown_menu filter_dropdown_menu_right dropdown_menu--animated dropdown_menu-6" :class="{'show':filters}"><div class="d-flex justify-content-between align-items-center px-3 pb-3"><span class="f-14 medium">Filters</span><a href="javascript:void(0);" class="secondaryBG round-lg text-white px-3 f-11">Apply</a></div><ul class="mb-0"><li class="py-2"><label class="customCheckbox mb-0 themecolor">Currency <input type="checkbox" /><span class="checkmark"></span></label></li><li class="py-2"><label class="customCheckbox mb-0 themecolor">Date <input type="checkbox" /><span class="checkmark"></span></label></li><li class="py-2 lightgrayBG"><label class="customCheckbox mb-0 themecolor">Status <input type="checkbox" /><span class="checkmark"></span></label><div class="selectmenu position-relative pt-1"><a @click.prevent="thisdate ^= true" href="javascript:void(0)" class="btn d-flex justify-content-between align-items-center px-2 py-1 bg-white"><span class="mr-2">Confirmed</span><feather type="chevron-down" class="ml-2"></feather></a><ul class="dropdown_menu dropdown_menu--animated dropdown_menu-6" :class="{'show':thisdate}"><li><a href="javascript:void(0)">Confirmed</a></li><li><a href="javascript:void(0)">Confirmed</a></li><li><a href="javascript:void(0)">Confirmed</a></li></ul></div></li><li class="py-2"><label class="customCheckbox mb-0 themecolor">Transaction ID <input type="checkbox" /><span class="checkmark"></span></label></li><li class="py-2"><label class="customCheckbox mb-0 themecolor">Hash <input type="checkbox" /><span class="checkmark"></span></label></li></ul></div></div></div><div class="d-block d-sm-flex align-items-center pt-3 pt-md-0"><div class="border px-2 py-1 rounded"><input type="date" class="border-0 textcolor" /></div><div class="px-3 text-center py-2 py-sm-0"><p class="mb-0 themecolor medium">To</p></div><div class="border px-2 py-1 rounded"><input type="date" class="border-0 textcolor" /></div></div></div> -->
      <div class="table-responsive scrollbar">
        <table class="table table-bordered tablecustomWidth">
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>Order ID</th>
              <th>Order Type</th>
              <th>Conversion Details</th>
              <th v-if="transactionConversionstab == 1 || transactionConversionstab == 3">Conversion Price</th>
              <th v-if="transactionConversionstab == 1 || transactionConversionstab == 3">Conversion Fees</th>
              <!-- <th v-if="transactionConversionstab == 1 || transactionConversionstab == 2 || transactionConversionstab == 4">Requested Price</th> -->
              <th>Status</th>
            </tr>
          </thead>
          <tbody v-if="Object.keys(orderData).length > 0 && orderData.records.length > 0 && !pageLoader">
            <tr v-for="(val, index) in orderData.records" v-show="(fromPage == 'conversion' && index <= 3) ||(fromPage != 'conversion' && index >= ((page-1) * pageLimit) && index < (page*pageLimit))">
              <td> {{ momentFunc(val.Opened,"DD MMM YYYY, h:mm:ss a","deposit_list") }}</td>
              <td>{{val.OrderId}}</td>
              <td>{{$env_var.orderType[val.OrderType]}}</td>
              <td>
                <div v-if="(transactionConversionstab == 1 && ( (val.Status == 2  && val.OrderType != 'L') || (val.Status == 3)) ) || (transactionConversionstab == 2 && val.OrderType != 'L') || (transactionConversionstab == 3) ">
                  <div v-if="val.OrderSide == 0">
                    <div class="d-flex align-items-center">
                      <span class="inTableIcon mr-2">
                        <img :src="'/assets/website/images/crypto_logos/'+val.Symbol.split('-')[0].toLowerCase()+'.png'" width="34" height="34" class="h-auto">
                      </span>
                      <p class="themecolor"> Sold: {{ numberFormat( val.QuantityFilled, spliting(val.Symbol, 0), val.Symbol) }}
                        <span v-if="val.Symbol != undefined && val.Symbol != null && val.Symbol != '' && $env_var.restricted_currencies.hasOwnProperty(spliting(val.Symbol, 0))">{{ $env_var.restricted_currencies[spliting(val.Symbol, 0)].currency_name }}</span>
                        <span v-else>{{ spliting(val.Symbol, 0) || "-" }}</span>
                      </p>
                    </div>
                    <div class="d-flex pl-1 pl-md-2 py-1">
                      <feather type="arrow-down" size="22px"></feather>
                    </div>
                    <div class="d-flex align-items-center">
                      <span class="inTableIcon mr-2">
                        <img :src="'/assets/website/images/crypto_logos/'+val.Symbol.split('-')[1].toLowerCase()+'.png'" width="34" height="34" class="h-auto">
                      </span>
                      <p class="themecolor">Bought: {{numberFormat( val.QuantityFilled * val.PriceFilled - val.Commission,  spliting(val.Symbol, 1), val.Symbol)}}
                        <span v-if="val.Symbol != undefined && val.Symbol != null && val.Symbol != '' && $env_var.restricted_currencies.hasOwnProperty(spliting(val.Symbol, 1))">{{ $env_var.restricted_currencies[spliting(val.Symbol, 1)].currency_name }}</span>
                        <span v-else>{{ spliting(val.Symbol, 1) || "-" }}</span>
                      </p>
                    </div>
                  </div>
                  <div v-if="val.OrderSide == 1">
                    <div class="d-flex align-items-center">
                      <span class="inTableIcon mr-2">
                        <img :src="'/assets/website/images/crypto_logos/'+val.Symbol.split('-')[0].toLowerCase()+'.png'" width="34" height="34" class="h-auto">
                      </span>
                      <p class="themecolor">Bought: {{numberFormat(val.QuantityFilled, spliting(val.Symbol, 0), val.Symbol)}}
                        <span v-if="val.Symbol != undefined && val.Symbol != null && val.Symbol != '' && $env_var.restricted_currencies.hasOwnProperty(spliting(val.Symbol, 0))">{{ $env_var.restricted_currencies[spliting(val.Symbol, 0)].currency_name }}</span>
                        <span v-else>{{ spliting(val.Symbol, 0) || "-" }}</span>
                      </p>
                    </div>
                    <div class="d-flex pl-1 pl-md-2 py-1">
                      <feather type="arrow-down" size="22px"></feather>
                    </div>
                    <div class="d-flex align-items-center">
                      <span class="inTableIcon mr-2">
                        <img :src="'/assets/website/images/crypto_logos/'+val.Symbol.split('-')[1].toLowerCase()+'.png'" width="34" height="34" class="h-auto">
                      </span>
                      <p class="themecolor"> Sold: {{numberFormat(val.QuantityFilled * val.PriceFilled,  spliting(val.Symbol, 1), val.Symbol)}}
                        <span v-if="val.Symbol != undefined && val.Symbol != null && val.Symbol != '' && $env_var.restricted_currencies.hasOwnProperty(spliting(val.Symbol, 1))">{{ $env_var.restricted_currencies[spliting(val.Symbol, 1)].currency_name }}</span>
                        <span v-else>{{ spliting(val.Symbol, 1) || "-" }}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div v-else-if="(transactionConversionstab == 1 && ( (val.Status == 4  && val.OrderType != 'L') ) )  || (transactionConversionstab == 4 && val.OrderType != 'L')">
                  <div v-if="val.OrderSide == 0">
                    <div class="d-flex align-items-center">
                      <span class="inTableIcon mr-2">
                        <img :src="'/assets/website/images/crypto_logos/'+val.Symbol.split('-')[0].toLowerCase()+'.png'" width="34" height="34" class="h-auto">
                      </span>
                      <p class="themecolor"> Sell: {{ numberFormat( val.QuantityFilled, spliting(val.Symbol, 0), val.Symbol) }}
                        <span v-if="val.Symbol != undefined && val.Symbol != null && val.Symbol != '' && $env_var.restricted_currencies.hasOwnProperty(spliting(val.Symbol, 0))">{{ $env_var.restricted_currencies[spliting(val.Symbol, 0)].currency_name }}</span>
                        <span v-else>{{ spliting(val.Symbol, 0) || "-" }}</span>
                      </p>
                    </div>
                    <div class="d-flex pl-1 pl-md-2 py-1">
                      <feather type="arrow-down" size="22px"></feather>
                    </div>
                    <div class="d-flex align-items-center">
                      <span class="inTableIcon mr-2">
                        <img :src="'/assets/website/images/crypto_logos/'+val.Symbol.split('-')[1].toLowerCase()+'.png'" width="34" height="34" class="h-auto">
                      </span>
                      <p class="themecolor">Buy: {{numberFormat( val.QuantityFilled * val.PriceFilled - val.Commission,  spliting(val.Symbol, 1), val.Symbol)}}
                        <span v-if="val.Symbol != undefined && val.Symbol != null && val.Symbol != '' && $env_var.restricted_currencies.hasOwnProperty(spliting(val.Symbol, 1))">{{ $env_var.restricted_currencies[spliting(val.Symbol, 1)].currency_name }}</span>
                        <span v-else>{{ spliting(val.Symbol, 1) || "-" }}</span>
                      </p>
                    </div>
                  </div>
                  <div v-if="val.OrderSide == 1">
                    <div class="d-flex align-items-center">
                      <span class="inTableIcon mr-2">
                        <img :src="'/assets/website/images/crypto_logos/'+val.Symbol.split('-')[0].toLowerCase()+'.png'" width="34" height="34" class="h-auto">
                      </span>
                      <p class="themecolor">Buy: {{numberFormat(val.QuantityFilled, spliting(val.Symbol, 0), val.Symbol)}}
                        <span v-if="val.Symbol != undefined && val.Symbol != null && val.Symbol != '' && $env_var.restricted_currencies.hasOwnProperty(spliting(val.Symbol, 0))">{{ $env_var.restricted_currencies[spliting(val.Symbol, 0)].currency_name }}</span>
                        <span v-else>{{ spliting(val.Symbol, 0) || "-" }}</span>
                      </p>
                    </div>
                    <div class="d-flex pl-1 pl-md-2 py-1">
                      <feather type="arrow-down" size="22px"></feather>
                    </div>
                    <div class="d-flex align-items-center">
                      <span class="inTableIcon mr-2">
                        <img :src="'/assets/website/images/crypto_logos/'+val.Symbol.split('-')[1].toLowerCase()+'.png'" width="34" height="34" class="h-auto">
                      </span>
                      <p class="themecolor"> Sell: {{numberFormat(val.QuantityFilled * val.PriceFilled,  spliting(val.Symbol, 1), val.Symbol)}}
                        <span v-if="val.Symbol != undefined && val.Symbol != null && val.Symbol != '' && $env_var.restricted_currencies.hasOwnProperty(spliting(val.Symbol, 1))">{{ $env_var.restricted_currencies[spliting(val.Symbol, 1)].currency_name }}</span>
                        <span v-else>{{ spliting(val.Symbol, 1) || "-" }}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div v-if="val.OrderSide == 0">
                    <div class="d-flex align-items-center">
                      <span class="inTableIcon mr-2">
                        <img :src="'/assets/website/images/crypto_logos/'+val.Symbol.split('-')[0].toLowerCase()+'.png'" width="34" height="34" class="h-auto">
                      </span>
                      <p class="themecolor"> Sell: {{ numberFormat(val.QuantityRemaining,'', val.Symbol) }}
                        <span v-if="val.Symbol != undefined && val.Symbol != null && val.Symbol != '' && $env_var.restricted_currencies.hasOwnProperty(spliting(val.Symbol, 0))">{{ $env_var.restricted_currencies[spliting(val.Symbol, 0)].currency_name }}</span>
                        <span v-else>{{ spliting(val.Symbol, 0) || "-" }}</span>
                      </p>
                    </div>
                    <div class="d-flex pl-1 pl-md-2 py-1">
                      <feather type="arrow-down" size="22px"></feather>
                    </div>
                    <div class="d-flex align-items-center">
                      <span class="inTableIcon mr-2">
                        <img :src="'/assets/website/images/crypto_logos/'+val.Symbol.split('-')[1].toLowerCase()+'.png'" width="34" height="34" class="h-auto">
                      </span>
                      <p class="themecolor">Buy: <span v-if="val.Symbol != undefined && val.Symbol != null && val.Symbol != '' && $env_var.restricted_currencies.hasOwnProperty(spliting(val.Symbol, 1))">{{ $env_var.restricted_currencies[spliting(val.Symbol, 1)].currency_name }}</span>
                        <span v-else>{{ spliting(val.Symbol, 1) || "-" }}</span>
                      </p>
                    </div>
                  </div>
                  <div v-if="val.OrderSide == 1">
                    <div class="d-flex align-items-center">
                      <span class="inTableIcon mr-2">
                        <img :src="'/assets/website/images/crypto_logos/'+val.Symbol.split('-')[0].toLowerCase()+'.png'" width="34" height="34" class="h-auto">
                      </span>
                      <p class="themecolor">Buy: {{ numberFormat(val.QuantityRemaining, '', val.Symbol) }}
                        <span v-if="val.Symbol != undefined && val.Symbol != null && val.Symbol != '' && $env_var.restricted_currencies.hasOwnProperty(spliting(val.Symbol, 0))">{{ $env_var.restricted_currencies[spliting(val.Symbol, 0)].currency_name }}</span>
                        <span v-else>{{ spliting(val.Symbol, 0) || "-" }}</span>
                      </p>
                    </div>
                    <div class="d-flex pl-1 pl-md-2 py-1">
                      <feather type="arrow-down" size="22px"></feather>
                    </div>
                    <div class="d-flex align-items-center">
                      <span class="inTableIcon mr-2">
                        <img :src="'/assets/website/images/crypto_logos/'+val.Symbol.split('-')[1].toLowerCase()+'.png'" width="34" height="34" class="h-auto">
                      </span>
                      <p class="themecolor"> Sell: <span v-if="val.Symbol != undefined && val.Symbol != null && val.Symbol != '' && $env_var.restricted_currencies.hasOwnProperty(spliting(val.Symbol, 1))">{{ $env_var.restricted_currencies[spliting(val.Symbol, 1)].currency_name }}</span>
                        <span v-else>{{ spliting(val.Symbol, 1) || "-" }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </td>
              <td v-if="transactionConversionstab == 1 || transactionConversionstab == 3">
                <p v-if="val.PriceFilled != null">{{numberFormat(val.PriceFilled)}}</p>
                <p v-else>-</p>
              </td>
              <td v-if="transactionConversionstab == 1 || transactionConversionstab == 3">
                <span class="d-flex align-items-center" v-if="val.Commission != null">
                  <span class="inTableIcon mr-2">
                    <img :src="'/assets/website/images/crypto_logos/' +val.CommissionCurrency.toLowerCase() +'.png'" width="35" height="35" />
                  </span>
                  <div class="iqlName" >
                    <h5 class="mb-0 themecolor">
                      {{numberFormat(val.Commission, '', val.CommissionCurrency)}}
                    </h5>
                  </div>
                </span>
                <span class="d-flex align-items-center"  v-else>-</span>
              </td>
              <td>
                <div class="d-flex align-items-center" v-if="transactionConversionstab == 2 || (transactionConversionstab == 1 && val.Status == 2)">
                  <div class="lightyellowbg px-3 py-2 round-lg text-center w-100"><span>Open</span></div>
                </div>
                <div class="lightgreenbg px-3 py-2 round-lg text-center" v-if="transactionConversionstab == 3 || (transactionConversionstab == 1 && val.Status == 3)">
                  <span class="lightgreentext">Complete</span>
                </div>
                <div class="d-flex justify-content-center align-items-center lightredbg px-3 py-2 round-lg" v-if="transactionConversionstab == 4 || (transactionConversionstab == 1 && val.Status == 4)">
                  <a href="javascript:void(0);" class="d-block">
                    <feather size="18px" type="info" data-toggle="tooltip" data-placement="top" class="red pr-2 d-block" :title="val.Reason"></feather>
                  </a>
                  <span class="red">Rejected</span>
                </div>
              </td>
            </tr>
          </tbody>
          <table-loader :pageloader_value="pageLoader" :type="'table'" :colspan="'10'" :listLength="Object.keys(orderData).length > 0 && orderData.records.length > 0 ? orderData.totalRecords : 0" v-else></table-loader>
        </table>
      </div>
      <pagination :totalRecords="orderData.totalRecords" :limit="pageLimit" :pageNo="page" v-if="Object.keys(orderData).length > 0 && orderData.records.length > 0 && orderData.totalRecords > 10 && fromPage != 'conversion'" class="p-3 p-sm-4"></pagination>
      <div class="modal" tabindex="-1" id="cancel-limit-confirmation" role="dialog" aria-labelledby="cancel-limit-confirmation" aria-hidden="true" v-if="Object.keys(cancelLimit).length > 0">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <h3 class="text-center medium d-block lh-normal mb-0 pt-3 pb-2">Are you sure to cancel this limit order?</h3>
            </div>
            <div class="modal-footer border-0 pt-0">
              <div class="d-flex justify-content-center w-100 pb-2">
                <a href="javascript:void(0);" class="cap_btn border-btn mb-0" data-dismiss="modal" aria-label="Close" @click="cancelLimit = {}">No</a>
                <a href="javascript:void(0);" class="cap_btn mb-0 ml-3" data-toggle="modal" data-target="#cancel-limit-successful-message" @click="canceLimitFunc()">Yes</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
  import tradingMixins from "@/plugins/trading";
  import moment from "moment";
  import {
    Const
  } from "@/plugins/vue-provider-cache/const.mod";
  import {
    format
  } from 'mathjs'
  export default {
    name: "transaction-history",
    mixins: [tradingMixins],
    data() {
      return {
        pageLoader: false,
        thisdate: false,
        filters: false,
        transactionConversionstab: 1,
        cancelLimit: {},
        copy_msg: "-1",
        transactionhistoryAction: false,
        page: "1",
        pageLimit: "10",
        orderData: {'records': [], 'totalRecords': 0}
      };
    },
    props: ['fromPage'],
    watch: {
      transactionConversionstab: function(val) {
        this.changeTabFunc()
      },
     
    },
    methods: {
      changeFilterForDownloadData() {
        this.changeTabFunc()
        this.$parent.downloadTransactions(this.orderData, 'conversions')
      },
      canceLimitFunc() {
        let tradeAcc = [];
        // if (parseInt(this.accountSelected) == 1) {
        //   tradeAcc = this.socialAccount;
        // } else {
        // console.log('order===>', this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].seeders["S_PF_PF"])
        tradeAcc = this.tradingAccount;
        // }
        if (tradeAcc[0]) {
          let orderJson = {
            account_id: tradeAcc[0].account_id,
            order_id: this.cancelLimit.OrderId,
            localParams: this,
          };
          this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].seeders["S_PF_PF"].cancelOrder(orderJson);
        }
      },
      currencyNameFunc(getData) {
        for (let i = 0; i <= this.$env_var.walletCurrencyList; i++) {
          if (this.$env_var.walletCurrencyList[i].symbol.toLowerCase() == getData.toLowerCase()) {
            return this.$env_var.walletCurrencyList[i].currency_name;
          }
        }
      },
      changeTabFunc() {
        let arrayData = {
          'records': [],
          'totalRecords': 0
        }
        // console.log('orderList.records==> ',this.orderList)
        for (let i = 0; i <= this.orderList.records.length - 1; i++) {
          if ((this.transactionConversionstab == 1) || (this.transactionConversionstab == 2 && this.orderList.records[i].Status == 2) || (this.transactionConversionstab == 3 && this.orderList.records[i].Status == 3) || (this.transactionConversionstab == 4 && this.orderList.records[i].Status == 4)) {
            arrayData.records.push(this.orderList.records[i])
          }
          if (i == this.orderList.records.length - 1) {
            // console.log('arrayData====>', arrayData)
            arrayData.totalRecords = arrayData.records.length
            this.orderData = arrayData
            // return arrayData;
          }
        }
      },
      listing() {
        let jsonData = {
          globalParams: {
            "filter": {},
            "account_id": this.tradingAccount[0].account_id,
            "demo_live": this.tradingAccount[0].demo_live
          },
          localParams: {
            parameter: this
          },
        };
        this._runGetOrderList1(jsonData);
      },
      // floatingValue(value, currency) {
      //   return this.formatfloat(parseFloat(parseFloat(value).toFixed(8)));
      // },
      // formatfloat(num) {
      //   // return num
      //   num = parseFloat(num).toFixed(8);
      //   return num ;
      //   // try {
         
      //   //   return format(num, {
      //   //     notation: "fixed"
      //   //   }) || "";
      //   // } catch (e) {
      //   //   try {
      //   //     return num.toFixed(8);
      //   //   } catch (e) {
      //   //     return "";
      //   //   }
      //   // }
      // },
    },
    created() {
      this.listing();
    }
  };
</script>