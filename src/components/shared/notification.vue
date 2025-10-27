<template>
  <div>
    <div class="mid_scroll_content">
      <loader v-if="pageLoader"></loader>
      <section class="depoist_fund border-0 pb-5 h-100">
        <div class="notificationDetalied h-100">
          <div class="d-flex align-items-center justify-content-end">
            <div class="form-group parentClass-drop select-box-dropdown mb-4">
              <label class="mr-2">Filter</label>
              <select
                class="float-field form-control"
                @change="NotificationFilter()"
                v-model="readUnread"
              >
                <option value="">ALL</option>
                <option value="1">Read</option>
                <option value="0">Unread</option>
              </select>
            </div>
          </div>
          <div
            class="row justify-content-center"
            v-if="readUnreadmethod().totalRecords > 0"
          >
            <div class="col-12 col-lg-6">
              <div class="customDropdownBox notificationlist">
                <div
                  class="d-flex align-items-center dropdownList mb-2"
                  v-for="list in readUnreadmethod().records"
                >
                  <div class="usericon">
                    <feather size="16px" type="user"></feather>
                  </div>
                  <div
                    class="right d-flex align-items-center justify-content-between w-100"
                  >
                    <p class="m-0" v-html="list.msg"></p>
                    <div class="d-block time">
                      {{ dateFunction(list.created) }}
                    </div>
                  </div>
                </div>
              </div>
              <pagination :totalRecords="readUnreadmethod().totalRecords" :limit="pageLimit" v-if="readUnreadmethod().totalRecords > 14"></pagination>
            </div>
          </div>
          <div class="row align-items-center h-100" v-else>
            <div class="col-12">
              <ul class="dropdown-menu">
                <li class="notification-box noneNotify">
                  <div class="imgNorIcon">
                    <img src="/assets/website/images/4707150.svg" alt="Icon" />
                    <h5>No message notification</h5>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { registerStepsMixins } from "@/plugins/registerSteps";
import moment from "moment";
export default {
  name: "accountprofile",
  mixins: [registerStepsMixins],
  data() {
    return {
      submitted: false,
      pageLoader: false,
      readUnread: "",
      page: "1",
      pageLimit: "15",
    };
  },

  methods: {
    dateFunction(getDate) {
      let last_seen_date = moment(getDate).fromNow();
      return last_seen_date;
    },
    readUnreadmethod() {
      if (this.readUnread == "0") {
        return this.notificationUnreadList;
      } else if (this.readUnread == "1") {
        return this.notificationList;
      } else {
        return this.notificationList;
      }
    },
    NotificationFilter() {
      this._runGetNotificationList({
        globalParams: { read: this.readUnread },
        localParams: { parameter: this },
      });
    },
  },
  created() {
    this.pageName("NOTIFICATIONS");
    this.NotificationFilter();
  },
};
</script>
