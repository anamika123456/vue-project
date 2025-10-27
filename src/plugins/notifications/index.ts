import Vue from "vue";
import { notificationConst } from "./provider/lib/const.cls";
import * as Types from "../../types";
import { mapActions } from "vuex";
import { notifications } from "./lib/notifications.cls";
import * as notificationsStoreExtensions from "./provider";
const state = {
  ...notificationsStoreExtensions.stateExt,
};
const actions = {
  ...notificationsStoreExtensions.actionsExt,
};
const mutations = {
  ...notificationsStoreExtensions.mutationsExt,
};
const getters = {
  ...notificationsStoreExtensions.gettersExt,
};
// new store module definition
const notificationsStore = {
  state,
  actions,
  mutations,
  getters,
};
// main mixin to load the new store module
export const notificationsMixins = {
  created() {
    const _store = this.$store;
    if (
      !(_store && _store.state && _store.state[notifications.STORE_MODULE_NAME])
    ) {
      try {
        this.$store.registerModule(
          notifications.STORE_MODULE_NAME,
          notificationsStore
        );
      } catch (error) {}
    }
  },
  methods: {
    ...mapActions({
      _runGetNotificationList: notificationConst.RUN_GET_NOTIFICATION_LIST,
      _runReadUnreadNotification: notificationConst.RUN_READ_UNREAD_NOTIFICATION,
      _runGetActivityList: notificationConst.RUN_GET_ACTIVITY_LIST,
      _runMarkActivityAsRead: notificationConst.RUN_MARK_ACTIVITY_AS_READ,

      // _runNotificationSettings: notificationConst.RUN_NOTIFICATION_SETTINGS,
      // _runNotificationgetSettings:
      //   notificationConst.RUN_NOTIFICATION_GET_SETTINGS,
      // _runNotificationEnablegetSettings:
      //   notificationConst.RUN_NOTIFICATION_ENABLE_GET_SETTINGS,
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
    notificationList: function () {
      return this.computedCommonFunc(notificationConst.GET_NOTIFICATION_LIST);
    },
    notificationUnreadList: function () {
      return this.computedCommonFunc(notificationConst.GET_UNREAD_NOTIFICATION_DATA);
    },
    notificationreadList: function () {
      return this.computedCommonFunc(notificationConst.GET_READ_NOTIFICATION_DATA);
    },
    activityList: function () {
      return this.computedCommonFunc(notificationConst.GET_ACTIVITY_LIST);
    },
    // notificationGetSettings: function () {
    //   return this.computedCommonFunc(
    //     notificationConst.GET_NOTIFICATION_GET_SETTINGS
    //   );
    // },
    // notificationEnablegetSettings: function () {
    //   return this.computedCommonFunc(
    //     notificationConst.GET_NOTIFICATION_ENABLE_GET_SETTINGS
    //   );
    // },
  },
};

export default notificationsMixins;
