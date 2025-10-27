import { notificationConst } from "../lib/const.cls";

export const getters = {
  [notificationConst.GET_NOTIFICATION_LIST]: (state) => {
    return state.notificationList;
  },

  [notificationConst.GET_UNREAD_NOTIFICATION_DATA]: (state) => {
    return state.notificationUnreadList;
  },
  [notificationConst.GET_READ_NOTIFICATION_DATA]: (state) => {
    return state.notificationreadList;
  },
  [notificationConst.GET_ACTIVITY_LIST]: (state) => {
    return state.activityList;
  },
  // [notificationConst.GET_NOTIFICATION_ENABLE_GET_SETTINGS]: (state) => {
  //   return state.notificationEnablegetSettings;
  // },
  // [notificationConst.GET_NOTIFICATION_GET_SETTINGS]: (state) => {
  //   return state.notificationGetSettings;
  // },
};
