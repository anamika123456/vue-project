import { Const } from "../lib/const.cls";

export const mutations = {
  [Const.SET_WALLETS](state, data) {
    try {
      state.getWallets = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_ORDER_LIST](state, data) {
    try {
      state.orderList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_ORDER_LIST_SOCIAL](state, data) {
    try {
      state.orderListSocial = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_NOTIFICATION_LIST](state, data) {
    try {
      state.notificationList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  [Const.SET_COMBINE_CRYPTO_LIST](state, data) {
    try {
      state.combinedCurrency = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_UNIQUE_CRYPTO_LIST](state, data) {
    try {
      state.uniqueCurrency = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_CRYPTO_LIST](state, data) {
    try {
      state.cryptoList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_DEPOSIT_HISTORY](state, data) {
    try {
      state.depositHistoryList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_WITHDRAWAL_HISTORY](state, data) {
    try {
      state.withdrawalHistoryList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_TRADING_ACCOUNT](state, data) {
    try {
      state.tradingAccount = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_SOCIAL_ACCOUNT](state, data) {
    try {
      state.socialAccount = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_MARGIN](state, data) {
    try {
      state.margin_list = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_MARGIN_SOCIAL](state, data) {
    try {
      state.margin_list_social = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_ACCOUNT_SELECTED](state, data) {
    try {
      state.accountSelected = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_PORTFOLIO_REPORT](state, data) {
    try {
      state.portfolioReport = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_REVENUE_REPORT](state, data) {
    try {
      state.revenueReport = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_WATCH_LIST_PAIRS](state, data) {
    try {
      state.watchListPairs = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
};
