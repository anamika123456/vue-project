import {
  GET_INFO,
  GET_COUNTRY,
  GET_USER,
  GET_TOKEN,
  GET_LOADERS,
  GET_TICKET_ID,
  GET_2FA_STATE
} from "@/types";

export const getters = {
  // return the latest broadcast message
  [GET_INFO](state) {
    return state.message;
  },
  // return the current user state
  [GET_USER](state) {
    return state.user;
  },

  [GET_2FA_STATE](state) {
    return state.fa_user_state;
  },
  // return the token from local storage
  [GET_TOKEN](state) {
    return state.user.token;
  },

  [GET_TICKET_ID](state) {
    return state.ticket_id;
  },
  // all loaders
  [GET_LOADERS](state) {
    return state.loaders;
  },
  //get country list
  [GET_COUNTRY](state) {
    return state.country;
  },
};
