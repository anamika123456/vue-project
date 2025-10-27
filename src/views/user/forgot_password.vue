<template>
  <div class="loginLoader h-100 scrollVertical scrollbar">
    <loader v-if="pageLoader"></loader>
    <div class="row h-100">
      <div class="col-12 col-md-7 d-flex flex-column justify-content-center pt-4 pt-sm-4">
        <div class="capitalLoginForm">
          <div class="lt-aler-message" v-if="notification_msg != ''">
            <alert-notification />
          </div>
          <Form @submit="submit()" ref="regform">
              <img src="/assets/website/images/logo.svg" alt="Logo" class="loginLogo d-block text-center pb-4" width="240" />
              <div class="form-group" v-if="!resend">
                <h2 class="text-center mb-4">Forgot Password</h2>
                <label class="labeltext">Work Email Address <span class="required">*</span></label>
                <div class="position-relative">
                  <Field type="email" class="form-control" id="" name="email" placeholder="Work Email Address" v-model="email" rules="required|email" />
                  <ErrorMessage name="email" class="text-danger" />
                </div>
              </div>
              <div v-else>
                <h2 class="text-center mb-4">Check Your Email Inbox</h2>
                <div class="resendMail text-center mb-4">
                <img class="mb-3" src="/assets/website/images/emailSend.svg" alt="icon" />
                <p class="mb-0">We have sent you a password reset link by email. Please check for mailbox and your spam folder. If it doesn’t active soon, click on "<span class="themecolor medium">Resend Email</span>" below <br /> Need Help? <a href="javascript:void(0);" class="themecolor medium">Contact Support</a></p>
              </div>
              </div>
              <div class="form-group d-flex align-items-center justify-content-between">
                <input type="submit" class="cap_btn large_btn mb-0" :class="pageLoader ? 'disabled' : ''" :value="!resend ? 'Reset Password' : 'Resend Email'" name="submitFrm" />
                <router-link :to="'/'" class="ml-4 semibold">Back to Sign In</router-link>
              </div>
            </Form>
        </div>
      </div>
      <div class="col-12 col-md-5 d-none d-md-flex flex-column justify-content-center lightgrayBG">
        <div class="text-center capital_forgot">
          <img class="mx-auto d-block" src="/assets/website/images/login-img.svg" :alt="$env_var.productName" />
          <h5 class="pt-5 mb-3">Designed For Every Business</h5>
          <p>Sign up to explore the most reliable crypto payment <br class="d-none d-xl-block" /> gateway to power up your business</p>
        </div>
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
    name: "App-Login",
    data() {
      return {
        pageLoader: false,
        submitted: false,
        notification_msg: "",
        notification_type: "",
        email: "",
        resend: false,
      };
    },
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    methods: {
      ...mapActions({
        _runForgotPassword: types.RUN_FORGOT_PASSWORD,
      }),
      submit() {
        if (this.pageLoader) {
          return;
        }
        const _that = this;
        let input_json = {
          globalParams: {
            email: _that.email,
          },
          localParams: {
            parameter: _that
          },
        };
        _that._runForgotPassword(input_json);
      },
    },
  };
</script>