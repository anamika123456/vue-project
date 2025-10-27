<template>
  <div class="d-flex flex-column justify-content-center h-100">
    <div class="redBG p-2" v-if="$route.path != '/2fa-screen' && $route.path != '/unsubscribe' && parseInt(get_user.is_registered) < 3">
      <p class="mb-0 text-white text-center">Verify your account before proceeding further.</p>
    </div>
    <div id="app" class="captail_wrap" :class="classbasedFunc()" v-if="$route.path != '/2fa-screen' && $route.path != '/unsubscribe'">
      <app-left />
      <div class="middle_section w-100 mr-0 flex-column">
        <app-header />
        <!-- aaa ===> {{notificationList}} -->
        <router-view />
      </div>
    </div>
    <router-view v-if="$route.path == '/2fa-screen' || $route.path == '/unsubscribe'" />
    <!-- <div id="app" class="captail_wrap" :class="classbasedFunc()"><app-left v-if="$route.path != '/2fa-screen'" /><div class="middle_section w-100 mr-0 flex-column" v-if="$route.path != '/2fa-screen'"><app-header /><router-view /></div><router-view v-if="$route.path == '/2fa-screen'" /></div> -->
  </div>
</template>
<script>
  import "overlayscrollbars/overlayscrollbars.css";
  import {OverlayScrollbars} from "overlayscrollbars";
  import left from "@/components/shared/left-nav.vue";
  import right from "@/components/shared/right-nav.vue";
  import * as types from "@/types";
  import {mapActions} from "vuex";
  import {ProviderCacheMixins} from "@/plugins/vue-provider-cache/mixin";
  import {Const} from "@/plugins/vue-provider-cache/const.mod";
  import {supportMixins} from "@/plugins/support";
  import {notificationsMixins} from "@/plugins/notifications";
  import {settingsMixins} from "@/plugins/settings";
  import tradingMixins from "@/plugins/trading";
  export default {
    name: "App",
    mixins: [supportMixins,settingsMixins,notificationsMixins,tradingMixins,ProviderCacheMixins,],
    data() {
      return {
        pageLoader: false,
      };
    },
    components: { appLeft: left, appRight: right },
    methods: {
      classbasedFunc() {
        let classVariable = this.$route.path == "/2fa-screen" ? "p-0" : "";
        return classVariable;
      },
      ...mapActions({
        _runstateLoad: types.RUN_STATE_LOAD,
        _runLogout: types.RUN_LOGOUT,
      }),
      logout() {
        let input_json = {
          globalParams: {},
          localParams: {
            parameter: this
          },
        };
        this._runLogout(input_json);
      },
      subscribPairs() {
        let conversion = (this.walletCurrencyList.conversion && this.walletCurrencyList.conversion.length > 0) ? this.walletCurrencyList.conversion : []
        let enabled_coins = []
        enabled_coins.push('CBTC-BTC');
        enabled_coins.push('CBTC-USD');
        enabled_coins.push('CBTC-USDC');
        enabled_coins.push('UGOLD-USDT');
        enabled_coins.push('UGOLD');
        for (let i = 0; i <= this.walletCurrencyList.enabled_coins.length - 1; i++) {
          enabled_coins.push(this.walletCurrencyList.enabled_coins[i].symbol + '-BTC')
          enabled_coins.push(this.walletCurrencyList.enabled_coins[i].symbol + '-USD')
          enabled_coins.push(this.walletCurrencyList.enabled_coins[i].symbol + '-USDC')
        }
        let pairList = conversion.concat(enabled_coins);
        pairList = pairList.filter((item, index) => pairList.indexOf(item) === index);
        this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].seeders["S_PF_PF"].subscribe(pairList);
      }
    },
    updated() {
      if (document.querySelector(".mid_scroll_content")) {
        OverlayScrollbars(document.querySelector(".mid_scroll_content"), {});
      }
    },
    mounted() {
      $(document).ready(function() {
        $("g[aria-labelledby]").hide();
      });
    },
    created() {
      const _that = this;
      this._runstateLoad({globalParams: {},localParams: {  parameter: this}});
      this._runGetTicketReasonList({globalParams: {},localParams: {  parameter: this}});
      this._runGetNotificationList({globalParams: {},localParams: {  parameter: this}});
      this._runGetUserData({globalParams: {},localParams: {  parameter: this}});
      this._runWalletCurrencyJsonList({globalParams: {},localParams: {  parameter: this,  page: "index"}});
      if (parseInt(this.get_user.is_registered) >= 5) {
        this._runTradingAccount({globalParams: {},localParams: {  parameter: this}});
      }
    },
  };
</script>