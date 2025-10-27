<template>
  <div class="modal" tabindex="-1" id="security-change-password" role="dialog" aria-labelledby="security-change-password" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content" v-if="!screen2fa">
        <loader v-if="pageLoader" />
        <Form @submit="submit()" ref="regform">
          <div class="modal-header border-0 align-items-center">
            <div class="modal-title">
              <div class="d-flex align-items-center justify-content-center">
                <h4 class="themecolor mb-0 text-center">Reset Your Password</h4>
              </div>
            </div>
            <a href="javascript:void(0);" class="close text-right" data-dismiss="modal" aria-label="Close" @click="$parent.openDiv = false">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body pt-3">
            <div class="form-group">
              <label class="labeltext">Current Password</label>
              <div class="d-flex justify-content-between align-items-center border round-sm">
                <Field :type="show_old_pass" class="form-control border-0" id="" name="oldPass" placeholder="Enter your current password" v-model="oldPass" rules="required" />
                <div class="mr-3">
                  <a href="javascript:void(0);" class="d-block">
                    <feather type="eye" size="20px" v-if="show_old_pass === 'text'" class="d-block textcolor" @click="passwordIconChangeFunc('oldPass','password')"></feather>
                  </a>
                  <a href="javascript:void(0);" class="d-block">
                    <feather type="eye-off" size="20px" v-if="show_old_pass === 'password'" class="d-block textcolor" @click="passwordIconChangeFunc('oldPass','text')"></feather>
                  </a>
                </div>
              </div>
              <ErrorMessage name="oldPass" class="text-danger" />
            </div>
            <div class="form-group">
              <label class="labeltext">New Password</label>
              <div class="d-flex justify-content-between align-items-center border round-sm">
                <Field :type="show_new_pass" class="form-control border-0" id="" name="newPass" placeholder="Enter your new password" v-model="newPass" :rules="{ required , regex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,12}$/ }" />
                <div class="mr-3">
                  <a href="javascript:void(0);" class="d-block">
                    <feather type="eye" size="20px" v-if="show_new_pass === 'text'" class="d-block textcolor" @click="passwordIconChangeFunc('newPass','password')"></feather>
                  </a>
                  <a href="javascript:void(0);" class="d-block">
                    <feather type="eye-off" size="20px" v-if="show_new_pass === 'password'" class="d-block textcolor" @click="passwordIconChangeFunc('newPass','text')"></feather>
                  </a>
                </div>
              </div>
              <ErrorMessage name="newPass" class="text-danger" />
            </div>
            <div class="form-group mb-0">
              <label class="labeltext">Confirm New Password</label>
              <div class="d-flex justify-content-between align-items-center border round-sm">
                <Field :type="show_conf_pass" class="form-control border-0" id="" name="confirmPass" placeholder="Enter your confirm new password" v-model="confirmPass" rules="required|confirmed:newPass" />
                <div class="mr-3">
                  <a href="javascript:void(0);" class="d-block">
                    <feather type="eye" size="20px" v-if="show_conf_pass === 'text'" class="d-block textcolor" @click="passwordIconChangeFunc('confirmPass','password')"></feather>
                  </a>
                  <a href="javascript:void(0);" class="d-block">
                    <feather type="eye-off" size="20px" v-if="show_conf_pass === 'password'" class="d-block textcolor" @click="passwordIconChangeFunc('confirmPass','text')"></feather>
                  </a>
                </div>
              </div>
              <ErrorMessage name="confirmPass" class="text-danger" />
            </div>
            <div class="d-flex justify-content-center border-0 pt-4">
              <input type="submit" class="cap_btn mr-0 border-0 large_btn mb-0" :class="pageLoader ? 'disabled' : ''" value="Save" data-toggle="modal" data-target="#fa-password-one" />
            </div>
            <div class="border p-3 round-sm mt-4">
              <p class="mb-0 text-center">NOTE: For security purposes, payouts will be temporarily suspended for 24 hours once you change your password. The payout function will be automatically enabled when the time is up.</p>
          </div>
          </div>
        </Form>
      </div>
      <div class="modal-content googleAuthenticationModal" v-if="screen2fa">
        <loader v-if="pageLoader" />
        <Form @submit="submit()" ref="regform">
          <div class="modal-header border-0 d-block text-right">
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="screen2fa = false">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body pt-0">
            <div class="mb-4">
              <img src="/assets/website/images/google-authenticator.png" alt="Google Authentication" class="d-block m-auto" width="96" height="96" />
              <h6 class="themecolor mt-4 mb-0 text-center"> Google Authentication Code </h6>
            </div>
            <div class="mb-4">
              <div class="form-group">
                <div class="position-relative">
                  <Field type="text" class="form-control" id="" name="otp" placeholder="Enter 2FA Code" v-model="otp" rules="required|min:6|numeric" />
                  <ErrorMessage name="otp" class="text-danger" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-center pt-4 border-0">
            <input type="submit" class="cap_btn px-4 large_btn mb-0" value="Update" data-toggle="modal" :class="pageLoader ? 'disabled' : ''" data-target="#fa-update-keys" />
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  import * as types from "@/types";
  import {
    mapActions
  } from "vuex";
  import {
    Form,
    Field,
    ErrorMessage
  } from "vee-validate";
  export default {
    name: "reset-password",
    data() {
      return {
        pageLoader: false,
        notification_msg: "",
        notification_type: "",
        submitted: false,
        displayMessage: false,
        screen2fa: false,
        oldPass: "",
        newPass: "",
        confirmPass: "",
        otp: "",
        show_old_pass: "password",
        show_new_pass: "password",
        show_conf_pass: "password",
        hash: "",
      };
    },
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    methods: {
      passwordIconChangeFunc(getMode, getType) {
        if (getMode == 'oldPass') {
          this.show_old_pass = getType
        } else if (getMode == 'newPass') {
          this.show_new_pass = getType
        } else if (getMode == 'confirmPass') {
          this.show_conf_pass = getType
        }
      },
      ...mapActions({
        _runChangePassword: types.RUN_CHANGE_PASSWORD,
      }),
      submit() {
        if (this.pageLoader) {
          return;
        }
        const _that = this;
        if (_that.screen2fa) {
          let input_json = {
            globalParams: {
              oldpassword: _that.oldPass,
              password: _that.newPass,
              otp: _that.otp,
            },
            localParams: {
              parameter: _that
            },
          };
          _that._runChangePassword(input_json);
        } else {
          _that.screen2fa = true;
          _that.otp = "";
        }
      },
      clearAll() {
        this.submitted = false;
        this.screen2fa = false;
        this.oldPass = "";
        this.newPass = "";
        this.confirmPass = "";
        this.show_old_pass = "password";
        this.show_new_pass = "password";
        this.show_conf_pass = "password";
        this.otp = "";
        this.$parent.openDiv = false;
      },
    },
    created() {},
  };
</script>