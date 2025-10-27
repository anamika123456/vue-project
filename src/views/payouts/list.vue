<template>
  <div class="mt-4 bg-white border round-sm">
    <div class="d-md-flex d-block justify-content-between p-4">
      <div class="d-flex align-items-center">
        <div class="form-group position-relative includeIco searchTable mb-0">
          <input type="text" placeholder="Search Transaction" name="legal_name" class="form-control" v-model="search" />
          <span class="searchIco">
            <feather type="search" />
          </span>
        </div>
        <div class="d-flex align-items-center ml-3 position-relative">
          <a @click.prevent="filters ^= true" href="javascript:void(0)">
            <img src="/assets/website/images/filter-icon.svg" alt="Filter Icon" class="d-block" width="22" height="22" />
          </a>
          <div class="dropdown_menu filter_dropdown_menu dropdown_menu--animated" :class="{ show: filters }">
            <div class="d-flex justify-content-between align-items-center px-3 pb-1 pb-md-2">
              <p class="medium themecolor mb-0">Filters</p>
              <a href="javascript:void(0);" class="secondaryBG round-lg text-white px-3 f-11" @click="
                  listing();
                  filters = false;
                  thisdate = false;
                ">Apply </a>
            </div>
            <ul class="mb-0">
              <!-- <li class="py-2">
                <label class="customCheckbox mb-0 themecolor">Ticket ID <input type="checkbox" value="withdrawal.ticket" v-model="searchFilter" />
                  <span class="checkmark"></span>
                </label>
              </li>
              <li class="py-2">
                <label class="customCheckbox mb-0 themecolor">Coin <input type="checkbox" value="withdrawal.currency" v-model="searchFilter" />
                  <span class="checkmark"></span>
                </label>
              </li>
              <li class="py-2">
                <label class="customCheckbox mb-0 themecolor">TX Hash <input type="checkbox" value="withdrawal.crypto_tx_id" v-model="searchFilter" />
                  <span class="checkmark"></span>
                </label>
              </li> -->
              <li class="py-2 lightgrayBG">
                <label class="customCheckbox mb-0 themecolor">Status <input type="checkbox" v-model="searchFilter" value="withdrawal.withdrawal_status" />
                  <span class="checkmark"></span>
                </label>
                <div class="selectmenu filterselectmenu position-relative pt-1" v-if="searchFilter.includes('withdrawal.withdrawal_status')">
                  <a @click.prevent="thisdate ^= true" href="javascript:void(0)" class="btn d-flex justify-content-between align-items-center bg-white rounded">
                    <span class="mr-2" v-if="withdrawal_status == '0'">Pending</span>
                    <span class="mr-2" v-if="withdrawal_status == '1'">Success</span>
                    <span class="mr-2" v-if="withdrawal_status == '2'">Rejected</span>
                    <feather type="chevron-down" class="ml-2" size="20px"></feather>
                  </a>
                  <ul class="dropdown_menu dropdown_menu--animated dropdown_menu-6 scrollbar" :class="{ show: thisdate }">
                    <li v-for="(
                        list, key
                      ) in $env_var.depositWithdrawalPaymentStatus" @click="withdrawal_status = key">
                      <a href="javascript:void(0)">{{ list }}</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="d-block d-sm-flex align-items-center pt-4 pt-md-0">
        <div class="border px-2 tableDate round-sm">
          <input type="date" class="border-0 textcolor" v-model="from" />
        </div>
        <div class="px-3 text-center py-2 py-sm-0">
          <p class="mb-0 themecolor medium">To</p>
        </div>
        <div class="border px-2 tableDate round-sm">
          <input type="date" class="border-0 textcolor" v-model="to" />
        </div>
      </div>
    </div>
    <div class="table-responsive scrollbar">
      <table class="table table-bordered tablecustomWidth">
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Ticket ID</th>
            <!-- <th>Payment ID</th> -->
            <th>Coin</th>
            <th>Amount</th>
            <th>Destination Address</th>
            <th>TX Hash</th>
            <th>Fees</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody v-if="
            Object.keys(withdrawalList).length > 0 &&
            withdrawalList.records.length > 0 &&
            !pageLoader
          ">
          <tr v-for="(val, index) in withdrawalList.records" v-show="(fromPage == 'payouts' && index <= 3) ||(fromPage != 'payouts' && index < pageLimit)">
            <td>{{ momentFunc(val.created,"DD MMM YYYY, h:mm:ss a","deposit_list") }}</td>
            <td>
              <div class="d-flex" v-if="val.ticket != ''">
                <span class="pr-2" ref="ticket_link">{{ val.ticket.substring(0, 3) }}...{{ val.ticket.substring(val.ticket.length - 3)
                  }}</span>
                <a href="javascript:void(0);" @click="handleCopy(val.ticket,'The ticket id has been copied')" data-toggle="tooltip" data-placement="top" :title="val.ticket">
                  <feather type="copy" size="15px" class="themecolor"></feather>
                </a>
              </div>
              <div v-else>-</div>
            </td>
            <!-- <td>365293746</td> -->
            <td>
              <span class="d-flex align-items-center">
                <span class="inTableIcon mr-2">
                  <img :src="
                      '/assets/website/images/crypto_logos/' +
                      val.currency.toLowerCase() +
                      '.png'
                    " width="35" height="35" />
                </span>
                <div class="iqlName" v-if="
                    val.currency != undefined &&
                    val.currency != null &&
                    val.currency != '' &&
                    $env_var.restricted_currencies.hasOwnProperty(val.currency)
                  ">
                  <h5 class="mb-0 themecolor">
                    {{ $env_var.restricted_currencies[val.currency].currency_name
                    }}
                  </h5>
                  <!-- <p class="mb-0 regular">{{ $env_var.restricted_currencies[val.currency].currency_name }}</p> -->
                </div>
                <div class="iqlName" v-else>
                  <h5 class="mb-0 themecolor">{{ val.currency || "-" }}</h5>
                  <!-- <p class="mb-0 regular">{{ val.currency || "-" }}</p> -->
                </div>
              </span>
            </td>
            <td>
              {{ numberFormat(val.amount, '', val.currency) }}
              <span v-if="
                  val.currency != undefined &&
                  val.currency != null &&
                  val.currency != '' &&
                  $env_var.restricted_currencies.hasOwnProperty(val.currency)
                ">{{ $env_var.restricted_currencies[val.currency].currency_name
                }}</span>
              <span v-else>{{ val.currency || "-" }}</span>
            </td>
            <td>
              <div class="d-flex" v-if="val.address != undefined && val.address != null && val.address != ''">
                <span class="pr-2" ref="address_link">{{ val.address.substring(0, 6) }}......{{ val.address.substring(val.address.length - 6)
                  }}</span>
                <a href="javascript:void(0);" @click="handleCopy(val.address,'The address has been copied')" data-toggle="tooltip" data-placement="top" :title="val.address">
                  <feather type="copy" size="15px" class="themecolor"></feather>
                </a>
              </div>
              <div v-else>-</div>
            </td>
            <td>
              <div class="d-flex" v-if="val.crypto_tx_id != ''">
                <a class="underline" :href="
                    redirecttoPage(val.txn_web, val.crypto_tx_id, val.currency)
                  " target="_blank" v-if="val.crypto_tx_id != ''" ref="crypto_link">
                  <span class="pr-2">{{ val.crypto_tx_id.substring(1, 3) }}..{{ val.crypto_tx_id.substring(val.crypto_tx_id.length - 3)
                    }}</span>
                </a>
                <a href="javascript:void(0);" @click="handleCopy(val.crypto_tx_id,'The transaction hash has been copied')" data-toggle="tooltip" data-placement="top" :title="val.crypto_tx_id">
                  <feather type="copy" size="15px" class="themecolor"></feather>
                </a>
              </div>
              <div v-else>-</div>
            </td>
            <td>-</td>
            <td>
              <div class="px-3 py-2 round-lg text-center d-flex align-items-center justify-content-center" :class="
                  $env_var.WithdrawalStatus[parseInt(val.withdrawal_status)]
                    .class
                ">
                <a href="javascript:void(0);" class="d-block" v-if="
                    parseInt(val.withdrawal_status) == 2 ||
                    parseInt(val.withdrawal_status) == 3
                  ">
                  <feather size="18px" type="info" data-toggle="tooltip" data-placement="top" class="red pr-2 d-block" title="Cancelled by the client"></feather>
                </a>
                <span :class="
                    $env_var.WithdrawalStatus[parseInt(val.withdrawal_status)]
                      .textClass
                  ">{{ $env_var.WithdrawalStatus[parseInt(val.withdrawal_status)]
                      .name
                  }}</span>
              </div>
            </td>
          </tr>
        </tbody>
        <table-loader :pageloader_value="pageLoader" :type="'table'" :colspan="'9'" :listLength="withdrawalList.totalRecords" v-else></table-loader>
      </table>
    </div>
    <pagination :totalRecords="withdrawalList.totalRecords" :limit="pageLimit" :pageNo="page" v-if=" 'totalRecords' in withdrawalList && withdrawalList.totalRecords > 0 && fromPage != 'payouts'" class="p-3 p-sm-4"></pagination>
  </div>
