<template>
  <div class="border round-sm bg-white chartDiv-wrap w-100">
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


        <!-- <div class="position-relative selectDropMenu destinationDropMenu">
          <a href="" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink h-auto-auto" data-toggle="dropdown">
            <div class="d-flex align-items-center w-100">
              <p class="medium textcolor mb-0 text-left themecolor">
                Select Crypto
              </p>
            </div>
            <feather type="chevron-down" class="ml-2" size="20px"></feather>
          </a>
          <ul class="dropdown-menu scrollbar">
            <li>
              <a href="" class="py-1">
                <div class="d-flex align-items-center">
                  <div class="">
                    <p class="medium themecolor mb-0 text-left">
                      Select
                    </p>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div> -->
      </div>
    </div>
    <loader class="position-absolute w-100" v-show="pageLoader"></loader>
    <div class="chartDiv-row w-100" v-show="revenueReport.length">
      <div class="d-flex align-items-center justify-content-between position-relative" id="chartdiv" style="width: 100%; height: 250px" ></div>
    </div>
    <no-data class="position-absolute w-100" v-show="!revenueReport.length"  ></no-data>
  </div>
</template>
<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
import tradingMixins from "@/plugins/trading";
import moment from "moment";

export default {
  mixins: [tradingMixins],
  data() {
    return {
      pageLoader: false,
      root: {},

      selectDays: false,
      dateType: "7 Days"
    };
  },
  // watch: {
  //   revenueReport(val) {
  //     setTimeout(() => {
  //       am5.ready(() => {
  //         this.createChart(val);
  //       });
  //     }, 200);
  //   },
  // },
  methods: {
    createChart(dataArray) {
      let arrayD = [];
      for(let i=0; i<= dataArray.length-1; i++){
        let data = dataArray[i].date.split('-')
        let json = {
          'date': new Date(data[2], data[1]-1, data[0]),
          'value': dataArray[i].value
        }
        arrayD.push(json)
        if(i == dataArray.length-1){
          this.chartCode(arrayD)
        }
      }
      
    },
    chartCode(dataArray){
      var chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.paddingRight = 40;
      chart.data = dataArray;

      // Create axes
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 60;
      dateAxis.groupData = true;
       dateAxis.title.text = "Time Period";
      

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Volume in (USD)";
      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "value";
      series.dataFields.dateX = "date";
      series.tooltipText = "{value}"
      // series.name = "";
      series.tooltip.pointerOrientation = "vertical";
      chart.cursor = new am4charts.XYCursor();
      // chart.scrollbarX = new am4core.Scrollbar();
      this.pageLoader = false;
    },
    getRevenueReport() {
      let jsonData = {
        globalParams: {}, 
        localParams: { parameter: this },
      }
      

      if(this.dateType != "" && this.dateType != undefined) {
        if (this.dateType == "7 Days") {
          jsonData.globalParams.from = moment().subtract(7, "days").format("YYYY-MM-DD");
          jsonData.globalParams.to = this.momentFunc('',"YYYY-MM-DD");
        } else if (this.dateType == "15 Days") {
          jsonData.globalParams.from = moment().subtract(15, "days").format("YYYY-MM-DD");
          jsonData.globalParams.to = this.momentFunc('',"YYYY-MM-DD");
        } else if (this.dateType == "30 Days") {
          jsonData.globalParams.from = moment().subtract(30, "days").format("YYYY-MM-DD");
          jsonData.globalParams.to = this.momentFunc('',"YYYY-MM-DD");
        } else if (this.dateType == "3 Months") {
          jsonData.globalParams.from = moment().subtract(3, "months").format("YYYY-MM-DD");
          jsonData.globalParams.to = this.momentFunc('',"YYYY-MM-DD");
        } else if (this.dateType == "6 Months") {
          jsonData.globalParams.from = moment().subtract(6, "months").format("YYYY-MM-DD");
          jsonData.globalParams.to = this.momentFunc('',"YYYY-MM-DD");
        }
      }
      this._runRevenueReport(jsonData);
    },
  },
  created() {
    // if (this.revenueReport.length) {
    //   setTimeout(() => {
    //     am5.ready(() => {
    //       this.createChart(this.revenueReport);
    //     });
    //   }, 200);
    // } else {
      // this.pageLoader = true;
      this.getRevenueReport();
    // }
  },
};
</script>
