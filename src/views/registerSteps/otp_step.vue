<template>
  <div class="fullLoader p-0 scrollVertical scrollbar">
    <loader v-if="pageLoader"></loader>
    <div class="signupContent">
      <div class="row justify-content-center text-center">
        <div class="col-12 col-md-9 col-lg-8 col-xl-7 col-xxl-6 col-xxxl-5">
          <img src="/assets/website/images/logo.svg" alt="Logo" class="loginLogo d-block text-center pb-0 pb-sm-4 pt-4" width="240" />
          <h2 class="pt-4 pt-sm-2 pt-lg-4 pb-2 pb-lg-4">Enter Email Verification Code</h2>
          <Form @submit="submit()" ref="regform" class="mt-4">
            <div class="form-group partitioned">
              <v-otp-input ref="otpInput" v-model:value="bindModal" input-classes="form-control" separator=" " :num-inputs="6" :should-auto-focus="true" input-type="letter-numeric" @on-change="handleOnChange" @on-complete="handleOnComplete" />
              <Field type="hidden" class="form-control" id="" name="otp" rules="required|min:6|numeric" v-model="otp" style="display: none" />
              <ErrorMessage name="otp" class="text-danger text-center" />
            </div>
            <div class="termsForm mt-3">
              <p>Didn’t received the email? <a href="#" :class="pageLoader ? 'disabled' : ''" v-on:click.stop.prevent="resendOtp()" class="semibold">Resend Code</a>
              </p>
            </div>
            <div class="submitButton mt-4 mt-lg-5 pt-3 pt-lg-5">
              <input type="submit" class="cap_btn large_btn otp_verify_email" value="Verify Email" :class="pageLoader ? 'disabled' : ''" />
              <p class="mt-4">Already have an account? <router-link to="/" class="semibold">Sign In</router-link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { registerStepsMixins } from "@/plugins/registerSteps";
  import { Const } from "@/plugins/registerSteps/provider/lib/const.cls.ts";
  import { Form, Field, ErrorMessage } from "vee-validate";

  // import { inject } from 'vue' ;
  // import CryptoJS from 'crypto-js' ;
  // const cryptojs = inject('cryptojs') as typeof CryptoJS ;
  export default {
    name: "step-two",
    mixins: [registerStepsMixins],
    data() {
      return {
        otp: "",
        bindModal : '',
        pageLoader: false,
        submitted: false,
        hash : ''
      };
    },
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    methods: {
      handleOnComplete(value) {
        this.otp = value;
      },
      handleOnChange(value) {
        this.otp = value;
      },
      resendOtp() {
        if (this.pageLoader) {
          return;
        }
        const _that = this;
        let input_json = {
          globalParams: {
            transaction_id: _that.step2.transaction_id.toString(),
          },
          localParams: {
            parameter: _that
          },
        };
        _that._runResendOtp(input_json);
      },
      submit() {
        if (this.pageLoader) {
          return;
        }
        const _that = this;
        let input_json = {
          globalParams: {
            otp: _that.otp,
            transaction_id: (this.$route.query.verify) ? '' : _that.step2.transaction_id.toString(),
            hash : this.hash

          },
          localParams: {
            parameter: _that
          },
        };
        _that._runStep2(input_json);
      },
    },
    created() {
      
      if (localStorage.getItem("step2")) {
        this.$store.commit(Const.SET_STEP2, JSON.parse(localStorage.getItem("step2")));
        if(this.$route.query.verify){
          this.hash = this.$route.query.verify
          this.submit()
        }
      } else {
        this.$router.replace("/register");
      }



      
    },
  };
</script>