import { Const } from "../lib/const.cls";

export const mutations = {
  [Const.SET_FAQS_LIST](state, data) {
    try {
      state.faqslist = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_TICKET_LIST](state, data) {
    try {
      state.ticketList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_TICKET_VIEW](state, data) {
    try {
      state.ticketView = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_TICKET_REASON_LIST](state, data) {
    try {
      state.ticketReasonList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_TICKET_DATA](state, data) {
    try {
      state.ticketData = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
};
