<template>
  <div class="captail_wrap registrationSteps min-height-vh-100 position-relative fullLoader p-0 customMobile-layout-cls">
    <loader v-if="pageLoader"></loader>
    <div class="loginContainerss whiteWithShadow scrollbar lightgrayBG w-100">
      <div class="col-12 loginLogo">
        <div class="mtLogo pt-3 position-relative">
          <img width="170" src="/assets/website/images/logo.svg" alt="Logo" />
        </div>
      </div>
      <div class="row m-0 justify-content-center align-items-center h-100 forgotPassword">
        <div class="col-12 col-lg-5">
          <div class="restPass_form capitalLoginForm topSpace bg-white border round-sm p-4 min-height-for-login-form">
            <div class="lt-aler-message" v-if="notification_msg != ''">
              <alert-notification />
            </div>
            <!-- <div class="text-center" v-show="!displayMessage"><img width="60px" src="/assets/website/images/emailSend.png" class="mb-1 redt" :alt="$env_var.productName"></div> -->
            <div class="section_title text-center mb-4" v-show="!displayMessage">
              <h3 class="mt-1 mt-md-3">Reset Password</h3>
            </div>
            <div class="stepForm text-center" v-show="displayMessage">
              <div class="resendMail restPp text-center">
                <img src="/assets/website/images/group-9.svg" class="mb-1 successPaas" :alt="$env_var.productName" />
              </div>
              <p class="alert alert-success"> Password has been changed successfully. </p>
              <router-link class="cap_btn pl-3 pr-3 large_btn" to="/"> login </router-link>
            </div>
            <Form @submit="submit()" ref="regform">
              <div class="row" v-show="!displayMessage && !screen2fa">
                <div class="col-12">
                  <div class="form-group">
                    <div class="position-relative">
                      <label class="labeltext">New Password</label>
                      <div class="d-flex justify-content-between align-items-center px-2 border round-sm">
                        <Field :type="show_new_pass" class="form-control border-0 px-1" id="" name="newPass" placeholder=" " v-model="newPass" :rules="{ required , regex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,12}$/ }" />
                        <div class="mr-3">
                         <a href="javascript:void(0);" class="d-block"><feather type="eye" size="20px" v-if="show_new_pass === 'text'" class="d-block textcolor" @click="passwordIconChangeFunc('newPass','password')"></feather></a>
                         <a href="javascript:void(0);" class="d-block"><feather type="eye-off" size="20px" v-if="show_new_pass === 'password'" class="d-block textcolor" @click="passwordIconChangeFunc('newPass','text')"></feather></a>
                        </div>
                        <!-- <password-icon class="icon" v-model="show_new_pass"></password-icon> -->
                      </div>
                      <ErrorMessage name="newPass" class="text-danger" />
                      <!-- <span v-if="submitted" v-for="error in errors.collect('new')" class="text-danger">
                        <span class="text-danger" v-if="error == 'The new field is required'">New Password is required</span>
                        <span class="text-danger" v-if="error == 'The new field format is invalid'">Your password must contain minimum 6 and maximum 12 characters, and include at least 1 number, 1 uppercase character and 1 special character (!@#$%^)</span>
                      </span> -->
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label class="labeltext">Confirm New Password</label>
                    <div class="d-flex justify-content-between align-items-center px-2 border round-sm">
                      <Field :type="show_conf_pass" class="form-control border-0 px-1" id="" name="confirmPass" placeholder=" " v-model="confirmPass" rules="required|confirmed:newPass" />
                      <div class="mr-3">
                        <a href="javascript:void(0);" class="d-block"><feather type="eye" size="20px" v-if="show_conf_pass === 'text'" class="d-block textcolor" @click="passwordIconChangeFunc('confirmPass','password')"></feather></a>
                        <a href="javascript:void(0);" class="d-block"><feather type="eye-off" size="20px" v-if="show_conf_pass === 'password'" class="d-block textcolor" @click="passwordIconChangeFunc('confirmPass','text')"></feather></a>
                      </div>
                      
                      <!-- <password-icon class="icon" v-model="show_conf_pass"></password-icon> -->
                    </div>
                    <ErrorMessage name="confirmPass" class="text-danger" />
                    <!-- <span v-if="submitted" v-for="error in errors.collect('confirm')" class="text-danger"><span class="text-danger" v-if="error == 'The confirm field is required'">Confirm New Password field is required</span><span class="text-danger" v-if="error == 'The confirm confirmation does not match'">does not match with new Password</span></span> -->
                  </div>
                </div>
                <!--<div class="col-12"><div class="form-group"><input type="text" class="form-control otpPad" name="otp" v-model="otp" v-validate="'required'"><label class="labeltext">Google Authenticator Code</label><input type="submit" class="mt-3 sendCode cap_btn pl-3 pr-3 large_btn" value="SEND CODE"><span v-show="submitted && errors.has('otp')" class="text-danger">Google Authenticator Code is required</span></div></div>-->
                <div class="col-12 text-center mt-2 mb-4 d-block d-md-flex align-items-center justify-content-between">
                  <input type="submit" class="cap_btn pl-3 pr-3 large_btn" value="Update" />
                  <router-link :to="'/'" class="mt-3 mt-md-0 d-block semibold">Back To Sign In</router-link>
                </div>
                <div class="col-12">
                  <p class="lightyellowbg py-3 px-4 mb-0 round-sm">
                    <strong>Note:</strong> For security purposes NO withdrawals are permitted for 24 hours after modification of security methods.
                  </p>
                </div>
              </div>
            </Form>
            <Form @submit="submit()" ref="regform" class="two-fa-form-style">
              <div class="row" v-show="!displayMessage && screen2fa">
                <div class="col-12">
                  <div class="form-group">
                    <div class="position-relative">
                      <label class="labeltext w-100 text-center mb-4">Enter the 6 digit code from Google Authenticator.</label>
                      <div class="position-relative">
                        <Field type="text" class="form-control" id="" name="Otp" placeholder="Enter 2FA code" v-model="Otp" rules="required|min:6|numeric" />
                        <ErrorMessage name="Otp" class="text-danger" />
                      </div>
                      <!-- <span v-show="submitted && errors.has('Otp')" class="text-danger">{{errors.first('Otp')}}</span> -->
                      <div class="form-group text-right mt-2">
                        <span>Back To <router-link :to="'/'">Login ?</router-link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 d-flex align-items-center justify-content-between my-4 prev-update-btn-row">
                  <input type="submit" class="cap_btn" value="Previous" @click="screen2fa = false" />
                  <input type="submit" class="cap_btn" value="Update" />
                </div>
                <div class="col-12">
                  <p class="lightyellowbg py-3 px-4 mb-0 round-sm">
                    <strong>Note:</strong> For security purposes NO withdrawals are permitted for 24 hours after modification of security methods.
                  </p>
                </div>
              </div>
            </Form>
          </div>
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
        Otp: "",
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
      passwordIconChangeFunc(getMode, getType){
        if(getMode == 'newPass'){
          this.show_new_pass = getType
        }else if(getMode == 'confirmPass'){
          this.show_conf_pass = getType
        }
      },
      ...mapActions({
        _runResetPasswordFromHash: types.RUN_RESET_PASSWORD_FROM_HASH,
      }),
      submit() {
        const _that = this;
        _that.submitted = true;
        if (_that.screen2fa) {
          let input_json = {
            globalParams: {
              password: _that.newPass,
              cpassword: _that.confirmPass,
              hash: _that.hash,
              otp: _that.Otp,
            },
            localParams: {
              parameter: _that
            },
          };
          _that._runResetPasswordFromHash(input_json);
        } else {
          _that.screen2fa = true;
          _that.submitted = false;
          _that.Otp = "";
        }
      },
    },
    created() {
      // console.log('this.$route.params==>  ',this.$route.params)
      this.hash = this.$route.params.hash;
    },
  };
</script>