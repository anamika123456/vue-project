import { Const } from "../lib/const.cls";

export const mutations = {
  [Const.SET_CARD_USER](state, data) {
    try {
      state.card_users = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  [Const.SET_CARD_USER_BY_ID](state, data) {
    try {
      state.card_users_by_id = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  [Const.SET_ALL_CARD_WALLET_BY_USER](state, data) {
    try {
      state.card_wallets = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  [Const.SET_CARD_ACCOUNT_DETAILS](state, data) {
    try {
      state.card_account_details = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  }
};
