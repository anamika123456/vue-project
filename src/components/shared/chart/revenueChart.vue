<template>
  <div
    class="d-flex align-items-center justify-content-between position-relative"
    id="chartdiv"
    style="width: 100%; height: 250px"
  >
    <loader class="position-absolute w-100" v-show="pageLoader"></loader>
    <no-data
      class="position-absolute w-100"
      v-show="!revenueReport.length"
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
    revenueReport(val) {
      setTimeout(() => {
        am5.ready(() => {
          this.createChart(val);
        });
      }, 200);
    },
  },
  methods: {
    createChart(dataArray) {
     var root = am5.Root.new("chartdiv");
      root.dateFormatter.setAll({
        dateFormat: "yyyy",
        dateFields: ["valueX"]
      });

      let data = JSON.parse(JSON.stringify(dataArray));
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        focusable: true,
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX:true,
        paddingLeft: 0
      }));

      var easing = am5.ease.linear;


      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0.1,
        groupData: false,
        baseInterval: {
          timeUnit: "day",
          count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 70
        }),
        tooltip: am5.Tooltip.new(root, {})
      }));

      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.2,
        renderer: am5xy.AxisRendererY.new(root, {})
      }));


      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      var series = chart.series.push(am5xy.LineSeries.new(root, {
        minBulletDistance: 10,
        connect: false,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY}"
        })
      }));

      series.fills.template.setAll({
        fillOpacity: 0.2,
        visible: true
      });

      series.strokes.template.setAll({
        strokeWidth: 2
      });


      // Set up data processor to parse string dates
      // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
      series.data.processor = am5.DataProcessor.new(root, {
        dateFormat: "dd-MM-yyyy",
        dateFields: ["date"]
      });

      series.data.setAll(data);

      series.bullets.push(function() {
        var circle = am5.Circle.new(root, {
          radius: 4,
          fill: root.interfaceColors.get("background"),
          stroke: series.get("fill"),
          strokeWidth: 2
        })

        return am5.Bullet.new(root, {
          sprite: circle
        })
      });


      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        behavior: "none"
      }));
      cursor.lineY.set("visible", false);

      // add scrollbar
      // chart.set("scrollbarX", am5.Scrollbar.new(root, {
      //   orientation: "horizontal"
      // }));


      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
      
      this.pageLoader = false;
    },
    getRevenueReport() {
      this._runRevenueReport({
        globalParams: {},
        localParams: { parameter: this },
      });
    },
  },
  created() {
    if (this.revenueReport.length) {
      setTimeout(() => {
        am5.ready(() => {
          this.createChart(this.revenueReport);
        });
      }, 200);
    } else {
      this.pageLoader = true;
      this.getRevenueReport();
    }
  },
};
</script>
