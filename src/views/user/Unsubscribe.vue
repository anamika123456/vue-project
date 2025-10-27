<template>
  <div class="loginLoader h-100 scrollVertical scrollbar">
    <loader v-if="pageLoader"></loader>
    <div class="row h-100">
      <div class="col-12 col-md-7">
        <div class="capitalLoginForm d-flex flex-column justify-content-center h-100 hAuto">
            <img src="/assets/website/images/logo.svg" alt="Logo" width="240" class="loginLogo d-block text-center pb-0 pb-sm-4 pt-4" />
            <h2 class="text-center mb-0 mt-3 mt-sm-0">You’ve Successfully Unsubscribed</h2>
            
            <div class="bottomContent authorizedText">
              <p class="text-center">We're sorry to see you go!<br />
                You have been successfully unsubscribed from our email list and will no longer receive updates or notifications from Capital Wallet.<br />

                If this was a mistake, or if you'd like to resubscribe in the future, feel free to rejoin anytime through your account settings or contact our support team for assistance.<br />
                <router-link :to="{path: '/unsubscribe'}" class="semibold active" data-toggle="modal" data-target="#capital-wallet-apac">Thank you for being part of our community!</router-link>
              </p>
            </div>
          </div>
      </div>
      <div class="col-12 col-md-5 d-none d-md-flex flex-column justify-content-center lightgrayBG" >
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
  import settingsMixins from "@/plugins/settings";
  export default {
    name: "App-Login",
    mixins: [settingsMixins],
    data() {
      return {
        pageLoader: false
      };
    },
    methods: {
      submit() {
        const _that = this;
        let input_json = {
          globalParams: {
            hash: _that.hash
          },
          localParams: {
            parameter: _that,
          },
        };
        _that._runUnsubscribeUserByLink(input_json);
      },
    },
    created() {
      this.hash = this.$route.query.hash;
      this.$router.replace({query: ""});
      this.submit()
    },
  };
</script>