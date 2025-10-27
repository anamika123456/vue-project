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
             <div>
              <a href="javascript:void(0);" class="redBG round-lg text-white px-3 f-11 mr-1 py-1"  @click="applyCancel('cancel')">Cancel</a>
              <a href="javascript:void(0);" class="secondaryBG round-lg text-white px-3 f-11 py-1" @click="applyCancel('apply')">Apply</a>
             </div>
            </div> 
            <ul class="mb-0">
              <!-- <li class="py-2">
                <label class="customCheckbox mb-0 themecolor">Payment ID <input type="checkbox" value="deposit.transaction_id" v-model="searchFilter" />
                  <span class="checkmark"></span>
                </label>
              </li>
              <li class="py-2">
                <label class="customCheckbox mb-0 themecolor">Coin <input type="checkbox" value="deposit.currency" v-model="searchFilter" />
                  <span class="checkmark"></span>
                </label>
              </li>
              <li class="py-2">
                <label class="customCheckbox mb-0 themecolor">TX Hash <input type="checkbox" value="deposit.hash" v-model="searchFilter" />
                  <span class="checkmark"></span>
                </label>
              </li> -->
              <li class="py-2 lightgrayBG">
                <label class="customCheckbox mb-0 themecolor">Status <input type="checkbox" v-model="searchFilter" value="deposit.payment_status" />
                  <span class="checkmark"></span>
                </label>
                <div class="selectmenu filterselectmenu position-relative pt-1" v-if="searchFilter.includes('deposit.payment_status')">
                  <a @click.prevent="thisdate ^= true" href="javascript:void(0)" class="btn d-flex justify-content-between align-items-center bg-white rounded">
                    <span class="mr-2" v-if="payment_status == '0'">Pending</span>
                    <span class="mr-2" v-if="payment_status == '1'">Success</span>
                    <span class="mr-2" v-if="payment_status == '2'">Rejected</span>
                    <feather type="chevron-down" class="ml-2" size="20px"></feather>
                  </a>
                  <ul class="dropdown_menu dropdown_menu--animated dropdown_menu-6 scrollbar" :class="{ show: thisdate }">
                    <li v-for="(
                        list, key
                      ) in $env_var.depositWithdrawalPaymentStatus" @click="payment_status = key">
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
            <th>Payment ID</th>
            <th>Order ID</th>
            <th>Coin</th>
            <th>Net Amount</th>
            <th>TX Hash</th>
            
            <!-- <th>Fees</th> -->
            <th>Comments</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody v-if="Object.keys(depsitList).length > 0 && depsitList.records.length > 0 && !pageLoader">
          <tr v-for="(val, index) in depsitList.records" v-show="(fromPage == 'payments' && index <= 3) ||(fromPage != 'payments' && index < pageLimit)">
            <td>{{ momentFunc(val.created,"DD MMM YYYY, h:mm:ss a","deposit_list") }}</td>
            <td>{{ val.transaction_id }}</td>
            <td>{{ val.client_txid || '-' }}</td>
            <td>
              <span class="d-flex align-items-center">
                <span class="inTableIcon mr-2">
                  <img :src="'/assets/website/images/crypto_logos/' +val.currency.toLowerCase() +'.png'" width="35" height="35" />
                </span>
                <div class="iqlName" >
                  <h5 class="mb-0 themecolor">
                    {{ val.currency }}
                  </h5>
                  <!-- <p class="mb-0 regular">{{ $env_var.restricted_currencies[val.currency].currency_name }}</p> -->
                </div>
              </span>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <span class="mr-2">{{ numberFormat(titleFunc(val, "2"), '',val.currency) }}</span>
                <a href="javascript:void(0);" data-toggle="tooltip" data-placement="bottom" :title="titleFunc(val, '1')" data-html="true">
                  <feather type="info" size="16px" class="textcolor"></feather>
                </a>
              </div>
            </td>
            <td>
              <div class="d-flex" v-if="val.hash != ''">
                <span class="pr-2" ref="hash_link">
                  <!-- <input type="hidden" id="example" v-model="hash_link" ref="hash_link" /> -->
                  {{ val.hash.substring(1, 3) }}..{{ val.hash.substring(val.hash.length - 3)}}
                </span>
                <a href="javascript:void(0);" @click="handleCopy(val.hash,'The transaction hash has been copied')" data-toggle="tooltip" data-placement="top" :title="val.hash">
                  <feather type="copy" size="15px" class="themecolor"></feather>
                </a>
              </div>
              <div v-else>-</div>
            </td>
            
            <!-- <td>{{val.deposit_fees}}</td> -->
            <td>{{ val.note }}</td>
            <td>
              <div class="px-3 py-2 round-lg text-center d-flex align-items-center justify-content-center" :class="$env_var.depositStatus[parseInt(val.payment_status)].class">
                <a href="javascript:void(0);" class="d-block" v-if="parseInt(val.withdrawal_status) == 2 || parseInt(val.withdrawal_status) == 3">
                  <feather size="18px" type="info" data-toggle="tooltip" data-placement="top" class="red pr-2 d-block" title="Cancelled by the client"></feather>
                </a>
                <span :class="$env_var.depositStatus[parseInt(val.payment_status)].textClass">{{ $env_var.depositStatus[parseInt(val.payment_status)].name}}</span>
              </div>
            </td>
          </tr>
        </tbody>
        <table-loader :pageloader_value="pageLoader" :type="'table'" :colspan="'8'" :listLength="depsitList.totalRecords" v-else></table-loader>
      </table>
    </div>
    <pagination :totalRecords="depsitList.totalRecords" :limit="pageLimit" :pageNo="page" v-if=" 'totalRecords' in depsitList && depsitList.totalRecords > 10 && fromPage != 'payments'"></pagination>
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
        payment_status: "0",
        originalValue: []
      };
    },
    props: ["fromPage", "dateType",  "status", "asset", "fromChild", "toChild", ],
    watch: {
      // searchFilter: function(newValue, oldValue) {
      //    console.log('newValue val====',newValue)
      //    console.log('this.originalValue val====',this.originalValue)
      //    let finalArray = newValue.filter(val => !this.originalValue.includes(val));
      //    console.log('finalArray====',finalArray)
      //    localStorage.setItem("filterData", finalArray);
      //    // console.log('filterData====',localStorage.getItem("filterData"));
      // },
      search: function(val) {
        this.listing();
      },
      to: function(val) {
        if (this.from != "" && this.to == "") {
          this.listing();
        } else if (this.from == "" && this.to == "") {
          this.listing();
        }else if (this.from != "" && this.to != "") {
          let from = new Date(this.from);
          let to = new Date(this.to);

          if(to > from){
            this.listing();
          }else{
            this.$notify({
              text: "Enter valid date",
              duration: 10000,
              pauseOnHover: true,
              type: "error",
            });
          }
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
      applyCancel(geteventName){
        if(geteventName == 'apply'){
          // let filterData = localStorage.getItem("filterData");
          // if (filterData.indexOf(',') > -1) { 
          //   this.originalValue = filterData.split(',') 
          // }else{
          //   this.originalValue.push(filterData)
          // }
          // localStorage.removeItem("filterData");
        }
        if(geteventName == 'cancel'){
          // let filterData = localStorage.getItem("filterData");
          // let arrayData = []
          // if (filterData.indexOf(',') > -1) { 
          //   arrayData = filterData.split(',') 
          // }else{
          //   arrayData.push(filterData)
          // }
          // let finalArray = this.searchFilter.filter(val => !arrayData.includes(val));
          // this.searchFilter = finalArray
          // this.originalValue = finalArray
          // localStorage.removeItem("filterData");

          this.searchFilter = []
          this.payment_status= "0"
        }
        this.listing(); 
        this.filters = false; 
        this.thisdate = false;
        
      },
      titleFunc(val, getParam) {
        let amount_received = val.total_amount - val.network_fee;
        let net_amount = amount_received - val.deposit_fees;
        // let returnData = "Amount Received =" + amount_received + " "+ val.currency + "  <br> Fees = " + val.deposit_fees + " "+val.currency + "(" + val.fee_percentage + " % )  <br> Consolidation Fees = " + val.network_fee +" <br> Net Amount = " + net_amount +  " "+val.currency;

        let returnData = "Amount Received =" + amount_received + " "+ val.currency + "  <br> Fees = " + val.deposit_fees + " "+val.currency + "(" + val.fee_percentage + " % )  <br>   Net Amount = " + net_amount +  " "+val.currency;
        if(val.currency.includes("TRX")){
          returnData += "<br> Consolidation Fees = " + val.network_fee ;
        }
        if (getParam == 2) {
          return net_amount;
        } else {
          return returnData;
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
            jsonData.globalParams.filter.to = this.momentFunc('',"YYYY-MM-DD");
          } else if (this.dateType == "15 Days") {
            jsonData.globalParams.filter.from = moment().subtract(15, "days").format("YYYY-MM-DD");
            jsonData.globalParams.filter.to = this.momentFunc('',"YYYY-MM-DD");
          } else if (this.dateType == "30 Days") {
            jsonData.globalParams.filter.from = moment().subtract(30, "days").format("YYYY-MM-DD");
            jsonData.globalParams.filter.to = this.momentFunc('',"YYYY-MM-DD");
          } else if (this.dateType == "3 Months") {
            jsonData.globalParams.filter.from = moment().subtract(3, "months").format("YYYY-MM-DD");
            jsonData.globalParams.filter.to = this.momentFunc('',"YYYY-MM-DD");
          } else if (this.dateType == "6 Months") {
            jsonData.globalParams.filter.from = moment().subtract(6, "months").format("YYYY-MM-DD");
            jsonData.globalParams.filter.to = this.momentFunc('',"YYYY-MM-DD");
          } else if (this.dateType == "Custom Range") {
            jsonData.globalParams.filter.from = this.momentFunc(this.fromChild,"YYYY-MM-DD");
            jsonData.globalParams.filter.to = this.momentFunc(this.toChild,"YYYY-MM-DD");
          }
          if (this.status != "") {
            jsonData.globalParams.filter["deposit.payment_status"] = this.status;
          }
          if (this.asset != "") {
            jsonData.globalParams.filter["deposit.currency"] = this.asset;
          }
          jsonData.localParams.pageFlag = "download";
        } else {
          jsonData.globalParams.page = this.page;
          jsonData.globalParams.perPage = parseInt(this.pageLimit);
          if (this.from != "" && this.to != "") {
            jsonData.globalParams.filter.from = this.momentFunc(this.from,"YYYY-MM-DD");
            jsonData.globalParams.filter.to = this.momentFunc(this.to,"YYYY-MM-DD");
          }
          if (this.searchFilter.includes("deposit.payment_status") && this.payment_status != "") {
            jsonData.globalParams.filter["deposit.payment_status"] = this.payment_status;
          }
          if (this.searchFilter.length > 0) {
            jsonData.globalParams.searchColumns = this.searchFilter;
          }
        }
        // console.log(jsonData)
        this._runGetDepsitList(jsonData);
      },
    },
    created() {
      if(localStorage.getItem("filterData")){
        localStorage.removeItem("filterData");
      }
      this.listing();
    },
  };
</script>