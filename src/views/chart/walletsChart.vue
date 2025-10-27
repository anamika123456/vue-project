<template>
  <div
    class="d-flex align-items-center justify-content-between position-relative"
    id="chartdivWallet"
    style="width: 100%; height: 250px"
  >
    <loader class="position-absolute w-100" v-show="pageLoader"></loader> 
    <!-- <no-data
      class="position-absolute w-100"
      v-show="!portfolioReport.length"
    ></no-data> -->
  </div>
</template>
<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import tradingMixins from "@/plugins/trading";
import moment from "moment";

export default {
  mixins: [tradingMixins],
  data() {
    return {
      pageLoader: false,
      root: {},
    };
  },
  // watch: {
  //   tradingAccount(val) {
  //     if (!parseInt(this.$parent.accountSelected))
  //       this.getPortfolioReport(val[0]);
  //   },
  //   socialAccount(val) {
  //     if (parseInt(this.$parent.accountSelected))
  //       this.getPortfolioReport(val[0]);
  //   },
  //   portfolioReport(val) {
  //     setTimeout(() => {
  //       this.createChart(val);
  //     }, 200);
  //   },
  // },
  methods: {
    chartFunc() {
      const _that = this;
      var chart = am4core.create("chartdivWallet",  am4charts.XYChart);
chart.paddingRight = 20;

// Add data
chart.data = [{
  "date": new Date(2018, 3, 20),
  "BTC": 90,
  "ETH": 45
}, {
  "date": new Date(2018, 3, 21),
  "BTC": 102,
  "ETH": 90
}, 
{
  "date": new Date(2018, 3, 22),
  "BTC": 102,
  "ETH": 90
},
{
  "date": new Date(2018, 3, 23),
  "BTC": 125
}, {
  "date": new Date(2018, 3, 24),
  "BTC": 55,
}, {
  "date": new Date(2018, 3, 25),
  "ETH": 81,
},  {
  "date": new Date(2018, 3, 27),
  "ETH": 63,
}];

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 50;
dateAxis.renderer.grid.template.location = 0.5;
dateAxis.startLocation = 0.5;
dateAxis.endLocation = 0.5;

// Create value axis
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
var series1 = chart.series.push(new am4charts.LineSeries());
series1.dataFields.valueY = "BTC";
series1.dataFields.dateX = "date";
series1.strokeWidth = 3;
series1.tensionX = 0.8;
series1.bullets.push(new am4charts.CircleBullet());
series1.connect = false;

var series2 = chart.series.push(new am4charts.LineSeries());
series2.dataFields.valueY = "ETH";
series2.dataFields.dateX = "date";
series2.strokeWidth = 3;
series2.tensionX = 0.8;
series2.bullets.push(new am4charts.CircleBullet());
    },
    createChart() {
      

      if ("dom" in this.root) this.root.dispose();
      this.root = am5.Root.new("chartdivWallet");

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = this.root.container.children.push(
        am5xy.XYChart.new(this.root, {
          panX: false,
          panY: false,
          wheelX: "none",
          wheelY: "none",
          maxTooltipDistance: 0,
          pinchZoomX: true,
        })
      );

      // chart
      //   .get("colors")
      //   .set("colors", [
      //     am5.color("#7D7BF7"),
      //     am5.color("#f36363"),
      //     am5.color("#40b37e"),
      //     am5.color("#b5529d"),
      //     am5.color("#EAB300"),
      //   ]);

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(this.root, {
          maxDeviation: 0.2,
          baseInterval: {
            timeUnit: "day",
            count: 1,
          },
          renderer: am5xy.AxisRendererX.new(this.root, {}),
          tooltip: am5.Tooltip.new(this.root, {}),
        })
      );

      var yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(this.root, {
          renderer: am5xy.AxisRendererY.new(this.root, {}),
        })
      );
      xAxis.get("renderer").grid.template.setAll({
        strokeWidth: 0,
        strokeOpacity: 0,
      });
      yAxis.get("renderer").grid.template.setAll({
        strokeWidth: 0,
        strokeOpacity: 0,
      });

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let finalData = {};
      if (dataArray.length) {
        for (let item of dataArray) {
          let value = parseInt(item.BalanceUSD);
          if (!isNaN(value)) {
            let date = new Date(item.Date).getTime();
            if (finalData[item.Currency]) {
              finalData[item.Currency].push({
                value,
                date,
              });
            } else {
              finalData[item.Currency] = [
                {
                  value,
                  date,
                },
              ];
            }
          }
        }
      }


      for (let key in finalData) {
        // console.log('finalData ===', key)
        var series = chart.series.push(
          am5xy.LineSeries.new(this.root, {
            name: `${key}`,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date",
            legendValueText: "{valueY}",
            tooltip: am5.Tooltip.new(this.root, {
              pointerOrientation: "horizontal",
              labelText: "${valueY}",
            }),
          })
        );
         // let data = finalData[key];
         // console.log(finalData, 'finalData ===', data)
        let data =  [
          {
              "value": 0,
              "date": 1722538802217
          },
          {
              "value": 0,
              "date": 1722625202291
          },
          {
              "value": 0,
              "date": 1722711602199
          },
          {
              "value": 0,
              "date": 1722798002199
          },
          {
              "value": 0,
              "date": 1722884402356
          },
          {
              "value": 0,
              "date": 1722970802296
          },
          {
              "value": 0,
              "date": 1723057202633
          },
          {
              "value": 0,
              "date": 1723143602652
          },
          {
              "value": 0,
              "date": 1723230002337
          },
          {
              "value": 0,
              "date": 1723316402349
          },
          {
              "value": 0,
              "date": 1723402802577
          },
          {
              "value": 0,
              "date": 1723489202673
          },
          {
              "value": 0,
              "date": 1723575602610
          },
          {
              "value": 0,
              "date": 1723662002309
          },
          {
              "value": 0,
              "date": 1723748402612
          },
          {
              "value": 0,
              "date": 1723834802248
          },
          {
              "value": 0,
              "date": 1723921202423
          },
          {
              "value": 0,
              "date": 1724007602428
          },
          {
              "value": 0,
              "date": 1724094002419
          },
          {
              "value": 0,
              "date": 1724180402650
          },
          {
              "value": 0,
              "date": 1724266802534
          },
          {
              "value": 0,
              "date": 1724353202449
          },
          {
              "value": 0,
              "date": 1724439602560
          },
          {
              "value": 0,
              "date": 1724526002733
          },
          {
              "value": 0,
              "date": 1724612402597
          },
          {
              "value": 4940,
              "date": 1724698802755
          },
          {
              "value": 4694,
              "date": 1724785202622
          },
          {
              "value": 4551,
              "date": 1724871602669
          },
          {
              "value": 4582,
              "date": 1724958002836
          },
          {
              "value": 4579,
              "date": 1725044402551
          },
          {
              "value": 4517,
              "date": 1725130802457
          },
          {
              "value": 4369,
              "date": 1725217202386
          },
          {
              "value": 4583,
              "date": 1725303602407
          },
          {
              "value": 4397,
              "date": 1725390002784
          },
          {
              "value": 4475,
              "date": 1725476402570
          },
          {
              "value": 4375,
              "date": 1725562802388
          },
          {
              "value": 4236,
              "date": 1725649202498
          },
          {
              "value": 4324,
              "date": 1725735602461
          },
          {
              "value": 4386,
              "date": 1725822002455
          },
          {
              "value": 4558,
              "date": 1725908402723
          },
          {
              "value": 4628,
              "date": 1725994802558
          },
          {
              "value": 4635,
              "date": 1726081202559
          },
          {
              "value": 4788,
              "date": 1726167602656
          },
          {
              "value": 4850,
              "date": 1726254002236
          },
          {
              "value": 4794,
              "date": 1726340402298
          },
          {
              "value": 4737,
              "date": 1726426802511
          },
          {
              "value": 4654,
              "date": 1726513202359
          },
          {
              "value": 4829,
              "date": 1726599602382
          },
          {
              "value": 4902,
              "date": 1726686002287
          },
          {
              "value": 5055,
              "date": 1726772402637
          },
          {
              "value": 5175,
              "date": 1726858802329
          },
          {
              "value": 5409,
              "date": 1726945202535
          },
          {
              "value": 5195,
              "date": 1727031602656
          },
          {
              "value": 5371,
              "date": 1727118002603
          },
          {
              "value": 5398,
              "date": 1727204402518
          }
        ]
        series.data.setAll(data);


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();
      }

      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      var cursor = chart.set(
        "cursor",
        am5xy.XYCursor.new(this.root, {
          behavior: "none",
        })
      );
      cursor.lineY.set("visible", false);

      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      // chart.set(
      //   "scrollbarX",
      //   am5.Scrollbar.new(root, {
      //     orientation: "horizontal",
      //   })
      // );

      // chart.set(
      //   "scrollbarY",
      //   am5.Scrollbar.new(root, {
      //     orientation: "vertical",
      //   })
      // );

      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      var legend = chart.bottomAxesContainer.children.push(
        am5.Legend.new(this.root, {
          // width: 200,
          // paddingLeft: 15,
          // height: am5.percent(100),
        })
      );

      // When legend item container is hovered, dim all the series except the hovered one
      legend.itemContainers.template.events.on("pointerover", function (e) {
        var itemContainer = e.target;

        // As series list is data of a legend, dataContext is series
        var series = itemContainer.dataItem.dataContext;

        chart.series.each(function (chartSeries) {
          if (chartSeries != series) {
            chartSeries.strokes.template.setAll({
              strokeOpacity: 0.15,
              stroke: am5.color(0x000000),
            });
          } else {
            chartSeries.strokes.template.setAll({
              strokeWidth: 3,
            });
          }
        });
      });

      // When legend item container is unhovered, make all series as they are
      // legend.itemContainers.template.events.on("pointerout", function (e) {
      //   var itemContainer = e.target;
      //   var series = itemContainer.dataItem.dataContext;

      //   chart.series.each(function (chartSeries) {
      //     chartSeries.strokes.template.setAll({
      //       strokeOpacity: 1,
      //       strokeWidth: 1,
      //       stroke: chartSeries.get("fill"),
      //     });
      //   });
      // });

      // legend.itemContainers.template.set("width", am5.p100);
      // legend.valueLabels.template.setAll({
      //   width: am5.p100,
      //   textAlign: "right",
      // });

      // It's is important to set legend data after all the events are set on template, otherwise events won't be copied
      // legend.data.setAll(chart.series.values);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
    },
    ChangeChart() {
      setTimeout(() => {
        this.chartFunc();
      }, 200);
    },
    getPortfolioReport() {
      this._runPortfolioReport({
        globalParams: {
          // account_id: `${account.account_id}`,
          "account_id" :"T3500",
          "demo_live": 0
        },
        localParams: { parameter: this },
      });
    },
  },
  created() {
    this.ChangeChart()
    this.getPortfolioReport();
  },
};
</script>
