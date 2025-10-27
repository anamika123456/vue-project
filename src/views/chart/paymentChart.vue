<template>
  <div>
    <div class="headsec d-flex align-items-center justify-content-between flex-wrap mt-4 pt-2">
        <h4 class="mb-0">Payments</h4>  
        <div class="position-relative dropdown selectDropMenu historyselectmenu miniTimeSelect">
            <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
                <p class="mb-0">{{time_frame.charAt(0).toUpperCase() + time_frame.slice(1)}}</p>
                <feather type="chevron-down" class="ml-2" size="20px"></feather>
            </a>
            <ul class="dropdown-menu scrollbar">
                <li @click="time_frameFunc('daily')"><a href="javascript:void(0)" class="lh-normal"><p class="mb-0" :class="time_frame == 'daily' ? 'themecolor' : ''">Daily</p></a></li>
                <li @click="time_frameFunc('weekly')"><a href="javascript:void(0)" class="lh-normal"><p class=" mb-0" :class="time_frame == 'weekly' ? 'themecolor' : ''">Weekly</p></a></li>
                <li @click="time_frameFunc('monthly')"><a href="javascript:void(0)" class="lh-normal"><p class="mb-0" :class="time_frame == 'monthly' ? 'themecolor' : ''">Monthly</p></a></li>
            </ul>
        </div>
    </div>
    <loader class="position-absolute w-100" v-show="pageLoader"></loader>
    <div class="chart-wrap text-center mt-5" v-show="dataArray.length">
        <!-- <img class="img-fluid d-block mx-auto" src="/assets/website/images/payments-chart.png"> -->
        <div class="d-flex align-items-center justify-content-between position-relative" id="chartdiv2" style="width: 100%; height: 250px" ></div>
    </div>
  </div>

  <!-- <div class="border round-sm bg-white chartDiv-wrap w-100">
    <div class="d-flex align-items-center justify-content-between flex-wrap">
      <h4 class="heading mb-0">Deposit Volume</h4>
      <div class="form-group mb-3 depositeSelectDrop">
        <div class="position-relative dropdown selectDropMenu historyselectmenu">
          <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
            <p class="mb-0 themecolor">{{ dateType != "" ? "Last " + dateType : "Select Days"}}</p>
            <feather type="chevron-down" class="ml-2" size="20px"></feather>
          </a>
          <ul class="dropdown-menu scrollbar">
            <li @click=" dateType = key; selectDays = false; getRevenueReport()" v-for="(list, key) in $env_var.dateFilterData" v-show="key != 'Custom Range'">
              <a href="javascript:void(0)" class="lh-normal"><p class="themecolor mb-0">{{ list }}</p></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <loader class="position-absolute w-100" v-show="pageLoader"></loader>
    <div class="chartDiv-row w-100" v-show="revenueReport.length">
      <div class="d-flex align-items-center justify-content-between position-relative" id="chartdiv" style="width: 100%; height: 250px" ></div>
    </div>
    <no-data class="position-absolute w-100" v-show="!revenueReport.length"  ></no-data>
  </div> -->
</template>
<script>

import { cardsMixins } from "@/plugins/cards";
import moment from "moment";

export default {
  mixins: [cardsMixins],
  data() {
    return {
      pageLoader: false,
      root: {},

      selectDays: false,
      dateType: "7 Days",
      dataArray : 
      [
        {
          "date": "2025-02",
          "totalEurAmount": 0.06
        }
      ]
      // [
      //   {
      //     "date": "2025-02",
      //     "totalEurAmount": 0.06
      //   }
      // ]
      // [
      //  {
      //       "date": "2025-02-18",
      //       "totalEurAmount": 0.06
      //   },
      //   {
      //       "date": "2025-02-17",
      //       "totalEurAmount": 0.08
      //   }
      // ]
    };
  },
  methods: {
    
    // getRevenueReport() {
    //   let jsonData = {
    //     globalParams: {}, 
    //     localParams: { parameter: this },
    //   }
      

    //   if(this.dateType != "" && this.dateType != undefined) {
    //     if (this.dateType == "7 Days") {
    //       jsonData.globalParams.from = moment().subtract(7, "days").format("YYYY-MM-DD");
    //       jsonData.globalParams.to = this.momentFunc('',"YYYY-MM-DD");
    //     } else if (this.dateType == "15 Days") {
    //       jsonData.globalParams.from = moment().subtract(15, "days").format("YYYY-MM-DD");
    //       jsonData.globalParams.to = this.momentFunc('',"YYYY-MM-DD");
    //     } else if (this.dateType == "30 Days") {
    //       jsonData.globalParams.from = moment().subtract(30, "days").format("YYYY-MM-DD");
    //       jsonData.globalParams.to = this.momentFunc('',"YYYY-MM-DD");
    //     } else if (this.dateType == "3 Months") {
    //       jsonData.globalParams.from = moment().subtract(3, "months").format("YYYY-MM-DD");
    //       jsonData.globalParams.to = this.momentFunc('',"YYYY-MM-DD");
    //     } else if (this.dateType == "6 Months") {
    //       jsonData.globalParams.from = moment().subtract(6, "months").format("YYYY-MM-DD");
    //       jsonData.globalParams.to = this.momentFunc('',"YYYY-MM-DD");
    //     }
    //   }
    //   this._runRevenueReport(jsonData);
    // },
  },
  created() {
    // this.createChart()
      // this.getRevenueReport();
  },
};
</script>
