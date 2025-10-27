<template>
  <div class="loginLoader h-100 scrollVertical scrollbar">
    <loader v-if="pageLoader"></loader>
    <div class="row h-100">
      <div class="col-12 col-md-7">
        <div class="capitalLoginForm d-flex flex-column justify-content-center h-100 hAuto">
            <img src="/assets/website/images/logo.svg" alt="Logo" width="240" class="loginLogo d-block text-center pb-0 pb-sm-4 pt-4" />
            <h2 class="text-center mb-0 mt-3 mt-sm-0">Welcome Back!</h2>
            <div class="lt-aler-message" v-if="notification_msg != ''">
              <alert-notification />
            </div>
            <Form @submit="submit()" ref="regform" class="mt-4">
              <div class="form-group">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="labeltext mb-0">User Name</label>
                </div>
                <div class="position-relative">
                  <input type="text" placeholder="" class="form-control" v-model="entity_name" disabled />
                </div>
              </div>
              <div class="form-group">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="labeltext mb-0">Email Address</label>
                </div>
                <div class="position-relative">
                  <input type="text" placeholder="" class="form-control" v-model="email" disabled />
                </div>
              </div>
              <div class="form-group">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="labeltext mb-0">Set New Password</label>
                </div>
                <div class="d-flex justify-content-between align-items-center border round-sm" :class="password != '' ? 'password' : ''">
                  <Field :type="show_pass" class="form-control border-0" id="" name="password" placeholder=" " v-model="password" :rules="{ required , regex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,12}$/ }" />
                  <div class="mr-3">
                   <a href="javascript:void(0);" class="d-block"><feather type="eye" size="20px" v-if="show_pass === 'text'" class="d-block textcolor" @click="passwordIconChangeFunc('password','password')"></feather></a>
                    <a href="javascript:void(0);" class="d-block"><feather type="eye-off" size="20px" v-if="show_pass === 'password'" class="d-block textcolor" @click="passwordIconChangeFunc('password','text')"></feather></a>
                  </div>
                  <!-- <password-icon class="ico"  :type="show_pass" :varName="'show_pass'"></password-icon> -->
                </div>
                <ErrorMessage name="password" class="text-danger" />
              </div>
              <div class="form-group">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="labeltext mb-0">Confirm New Password</label>
                </div>
                <div class="d-flex justify-content-between align-items-center border round-sm" :class="password != '' ? 'password' : ''">
                  <Field :type="show_conf_pass" class="form-control border-0" id="confirmPass" name="confirmPass" placeholder=" " v-model="confirmPass" rules="required|confirmed:password" />
                  <div class="mr-3">
                    <a href="javascript:void(0);" class="d-block"><feather type="eye" size="20px" v-if="show_conf_pass === 'text'" class="d-block textcolor" @click="passwordIconChangeFunc('confirmPass','password')"></feather></a>
                    <a href="javascript:void(0);" class="d-block"><feather type="eye-off" size="20px" v-if="show_conf_pass === 'password'" class="d-block textcolor" @click="passwordIconChangeFunc('confirmPass','text')"></feather></a>
                  </div>
                  <!-- <password-icon class="ico" :value="show_conf_pass" :type="'show_conf_pass'"></password-icon> -->
                </div>
                <ErrorMessage name="confirmPass" class="text-danger" />
              </div>
              <div class="form-group text-center mt-4">
                <input type="submit" class="cap_btn large_btn" value="Sign Up" name="submitFrm" :class="pageLoader ? 'disabled' : ''" />
              </div>
              <div class="form-group d-flex justify-content-center mb-0 mob-center">
                <p>Don’t have an account ? <router-link :to="'/register'" class="semibold themecolor">Sign Up Now</router-link>
                </p>
              </div>
              
            </Form>
            <div class="bottomContent authorizedText">
              <p class="text-center">Authorized and Regulated Entities:<br />
                <a href="javascript:void(0);" class="textcolor" data-toggle="modal" data-target="#capital-wallet-global">Capital Wallet Global</a> | <a href="https://client.capitalwallet.com/" class="semibold active" data-toggle="modal" data-target="#capital-wallet-apac">Capital Wallet APAC</a>
              </p>
            </div>
          </div>
      </div>
      <div class="col-12 col-md-5 d-none d-md-flex flex-column justify-content-center lightgrayBG">
        <div class="capital_login text-center">
          <img src="/assets/website/images/login-img.svg" class="mx-auto loginImg d-block" :alt="$env_var.productName" />
          <h5 class="pt-5 mb-2 mb-xl-3">Designed For Every Business</h5>
          <p>Sign up to explore the most reliable crypto payment <br class="d-none d-xl-block" /> gateway to power up your business</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import passwordIcon from '../../components/shared/password_icon.vue'
  import settingsMixins from "@/plugins/settings";
  import {
    Form,
    Field,
    ErrorMessage
  } from "vee-validate";
  export default {
    name: "App-Login",
    mixins: [settingsMixins],
    data() {
      return {
        pageLoader: false,
        notification_msg: "",
        notification_type: "",
        submitted: false,
        password: "",
        confirmPass: "",
        show_pass: "password",
        show_conf_pass: "password",
        hash: "",
        entity_name: "",
        email: "",
      };
    },
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    methods: {
      passwordIconChangeFunc(getMode, getType){
        if(getMode == 'password'){
          this.show_pass = getType
        }else if(getMode == 'confirmPass'){
          this.show_conf_pass = getType
        }
      },
      submit() {
        const _that = this;
        // console.log("invitation====> ", _that.hash);
        // _that.submitted = true;
        let input_json = {
          globalParams: {
            "parent_user": {
                "id": _that.getInvitationData.parent_user.id,
                "email": _that.getInvitationData.parent_user.email,
                "username": _that.getInvitationData.parent_user.username
            },
            hash: _that.hash,
            password: _that.password,
          },
          localParams: {
            parameter: _that,
          },
        };
        // console.log("invitation====> ", input_json);
        _that._runRegisterUserByInviteLink(input_json);
      },
    },
    created() {
      // console.log('invitation====> ',this.$route.query)
      this.hash = this.$route.query.hash;
      // console.log('invitation====> ',this.$route.query.hash)
      this.$router.replace({
        query: ""
      });
      this._runGetInvitationData({
        globalParams: {
          hash: this.hash
        },
        localParams: {
          parameter: this
        },
      });
    },
  };
</script>