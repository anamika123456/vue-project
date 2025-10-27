<template>
  <div class="welcomeWrap scrollVertical scrollbar">
    <loader v-if="pageLoader"></loader>
    <div class="inner-box">
        <div class="row align-items-center">
            <div class="col-lg-5">
                <div class="content-sec pl-lg-2 pb-5 pb-xl-5">
                    <h2 class="mb-3 bold">Your Crypto Debit Card is Ready!</h2>
                    <p class="mb-2"><span class="bold">Great news! Your Crypto Debit Virtual Card</span> option is now activated. To start using it, follow these quick steps:</p>

                    <ul class="bullet-type themecolor mb-2">
                        <li class="mb-2">Log In to your account. </li>
                        <li>Complete KYC Verification to unlock your card.</li>
                    </ul>

                    <router-link class="cap_btn large_btn mt-4 helpTopicsBtn mb-0 px-4" :to="'/'"> Log In & Complete KYC Now</router-link>

                    <p class="my-4 textcolor">Need help? Contact us at <a class="secondarycolor" href="mailto:support@capitalwallet.com">support@capitalwallet.com</a></p>
                </div>
            </div>
            <div class="col-lg-7">
                <div class="img-wrap">
                    <img class="img-fluid d-block" src="/assets/website/images/no-cards-img.png">
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
  // import passwordIcon from '../../components/shared/password_icon.vue'
  import settingsMixins from "@/plugins/settings";
  import { cardsMixins } from "@/plugins/cards";
  import {
    Form,
    Field,
    ErrorMessage
  } from "vee-validate";
  export default {
    name: "App-Login",
    mixins: [settingsMixins,cardsMixins],
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
      invitationRoleFunc(){
         this._runMultiUserRoleUpdate({
          globalParams: {
            "user_id": this.getInvitationData.user_id,
            "role_id" : "11",
            "email": this.getInvitationData.email
          },
          localParams: {
            parameter: this
          },
        });
      }
    },
    created() {
      this.hash = this.$route.query.hash
      const decodedHash = decodeURIComponent(this.hash);
      this.$router.replace({
        query: ""
      });
      this._runGetInvitationData({
        globalParams: {
          hash: this.hash
        },
        localParams: {
          parameter: this , 'page' : 'RoleInvite'
        },
      });
    },
  };
</script>