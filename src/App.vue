<template>
  <!--dev-->
  <div class="h-100 d-flex flex-column justify-content-center">
    <notifications /> {{ sessionTimeOut }}
    <div class="sessionExpired" v-if="permissiondenied">
      <div class="sessionExpiredBox round-sm">
        <img src="/assets/website/images/sessionOut.svg" alt="session expired" width="170" height="166" /><p class="my-3">This operation cannot be performed by the role assigned to you due to lack of permission.</p>
        <a role="menuitem" class="cap_btn" tabindex="-1" href="#" @click.prevent="permissiondenied = false">Ok</a>
      </div>
    </div>

    <div class="sessionExpired" v-if="permissiondeniedForUnverifiedUser">
      <div class="sessionExpiredBox round-sm">
        <img src="/assets/website/images/sessionOut.svg" alt="session expired" width="170" height="166" /><p class="my-3">This page will be accessible once your account is activated.</p>
        <a role="menuitem" class="cap_btn" tabindex="-1" href="#" @click.prevent="permissiondeniedForUnverifiedUser = false">Ok</a>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
  import * as types from "@/types";
  import { mapActions } from "vuex";
  // const clm = require('country-locale-map'); 
  export default {
    name: "App",
    data() {
      return {
        pageLoader: false,
        walletSessionTimeOut: false,
        permissiondenied : false,
        permissiondeniedForUnverifiedUser : false,

        getCountryfromIp : 'en-IN'
      };
    },
    computed: {
      sessionTimeOut() {
        if (localStorage.getItem("walletSessionTimeOut")) {
          this.walletSessionTimeOut = localStorage.getItem( "walletSessionTimeOut" );
        }
      },
    },
    methods: {
      getCountryLocale(getCountryCode){
        // let getCountryfromIp = clm.getLocaleByAlpha2(getCountryCode);
        this.getCountryfromIp = getCountryCode; //(getCountryfromIp.includes("_")) ? getCountryfromIp.replace("_", "-") : getCountryfromIp;
        // console.log('html===',this.getCountryfromIp);
      },
      ...mapActions({
        _runCountryList: types.RUN_COUNTRY,
      }),
      logout() {
        localStorage.clear();
        window.location.replace("/");
      },
    },

    created() {
      const _that = this ; 
      this._runGetActivityCategories({ globalParams: { parent_id: "0" }, localParams: { parameter: this, activity_type: "parent" }, });
      this._runGetCountryIp({ globalParams: {}, localParams: { parameter: this, 'link': 'country'}});
      this._runCountryList({ globalParams: {}, localParams: { parameter: this }, });
    },
  };
</script>
<style>
  @import "/assets/website/css/fonts.css";
  @import "/assets/website/css/bootstrap.min.css";
  @import "/assets/website/css/jquery.dataTables.min.css";
  @import "/assets/website/css/style.css";
  @import "/assets/website/css/responsive.css";
</style>
