import Vue from "vue";
import { Const } from "./provider/lib/const.cls";
import * as Types from "../../types";
import { mapActions } from "vuex";
import { cards } from "./lib/cards.cls";
import * as cardsStoreExtensions from "./provider/";
import * as moment from "moment";
const state = {
  ...cardsStoreExtensions.stateExt,
};
const actions = {
  ...cardsStoreExtensions.actionsExt,
};
const mutations = {
  ...cardsStoreExtensions.mutationsExt,
};
const getters = {
  ...cardsStoreExtensions.gettersExt,
};
// new store module definition
const cardsStore = {
  state,
  actions,
  mutations,
  getters,
};
// main mixin to load the new store module
export const cardsMixins = {
  created() {
    const _store = this.$store;
    if (
      !(
        _store &&
        _store.state &&
        _store.state[cards.STORE_MODULE_NAME]
      )
    ) {
      try {
        this.$store.registerModule(
          cards.STORE_MODULE_NAME,
          cardsStore
        );
      } catch (error) {}
    }
  },
  methods: {
    ...mapActions({
      _runCardStateChange               :       Const.RUN_CARD_STATE_CHANGE,


      _runCreateCardUser						    : 			Const.RUN_CREATE_CARD_USER,
      _runGetCardUser                   :       Const.RUN_GET_CARD_USER,
      _runGetCardUserById               :       Const.RUN_GET_CARD_USER_BY_ID,

      _runVerifyCardEmail               :       Const.RUN_VERIFY_CARD_EMAIL,
      _runResendCardEmail               :       Const.RUN_RESEND_CARD_EMAIL,
      
      _runVerifyCardMobile              :       Const.RUN_VERIFY_CARD_MOBILE,
      _runResendCardMobile              :       Const.RUN_RESEND_CARD_MOBILE,

      _runUpdateUserCardAddress         :       Const.RUN_UPDATE_USER_CARD_ADDRESS,

      _runStartKyc                      :       Const.RUN_START_KYC,

      _runGetAllCardWalletByUser        :       Const.RUN_GET_ALL_CARD_WALLET_BY_USER,

      _runGetAllWalletById              :       Const.RUN_GET_ALL_WALLET_BY_ID,

      _runGetCardAddress                :       Const.RUN_GET_CARD_ADDRESS,

      _runCardActivate                  :       Const.RUN_CARD_ACTIVATE,

      _runGetCardTransactions           :       Const.RUN_CARD_TRANSACTIONS,
      _runGetCardDetails                :       Const.RUN_CARD_DETAILS,

      _runGetCardBlock                  :       Const.RUN_CARD_BLOCK,
      _runGetCardUnblock                :       Const.RUN_CARD_UNBLOCK,
      _runGetCardBurn                   :       Const.RUN_CARD_BURN,

      _runGetAccountDetails             :       Const.RUN_CARD_ACCOUNT_DETAILS,

      _runMultiUserRoleUpdate           :       Const.RUN_MULTI_USER_ROLE_UPDATE,

      _runLinkAccount                   :       Const.RUN_LINK_ACCOUNT,

      _runGetCardsByUserId              :       Const.RUN_GET_CARDS,

      _runCardWalletCreate              :       Const.RUN_CARD_WALLET_CREATE,

      _runEditPassword                  :       Const.RUN_EDIT_PASSWORD,

      _runGetChartData                  :       Const.RUN_GET_CHART_DATA,
      _runGetNotificationEvents         :       Const.RUN_GET_NOTIFICATION_EVENTS,
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
    card_user: function () {
      return this.computedCommonFunc(Const.GET_CARD_USER);
    },
    card_users_by_id: function () {
      return this.computedCommonFunc(Const.GET_CARD_USER_BY_ID);
    },
    card_wallets: function () {
      return this.computedCommonFunc(Const.GET_ALL_CARD_WALLET_BY_USER);
    },

    card_account_details: function () {
      return this.computedCommonFunc(Const.GET_CARD_ACCOUNT_DETAILS);
    },
  },
};

export default cardsMixins;
