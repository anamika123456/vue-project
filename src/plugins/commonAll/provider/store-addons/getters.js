import { Const } from "../lib/const.cls";

export const getters = {
  [Const.GET_WALLET_CURRENCY_JSON_LIST]: (state) => {
    return state.walletCurrencyJsonList;
  },
  [Const.GET_ACTIVITY_CATEGORIES]: (state) => {
    return state.activityCategories;
  },
  [Const.GET_SUB_ACTIVITY_CATEGORIES]: (state) => {
    return state.activitySubCategories;
  },

  [Const.GET_PROFILE_INFO]: (state) => {
    return state.profileInfo;
  },
  [Const.GET_PAYMENT_METHODS]: (state) => {
    return state.GetPaymentMethods;
  },

  [Const.GET_STATE_REFRESH_DATA]: (state) => {
    return state.refreshData;
  },
  [Const.GET_CRYPTO_ADDRESSES]: (state) => {
    return state.cryptoAddresses;
  },
  [Const.GET_BANK_ADDRESSES]: (state) => {
    return state.bankAddresses;
  },
  [Const.GET_WATCH_LIST]: (state) => {
    return state.watchListData;
  },
  [Const.GET_NEWS_LIST]: (state) => {
    return state.newsList;
  },
  [Const.GET_CRYPTO_NEWS_LIST]: (state) => {
    return state.cryptoNewsList;
  },
};
