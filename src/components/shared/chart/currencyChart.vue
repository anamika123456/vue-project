<template>
  <div
    class="d-flex align-items-center justify-content-between position-relative"
    id="currencychartdiv"
    style="width: 100%"
    :style="'height: ' + height + 'px'"
  >
    <!-- topspace -->
    <loader class="position-absolute w-100" v-show="pageLoader"></loader>
    <no-data
      class="position-absolute w-100"
      v-show="!parseFloat($parent.totalUsdValue)"
    ></no-data>
  </div>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";

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
    };
  },
  props: ["currency_list", "from"],
  watch: {
    currency_list(val) {
      this.pageLoader = true;
      this.series.data.setAll(val.filter((i) => parseFloat(i.usdValue) > 0));
      this.legend.data.setAll(this.series.dataItems);
      if (this.from != "portfolio") {
        this.label.set(
          "text",
          parseFloat(this.$parent.totalUsdValue)
            ? "[fontSize:12px]total[/]:\n[bold fontSize:14px]" +
                (parseFloat(this.$parent.totalUsdValue)
                  ? "$" + this.$parent.formatPrice(this.$parent.totalUsdValue)
                  : "0 USD") +
                "[/]"
            : ""
        );
      }
      this.pageLoader = false;
    },
  },
  methods: {
    redraw(obj) {
      this.series.data.setAll(this.chartData[this.chart_type]);
      this.series.appear(1000);
    },
    createChart() {
      this.pageLoader = true;
      this.root = am5.Root.new("currencychartdiv");
      /*root.setThemes([
					am5themes_Animated.new(root)
				]);*/
      let layout = {};
      this.width = document.getElementById("currencychartdiv").offsetWidth;
      let layoutType = this.root.horizontalLayout;
      if (this.width <= 310) {
        this.height = 380;
        layoutType = this.root.verticalLayout;
      } else {
        this.height = 180;
      }
      layout = {
        radius: am5.percent(90),
        layout: layoutType,
      };
      if (this.from != "portfolio") {
        layout["innerRadius"] = am5.percent(92);
      }
      this.chart = this.root.container.children.push(
        am5percent.PieChart.new(this.root, layout)
      );

      this.series = this.chart.series.push(
        am5percent.PieSeries.new(this.root, {
          name: "Series",
          valueField: "usdValue",
          categoryField: "currency",
        })
      );
      this.series.labels.template.set("visible", false);
      this.series.ticks.template.set("visible", false);
      this.series.slices.template.set("strokeOpacity", 0);
      this.series
        .get("colors")
        .set("colors", [
          am5.color("#EAB300"),
          am5.color("#7D7BF7"),
          am5.color("#131128"),
          am5.color("#f36363"),
          am5.color("#36B37E"),
          am5.color("#B5529D"),
        ]);
      /*clickTarget: "none",*/
      let legendLayout = {
        centerY: am5.percent(50),
        y: am5.percent(50),
        layout: this.root.verticalLayout,
        height: am5.percent(80),
        verticalScrollbar: am5.Scrollbar.new(this.root, {
          orientation: "vertical",
        }),
      };
      if (this.from == "portfolio") {
        legendLayout.layout = am5.GridLayout.new(this.root, {
          maxColumns: 2,
          fixedWidthGrid: false,
        });
      }
      if (this.width <= 310) {
        (legendLayout["centerX"] = am5.percent(50)),
          (legendLayout["x"] = am5.percent(50)),
          delete legendLayout.centerY;
        delete legendLayout.y;
      }
      this.legend = this.chart.children.push(
        am5.Legend.new(this.root, legendLayout)
      );

      this.legend.markers.template.setAll({
        width: 10,
        height: 10,
      });
      this.legend.markerRectangles.template.setAll({
        cornerRadiusTL: 10,
        cornerRadiusTR: 10,
        cornerRadiusBL: 10,
        cornerRadiusBR: 10,
      });
      this.legend.labels.template.setAll({
        fontSize: 16,
        fontWeight: "600",
        width: 50,
      });
      let valueLabels = {
        fontSize: 16,
        fontWeight: "600",
        margin: 10,
        width: 60,
        textAlign: "left",
      };
      if (this.from == "portfolio") {
        valueLabels.width = 90;
      }
      this.legend.valueLabels.template.setAll(valueLabels);
      if (this.from != "portfolio") {
        this.label = this.chart.seriesContainer.children.push(
          am5.Label.new(this.root, {
            textAlign: "center",
            centerY: am5.p50,
            // centerY: am5.p100,
            centerX: am5.p50,
            text: parseFloat(this.$parent.totalUsdValue)
              ? "[fontSize:12px]total[/]:\n[bold fontSize:14px]" +
                (parseFloat(this.$parent.totalUsdValue)
                  ? "$" + this.$parent.formatPrice(this.$parent.totalUsdValue)
                  : "0 USD") +
                "[/]"
              : "",
          })
        );
      }
      if (this.currency_list.length > 0) {
        this.series.data.setAll(
          this.currency_list.filter((i) => parseFloat(i.usdValue) > 0)
        );
        /*if(this.from == 'portfolio' && this.currency_list.length < 4){
						legend.markers.template.setAll({
						  width: 24,
						  height: 24
						});
						this.legendData.set("maxColumns",1)
					}*/
        this.legend.data.setAll(this.series.dataItems);
      }
      this.pageLoader = false;
      this.series.appear(1000, 100);
    },
    ChangeChart() {
      setTimeout(() => {
        this.createChart();
      }, 100);
    },
    reCreateChart() {
      try {
        this.root.dispose();
        this.createChart();
      } catch (e) {}
    },
  },
  mounted() {
    let _that = this;
    $(window).resize(function () {
      if (
        _that.width &&
        _that.width <= 310 &&
        document.getElementById("currencychartdiv").offsetWidth > 310
      ) {
        _that.reCreateChart();
      }
      if (
        _that.width &&
        _that.width > 310 &&
        document.getElementById("currencychartdiv").offsetWidth <= 310
      ) {
        _that.reCreateChart();
      }
    });
  },
  created() {
    this.ChangeChart();
  },
};
</script>
