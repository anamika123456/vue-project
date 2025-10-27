<template>
  <section class="mid_scroll_content">
    <loader v-if="pageLoader"></loader>
    <div class="pageContent border-0">
      <div class="d-md-flex d-block justify-content-between align-items-center mb-4 mt-1">
        <div id="tabs" class="text-center mb-0 walletTab currencyTab">
          <ul class="d-flex align-items-center m-0">
            <li>
              <a class="d-block" href="javascript:void(0)" :class="[{ active: transactiontab == 1 }]" @click.prevent="transactiontab = 1">Deposits</a>
            </li>
            <li>
              <a class="d-block" href="javascript:void(0)" :class="[{ active: transactiontab == 2 }]" @click.prevent="transactiontab = 2">Payouts</a>
            </li>
            <li>
              <a class="d-block" href="javascript:void(0)" :class="[{ active: transactiontab == 3 }]" @click.prevent="transactiontab = 3">Conversions</a>
            </li>
          </ul>
        </div>
        <!-- <a href="javascript:void(0);" class="cap_btn secondaryBG mt-3 mt-md-0" data-toggle="modal" data-target="#download-history" @click="showDownloadHistoryFlag = true" v-if="transactiontab == 1 || transactiontab == 2">Download History</a> -->
        <a href="javascript:void(0);" class="cap_btn secondaryBG mt-3 mt-md-0" data-toggle="modal" data-target="#download-history" @click="showDownloadHistoryFlag = true">Download History</a>
      </div>
      <depositList v-if="transactiontab == 1" :dateType="dateType1"  :status="payment_status" :asset="asset" :fromChild="from" :toChild="to" ref="downloadFunc"></depositList>
      <withdrawal-list v-if="transactiontab == 2" :dateType="dateType1"  :status="payment_status" :asset="asset" :fromChild="from" :toChild="to" ref="downloadFunc"></withdrawal-list>
      <conversion-list v-if="transactiontab == 3" :dateType="dateType1"  ref="downloadFunc"></conversion-list>
    </div>
    <div class="modal" tabindex="-1" id="download-history" role="dialog" aria-labelledby="download-history" aria-hidden="true" v-if="showDownloadHistoryFlag">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-bottom align-items-center">
            <div class="modal-title text-left">
              <h6 class="mb-0">Download Transactions History</h6>
              <loader v-if="downloadPageLoader" />
            </div>
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="reset()">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body p-4">
            <p class="themecolor mb-0">CSV file lets you import your transactions into a spreadsheet, while the PDF format acts as a printable statement for your records. Both formats contain the same information. </p>
            <div class="mt-3 row" v-if="transactiontab == 1 || transactiontab == 2">
              <div class="col-12 col-lg-4 mb-3 mb-lg-0">
                <div class="position-relative dropdown selectDropMenu historyselectmenu">
                  <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
                    <p class="mb-0 themecolor">{{ dateType1 != "" ? "Last " + dateType1 : "Select Days"}}</p>
                    <feather type="chevron-down" class="ml-2" size="20px"></feather>
                  </a>
                  <ul class="dropdown-menu scrollbar">
                    <li @click="
                        dateType1 = key;
                        selectDays = false;
                        from = '';
                        to = '';
                      " v-for="(list, key) in $env_var.dateFilterData">
                      <a href="javascript:void(0)" class="lh-normal"><p class="themecolor mb-0">{{ list }}</p></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-12 col-lg-4 mb-3 mb-lg-0">
                <div class="position-relative dropdown selectDropMenu historyselectmenu">
                  <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
                    <p class="mb-0 themecolor">{{ asset != "" ? asset : "All Assets"}}</p>
                    <feather type="chevron-down" class="ml-2" size="20px"></feather>
                  </a>
                  <ul class="dropdown-menu scrollbar">
                    <li @click="
                        asset = '';
                        allAssets = false;
                      ">
                      <a href="javascript:void(0)" class="lh-normal"><p class="themecolor mb-0">All Assets</p></a>
                    </li>
                    <li v-for="list in Object.values(marginInfoList)" @click="
                        asset = list.currency;
                        allAssets = false;
                      ">
                      <a href="javascript:void(0)" class="lh-normal"><p class="themecolor mb-0">{{ list.currency }}</p></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-12 col-lg-4">
                <div class="position-relative dropdown selectDropMenu historyselectmenu">
                  <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
                    <p class="mb-0 themecolor">
                      {{ payment_status != ""
                          ? $env_var.depositWithdrawalPaymentStatus[
                              payment_status
                            ]
                          : "All Transactions"
                      }}</p>
                    <feather type="chevron-down" class="ml-2" size="20px"></feather>
                  </a>
                  <ul class="dropdown-menu scrollbar">
                    <li @click="
                        payment_status = '';
                        alltransaction = false;
                      ">
                      <a href="javascript:void(0)" class="lh-normal"><p class="themecolor mb-0">All Transactions</p></a>
                    </li>
                    <li v-for="(
                        list, key
                      ) in $env_var.depositWithdrawalPaymentStatus" @click="
                        payment_status = key;
                        alltransaction = false;
                      ">
                      <a href="javascript:void(0)" class="lh-normal"><p class="themecolor mb-0">{{ list }}</p></a>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
            <div class="row mt-2 mt-md-3" :class="{ show: customRangeField }" v-if=" (transactiontab == 1 || transactiontab == 2) && dateType1 == 'Custom Range'">
              <div class="col-12 col-sm-6">
                <p class="mb-1 themecolor medium">From</p>
                <div class="border px-2 tableDate round-sm">
                  <input type="date" class="border-0 textcolor" v-model="from" />
                </div>
              </div>
              <div class="col-12 col-sm-6 mt-2 mt-sm-0">
                <p class="mb-1 themecolor medium">To</p>
                <div class="border px-2 tableDate round-sm">
                  <input type="date" class="border-0 textcolor" v-model="to" />
                </div>
              </div>
            </div>
            <div class="border mt-4 round-sm">
              <div class="d-block d-sm-flex justify-content-between align-items-center py-3 px-3 px-sm-4 border-bottom csvReportBox">
                <div class="d-flex">
                  <feather type="file-text" class="mr-2 mr-sm-3 textcolor"></feather>
                  <p class="mb-0">CSV Report</p>
                </div>
                <a href="javascript:void(0);" class="secondaryBorder secondarycolor reportbtn round-lg px-3 py-1 mt-2 mt-sm-0 d-inline-block" @click="changeFilterForDownload()">Generate Report</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import tradingMixins from "@/plugins/trading";
  import depositList from "../deposits/list.vue";
  import withdrawalList from "../payouts/list.vue";
  import conversionList from "../conversion/list.vue";
  import moment from "moment";
  export default {
    name: "transaction-history",
    mixins: [tradingMixins],
    data() {
      return {
        pageLoader: false,
        transactionhistoryAction: false,
        transactiontab: 1,
        filters: false,
        transactionConversionstab: 1,
        showDownloadHistoryFlag: false,
        downloadPageLoader: false,
        selectDays: false,
        dateType1: "",
        from: "",
        to: "",
        asset: "",
        payment_status: "",
        allAssets: false,
        customRangeField: false,
        alltransaction: false,
        btnclickFlag: 0,
      };
    },
    components: {
      depositList,
      withdrawalList,
      conversionList,
    },
    methods: {
      changeFilterForDownload() {
        // this.btnclickFlag = 1;
        this.$refs.downloadFunc.changeFilterForDownloadData()
      },
      downloadTransactions(getData, getFileName) {
        let headerCols = [],
          data = [],
          download_data_send = [];
        download_data_send = getData.records;
        if (download_data_send.length > 0) {
          if(getFileName == 'conversions'){
            for(let i=0 ;i<=download_data_send.length-1 ; i++){
              data.push({
                "ORDER ID"   : download_data_send[i].OrderId ,
                "SYMBOL"   : download_data_send[i].Symbol ,
                "ORDER TYPE"   : download_data_send[i].OrderType , 
                "ORDER SIDE"  : download_data_send[i].OrderSide ,  
                "QUANTITY"  : download_data_send[i].Quantity , 
                "QUANTITY FILLED"  : download_data_send[i].QuantityFilled , 
                "QUANTITY REMAINING"  : download_data_send[i].QuantityRemaining ,  
                // "PRICE"    : download_data_send[i].Price ,
                "PRICE"  : download_data_send[i].PriceFilled ,  
                "COMMISSION"  : download_data_send[i].Commission , 
                "LIFETIME"  : download_data_send[i].Lifetime , 
                "OPENED"  : download_data_send[i].Opened , 
                "CLOSED"  : download_data_send[i].Closed ,
                "COMMENTARY"   : download_data_send[i].Commentary ,
                "COMMISSION CURRENCY"  : download_data_send[i].CommissionCurrency , 
                "QUANTITY CURRENCY" : download_data_send[i].QuantityCurrency ,
              })
              if(i==download_data_send.length-1){
                this.csvExport(data, Object.keys(data[0]), getFileName);
                this.reset();
              }
            }
          }else if(getFileName == 'deposits'){
            for(let i=0 ;i<=download_data_send.length-1 ; i++){
              data.push({
                "TOTAL AMOUNT"   : download_data_send[i].total_amount ,
                "ORDER ID"   : download_data_send[i].client_txid ,
                "AMOUNT"   : download_data_send[i].amount ,
                "FEE PERCENTAGE"   : download_data_send[i].fee_percentage , 
                "DEPOSIT FEES"  : download_data_send[i].deposit_fees ,  
                "CONSOLIDATION FEES"  : download_data_send[i].network_fee , 
                "CURRENCY"  : download_data_send[i].currency , 
                "DEP CURRENCY"  : download_data_send[i].dep_currency ,  
                "TRANSACTION ID"    : download_data_send[i].transaction_id ,
                "HASH"  : download_data_send[i].hash ,  
                "DEP ADDRESS"  : download_data_send[i].dep_address , 
                "CREATED"  : download_data_send[i].created 
              })
              if(i==download_data_send.length-1){
                this.csvExport(data, Object.keys(data[0]), getFileName);
                this.reset();
              }
            }
          }else{
            headerCols = Object.keys(getData.records[0]);
            data = getData.records;
            this.csvExport(data, headerCols, getFileName);
            this.reset();
          }
        } else {
          this.$notify({
            text: "Record not found for applied criteria",
            duration: 10000,
            pauseOnHover: true,
            type: "error",
          });
        }
      },
      csvExport(data, headers, filename) {
        let csvData = headers.join(", ").replace(/_/g, " ").toUpperCase();
        csvData += "\n";
        data.map((row) => {
          headers.map((i, index) => {
            if (index < headers.length - 1) {
              csvData += `${row[i]}, `;
            } else {
              csvData += `${row[i]}\n`;
            }
          });
        });
        var hiddenElement = document.createElement("a");
        hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvData);
        hiddenElement.target = "_blank";
        hiddenElement.download = filename;
        hiddenElement.click();
      },
      reset() {
        this.showDownloadHistoryFlag = false;
        this.selectDays = false;
        this.dateType1 = "";
        this.from = "";
        this.to = "";
        this.asset = "";
        this.payment_status = "";
        this.allAssets = false;
        this.alltransaction = false;
        this.btnclickFlag = 0;
      },
    },
    created() {
      this._runTradingAccount({ globalParams: {}, localParams: { parameter: this } });
      if (this.$route.query.transactiontab) {
        this.transactiontab = this.$route.query.transactiontab;
        this.$router.replace({ query: "" });
      }
      // this._runGetMarginInfo({
      //   globalParams: {
      //     account_id: this.tradingAccount[0].account_id
      //   },
      //   localParams: {
      //     parameter: this
      //   },
      // });
    },
  };
</script>