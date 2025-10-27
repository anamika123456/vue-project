<template>
  <div class="fullLoader p-0 scrollVertical scrollbar">
    <loader v-if="pageLoader"></loader>
    <div class="capitalLoginForm">
      <img src="/assets/website/images/logo.svg" alt="Logo" class="loginLogo d-block text-center pb-0 pb-sm-4 pt-4" width="240" />
      <h2 class="text-center pt-2 pb-2">Register Your Account</h2>
      <Form @submit="submit()" ref="regform" class="mt-4">
        <div class="form-group">
          <label class="labeltext">Email Address</label>
          <div class="position-relative justify-content-between align-items-center">
            <input placeholder="" :value="step2.email" type="text" class="form-control" disabled />
            <feather type="check" class="ico green mr-3" size="20px"></feather>
          </div>
        </div>
        <div class="form-group">
          <label class="labeltext">Create Password</label>
          <div class="d-flex justify-content-between align-items-center border round-sm" :class="password != '' ? 'password' : ''">
            <Field :type="show_create_pass" class="form-control border-0" name="password" placeholder=" " v-model="password" :rules="{ required : true , regex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,12}$/ }" />
            <div class="mr-3">
              <a href="javascript:void(0);" class="d-block">
                <feather type="eye" size="20px" v-if="show_create_pass === 'text'" class="d-block textcolor" @click="passwordIconChangeFunc('password','password')"></feather>
              </a>
              <a href="javascript:void(0);" class="d-block">
                <feather type="eye-off" size="20px" v-if="show_create_pass === 'password'" class="d-block textcolor" @click="passwordIconChangeFunc('password','text')"></feather>
              </a>
            </div>
          </div>
          <ErrorMessage name="password" class="text-danger" />
          <div class="successMessage-report pt-3">
            <div class="charactersMessage">
              <p class="mb-1">Your password must have</p>
              <ul class="flex-wrap d-flex justify-content-between align-items-center">
                <li :class="testing('capital') ? 'text-success' : ''"> * 1 uppercase character </li>
                <li :class="testing('length') ? 'text-success' : ''"> * 8 or more characters </li>
                <li :class="testing('Number') ? 'text-success' : ''"> * Number </li>
                <li :class="testing('Letters') ? 'text-success' : ''"> * Letters </li>
                <li :class="testing('Special_char') ? 'text-success' : ''"> * Special characters </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="labeltext">Confirm Password</label>
          <div class="d-flex justify-content-between align-items-center border round-sm" :class="confirm_password != '' ? 'password' : ''">
            <Field :type="show_conf_pass" class="form-control border-0" name="confirm_password" placeholder=" " v-model="confirm_password" rules="required|confirmed:password" />
            <div class="mr-3">
              <a href="javascript:void(0);" class="d-block">
                <feather type="eye" size="20px" v-if="show_conf_pass === 'text'" class="d-block textcolor" @click="passwordIconChangeFunc('confirm_password','password')"></feather>
              </a>
              <a href="javascript:void(0);" class="d-block">
                <feather type="eye-off" size="20px" v-if="show_conf_pass === 'password'" class="d-block textcolor" @click="passwordIconChangeFunc('confirm_password','text')"></feather>
              </a>
            </div>
          </div>
          <ErrorMessage name="confirm_password" class="text-danger" />
        </div>
        <div class="submitButton text-center mt-3 mt-md-5">
          <input type="submit" class="cap_btn px-4 large_btn" value="Create Account" :class="pageLoader ? 'disabled' : ''" />
          <p class="mt-4"> Already have an account? <router-link to="/" class="bold">Sign In</router-link>
          </p>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
  import { Const } from "@/plugins/registerSteps/provider/lib/const.cls.ts";
  import { registerStepsMixins } from "@/plugins/registerSteps";
  import { Form, Field, ErrorMessage } from "vee-validate";


  // import { inject } from 'vue' ;
  // import CryptoJS from 'crypto-js' ;

  // const cryptojs = inject('cryptojs') as typeof CryptoJS ;
  export default {
    name: "step-three",
    mixins: [registerStepsMixins],
    data() {
      return {
        password: "",
        confirm_password: "",
        pageLoader: false,
        submitted: false,
        show_create_pass: "password",
        show_conf_pass: "password",
      };
    },
    components: { Form, Field, ErrorMessage },
    methods: {
      passwordIconChangeFunc(getMode, getType) {
        if (getMode == 'password') {
          this.show_create_pass = getType
        } else if (getMode == 'confirm_password') {
          this.show_conf_pass = getType
        }
      },
      testing(type) {
        var num = /[0-9]/g;
        var Lett = /[a-z A-Z]/g;
        var uppercase = /[A-Z]/g;
        var Special_char = /[!@#$%^*]/g;
        if (type == "length") {
          return this.password.length >= 8;
        } else if (type == "Number") {
          return num.test(this.password);
        } else if (type == "Letters") {
          return Lett.test(this.password);
        } else if (type == "Special_char") {
          return Special_char.test(this.password);
        } else if (type == "capital") {
          return uppercase.test(this.password);
        }
      },
      submit() {
        if (this.pageLoader) {
          return;
        }
        const _that = this;
        const ENC_KEY = "F*V(I)e^E#1108@3" ;
        const encryptedPassword = this.$CryptoJS.AES.encrypt(_that.password, ENC_KEY).toString()

        let input_json = {
          globalParams: {
            otp: _that.step3.otp,
            transaction_id: _that.step3.transaction_id,
            hash: _that.step3.hash,
            password: _that.password,
          },
          localParams: {
            parameter: _that
          },
        };
        // console.log('input_json ==> ',input_json)
        _that._runStep3(input_json);
      },
    },
    created() {
      if (localStorage.getItem("step2")) {
        this.$store.commit(Const.SET_STEP2, JSON.parse(localStorage.getItem("step2")));
      }
      if (localStorage.getItem("step3")) {
        this.$store.commit(Const.SET_STEP3, JSON.parse(localStorage.getItem("step3")));
      } else {
        this.$router.replace("/register");
      }
    },
  };
</script>