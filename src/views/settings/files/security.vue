<template>
  <div class="accountSetting bg-white round-sm">
    <loader v-if="pageLoader" />
    <h4 class="mb-0 mb-3 pb-3 border-bottom">Security</h4>
    <div class="pt-3 pt-md-4">
      <h6 class="mb-2">Password</h6>
      <p class="mb-0">Remember not to store your password in your email or cloud and don’t share it with anyone else</p>
      <a href="javascript:void(0);" class="cap_btn large_btn d-inline-flex align-items-center mt-4" data-toggle="modal" data-target="#security-change-password" @click="openDiv = true">
        <feather type="edit-2" size="20px"></feather>
        <span class="pl-2 pl-lg-3">Change Password</span>
      </a>
    </div>
    <div class="pt-4 pt-md-5">
      <h6 class="mb-3">2-Step Verification</h6>
      <div class="row">
        <div class="col-sm-12 col-lg-7 col-xl-9 col-xxl-7">
          <div class="d-block d-sm-flex justify-content-between align-items-center border box-shadow p-3 p-sm-4">
            <div class="d-flex">
              <img src="/assets/website/images/google-authenticator.png" alt="Google Authentication" class="d-block" width="30" height="30" />
              <div class="pl-4">
                <h6 class="mb-2">2-Step Verification</h6>
                <p class="mb-2">Time-based one-time 6-digit codes</p>
                <p class="mb-0 green medium">Secure</p>
              </div>
            </div>
            <a href="javascript:void(0);" class="cap_btn border-btn small_btn mt-3 mt-sm-0 gethelpReset" data-toggle="modal" data-target="#get-help-with-fa-reset" @click="openModal = true">Reset</a>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" tabindex="-1" id="get-help-with-fa-reset" role="dialog" aria-labelledby="get-help-with-fa-reset" aria-hidden="true" v-if="openModal == true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 align-items-center">
            <div class="modal-title">
              <div class="d-flex justify-content-center align-items-center">
                <h4 class="themecolor mb-0 text-center">Get Help with 2FA Reset</h4>
              </div>
            </div>
            <a href="javascript:void(0);" class="close text-right" data-dismiss="modal" aria-label="Close" @click="openModal = false">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <Form @submit="disable2FA()" ref="regform">
              <div class="modal-body pt-3">
                  <div class="mb-4">
                <img src="/assets/website/images/google-authenticator.png" alt="Google Authentication" class="d-block m-auto" width="96" height="96" />
                <h6 class="themecolor mt-4 mb-0 text-center">Google Authentication Code</h6>
              </div>
              <div class="form-group mb-0">
                <Field type="text" class="form-control" id="" name="otp" placeholder="" v-model="otp" rules="required|min:6|numeric" />
                <ErrorMessage name="otp" class="text-danger" />
              </div>
              <div class="d-flex justify-content-center border-0 pt-4">
                <input type="submit" class="cap_btn px-4 large_btn border-0" value="Submit" />
              </div>
              <div class="border p-3 round-sm mt-4">
                <p class="mb-0 text-center">NOTE: For security purposes, payouts will be temporarily suspended for 24 hours once you re-enable your 2FA. The payout function will be automatically enabled when the time is up. You'll be logged out after disabling g-auth and have to re-activate it upon login.</p>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
    <change-password v-if="openDiv == true"></change-password>
  </div>
</template>
<script>
  import settingsMixins from "@/plugins/settings";
  import changePassword from "../../user/change-password.vue";
  import {
    Form,
    Field,
    ErrorMessage
  } from "vee-validate";
  export default {
    name: "accountprofile",
    mixins: [settingsMixins],
    data() {
      return {
        pageLoader: false,
        openModal: false,
        openDiv: false,
        submitted: false,
        otp: "",
        password: "",
      };
    },
    components: {
      Form,
      Field,
      ErrorMessage,
      changePassword
    },
    methods: {
      disable2FA() {
        const _that = this;
        let input_json = {
          globalParams: {
            google_token: _that.otp,
          },
          localParams: {
            parameter: _that,
          },
        };
        _that._runDisable2FaQrcode(input_json);
      },
    },
    created() {},
  };
</script>