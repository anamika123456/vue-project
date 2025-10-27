<template>
  <div
    class="d-flex align-items-center justify-content-between position-relative"
    id="chartdiv"
    style="width: 100%; height: 250px"
  >
    <loader class="position-absolute w-100" v-show="pageLoader"></loader>
    <no-data
      class="position-absolute w-100"
      v-show="!portfolioReport.length"
    ></no-data>
  </div>
</template>
<script>
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
  watch: {
    tradingAccount(val) {
      if (!parseInt(this.$parent.accountSelected))
        this.getPortfolioReport(val[0]);
    },
    socialAccount(val) {
      if (parseInt(this.$parent.accountSelected))
        this.getPortfolioReport(val[0]);
    },
    portfolioReport(val) {
      setTimeout(() => {
        this.createChart(val);
      }, 200);
    },
  },
  methods: {
    createChart(dataArray) {
      if ("dom" in this.root) this.root.dispose();
      this.root = am5.Root.new("chartdiv");

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

        let data = finalData[key];
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
    getPortfolioReport(account) {
      this._runPortfolioReport({
        globalParams: {
          account_id: `${account.account_id}`,
        },
        localParams: { parameter: this },
      });
    },
  },
  created() {
    if (this.portfolioReport.length) {
      setTimeout(() => {
        this.createChart(this.portfolioReport);
      }, 200);
    } else {
      this.pageLoader = true;
      if (!parseInt(this.$parent.accountSelected) && this.tradingAccount.length)
        this.getPortfolioReport(this.tradingAccount[0]);
      if (parseInt(this.$parent.accountSelected) && this.socialAccount.length)
        this.getPortfolioReport(this.socialAccount[0]);
    }
  },
};
</script>
