<template>
  <div class="loginLoader h-100 scrollVertical scrollbar">
    <loader v-if="pageLoader"></loader> 
    <div class="modal double-modal" tabindex="1" id="capital-wallet-global" role="dialog" aria-labelledby="capital-wallet-global" aria-hidden="true" v-if="entitySelect == 1">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 pb-3">
            <div class="modal-title">
              <h5 class="mb-0 medium"> We have a site that serves your country. <br />Please click the button to continue with the registration process </h5>
            </div>
          </div>
          <div class="modal-footer border-0 justify-content-center pt-0">
            <a class="cap_btn px-4 large_btn mb-0" :href="envFile.VITE_DMCC_SITE_LINK+'/register'" data-dismiss="modal" aria-label="Close">Go to Capital Wallet Global</a>
          </div>
        </div>
      </div>
    </div>
    <div class="modal double-modal" tabindex="1" id="capital-wallet-apac" role="dialog" aria-labelledby="capital-wallet-apac" aria-hidden="true" v-if="entitySelect == 2">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 pb-3">
            <div class="modal-title">
              <h5 class="mb-0 medium">Please click the button to continue with the registration process</h5>
            </div>
          </div>
          <div class="modal-footer border-0 justify-content-center pt-0">
            <a class="cap_btn px-4 large_btn mb-0" :href="envFile.VITE_AU_SITE_LINK" data-dismiss="modal" aria-label="Close">Go to Capital Wallet APAC</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row h-100" >
      <div class="col-12 col-md-7" >
        <div class="capitalLoginForm d-flex flex-column justify-content-center h-100" v-if="div_show == '0'">
            <img src="/assets/website/images/logo.svg" alt="Logo" width="240" class="loginLogo d-block text-center pb-0 pb-sm-4" />
            <h2 class="text-center mb-0 mt-3 mt-sm-0">Welcome Back!</h2>
            <Form @submit="submit()" ref="regform" class="mt-4">
              <div class="form-group" :class="email != '' ? 'active' : ''">
                <label class="labeltext">Work Email Address <span class="required">*</span>
                </label>
                <Field type="email" class="form-control"  name="email" placeholder="Work Email Address" v-model="email" rules="required|email" />
                <ErrorMessage name="email" class="text-danger" />

              </div>
              <div class="form-group mb-2">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="labeltext mb-0">Password <span class="required">*</span></label>
                  <router-link :to="'/forgot-password'" class="links textcolor"> Forgot Password? </router-link>
                </div>
                <div class="d-flex justify-content-between align-items-center border round-sm" :class="password != '' ? 'password' : ''">
                  <Field :type="show_pass" class="form-control border-0"  name="password" placeholder="Password" v-model="password" rules="required" />
                  <div class="mr-3">
                    <a href="javascript:void(0);" class="d-block"><feather type="eye" size="20px" v-if="show_pass === 'text'" class="d-block textcolor" @click="passwordIconChangeFunc('password','password')"></feather></a>
                    <a href="javascript:void(0);" class="d-block"><feather type="eye-off" size="20px" v-if="show_pass === 'password'" class="d-block textcolor" @click="passwordIconChangeFunc('password','text')"></feather></a>
                  </div>
                </div>
                <ErrorMessage name="password" class="text-danger" />
              </div>
              <div class="form-group mb-2 d-flex align-items-center justify-content-between">
                <div class="c_checkbox">
                  <label class="customCheckbox mb-0">Remember me <input type="checkbox" v-model="remember_me" />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <div class="form-group text-center mt-4">
                <input type="submit" class="cap_btn large_btn" value="Sign In" name="submitFrm" :class="pageLoader ? 'disabled' : ''" />
              </div>
              <div class="form-group d-flex justify-content-center mb-0 mob-center">
                <p>Don’t have an account ? <router-link :to="'/register'" class="semibold themecolor">Sign Up Now</router-link></p>
              </div>
              <div class="form-group text-center"></div>
            </Form>
            <div class="bottomContent authorizedText position-absolute">
              <p class="text-center">Authorized and Regulated Entities:<br />
                <a href="javascript:void(0);" class=" semibold active" data-toggle="modal" data-target="#capital-wallet-global" >Capital Wallet Global</a>
                 <!-- @click="entitySelect = 1" | <a href="javascript:void(0);" class="semibold active" data-toggle="modal" data-target="#capital-wallet-apac" @click="entitySelect = 2">Capital Wallet APAC</a> -->
              </p>
            </div>
          </div>
        <div class="capitalLoginForm d-flex flex-column justify-content-center h-100" v-if="div_show == '1' && parseInt(fa_user_state.profile.gAuthenticatorEnabled) == 1">
          <div class="capitalLoginFormMid">
            
            <h2 class="mb-md-4">Security in Verification</h2>
            <p class="mb-1">To complete the request, please complete the following verification.</p>
            <p>Enter the 6 digit code from Google Authenticator.</p>
            <Form @submit="submitCode()" ref="regform" class="mt-4">
              <div class="form-group mb-0">
                <label class="labeltext" v-html="'Enter 2FA code'"></label>
                <Field type="text" class="form-control" id="" name="code" placeholder="Enter 2FA code" v-model="code" rules="required|min:6|numeric" />
                <ErrorMessage name="code" class="text-danger" />
                <div class="form-group d-flex align-items-center justify-content-between mt-4 pt-1">
                  <input type="submit" class="cap_btn large_btn mb-0" value="Submit" :class="pageLoader ? 'disabled' : ''" name="submitFrm" />
                  <p class="mb-0">
                    <a href="#" @click.prevent="div_show = '0'; code = ''" class="medium">Back to login</a>
                  </p>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-12" v-if="div_show == '1' && parseInt(fa_user_state.profile.gAuthenticatorEnabled) == 0">
        <two-fa :emailFlag="email" :passwordFlag="password" :mode="'login'"></two-fa>
      </div>
      <div class="col-12 col-md-5 d-none d-md-flex flex-column justify-content-center lightgrayBG" v-if="div_show == '0' || (div_show == '1' && parseInt(fa_user_state.profile.gAuthenticatorEnabled) == 1)">
        <div class="capital_login text-center">
          <img src="/assets/website/images/login-img.svg" class="mx-auto loginImg d-block" :alt="$env_var.productName" />
          <h5 class="pt-5 mb-2 mb-xl-3">Designed For Every Business</h5>
          <p>Sign up to explore the most reliable crypto payment <br class="d-none d-xl-block" />gateway to power up your business</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export const env11 = import.meta.env;
  import CryptoJS from "crypto-js";
  import * as types from "@/types";
  import { mapActions } from "vuex";
  import { Form, Field, ErrorMessage } from "vee-validate";
  import twoFa from "../security/security.vue";
  export default {
    name: "App-Login",
    data() {
      return {
        pageLoader: false,
        email: "",
        password: "",
        remember_me: false,
        show_pass: "password",
        entitySelect: "",
        div_show : '0',

        code : ''
      };
    },
    components: { twoFa, Form, Field, ErrorMessage },
    methods: {
      passwordIconChangeFunc(getMode, getType){
        if(getMode == 'password'){
          this.show_pass = getType
        }
      },
      ...mapActions({
        _runLogin: types.RUN_LOGIN,
        _runLoginWithHash: types.RUN_LOGIN_WITH_HASH,
        _runUserLogin2FA: types.RUN_USER_LOGIN_2FA
      }),
      submit() {
        if (this.pageLoader) { return; }
        if (this.remember_me) {
          var email = this.email;
          var password = this.password;
          this.$cookies.set("email", email, "14d");
          this.$cookies.set("password", password, "14d");
          this.$cookies.set("remember", true, "14d");
        } else {
          this.$cookies.set("email", null);
          this.$cookies.set("password", null);
          this.$cookies.set("remember", null);
        }
        const _that = this;
        let input_json = {
          globalParams: {
            email: _that.email,
            password: _that.password,
          },
          localParams: {
            parameter: _that,
          },
        };
        _that._runLogin(input_json);
      },
      submitCode() {
        if (this.pageLoader) {  return;  }
        const _that = this;
        let input_json = {
          globalParams: {
            google_token: _that.code.toString(),
            email: _that.email,
            password: _that.password,
          },
          localParams: {
            parameter: _that,
          },
        };
        _that._runUserLogin2FA(input_json);
      },
    },
    created() {
      // console.log('23 ===')
      // let value = 3760026453.079;
      //   console.log('uk',value.toLocaleString('en-GB',{ minimumFractionDigits: 8}))
      //   console.log('india',value.toLocaleString('en-IN', { minimumFractionDigits: 8}))
      const _that = this;
      if (this.$route.query.verify) {
        let verify = this.$route.query.verify;
        this.$router.replace({ query: "" });
        this._runLoginWithHash({ globalParams: {verify: verify}, localParams: {parameter: _that} });
      }
      let remember = this.$cookies.get("remember");
      if (remember == "true") {
        this.email = this.$cookies.get("email");
        this.password = this.$cookies.get("password");
        this.remember_me = true;
      } else {
        this.email = "";
        this.password = "";
        this.remember_me = false;
      }
    }
  };
</script>