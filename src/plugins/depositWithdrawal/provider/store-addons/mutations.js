import { Const } from "../lib/const.cls";

export const mutations = {
  //deposit
  [Const.SET_GENERATE_WALLET_ADDRESS](state, data) {
    try {
      state.generateWalletAddress = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  /* [Const.SET_PAYMENT_METHODS](state, data) {
        try { state.GetPaymentMethods = data } catch (ex) { console.debug('set state EX', ex) }
    },*/

  [Const.SET_DEPOSIT_LIMIT](state, data) {
    try {
      state.deposit_limit = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  [Const.SET_WITHDRAWAL_METHOD_RESPONSE](state, data) {
    try {
      state.withdrawalMethodResponse = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_WITHDRAWAL_METHOD_RESPONSE_DEP](state, data) {
    try {
      state.withdrawalMethodResponseDep = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_DEPOSIT_LIST](state, data) {
    try {
      state.depositList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_WITHDRAWAL_LIST](state, data) {
    try {
      state.withdrawalList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_WITH_DEPO_CUR_LIST](state, data) {
    try {
      state.withDepoCurList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
};
