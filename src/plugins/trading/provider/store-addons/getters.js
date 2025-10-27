import { Const } from "../lib/const.cls";

export const getters = {
  [Const.GET_WALLETS]: (state) => {
    return state.getWallets;
  },
  [Const.GET_ORDER_LIST]: (state) => {
    return state.orderList;
  },
  [Const.GET_ORDER_LIST_SOCIAL]: (state) => {
    return state.orderListSocial;
  },
  [Const.GET_COMBINE_CRYPTO_LIST]: (state) => {
    return state.combinedCurrency;
  },
  [Const.GET_UNIQUE_CRYPTO_LIST]: (state) => {
    return state.uniqueCurrency;
  },
  [Const.GET_CRYPTO_LIST]: (state) => {
    return state.cryptoList;
  },
  [Const.GET_DEPOSIT_HISTORY]: (state) => {
    return state.depositHistoryList;
  },
  [Const.GET_WITHDRAWAL_HISTORY]: (state) => {
    return state.withdrawalHistoryList;
  },
  [Const.GET_TRADING_ACCOUNT]: (state) => {
    
    return state.tradingAccount;
  },
  [Const.GET_SOCIAL_ACCOUNT]: (state) => {
    return state.socialAccount;
  },
  [Const.GET_NOTIFICATION_LIST]: (state) => {
    return state.notificationList;
  },
  [Const.GET_MARGIN]: (state) => {
    return state.margin_list;
  },
  [Const.GET_MARGIN_SOCIAL]: (state) => {
    return state.margin_list_social;
  },
  [Const.GET_ACCOUNT_SELECTED]: (state) => {
    return state.accountSelected;
  },
  [Const.GET_PORTFOLIO_REPORT]: (state) => {
    return state.portfolioReport;
  },
  [Const.GET_REVENUE_REPORT]: (state) => {
    return state.revenueReport;
  },
  [Const.GET_WATCH_LIST_PAIRS]: (state) => {
    return state.watchListPairs;
  },
};