</template>
<script>
  import depositWithdrawalMixins from "@/plugins/depositWithdrawal";
  import moment from "moment";
  export default {
    name: "transaction-history",
    mixins: [depositWithdrawalMixins],
    data() {
      return {
        pageLoader: false,
        filters: false,
        thisdate: false,
        page: "1",
        pageLimit: "10",
        search: "",
        from: "",
        to: "",
        searchFilter: [],
        withdrawal_status: "0",
      };
    },
    props: ["fromPage", "dateType",  "status", "asset", "fromChild", "toChild", ],
    watch: {
      search: function(val) {
        this.listing();
      },
      to: function(val) {
        if (this.from != "") {
          this.listing();
        } else if (this.from == "" && this.to == "") {
          this.listing();
        } else {
          this.$notify({
            text: "Select from date",
            duration: 10000,
            pauseOnHover: true,
            type: "error",
          });
        }
      },
      from: function(val) {
        if (this.to != "") {
          this.listing();
        } else if (this.from == "" && this.to == "") {
          this.listing();
        }
      },
    },
    methods: {
      redirecttoPage(type, id, currency) {
        if (type == "etherscan") {
          return this.$env_var.transactionWebsiteLink[type] + id;
        } else if (type == "tronscan") {
          return this.$env_var.transactionWebsiteLink[type] + id;
        } else if (type == "tokenview") {
          return this.$env_var.transactionWebsiteLink[type] + id;
        } else if (type == "blockchair") {
          return (this.$env_var.transactionWebsiteLink[type] + this.getcurrency(type, currency).toLowerCase() + "/transaction/" + id);
        } else if (type == "blockchain") {
          return (this.$env_var.transactionWebsiteLink[type] + currency.toLowerCase() + "/tx/" + id);
        } else if (type == "blockcypher") {
          return (this.$env_var.transactionWebsiteLink[type] + currency.toLowerCase() + "/tx/" + id + "/");
        } else if (type == "coinmarketcap") {
          return (this.$env_var.transactionWebsiteLink[type] + this.getcurrency(type, currency).toLowerCase() + "/" + id);
        }
      },
      getcurrency(gettype, getcurrency) {
        let cur = {};
        console.log(getcurrency, 'cur===', gettype)
        for (let i = 0; i <= this.walletCurrencyList.currencies.length - 1; i++) {
          if (this.walletCurrencyList.currencies[i].symbol == getcurrency) {
            cur = this.walletCurrencyList.currencies[i].currency_name
          }
          if (i == this.walletCurrencyList.currencies.length - 1) {
            console.log('cur===', cur)
            return cur;
            // if (gettype == "coinmarketcap") {
            //   var s = this.$env_var.walletCurrencyName[this.$env_var.Symbols[cur[0].symbol.toUpperCase()]].replace(/ +/g, "-");
            //   return s;
            // } else {
            //   var s = this.$env_var.walletCurrencyName[this.$env_var.Symbols[cur[0].symbol.toUpperCase()]].replace(/ +/g, "-");
            //   return s;
            // }
          }
        }
      },
      changeFilterForDownloadData() {
        if (this.dateType != "" || this.status != "") {
          this.listing();
        } else {
          this.$notify({
            text: "Please select field",
            duration: 10000,
            pauseOnHover: true,
            type: "error",
          });
        }
      },
      listing() {
        let jsonData = {
          globalParams: {
            filter: {},
            sort: [],
            search: this.search,
          },
          localParams: {
            parameter: this
          },
        };
        if (
          (this.dateType != "" && this.dateType != undefined) || (this.asset != "" && this.asset != undefined) || (this.status != "" && this.status != undefined)) {
          if (this.dateType == "7 Days") {
            jsonData.globalParams.filter.from = moment().subtract(7, "days").format("YYYY-MM-DD");
            jsonData.globalParams.filter.to = this.momentFunc('', "YYYY-MM-DD");
          } else if (this.dateType == "15 Days") {
            jsonData.globalParams.filter.from = moment().subtract(15, "days").format("YYYY-MM-DD");
            jsonData.globalParams.filter.to = this.momentFunc('', "YYYY-MM-DD");
          } else if (this.dateType == "30 Days") {
            jsonData.globalParams.filter.from = moment().subtract(30, "days").format("YYYY-MM-DD");
            jsonData.globalParams.filter.to = this.momentFunc('', "YYYY-MM-DD");
          } else if (this.dateType == "3 Months") {
            jsonData.globalParams.filter.from = moment().subtract(3, "months").format("YYYY-MM-DD");
            jsonData.globalParams.filter.to = this.momentFunc('', "YYYY-MM-DD");
          } else if (this.dateType == "6 Months") {
            jsonData.globalParams.filter.from = moment().subtract(6, "months").format("YYYY-MM-DD");
            jsonData.globalParams.filter.to = this.momentFunc('', "YYYY-MM-DD");
          } else if (this.dateType == "Custom Range") {
            jsonData.globalParams.filter.from = this.momentFunc(this.fromChild, "YYYY-MM-DD");
            jsonData.globalParams.filter.to = this.momentFunc(this.toChild, "YYYY-MM-DD");
          }
          if (this.status != "") {
            jsonData.globalParams.filter["withdrawal.withdrawal_status"] = this.status;
          }
          if (this.asset != "") {
            jsonData.globalParams.filter["withdrawal.currency"] = this.asset;
          }
          jsonData.localParams.pageFlag = "download";
        } else {
          jsonData.globalParams.page = this.page;
          jsonData.globalParams.perPage = parseInt(this.pageLimit);
          if (this.from != "" && this.to != "") {
            jsonData.globalParams.filter.from = this.momentFunc(this.from, "YYYY-MM-DD");
            jsonData.globalParams.filter.to = this.momentFunc(this.to, "YYYY-MM-DD");
          }
          if (this.searchFilter.includes("withdrawal.withdrawal_status") && this.withdrawal_status != "") {
            jsonData.globalParams.filter["withdrawal.withdrawal_status"] = this.withdrawal_status;
          }
          if (this.searchFilter.length > 0) {
            jsonData.globalParams.searchColumns = this.searchFilter;
          }
        }
        this._runGetWithdrawalList(jsonData);
      },
    },
    created() {
      this.listing();
    },
  };
</script>