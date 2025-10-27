<template>
  <div>
    <loader v-if="pageLoader"></loader>
    <div class="addCards bg-white round-sm border apply mh-calc">
      <h4 class="mb-4 pb-3 border-bottom">Apply Card</h4>
      <!-- <form class=""> -->
        <div class="d-flex align-items-start justify-content-between flex-wrap select-card-type mb-4 py-3" v-if="!cardPermission()">
          <div class="d-flex align-items-start flex-wrap inner-items">
              <div class="radio-wrap border round-sm">
                  <label class="customRadioButton d-flex">
                      <div class="mb-0 destinationRadio">
                      <input type="radio" name="role" v-model="cardType" value="own" disabled />
                      <span class="checkmark"></span>
                      </div>
                      <div class="mb-0">
                      <h6 class="medium mb-0">Own Card</h6>
                      <p class="textcolor mb-0 pt-1">
                          Seamless access to company funds for business-related expenses.
                      </p>
                      </div>
                  </label>
              </div>
              <div class="radio-wrap border round-sm">
                  <label class="customRadioButton d-flex">
                      <div class="mb-0 destinationRadio">
                      <input type="radio" name="role" v-model="cardType" value="team" disabled />
                      <span class="checkmark"></span>
                      </div>
                      <div class="mb-0">
                      <h6 class="medium mb-0">Team Card</h6>
                      <p class="textcolor mb-0 pt-1">
                          Seamless access to company funds for business-related expenses.
                      </p>
                      </div>
                  </label>
              </div>
          </div>
          <RouterLink v-if="cardType == 'team'" class="cap_btn large_btn mt-1" to="/send-invite">Invite User</RouterLink> 
        </div>
        <div class="mw-870" >
          <div class="row">
            <div class="col-md-6 col-lg-6"> 
                <div class="form-group">
                    <label class="labeltext">First Name <span class="red">*</span></label>
                    <input type="text" placeholder="Sample Name" class="form-control"  :value="card_users_by_id.first_name" readonly>
                </div>
            </div>
            <div class="col-md-6 col-lg-6">
                <div class="form-group">
                    <label class="labeltext">Last Name <span class="red">*</span></label>
                    <input type="text" placeholder="Sample Name" class="form-control" :value="card_users_by_id.last_name" readonly >
                </div>
            </div>
            <div class="col-md-6 col-lg-6">
              <div class="form-group">
                <label class="labeltext">Email Address <span class="red">*</span></label>
                <div class="verifybtn-wrap">
                  <input type="email" placeholder="jessicacesey@company.com" class="form-control" v-model="email" disabled>
                  <button class="verifybtn btn" v-if="parseInt(card_users_by_id.steps) == 1" @click="innerDiv= 'emailOtp'">Verify</button>
                  <span class="green verifybtn text-decoration-none" v-if="parseInt(card_users_by_id.steps) == 2">Verified</span> 
                </div>
              </div>
            </div>
            
            <div class="col-md-6 col-lg-6">
              <div class="form-group">
                <label class="labeltext">Mobile Number <span class="red">*</span></label>
                <div class="verifybtn-wrap phnWrap">
                    <!-- <input type="tel" placeholder="" class="form-control" v-model="phno" > -->
                    <vue-tel-input @input="onInput" :value="phno"  mode="international" :class="form-control" :placeholder="parsedPlaceholder" disabled></vue-tel-input>
                    <button class="verifybtn btn" v-if="parseInt(card_users_by_id.steps) == 2" @click="innerDiv= 'mobileOtp'">Verify</button>
                    <!-- <button class="verifybtn btn">Verify</button> -->
                    <!-- <span class="green verifybtn text-decoration-none">Verified</span> -->
                </div>
               <!--  <div class="verifybtn-wrap">
                  <input type="tel" placeholder="" class="form-control" v-model="phno" >
                </div> -->
              </div>
            </div>

          </div>
        </div>
        <input type="button" value="Confirm" class="cap_btn large_btn mt-1 fixBtn disabled"   />
      <!-- </form> -->
    </div>
    
    <div class="modal" tabindex="-1" id="email-verification" role="dialog" aria-labelledby="email-verification" aria-hidden="false"  v-if="innerDiv != ''">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <!-- <Form> -->
              <div class="modal-header border-0 d-block text-right">
                  <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="innerDiv = '', otp = ''">
                  <feather type="x" size="22px"></feather>
                  </a>
              </div>
              <div class="modal-body pt-4">
                  <div class="mb-4">
                      <img src="/assets/website/images/otpVerification.png" alt="Google Authentication" class="d-block m-auto" width="96" height="96" />
                      <h6 class="themecolor mt-4 mb-3 text-center">OTP Verification</h6>
                      <p class="mb-2 text-center">{{(innerDiv == 'emailOtp') ? 'A One-Time OTP has been sent to your email address.' : ' A One-Time OTP has been sent to your mobile number.'}}</p>
                  </div>
                  <div class="mb-4">
                  <div class="form-group">
                      <div class="position-relative">
                      <input type="text" placeholder="Enter OTP"  class="form-control" name="otp" v-model="otp" />
                      </div>
                  </div>
              </div>
              <div class="btns-sec text-center">
                  <input type="button"  class="cap_btn large_btn mb-0 mb-5" value="Submit" data-toggle="modal" :class="pageLoader ? 'disabled' : ''" data-target="#fa-update-keys"   @click="(innerDiv == 'emailOtp')? sendEmailOtpFunc() : sendMobileOtpFunc() "  />
              </div>
              <p class="mb-2 text-center">OTP not received? <a href="javascript:void(0);" class="mb-0 greylink" @click="(innerDiv == 'emailOtp')? resendEmailOtpFunc() : resendMobileOtpFunc() ">Resend</a></p>
              </div>
            <!-- </Form> -->
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
        cardType: 'own',
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
      if(this.$route.query.userId){
        this.getAllCardUsersFunc(this.card_users_by_id.str_user_id, 2)
      }else{
        this.getAllCardUsersFunc(this.$parent.userId, 2)
      }
    }
  };
</script>