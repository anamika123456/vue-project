import { Const } from "../lib/const.cls";

export const getters = {
  [Const.GET_CARD_USER]: (state) => {
    return state.card_users;
  },

  [Const.GET_CARD_USER_BY_ID]: (state) => {
    let returnData = state.card_users_by_id ;
    return returnData;
  },

  [Const.GET_ALL_CARD_WALLET_BY_USER]: (state) => {
    return state.card_wallets;
  },

  [Const.GET_CARD_ACCOUNT_DETAILS]: (state) => {
    return state.card_account_details;
  }
};
