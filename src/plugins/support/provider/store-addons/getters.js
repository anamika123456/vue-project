import { Const } from "../lib/const.cls";
export const getters = {
  [Const.GET_FAQS_LIST]: (state) => {
    return state.faqslist;
  },
  [Const.GET_TICKET_DATA]: (state) => {
    return state.ticketData;
  },
  [Const.GET_TICKET_REASON_LIST]: (state) => {
    return state.ticketReasonList;
  },
  [Const.GET_TICKET_LIST]: (state) => {
    return state.ticketList;
  },
  [Const.GET_TICKET_VIEW]: (state) => {
    return state.ticketView;
  },
};
