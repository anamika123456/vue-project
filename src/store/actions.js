import {RUN_LOGOUT,RUN_COUNTRY,SET_COUNTRY,RUN_LOGIN,RUN_LOGIN_WITH_HASH,RUN_STATE_LOAD,SET_INFO,SET_STATE,GET_TOKEN,RUN_FORGOT_PASSWORD,RUN_RESET_PASSWORD_FROM_HASH,RUN_CHANGE_PASSWORD,RUN_USER_LOGIN_2FA,SET_2FA_STATE} from "../types";
import * as RxFactory from "@/api/rx-factory";
import * as Enpoints from "@/api/endpoints";
import * as types from "@/types";
import {Const} from "../plugins/commonAll/provider/lib/const.cls";
import * as COMMON from "./commomFunction";
export const actions = {
  [RUN_COUNTRY]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApiWithoutToken(Enpoints.COUNTRY_API, credentials, "", commit,(error, result) => {
      if (!error) {
        credentials.localParams.parameter.pageLoader = false;
        commit(SET_COUNTRY, result.res_data);
      } else {
        COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
      }
    });
  },
  [RUN_LOGIN]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApiWithoutToken(Enpoints.EP_LOGIN, credentials, "", commit,(error, result) => {
      credentials.localParams.parameter.pageLoader = false;
      if (!error) {
        credentials.localParams.parameter.div_show = '1'
        commit(SET_2FA_STATE, result.res_data.user);
      } else {
        credentials.localParams.parameter.div_show = '0'
        commit(SET_2FA_STATE, {});
        COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
      }
    });
  },

  [RUN_USER_LOGIN_2FA]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApiWithoutToken(Enpoints.EP_USER_LOGIN_2FA, credentials, "", commit,(error, result) => {
      credentials.localParams.parameter.pageLoader = false;
      if (!error) {
        result.res_data.user.loggedIn = true;
        commit(SET_STATE, result.res_data.user);
        commit(Const.SET_STATE_REFRESH_DATA, "0");
        localStorage.setItem("user", btoa(JSON.stringify(result.res_data.user)));



        let roles = [];
        if(result.res_data.user.roles.includes(",")){
          roles = result.res_data.user.roles.split(',')
        }else{
          roles.push(result.res_data.user.roles)
        }
        
        if (roles.length == 1 && roles == 'TC') {
          credentials.localParams.parameter.$router.replace("/crypto-debit-cards");
        }else if (result.res_data.user.roles == 'U' && parseInt(result.res_data.user.step) < 1) {
          credentials.localParams.parameter.$router.replace("/getting-started-landing-page");
        }else {
          credentials.localParams.parameter.$router.replace("/dashboard");
        }
      } else {
        COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
      }
    });
  },
  
  [RUN_LOGIN_WITH_HASH]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApiWithoutToken(Enpoints.EP_LOGIN_WITH_HASH, credentials, "", commit,(error, result) => {
      credentials.localParams.parameter.pageLoader = false;
      if (!error) {
        COMMON._messageDisplayFunction(credentials.localParams.parameter, "Ip add successfully", "success");
      } else {
        COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
      }
    });
  },
  
  [RUN_STATE_LOAD]({commit,state,getters,dispatch}, credentials) {
    const data = {};
    let user = localStorage.getItem("user");
    if (user) {
      user = atob(user);
      user = JSON.parse(user);
    }
    if (credentials.localParams.page) {
      credentials.localParams.parameter.pageLoader = true;
    }
    commit(SET_STATE, user);
    if (user !== null && user !== "") {
      COMMON._executeApi(Enpoints.EP_FRESH_DATA, credentials, getters[GET_TOKEN], commit,(error, result) => {
        if (!error) {
          result.res_data.user.loggedIn = true;
          commit(SET_STATE, result.res_data.user);
          commit(Const.SET_STATE_REFRESH_DATA, "1");
          localStorage.setItem("user", btoa(JSON.stringify(result.res_data.user)));
          if (credentials.localParams.page) {
            credentials.localParams.parameter.pageLoader = false;
          }
          if (credentials.localParams.page == "question") {
            if (result.res_data.user.tier) {
              if ([3, 4].includes(parseInt(result.res_data.user.tier))) {
                return;
              } else if ([1].includes(parseInt(result.res_data.user.tier))) {
                credentials.localParams.parameter.$router.push("/individual-step3");
              } else if ([2].includes(parseInt(result.res_data.user.tier))) {
                credentials.localParams.parameter.$router.push("/help-centre");
              } else {
                credentials.localParams.parameter.$router.push("/dashboard");
              }
            }
          }
          // Condition for tranfer token from fxview Client Crypto transfer
          if (credentials.globalParams.api_query && credentials.globalParams.api_query.transfer && result.res_data.user.profile.walletInterface) {
            localStorage.removeItem("transfer_login");
            credentials.localParams.parameter.$router.replace({
              name: "crypto_deposit",
            });
          }
          if (credentials.localParams.page && credentials.localParams.page == "individual_doc_step") {
            credentials.localParams.parameter.tierFunc();
          } else if (credentials.localParams.page && credentials.localParams.page != "individual_doc_step") {
            credentials.localParams.parameter.$router.replace({
              name: "individual_step3_doc",
            });
          }
          // console.log('after action====> ', getters[GET_TOKEN])
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
    }
  },
  [RUN_LOGOUT]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_LOGOUT, credentials, getters[GET_TOKEN], commit,(error, result) => {
      credentials.localParams.parameter.pageLoader = false;
      if (!error) {
        // credentials.localParams.parameter.$root.$children[0].walletSessionTimeOut = false
        COMMON._handleLogout(result.res_data, commit, {
          router: credentials.localParams.parameter.$router,
          forward: true,
        });
        COMMON._messageDisplayFunction(credentials.localParams.parameter, "logout successfully", "success");
      } else {
        COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
      }
    });
  },
  [RUN_FORGOT_PASSWORD]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApiWithoutToken(Enpoints.EP_FORGOT_PASSWORD, credentials, "", commit,(error, result) => {
      credentials.localParams.parameter.pageLoader = false;
      if (!error) {
        credentials.localParams.parameter.resend = true;
        COMMON._messageDisplayFunction(credentials.localParams.parameter, "A link for change password has been sent on your registered email id", "success");
      } else {
        COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
      }
    });
  },
  [RUN_RESET_PASSWORD_FROM_HASH]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApiWithoutToken(Enpoints.EP_RESET_PASSWORD_FROM_HASH, credentials, "", commit,(error, result) => {
      credentials.localParams.parameter.pageLoader = false;
      if (!error) {
        credentials.localParams.parameter.displayMessage = true;
      } else {
        COMMON._messageDisplayFunction(credentials.localParams.parameter, "Sorry! This link has been exipred. Click <router-link :to='/forgot-password'>Here</router-link> to reset again!", "error");
      }
    });
  },
  [RUN_CHANGE_PASSWORD]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_CHANGE_PASSWORD, credentials, getters[GET_TOKEN], commit,(error, result) => {
      credentials.localParams.parameter.pageLoader = false;
      if (!error) {
        credentials.localParams.parameter.clearAll();
        COMMON._messageDisplayFunction(credentials.localParams.parameter, "password changed successfully", "success");
      } else {
        if (result.errors && result.errors[0] && result.errors[0].msg) {
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.errors[0].msg, "error");
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      }
    });
  },
};
