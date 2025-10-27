import Vue from "vue";
import { Const } from "./provider/lib/const.cls";
import * as Types from "../../types";
import { mapActions } from "vuex";
import { trading } from "./lib/trading.cls";
import * as tradingStoreExtensions from "./provider/";
import { formatPriceCommon } from "../../store/commomFunction";

const state = {
  ...tradingStoreExtensions.stateExt,
};
const actions = {
  ...tradingStoreExtensions.actionsExt,
};
const mutations = {
  ...tradingStoreExtensions.mutationsExt,
};
const getters = {
  ...tradingStoreExtensions.gettersExt,
};
// new store module definition
const tradingStore = {
  state,
  actions,
  mutations,
  getters,
};
// main mixin to load the new store module
export const tradingMixins = {
  created() {
    const _store = this.$store;
    if (!(_store && _store.state && _store.state[trading.STORE_MODULE_NAME])) {
      try {
        this.$store.registerModule(trading.STORE_MODULE_NAME, tradingStore);
      } catch (error) {}
    }
  },
  methods: {
    ...mapActions({
      //===================Order===========================
      _runGetOrderList1: Const.RUN_GET_ORDER_LIST,
      _runGetEnableWallets: Const.RUN_GET_WALLETS,
      //===================CRYPTO LIST=================
      _runCryptoList: Const.RUN_CRYPTO_LIST,
      //===================CRYPTO LIST=================
      _runGetMarginInfo: Const.GET_MARGIN_INFO,
      _runGetDepositHistoryList: Const.RUN_GET_DEPOSIT_HISTORY,
      _runGetWithdrawalHistoryList: Const.RUN_GET_WITHDRAWAL_HISTORY,

      _getfavoriteCurrencyList: Const.GET_FAVORITE_CURRENCY_LIST,
      _addfavoriteCurrencyList: Const.ADD_FAVORITE_CURRENCY_LIST,

      _runTradingAccount: Const.RUN_TRADING_ACCOUNT,
      _runCreateAccount: Const.RUN_CREATE_ACCOUNT,
      _runInternalTransferVerify: Const.RUN_INTERNAL_TRANSFER_VERIFY,
      _runGenerateApiKey: Const.RUN_GENERATE_API_KEY,
      _runGetApiKey: Const.GET_API_KEY,
      _runUpdateApiKey: Const.UPDATE_API_KEY,
      _runDisableApiKey: Const.DISABLE_API_KEY,
      _runPortfolioReport: Const.RUN_GET_PORTFOLIO_REPORT,
      _runRevenueReport: Const.RUN_GET_REVENUE_REPORT,
    }),
    formatPrice(val, isCrypto) {
      return formatPriceCommon(val, isCrypto === true ? true : false);
    },
    spliting(val, index) {
      if (val) {
        if (val.includes("-")) {
          return val.split("-")[index];
        } else if (val.length >= 6) {
          if (index) {
            return val.slice(3, 6);
          } else {
            return val.slice(3);
          }
        }
      } else {
        return "";
      }
    },
    computedCommonFunc(getFuncName) {
      try {
        return this.$store.getters[getFuncName];
      } catch (ex) {
        return [];
      }
    },
  },
  computed: {
    getWallets: function () {
      return this.computedCommonFunc(Const.GET_WALLETS);
    },
    marginInfoList: function () {
      return this.computedCommonFunc(Const.GET_MARGIN);
    },
    marginInfoListSocial: function () {
      return this.computedCommonFunc(Const.GET_MARGIN_SOCIAL);
    },
    orderList: function () {
      return this.computedCommonFunc(Const.GET_ORDER_LIST);
    },
    orderListSocial: function () {
      return this.computedCommonFunc(Const.GET_ORDER_LIST_SOCIAL);
    },
    combinedCurrency: function () {
      return this.computedCommonFunc(Const.GET_COMBINE_CRYPTO_LIST);
    },
    uniqueCurrency: function () {
      return this.computedCommonFunc(Const.GET_UNIQUE_CRYPTO_LIST);
    },
    cryptoList: function () {
      return this.computedCommonFunc(Const.GET_CRYPTO_LIST);
    },
    depositHistoryList: function () {
      return this.computedCommonFunc(Const.GET_DEPOSIT_HISTORY);
    },
    withdrawalHistoryList: function () {
      return this.computedCommonFunc(Const.GET_DEPOSIT_HISTORY);
    },
    tradingAccount: function () {
      return this.computedCommonFunc(Const.GET_TRADING_ACCOUNT);
    },
    socialAccount: function () {
      return this.computedCommonFunc(Const.GET_SOCIAL_ACCOUNT);
    },
    accountSelected: function () {
      return this.computedCommonFunc(Const.GET_ACCOUNT_SELECTED);
    },
    portfolioReport: function () {
      return this.computedCommonFunc(Const.GET_PORTFOLIO_REPORT);
    },
    revenueReport: function () {
      return this.computedCommonFunc(Const.GET_REVENUE_REPORT);
    },
  },
};

export default tradingMixins;
