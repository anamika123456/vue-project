<template>
  <div>
    <loader v-if="pageLoader"></loader>
    <div  class="mt-4" >
      <div  class="verificationContent bg-white border round-md">
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group">
              <label class="labeltext">Email <span class="required">*</span>
              </label>
              <input type="email" class="form-control" id="" name="email" placeholder=" " v-model="email"  disabled />
              <ErrorMessage name="email" class="text-danger" />
            </div>
          </div>
          <div class="col-12" v-if="parseInt(card_users_by_id.steps) == 1">
            <div class="text-right border-top mt-2 mt-lg-3 pt-4">
              <input type="button" value="Send OTP By Email" class="cap_btn large_btn mb-0" @click="innerDiv= 'emailOtp'" />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label class="labeltext">Phone Number <span class="required">*</span>
              </label>
              <input type="text" class="form-control" id="" name="phno" placeholder=" " v-model="phno" disabled  />
              <ErrorMessage name="phno" class="text-danger" />
            </div>
          </div>

          <div class="col-12" v-if="parseInt(card_users_by_id.steps) == 2">
            <div class="text-right border-top mt-2 mt-lg-3 pt-4">
              <input type="button" value="Send OTP By SMS" class="cap_btn large_btn mb-0" @click="innerDiv= 'mobileOtp'" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" tabindex="-1" id="device-manager-add-ip-address" role="dialog" aria-labelledby="device-manager-add-ip-address" v-if="innerDiv != ''"> 
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content googleAuthenticationModal">
            <div class="modal-header border-0 d-block text-right">
              <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="innerDiv = '', otp = ''">
                <feather type="x" size="22px"></feather>
              </a>
            </div>
            <div class="modal-body pt-0">
              <div class="mb-4">
                <img src="/assets/website/images/google-authenticator.png" alt="Google Authentication" class="d-block m-auto" width="96" height="96" />
                <h6 class="themecolor mt-4 mb-0 text-center" >OTP Verification</h6>
                <h6 class="themecolor mt-4 mb-0 text-center" >{{(innerDiv == 'emailOtp') ? 'A One-Time OTP has been sent to your email address' : ' A One-Time OTP has been sent to your mobile number'}}</h6>
              </div>
              <div class="mb-4">
                <div class="form-group">
                  <div class="position-relative">
                    <input type="text" class="form-control" id="" name="otp" placeholder="Enter OTP" v-model="otp"  />
                    <ErrorMessage name="otp" class="text-danger" />
                  </div>
                </div>
              </div>
              <div class="mb-4">
                <div class="form-group">
                  <div class="position-relative">
                    <a href="#" class="px-4 mb-0"   @click="(innerDiv == 'emailOtp')? resendEmailOtpFunc() : resendMobileOtpFunc() " > Resend OTP</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-center pt-4 border-0">
              <input type="button" class="cap_btn px-4 large_btn mb-0" value="Submit" data-toggle="modal" :class="pageLoader ? 'disabled' : ''" data-target="#fa-update-keys"   @click="(innerDiv == 'emailOtp')? sendEmailOtpFunc() : sendMobileOtpFunc() "  />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { cardsMixins } from "@/plugins/cards";
  export default {
    name: "step-four",
    mixins: [cardsMixins],
    data() {
      return {
        pageLoader: false,
        email : '',
        phno : '',

        otp : '',
        innerDiv: '',
      };
    },
    methods: {
      getAllCardUsersFunc(userId,getStep){
        let input_json = {
          'globalParams': {
            "userId": userId
          },
          'localParams': { "parameter": this, "steps": getStep }
        }
        this._runGetCardUserById(input_json)
      },
      sendEmailOtpFunc(){
        let input_json = {
          'globalParams': {
            "userId": this.card_users_by_id.str_user_id,
            "verificationId": this.otp
          },
          'localParams': {
            "parameter": this, "steps" : 2
          }
        }
        this._runVerifyCardEmail(input_json)
      },
      sendMobileOtpFunc(){
        let input_json = {
          'globalParams': {
            "userId": this.card_users_by_id.str_user_id,
            "verificationCode": this.otp
          },
          'localParams': {
            "parameter": this, "steps" : 3
          }
        }
        this._runVerifyCardMobile(input_json)
      },

      resendEmailOtpFunc(){
        let input_json = {
          'globalParams': {
            "userId": this.card_users_by_id.str_user_id,
          },
          'localParams': {
            "parameter": this, "steps" : 2
          }
        }
        this._runResendCardEmail(input_json)
      },
      resendMobileOtpFunc(){
        let input_json = {
          'globalParams': {
            "userId": this.card_users_by_id.str_user_id,
          },
          'localParams': {
            "parameter": this, "steps" : 3
          }
        }
        this._runResendCardMobile(input_json)
      },
    },
    created(){
      this.getAllCardUsersFunc(this.card_users_by_id.str_user_id, 2)
    }
  };
</script>