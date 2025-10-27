import Vue from "vue";
import { Const } from "./provider/lib/const.cls";
import * as Types from "../../types";
import { mapActions } from "vuex";
import { commonAll } from "./lib/commonAll.cls";
import * as commonAllStoreExtensions from "./provider/";
import moment from "moment";
import { formatPriceCommon } from "../../store/commomFunction";

const state = {
  ...commonAllStoreExtensions.stateExt,
};
const actions = {
  ...commonAllStoreExtensions.actionsExt,
};
const mutations = {
  ...commonAllStoreExtensions.mutationsExt,
};
const getters = {
  ...commonAllStoreExtensions.gettersExt,
};
// new store module definition
const commonAllStore = {
  state,
  actions,
  mutations,
  getters,
};
// main mixin to load the new store module
export const commonAllmixins = {
  created() {
    const _store = this.$store;
    if (
      !(_store && _store.state && _store.state[commonAll.STORE_MODULE_NAME])
    ) {
      try {
        this.$store.registerModule(commonAll.STORE_MODULE_NAME, commonAllStore);
      } catch (error) {}
    }
  },
  methods: {
    ...mapActions({
      _runGenerate2FaQrcode: Const.RUN_GENERATE_2FA_QRCODE,
      _runWalletCurrencyJsonList: Const.RUN_WALLET_CURRENCY_JSON_LIST,
      _runVerify2FaQrcode: Const.RUN_VERIFY_2FA_QRCODE,
      _runMultiUserUpdate: Const.RUN_MULTI_USER_UPDATE,
      _runDisable2FaQrcode: Const.RUN_DISABLE_2FA_QRCODE,
      _runGetActivityCategories: Const.RUN_GET_ACTIVITY_CATEGORIES,

      _runGetProfileInfo: Const.RUN_GET_PROFILE_INFO,

      _runGetPaymentMethods: Const.RUN_GET_PAYMENT_METHODS,
      //===================trading Account=================

      _runGetApiKeys: Const.RUN_GET_API_KEYS,
      _runUpdateApiKey: Const.RUN_UPDATE_API_KEYS,
      _runUpdateApiWebook: Const.RUN_UPDATE_API_WEBOOK,
      _rungetWalletMargin: Const.RUN_GET_WALLET_MARGIN,
      _runConfirmWalletTransaction: Const.RUN_CONFIRM_WALLET_TRANSACTION,
      _runGetCryptoAddresses: Const.RUN_GET_CRYPTO_ADDRESSES,
      _runGetBankAddresses: Const.RUN_GET_BANK_ADDRESSES,
      //===================== WATCH LIST ===================
      _runGetWatchList: Const.RUN_GET_WATCH_LIST,

      _runGetNewsList: Const.RUN_GET_NEWS_LIST,
      _runGetCountryIp: Const.RUN_GET_COUNTRY_IP
    }),

    cardPermission(){
      if(this.get_user.permissions.includes('TEAM_CARD')){
        return true;
      }else{
        return false;
      }
    },

    cardPermissionLeft(){
      let roles = [];
      if(this.get_user.roles.includes(",")){
        roles = this.get_user.roles.split(',')
      }else{
        roles.push(this.get_user.roles)
      }
      if(roles.length == 1 && roles == 'TC'){
        return true;
      }else{
        return false;
      }
    },
    userRolePermission(getData, getRoute, getPageName){ 
      if(
        ((this.envFile.VITE_ENTITY_NAME == 'au' && getRoute.path != '/settings' && getRoute.path != '/help-centre' && getRoute.path != '/dashboard') || 
        (this.envFile.VITE_ENTITY_NAME == 'dmcc' && getRoute.path != '/settings' && getRoute.path != '/help-centre' && getRoute.path != '/dashboard' && getRoute.path != '/deposits' && getRoute.path != '/transaction-history')) 
        && parseInt(this.get_user.is_registered) < 5){
        // console.log('1nnnnnnnn ')
        this.$root.permissiondeniedForUnverifiedUser = true
      }else if(getPageName != undefined && getPageName == 'conversion'){
        if(parseInt(this.get_user.settings.conversion) == 1 && parseInt(this.get_user.is_registered) == 5){
          this.$router.push(getRoute)
        }else{
          this.$root.permissiondenied = true
        }
      }else{
        let permissionAssignedToUser = [] ;
        if(this.get_user.permissions.includes(",")){
          permissionAssignedToUser = this.get_user.permissions.split(',')
        }else{
          permissionAssignedToUser.push(this.get_user.permissions)
        }
        let flag = 0 ;
        for(let i=0 ; i<=getData.length-1 ; i++){
          if(permissionAssignedToUser.includes(getData[i])){
            flag = 1 ;
          }
          if(i==getData.length-1){
            if(flag == 1 && getPageName != undefined && getPageName == 'enableWallets'){
              this.enableTicketJsonFlag = true
            }else if(flag == 1 && getPageName != undefined && getPageName == 'addBank'){
              this.modal = 'add-bank'
            }else if(flag == 1){
              this.$router.push(getRoute)
            }else{
              this.$root.permissiondenied = true
            }
          }
        }
      }
    },
    handleCopy(getData, getMessage) { //in use
      let message = 'Data is copied';
      if(getMessage ){
        message = getMessage
      }
      const textArea = document.createElement("textarea");
      textArea.value = getData;
      document.body.appendChild(textArea);
       textArea.select();
      document.execCommand("copy");
      this.$notify({
        text: message,
        duration: 10000,
        pauseOnHover: true,
        type: "success",
      });
    },
    getCountryName(getData) {
      let country_name = '';
      let countryArray = Object.values(this.country);
      for (let i = 0; i <= countryArray.length - 1; i++) {
        if (countryArray[i].iso2 == getData) {
          country_name = countryArray[i].name;
        }
        if (i == countryArray.length - 1) {
          return country_name;
        }
      }
    },
    momentFunc(getDate,getFormat,getPage) {
      if(getPage == 'deposit_list'){
        var data = new Date(getDate);
        return moment(data.toUTCString()).format(getFormat);
      }else{
        return (getDate != '' ? moment(getDate).format(getFormat) :  moment().format(getFormat));
      }
    },
    dateFunction(getDate) {
        let last_seen_date = moment(getDate).fromNow();
        return last_seen_date;
      },
    decodeHtml(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    currencyNameFunc(getValue){
      let returnData = '';
      if(Object.keys(this.walletCurrencyList).length > 0){
        for (let i = 0; i <= this.walletCurrencyList.currencies.length - 1; i++) {
          if(this.walletCurrencyList.currencies[i].symbol == getValue){
            returnData = this.walletCurrencyList.currencies[i].currency_name
          }
          if (i == this.walletCurrencyList.currencies.length - 1) {
            return returnData ;
          }
        }
      }
    },
    numberFormat(value,getDecimalValue,getCurrency) {
      const toFixed1 = (n, fixed) => `${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`))[0];
      if (value) { 
        // console.log('initial === ', value)
        value = parseFloat(value) ; 
        let fiatCurrencyList = ["EURO", "USD", "AUD", "GBP", "JPY", "EOS", "XLM"];
        if(getCurrency != '' && getCurrency != undefined){
          getDecimalValue = (fiatCurrencyList.includes(getCurrency.toUpperCase())) ? 2 : 8 ;
          // console.log('value', value)
          // console.log('getDecimalValue', getDecimalValue)
          // value = toFixed1(value, getDecimalValue);
          value = value.toFixed(getDecimalValue)
           // console.log('value2', value)
          value = parseFloat(value) ;
           // console.log('value2 value==>', value)
          value = value.toLocaleString(this.$root.getCountryfromIp, { minimumFractionDigits: getDecimalValue,  maximumFractionDigits: getDecimalValue}) ; 
           // console.log('final value====>', value)
          return value;
        }else{
          getDecimalValue =  (getDecimalValue != undefined) ? getDecimalValue : 8 ;
          // value = toFixed1(value, getDecimalValue);
          value = value.toFixed(getDecimalValue)
          value = parseFloat(value) ;
          value = value.toLocaleString(this.$root.getCountryfromIp, { minimumFractionDigits: getDecimalValue,  maximumFractionDigits: getDecimalValue})
          return value;
        }
      } else {
        return 0;
      }
    },
    numberFormat1(value,getDecimalValue,getCurrency) {
      // const toFixed1 = (n, fixed) => `${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`))[0];
      if (value) {
       let fiatCurrencyList = ["EURO", "USD", "AUD", "GBP", "JPY", "EOS", "XLM"];
       if(getCurrency != '' && getCurrency != undefined){
        getDecimalValue = (fiatCurrencyList.includes(getCurrency.toUpperCase())) ? 2 : 8 ;
        value = parseFloat(value);
        // value = toFixed1(value, getDecimalValue);
        value = value.toFixed(getDecimalValue)
        return value;
       }else{
        getDecimalValue =  (getDecimalValue != undefined) ? getDecimalValue : 8 ;
        value = parseFloat(value);
        // value = toFixed1(value, getDecimalValue);
        value = value.toFixed(getDecimalValue)
        return value;
       }
      } else {
        return 0;
      }
    },


    //================================================================================================================================
    
    getCurrName(currency) {
      try {
        let list = [];
        list = Object.values(this.$env_var.walletCurrencyList);
        return list.filter((val) => val.symbol == currency)[0].currency_name;
      } catch (e) {
        return "";
      }
    },
    getkeyType(currency) {
      try {
        let list = [];
        list = Object.values(this.$env_var.walletCurrencyList);
        return list.filter((val) => val.symbol == currency)[0].keyType;
      } catch (e) {
        return "";
      }
    },
    withdrawLimit() {
      if (parseInt(this.get_user.tier) == 1) {
        if (
          parseInt(this.get_user.lead_type) == 0 &&
          parseInt(this.get_user.step) < 3
        ) {
          this.$router.push(
            "/individual-step" + (parseInt(this.get_user.step) + 1)
          );
        } else if (
          parseInt(this.get_user.lead_type) == 1 &&
          parseInt(this.get_user.step) < 4
        ) {
          this.$router.push(
            "/corporate-step" + (parseInt(this.get_user.step) + 1)
          );
        }
      } else if (parseInt(this.get_user.tier) == 2) {
        if (this.$route.name != "account-profile") this.$router.push("/dashboard");
      } else if (parseInt(this.get_user.tier) == 3) {
        // this.$router.push({ name: 'help_centre', params: { 'page': 'profile', 'ticketData': '16', 'method_id': '1' } })
        this.$router.push({ name: "questionnaire" });
      }
    },

    computedCommonFunc(getFuncName) {
      try {
        return this.$store.getters[getFuncName];
      } catch (ex) {
        return [];
      }
    },
    formatPrice(val, isCrypto) {
      return formatPriceCommon(val, isCrypto === true ? true : false);
    },
    
    usernameSplitFunc(getUsername) {
      getUsername = getUsername.split(" ");
      let nameArray = [];
      for (let i = 0; i <= getUsername.length - 1; i++) {
        nameArray.push(getUsername[i].charAt(0).toUpperCase());
        if (i == getUsername.length - 1) {
          return nameArray.join("");
        }
      }
    },
  },
  computed: {
    walletCurrencyList: function () {
      return this.computedCommonFunc(Const.GET_WALLET_CURRENCY_JSON_LIST);
    },
    activityCategories: function () {
      return this.computedCommonFunc(Const.GET_ACTIVITY_CATEGORIES);
    },
    activitySubCategories: function () {
      return this.computedCommonFunc(Const.GET_SUB_ACTIVITY_CATEGORIES);
    },

    refreshData: function () {
      return this.computedCommonFunc(Const.GET_STATE_REFRESH_DATA);
    },
    get_user: function () {
      return this.computedCommonFunc(Types.GET_USER);
    },

    fa_user_state: function () {
      return this.computedCommonFunc(Types.GET_2FA_STATE);
    },
    country: function () {
      return this.computedCommonFunc(Types.GET_COUNTRY);
    },
    ticket_id: function () { 
      return this.computedCommonFunc(Types.GET_TICKET_ID);
    },
    profileInfo: function () {
      return this.computedCommonFunc(Const.GET_PROFILE_INFO);
    },
    GetPaymentMethods: function () {
      return this.computedCommonFunc(Const.GET_PAYMENT_METHODS);
    },

    cryptoAddresses: function () {
      return this.computedCommonFunc(Const.GET_CRYPTO_ADDRESSES);
    },
    bankAddresses: function () {
      return this.computedCommonFunc(Const.GET_BANK_ADDRESSES);
    },

    watchListData: function () {
      return this.computedCommonFunc(Const.GET_WATCH_LIST);
    },
    newsList: function () {
      return this.computedCommonFunc(Const.GET_NEWS_LIST);
    },
    cryptoNewsList: function () {
      return this.computedCommonFunc(Const.GET_CRYPTO_NEWS_LIST);
    },
  },
};

export default commonAllmixins;
