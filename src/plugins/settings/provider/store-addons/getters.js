import { Const } from "../lib/const.cls";

export const getters = {
  [Const.GET_USER_DATA]: (state) => {
    return state.getUserData;
  },
  //==================================================================================================================================
  [Const.GET_BANK_DETAILS]: (state) => {
    return state.getBankData;
  },
  //==================================================================================================================================
  [Const.GET_IP_DETAILS]: (state) => {
    return state.getIPData;
  },
  //==================================================================================================================================
  [Const.GET_SUB_USERS]: (state) => {
    return state.getSubUsers;
  },
  [Const.GET_PENDING_INVITES]: (state) => {
    return state.getPendingInvites;
  },
  [Const.GET_INVITATION_DATA]: (state) => {
    return state.getInvitationData;
  },
  [Const.GET_ROLES]: (state) => {
    return state.getRoles;
  },
  //==================================================================================================================================
  [Const.GET_API_KEYS]: (state) => {
    return state.getApiKeyData;
  },
  [Const.GET_WEBHOOK]: (state) => {
    return state.getWebhookData;
  },
};
