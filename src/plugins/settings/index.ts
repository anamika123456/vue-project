import Vue from "vue";
import { Const } from "./provider/lib/const.cls";
import * as Types from "../../types";
import { mapActions } from "vuex";
import { settings } from "./lib/settings.cls";
import * as settingsStoreExtensions from "./provider";
const state = {
  ...settingsStoreExtensions.stateExt,
};
const actions = {
  ...settingsStoreExtensions.actionsExt,
};
const mutations = {
  ...settingsStoreExtensions.mutationsExt,
};
const getters = {
  ...settingsStoreExtensions.gettersExt,
};
// new store module definition
const settingsStore = {
  state,
  actions,
  mutations,
  getters,
};
// main mixin to load the new store module
export const settingsMixins = {
  created() {
    const _store = this.$store;
    if (!(_store && _store.state && _store.state[settings.STORE_MODULE_NAME])) {
      try {
        this.$store.registerModule(settings.STORE_MODULE_NAME, settingsStore);
      } catch (error) {}
    }
  },
  methods: {
    ...mapActions({
      _runGetUserData: Const.RUN_GET_USER_DATA,
      _runUnsubscribeUserByLink: Const.RUN_UNSUBSCRIBE_USER_BY_LINK,
      //==================================================================================================
      _runGetBankDetails: Const.RUN_GET_BANK_DETAILS,
      _runAddBankDetails: Const.RUN_ADD_BANK_DETAILS,
      _runEditBankDetails: Const.RUN_Edit_BANK_DETAILS,
      _runDeletePaymentMethod: Const.RUN_DELETE_PAYMENT_METHOD,
      _runBankAsPrimary: Const.RUN_BANK_AS_PRIMARY,
      //==================================================================================================
      _runGetIPDetails: Const.RUN_GET_IP_DETAILS,
      _runAddIPDetails: Const.RUN_ADD_IP_DETAILS,
      _runEditIPDetails: Const.RUN_EDIT_IP_DETAILS,
      //==================================================================================================
      _runGetSubUsers: Const.RUN_GET_SUB_USERS,
      _runDeleteSubUsers: Const.RUN_DELETE_SUB_USERS,

      _runGetPendingInvites: Const.RUN_GET_PENDING_INVITES,
      _runCancelInvites: Const.RUN_CANCEL_INVITES,
      _runResendInvites: Const.RUN_RESEND_INVITES,

      _runSendInvites: Const.RUN_SEND_INVITES,
      _runGetInvitationData: Const.RUN_GET_INVITATION_DATA,
      _runRegisterUserByInviteLink: Const.RUN_REGISTER_USER_BY_INVITE_LINK,

      _runGetRoles: Const.RUN_GET_ROLES,
      //==================================================================================================
      _runGetAPIKey: Const.RUN_GET_API_KEYS,
      _runAddAPIKey: Const.RUN_ADD_API_KEYS,
      _runUpdateAPIKey: Const.RUN_UPDATE_API_KEYS,
      _runDisableAPIKey: Const.RUN_DISABLE_API_KEYS,

      _runGetWebHook: Const.RUN_GET_WEBHOOK,
      _runAddWebHook: Const.RUN_ADD_WEBHOOK,
      _runUpdateWebHook: Const.RUN_UPDATE_WEBHOOK,
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
    getUserData: function () {
      return this.computedCommonFunc(Const.GET_USER_DATA);
    },
    getBankData: function () {
      return this.computedCommonFunc(Const.GET_BANK_DETAILS);
    },
    getIPDetails: function () {
      return this.computedCommonFunc(Const.GET_IP_DETAILS);
    },
    getSubUsers: function () {
      return this.computedCommonFunc(Const.GET_SUB_USERS);
    },
    getPendingInvites: function () {
      return this.computedCommonFunc(Const.GET_PENDING_INVITES);
    },
    getInvitationData: function () {
      return this.computedCommonFunc(Const.GET_INVITATION_DATA);
    },
    getRoles: function () {
      return this.computedCommonFunc(Const.GET_ROLES);
    },
    getApiKeyData: function () {
      return this.computedCommonFunc(Const.GET_API_KEYS);
    },
    getWebhookData: function () {
      return this.computedCommonFunc(Const.GET_WEBHOOK);
    },
  },
};

export default settingsMixins;
