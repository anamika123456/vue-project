import { Const } from "../lib/const.cls";

export const mutations = {
  [Const.SET_USER_DATA](state, data) {
    try {
      state.getUserData = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  //==================================================================================================================================
  [Const.SET_BANK_DETAILS](state, data) {
    try {
      state.getBankData = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  //==================================================================================================================================
  [Const.SET_IP_DETAILS](state, data) {
    try {
      state.getIPData = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  //==================================================================================================================================
  [Const.SET_SUB_USERS](state, data) {
    try {
      state.getSubUsers = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_PENDING_INVITES](state, data) {
    try {
      state.getPendingInvites = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_INVITATION_DATA](state, data) {
    try {
      state.getInvitationData = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_ROLES](state, data) {
    try {
      state.getRoles = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  //==================================================================================================================================
  [Const.SET_API_KEYS](state, data) {
    try {
      state.getApiKeyData = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_WEBHOOK](state, data) {
    try {
      state.getWebhookData = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
};
