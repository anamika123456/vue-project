import { Const } from "../lib/const.cls";

export const mutations = {
  [Const.SET_WALLET_CURRENCY_JSON_LIST](state, data) {
    try {
      state.walletCurrencyJsonList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_ACTIVITY_CATEGORIES](state, data) {
    try {
      state.activityCategories = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_SUB_ACTIVITY_CATEGORIES](state, data) {
    try {
      state.activitySubCategories = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  [Const.SET_PROFILE_INFO](state, data) {
    try {
      state.profileInfo = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_PAYMENT_METHODS](state, data) {
    try {
      state.GetPaymentMethods = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  [Const.SET_STATE_REFRESH_DATA](state, data) {
    try {
      state.refreshData = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  [Const.SET_CRYPTO_ADDRESSES](state, data) {
    try {
      state.cryptoAddresses = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  [Const.SET_BANK_ADDRESSES](state, data) {
    try {
      state.bankAddresses = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  [Const.SET_WATCH_LIST](state, data) {
    try {
      state.watchListData = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  [Const.SET_NEWS_LIST](state, data) {
    try {
      state.newsList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  [Const.SET_CRYPTO_NEWS_LIST](state, data) {
    try {
      state.cryptoNewsList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
};
