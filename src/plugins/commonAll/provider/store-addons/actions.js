import { Const } from "../lib/const.cls";
import { notificationConst } from "@/plugins/notifications/provider/lib/const.cls";
import * as types from "@/types";
import * as RxFactory from "@/api/rx-factory";
import * as Enpoints from "@/api/endpoints";
import * as COMMON from "../../../../store/commomFunction";
import moment from "moment";
export const actions = {
  [Const.RUN_GET_COUNTRY_IP]( { commit, state, getters, dispatch }, credentials ) {
    // let response = {
    //   "range": [
    //       3063726080,
    //       3063728127
    //   ],
    //   "country": "IN",
    //   "region": "TN",
    //   "eu": "0",
    //   "timezone": "Asia/Kolkata",
    //   "city": "Chennai",
    //   "ll": [
    //       13.087,
    //       80.2456
    //   ],
    //   "metro": 0,
    //   "area": 1000,
    //   "entity": "DMCC",
    //   "entity_detail": {
    //       "id": 101,
    //       "name": "India",
    //       "iso2": "IN",
    //       "locale" : ""
    //   }
    // }
    // credentials.localParams.parameter.getCountryLocale(response.country) ;
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_GET_COUNTRY_IP, credentials, getters.GET_TOKEN, commit,(error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          // credentials.localParams.parameter.getCountryLocale(response.country) ;
          result.entity_detail.locale = result.entity_detail.locale.replace("_", "-");
          credentials.localParams.parameter.getCountryLocale(result.entity_detail.locale);
          
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },
  [Const.RUN_WALLET_CURRENCY_JSON_LIST]( { commit, state, getters, dispatch }, credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_WALLET_CURRENCY_JSON_LIST, credentials, getters.GET_TOKEN, commit,(error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          commit(Const.SET_WALLET_CURRENCY_JSON_LIST, result.res_data);
          if(credentials.localParams.page && credentials.localParams.page == 'index'){
             setTimeout(function(){ credentials.localParams.parameter.subscribPairs() }, 1000);
            
          }
        } else {
          commit(Const.SET_WALLET_CURRENCY_JSON_LIST, result.res_data);
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },
  [Const.RUN_GENERATE_2FA_QRCODE]({ commit, state, getters, dispatch },credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_GENERATE_2FA_QRCODE, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          if (typeof result.res_data == "object") {
            credentials.localParams.parameter.src_data = result.res_data.data;
          } else {
            credentials.localParams.parameter.src_data = result.res_data;
          }
        } else {
          COMMON._messageDisplayFunction( credentials.localParams.parameter, result.res_data, "error" );
        }
      }
    );
  },
  [Const.RUN_MULTI_USER_UPDATE]( { commit, state, getters, dispatch }, credentials ) {
    let user_json = getters[types.GET_USER], permissionAssignedToUser = [] ;
    if(user_json.roles.includes("&")){
      permissionAssignedToUser = user_json.roles.split('&')
    }else{
      permissionAssignedToUser.push(user_json.roles)
    }
    if(  permissionAssignedToUser.includes('OP') || permissionAssignedToUser.includes('D')  || permissionAssignedToUser.includes('R')  || permissionAssignedToUser.includes('TC') ){
      credentials.localParams.parameter.pageLoader = true;
      COMMON._executeApi( Enpoints.EP_MULTI_USER_UPDATE, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          let user = localStorage.getItem("user");
          user = atob(user);
          user = JSON.parse(user);
          user_json.step = 5;
          user.step = 5;
          user_json.is_registered = 5;
          user.is_registered = 5;

          commit(types.SET_STATE, user_json);
          localStorage.setItem("user", btoa(JSON.stringify(user)));
          dispatch(notificationConst.RUN_GET_NOTIFICATION_LIST, {globalParams: { read: "0" },localParams: { parameter: credentials.localParams.parameter }});
          
          let roles = [];
          if(user_json.roles.includes(",")){
            roles = user_json.roles.split(',')
          }else{
            roles.push(user_json.roles)
          }
          
          if (roles.length == 1 && roles == 'TC') {
            credentials.localParams.parameter.$router.replace("/crypto-debit-cards");
          }else{
            credentials.localParams.parameter.$router.replace("/dashboard");
          }
        } else {
          COMMON._messageDisplayFunction( credentials.localParams.parameter, result.res_data, "error" );
        }
      });
    }else if (permissionAssignedToUser.includes('U') && parseInt(user_json.step) <= 1) {
      dispatch(notificationConst.RUN_GET_NOTIFICATION_LIST, {globalParams: { read: "0" },localParams: { parameter: credentials.localParams.parameter }});
      credentials.localParams.parameter.$router.replace("/getting-started-landing-page");
    }else{
      dispatch(notificationConst.RUN_GET_NOTIFICATION_LIST, {globalParams: { read: "0" },localParams: { parameter: credentials.localParams.parameter }});
      credentials.localParams.parameter.$router.replace("/dashboard");
    }
  },
  [Const.RUN_VERIFY_2FA_QRCODE]( { commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_VERIFY_2FA_QRCODE, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          if(credentials.localParams.page && credentials.localParams.page == 'creditCard'){
            credentials.localParams.parameter.cardBlockUnBlock()
          }else if(credentials.localParams.page && credentials.localParams.page == 'burn-creditCard'){
            credentials.localParams.parameter.cardBurn()
          }else{
            let user_json = getters[types.GET_USER];
            user_json.profile.gAuthenticatorEnabled = 1;
            user_json.fresh_user = 1;
            user_json.step = 1;
            commit(types.SET_STATE, user_json);

            var user = localStorage.getItem("user");
            user = atob(user);
            user = JSON.parse(user);
            user.profile.gAuthenticatorEnabled = 1;
            user.fresh_user = 1;
            user.step = 1;
            localStorage.setItem("user", btoa(JSON.stringify(user)));
            COMMON._messageDisplayFunction( credentials.localParams.parameter, "2FA Enabled successfully", "success");
            dispatch(Const.RUN_MULTI_USER_UPDATE, {globalParams: { },localParams: { parameter: credentials.localParams.parameter }});

            let roles = [];
            if(user_json.roles.includes(",")){
              roles = user_json.roles.split(',')
            }else{
              roles.push(user_json.roles)
            }
            
            if (roles.length == 1 && roles == 'TC') {
              credentials.localParams.parameter.$router.replace("/crypto-debit-cards");
            }
            // if(user_json.permissions.includes('TEAM_CARD')){
            //   credentials.localParams.parameter.$router.replace("/crypto-debit-cards");
            // }

          }
        } else {
          COMMON._messageDisplayFunction( credentials.localParams.parameter, result.res_data, "error" );
        }
      }
    );
  },
  [Const.RUN_GET_ACTIVITY_CATEGORIES](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApiWithoutToken(
      Enpoints.EP_GET_ACTIVITY_CATEGORIES,
      credentials,
      "",
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          if (credentials.localParams.activity_type == "parent") {
            commit(Const.SET_ACTIVITY_CATEGORIES, result.res_data);
          } else {
            commit(Const.SET_SUB_ACTIVITY_CATEGORIES, result.res_data);
          }
        } else {
          if (credentials.localParams.activity_type == "parent") {
            commit(Const.SET_ACTIVITY_CATEGORIES, []);
          } else {
            commit(Const.SET_SUB_ACTIVITY_CATEGORIES, []);
          }
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },
  [Const.RUN_DISABLE_2FA_QRCODE](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_DISABLE_2FA_QRCODE,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          dispatch(types.RUN_LOGOUT, {
            globalParams: {},
            localParams: { parameter: this },
          });
        } else {
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },
  [Const.RUN_GET_WATCH_LIST](
    { commit, state, getters, dispatch },
    credentials
  ) {
    COMMON._executeApi(
      Enpoints.EP_GET_WATCH_LIST,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        if (!error) {
          commit(Const.SET_WATCH_LIST, result.res_data);
          result.res_data.forEach((val, index) => {
            if (val._id === null) {
              credentials.localParams.parameter.subscribPairs(
                result.res_data[index].subscribe
              );
            }
          });
        } else {
          commit(Const.SET_WATCH_LIST, {});
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },
};
