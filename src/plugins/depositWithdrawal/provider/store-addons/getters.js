import { Const } from "../lib/const.cls";

export const getters = {
  //deposit
  [Const.GET_GENERATE_WALLET_ADDRESS]: (state) => {
    return state.generateWalletAddress;
  },

  // [Const.GET_PAYMENT_METHODS]: (state) => { return state.GetPaymentMethods },

  [Const.GET_DEPOSIT_LIMIT]: (state) => {
    return state.deposit_limit;
  },

  [Const.GET_WITHDRAWAL_METHOD_RESPONSE]: (state) => {
    return state.withdrawalMethodResponse;
  },
  [Const.GET_WITHDRAWAL_METHOD_RESPONSE_DEP]: (state) => {
    return state.withdrawalMethodResponseDep;
  },

  [Const.GET_DEPOSIT_LIST]: (state) => {
    return state.depositList;
  },
  [Const.GET_DEPOSIT_Status]: (state) => {
    return state.depositStatus;
  },

  [Const.GET_WITHDRAWAL_LIST]: (state) => {
    return state.withdrawalList;
  },
  [Const.GET_WITH_DEPO_CUR_LIST]: (state) => {
    return state.withDepoCurList;
  },
};
