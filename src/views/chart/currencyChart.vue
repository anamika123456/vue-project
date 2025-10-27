<template>
  <div class="chartDiv-row chartDiv45">
    <!-- topspace  style="width: 100%" :style="'height: ' + height + 'px'" -->
    <loader class="position-absolute w-100" v-show="pageLoader"></loader>
    <div class="chartDiv-row w-100" v-show="curencyUsdValList.length">
      <div  id="currencychartdiv1" class="currencyHeight" ></div>
    </div>
    <no-data class="position-absolute w-100" v-show="curencyUsdValList.length == 0 "></no-data>
  </div>
</template>
<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
import tradingMixins from "@/plugins/trading";
export default {
  data() {
    return {
      pageLoader: true,
      chart: {},
      series: {},
      legend: {},
      label: {},
      root: {},
      width: null,
      height: 180,
      curencyUsdValList: [],
    };
  },
   mixins: [tradingMixins],
  props: [],
 
  methods: {
    currencyData() {
      const _that = this
      this.curencyUsdValList = [];
      let count = 0
      // console.log('this.marginInfoList', this.marginInfoList)
      if(Object.keys(this.marginInfoList).length > 0){
        for (const item in this.marginInfoList) {
          count++
          let usdAmount = this.$parent.getConvertedValue(this.marginInfoList[item], "USD")
          // console.log('usdAmount==',usdAmount)
          if(parseFloat(usdAmount) > 0){
            this.curencyUsdValList.push({
              currency: this.marginInfoList[item].currency,
              usdValue: parseFloat(this.$parent.getConvertedValue(this.marginInfoList[item], "USD")),
            });
          }
          if (count == Object.keys(this.marginInfoList).length) {
            // console.log(_that.curencyUsdValList)
            setTimeout(function(){ _that.createChart(_that.curencyUsdValList) }, 1000);
          }
        }
      }else{
        this.curencyUsdValList = []
        this.pageLoader = false;
      }
    },
    createChart(curencyUsdValList) {
      var chart = am4core.create("currencychartdiv1", am4charts.PieChart);
      chart.radius = am4core.percent(100);
      chart.data = curencyUsdValList
      var pieSeries = chart.series.push(new am4charts.PieSeries3D());



      var colorSet = new am4core.ColorSet();
      colorSet.list = ["#87CEEB", "#4682B4", "#B6D0E2", "#ADD8E6", "#6F8FAF", "#6495ED", "#0047AB", "#0096FF", "#7393B3", "#0000FF", "#89CFF0", "#0047AB", "#00FFFF", "#1434A4", "#000080", "#0437F2"].map(function(color) {
        return new am4core.color(color);
      });
      pieSeries.colors = colorSet;


      pieSeries.dataFields.value = "usdValue";
      pieSeries.dataFields.category = "currency";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;
      pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
      pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
      this.pageLoader = false;
    }
  },
  created() {
    const _that = this
    setTimeout(function(){ _that.currencyData() }, 1000);
  },
};
</script>

<style>
  .currencyHeight {
    height : 100%;
  },
  #chartDiv45 {
    width: 400%;
    height: 400px;
  }
</style>
