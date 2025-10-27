import Vue from "vue";
import { Const } from "./provider/lib/const.cls";
import * as Types from "../../types";
import { mapActions } from "vuex";
import { depositWithdrawal } from "./lib/depositWithdrawal.cls";
import * as depositWithdrawalStoreExtensions from "./provider/";
import * as moment from "moment";
const state = {
  ...depositWithdrawalStoreExtensions.stateExt,
};
const actions = {
  ...depositWithdrawalStoreExtensions.actionsExt,
};
const mutations = {
  ...depositWithdrawalStoreExtensions.mutationsExt,
};
const getters = {
  ...depositWithdrawalStoreExtensions.gettersExt,
};
// new store module definition
const depositWithdrawalStore = {
  state,
  actions,
  mutations,
  getters,
};
// main mixin to load the new store module
export const depositWithdrawalMixins = {
  created() {
    const _store = this.$store;
    if (
      !(
        _store &&
        _store.state &&
        _store.state[depositWithdrawal.STORE_MODULE_NAME]
      )
    ) {
      try {
        this.$store.registerModule(
          depositWithdrawal.STORE_MODULE_NAME,
          depositWithdrawalStore
        );
      } catch (error) {}
    }
  },
  methods: {
    ...mapActions({
      // _runGetPaymentMethods						: 			Const.RUN_GET_PAYMENT_METHODS,

      _runDemoDeposit: Const.RUN_DEMO_DEPOSIT,
      _runGetUserCanDeposit: Const.RUN_GET_USER_CAN_DEPOSIT,
      _runCreditCardDeposit: Const.RUN_CREDIT_CARD_DEPOSIT,

      _runGetWithdrawalMethods: Const.RUN_GET_WITHDRAWAL_METHODS,
      _runGenerateWalletAddress: Const.RUN_GENERATE_WALLET_ADDRESS,
      _runTransactionLimitCurrency: Const.RUN_TRANS_LIMIT_CURRENCY,

      _runWithdrawalRequestOtp: Const.RUN_WITHDRAWAL_REQUEST_OTP,
      _runWithdrawalCheckOtp: Const.RUN_WITHDRAWAL_CHECK_OTP,
      _runResendEmailLink: Const.RUN_RESEND_EMAIL_LINK,
      _runGetWithdrawalDesc: Const.RUN_GET_WITHDRAWAL_DESC,
      _runGetDepsitList: Const.RUN_GET_DEPOSIT_LIST,
      _runGetWithdrawalList: Const.RUN_GET_WITHDRAWAL_LIST,
      _runGetOrderList1: Const.RUN_GET_ORDER_LIST1,
      _runGetWithDepoCurList: Const.RUN_GET_WITH_DEPO_CUR_LIST,

      _runFiatWithdrawalRequestOtp: Const.RUN_FIAT_WITHDRAWAL_REQUEST_OTP,
      _runFiatWithdrawalRequestResendOtp:
        Const.RUN_FIAT_WITHDRAWAL_REQUEST_RESEND_OTP,
      _runFiatWithdrawalRequest: Const.RUN_FIAT_WITHDRAWAL_REQUEST,
    }),

    computedCommonFunc(getFuncName) {
      try {
        return this.$store.getters[getFuncName];
      } catch (ex) {
        return [];
      }
    },
  },
  computed: {
    //deposit
    generateWalletAddress: function () {
      return this.computedCommonFunc(Const.GET_GENERATE_WALLET_ADDRESS);
    },
    withdrawalMethodResponse: function () {
      return this.computedCommonFunc(Const.GET_WITHDRAWAL_METHOD_RESPONSE);
    },
    withdrawalMethodResponseDep: function () {
      return this.computedCommonFunc(Const.GET_WITHDRAWAL_METHOD_RESPONSE_DEP);
    },

    // GetPaymentMethods: function(){ return this.computedCommonFunc(Const.GET_PAYMENT_METHODS); },

    deposit_limit: function () {
      return this.computedCommonFunc(Const.GET_DEPOSIT_LIMIT);
    },
    depsitList: function () {
      return this.computedCommonFunc(Const.GET_DEPOSIT_LIST);
    },
    withdrawalList: function () {
      return this.computedCommonFunc(Const.GET_WITHDRAWAL_LIST);
    },
    withDepoCurList: function () {
      return this.computedCommonFunc(Const.GET_WITH_DEPO_CUR_LIST);
    },
  },
};

export default depositWithdrawalMixins;
