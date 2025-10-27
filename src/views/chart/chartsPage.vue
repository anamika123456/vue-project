<template>
    <div class="mid_scroll_content pageDpst">
      <h3 class="semibold mb-3">Total Deposit Volume</h3>
      <div >
        
        currency
        <currencyChart :currency_list="curencyUsdValList" />
        revenue
        <revenueChart />
        wallet
        <wallets-chart />
        
      </div>
    </div>
 
</template>

<script>
import tradingMixins from "@/plugins/trading";
import depositWithdrawalMixins from "@/plugins/depositWithdrawal";
import { Const } from "@/plugins/vue-provider-cache/const.mod";
import currencyChart from "./currencyChart.vue";
import revenueChart from "./revenueChart.vue";
import walletsChart from "./walletsChart.vue";
export default {
  name: "index",
  mixins: [tradingMixins, depositWithdrawalMixins],
  data() {
    return {
      curencyUsdValList: [],
      totalUsdValue: 10
    };
  },
  components: {
    currencyChart, revenueChart,

     walletsChart
  }, 
  methods: {
    changeCurencyUsdValList() {
      this.currencyData();
      setTimeout(() => {
        this.currencyData();
      }, 5000);
    },
    currencyData() {
      try {
        this.curencyUsdValList = [
          {
            currency: 'BTC',
            usdValue: 120,
          },
          {
            currency: 'USD',
            usdValue: 120,
          },
          {
            currency: 'LTC',
            usdValue: 120,
          },
          {
            currency: 'USDT',
            usdValue: 120,
          },
          {
            currency: 'ETH',
            usdValue: 120,
          },
          {
            currency: 'EUR',
            usdValue: 120,
          },
        ]
        // this.curencyUsdValList = [];
        // for (const item in this.margin_list) {
        //   let index = this.curencyUsdValList
        //     .map((e) => e.currency)
        //     .indexOf(this.margin_list[item].currency);
        //   if (parseFloat(this.margin_list[item].amount)) {
        //     if (index == -1) {
        //       this.curencyUsdValList.push({
        //         currency: this.margin_list[item].currency,
        //         usdValue: this.getConvertedValue(this.margin_list[item], "USD"),
        //       });
        //     } else {
        //       this.curencyUsdValList[index]["usdValue"] =
        //         this.getConvertedValue(this.margin_list[item], "USD");
        //     }
        //   }
        // }
        // this.curencyUsdValList.sort(function (a, b) {
        //   return parseFloat(b.usdValue) - parseFloat(a.usdValue);
        // });
      } catch (e) {
        setTimeout(() => {
          this.currencyData();
        }, 1000);
      }
    },
    getConvertedValue(item, currency) {
      if (item.currency == currency) {
        return item.amount;
      } else {
        let amount = 0;
        if (this.instruments[item.currency + "-" + currency]) {
          amount = this.instruments[item.currency + "-" + currency].A;
        } else if (this.instruments[currency + "-" + item.currency]) {
          return 1 / this.instruments[currency + "-" + item.currency].A;
        } else {
          let basePrice = null,
            reversebasePrice = null,
            pairValue = null,
            revpairValue = null;
          if (currency == "USD") {
            basePrice = this.instruments[item.currency + "-BTC"];
            reversebasePrice = this.instruments["BTC-" + item.currency];
            pairValue =
              this.instruments["BTC-USD"] || this.instruments["BTC-USDT"];
          } else {
            basePrice = this.instruments[item.currency + "-USD"];
            reversebasePrice = this.instruments["USD-" + item.currency];
            pairValue =
              this.instruments["USD-" + currency] ||
              this.instruments["USDT-" + currency];
          }
          if (basePrice && pairValue) {
            amount = pairValue.A * basePrice.A;
          } else if (reversebasePrice && pairValue) {
            amount = pairValue.A / reversebasePrice.A;
          } else {
            amount = 0;
          }
        }
        if (currency == "USD") {
          return (amount * item.amount).toFixed(3);
          // return (amount * item.amount).toFixed(3)
        } else {
          return this.formatfloat(amount * item.amount);
        }
      }
    },
  },
  created() {this.currencyData()},
};
</script>
