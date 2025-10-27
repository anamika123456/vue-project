<template>
  <div class="accountSetting bg-white round-sm position-relative">
    <h4 class="mb-3 pb-3 border-bottom">Notifications</h4>
    <p class="medium themecolor mb-1 mt-4">Account Notifications</p>
    <p class="mb-4">You’ll be notified when there is a notification regarding your account.</p>
    <div class="c_checkbox mb-4">
      <label class="customCheckbox mb-0">
        <p class="medium themecolor mb-1 lh-normal">Account Verification</p>
        <p class="mb-0">You’ll be notified about the update of your verification status</p>
        <input type="checkbox" class="form-control" />
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="c_checkbox  mb-4">
      <label class="customCheckbox mb-0">
        <p class="medium themecolor mb-1 lh-normal">Security</p>
        <p class="mb-0">You’ll be notified when you change password or 2FA</p>
        <input type="checkbox" class="form-control" />
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="c_checkbox  mb-4">
      <label class="customCheckbox mb-0">
        <p class="medium themecolor mb-1 lh-normal">New IP Address</p>
        <p class="mb-0">You’ll be notified when there is a new IP address</p>
        <input type="checkbox" class="form-control" />
        <span class="checkmark"></span>
      </label>
    </div>
    <p class="medium themecolor mb-1 mt-4">Transaction Notifications</p>
    <p class="mb-4">You’ll be notified when there is a notification regarding your transactions.</p>
    <div class="c_checkbox mb-4">
      <label class="customCheckbox mb-0">
        <p class="medium themecolor mb-1 lh-normal">Payments</p>
        <p class="mb-0">You’ll be notified when there is a new payment to your account</p>
        <input type="checkbox" class="form-control" />
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="c_checkbox mb-4">
      <label class="customCheckbox mb-0">
        <p class="medium themecolor mb-1 lh-normal">Payouts</p>
        <p class="mb-0">You’ll be notified when your payout request is successful</p>
        <input type="checkbox" class="form-control" />
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="c_checkbox mb-4">
      <label class="customCheckbox mb-0">
        <p class="medium themecolor mb-1 lh-normal">Conversions</p>
        <p class="mb-0">You’ll be notified when your conversion is successful</p>
        <input type="checkbox" class="form-control" />
        <span class="checkmark"></span>
      </label>
    </div>
    <p class="medium themecolor mb-1 mt-4">Support Notifications</p>
    <p class="mb-4">You’ll be notified when there is a notification regarding your support ticket.</p>
    <div class="c_checkbox mb-4">
      <label class="customCheckbox mb-0">
        <p class="medium themecolor mb-1 lh-normal">Support Ticket</p>
        <p class="mb-0">You’ll be notified when there is a new replies or updates about your support ticket</p>
        <input type="checkbox" class="form-control" />
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="d-flex justify-content-end border-top mt-4 pt-4">
        <a href="javascript:void(0);" class="cap_btn extra_small_btn border-btn">Cancel</a>
        <a href="javascript:void(0);" class="cap_btn extra_small_btn ml-2 ml-md-3">Save</a>
    </div> 
  </div>
</template>
<script>
  import settingsMixins from "@/plugins/settings";
  import webhookList from "./developer_api/webhook/list.vue";
  import apiKeyList from "./developer_api/api_key/list.vue";
  export default {
    name: "accountprofile",
    mixins: [settingsMixins],
    data() {
      return {
        pageLoader: false,
        cryptopayouttab: 1,
        modalPopup: false,
      };
    },
    components: {
      webhookList,
      apiKeyList
    },
    methods: {},
    created() {
      if (parseInt(this.get_user.is_registered) == 5) {
        this.modalPopup = false;
      } else {
        this.modalPopup = true;
        this.cryptopayouttab = 0;
      }
    },
  };
</script>