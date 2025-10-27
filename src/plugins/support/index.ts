import Vue from "vue";
import { Const } from "./provider/lib/const.cls";
import * as Types from "../../types";
import { mapActions } from "vuex";
import { support } from "./lib/support.cls";
import * as supportStoreExtensions from "./provider/";
const state = {
  ...supportStoreExtensions.stateExt,
};
const actions = {
  ...supportStoreExtensions.actionsExt,
};
const mutations = {
  ...supportStoreExtensions.mutationsExt,
};
const getters = {
  ...supportStoreExtensions.gettersExt,
};
// new store module definition
const supportStore = {
  state,
  actions,
  mutations,
  getters,
};
// main mixin to load the new store module
export const supportMixins = {
  created() {
    const _store = this.$store;
    if (!(_store && _store.state && _store.state[support.STORE_MODULE_NAME])) {
      try {
        this.$store.registerModule(support.STORE_MODULE_NAME, supportStore);
      } catch (error) {}
    }
  },
  methods: {
    ...mapActions({
      _runGetTicketDoc: Const.RUN_GET_TICKET_DOC,
      _runCreateTicket: Const.RUN_CREATE_TICKET,
      _runGetFaqsList: Const.RUN_GET_FAQS_LIST,
      _runGetTicketList: Const.RUN_GET_TICKET_LIST,
      _runGetTicketDetail: Const.RUN_GET_TICKET_DETAIL,
      _runTicketRequestOtp: Const.RUN_TICKET_REQUEST_OTP,
      _runTicketCheckOtp: Const.RUN_TICKET_CHECK_OTP,
      _runTicketReply: Const.RUN_TICKET_REPLY,
      _runGetTicketReasonList: Const.RUN_GET_TICKET_REASON_LIST,
      _runTicketResendOtp: Const.RUN_TICKET_RESEND_OTP,
    }),
    computedSupportFunc(getFuncName) {
      try {
        return this.$store.getters[getFuncName];
      } catch (ex) {
        return [];
      }
    },
  },
  computed: {
    ticketData: function () {
      return this.computedCommonFunc(Const.GET_TICKET_DATA);
    },
    faqslist: function () {
      return this.computedCommonFunc(Const.GET_FAQS_LIST);
    },
    ticketList: function () {
      return this.computedCommonFunc(Const.GET_TICKET_LIST);
    },
    ticketView: function () {
      return this.computedCommonFunc(Const.GET_TICKET_VIEW);
    },
    ticketReasonList: function () {
      return this.computedCommonFunc(Const.GET_TICKET_REASON_LIST);
    },
  },
};

export default supportMixins;
