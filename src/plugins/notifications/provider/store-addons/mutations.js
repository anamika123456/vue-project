import { notificationConst } from "../lib/const.cls";

export const mutations = {
  [notificationConst.SET_NOTIFICATION_LIST](state, data) {
    try {
      state.notificationList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  [notificationConst.SET_UNREAD_NOTIFICATION_DATA](state, data) {
    try {
      state.notificationUnreadList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [notificationConst.SET_READ_NOTIFICATION_DATA](state, data) {
    try {
      state.notificationreadList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [notificationConst.SET_ACTIVITY_LIST](state, data) {
    try {
      state.activityList = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  // [notificationConst.SET_NOTIFICATION_ENABLE_GET_SETTINGS](state, data) {
  //   try {
  //     state.notificationEnablegetSettings = data;
  //   } catch (ex) {
  //     console.debug("set state EX", ex);
  //   }
  // },

  // [notificationConst.SET_NOTIFICATION_GET_SETTINGS](state, data) {
  //   try {
  //     state.notificationGetSettings = data;
  //   } catch (ex) {
  //     console.debug("set state EX", ex);
  //   }
  // },
};
