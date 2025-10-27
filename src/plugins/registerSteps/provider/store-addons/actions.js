import { Const } from "../lib/const.cls";
import { notificationConst } from "@/plugins/notifications/provider/lib/const.cls";
import * as types from "@/types";
import * as RxFactory from "@/api/rx-factory";
import * as Enpoints from "@/api/endpoints";
import * as COMMON from "../../../../store/commomFunction";
import moment from "moment";
export const actions = {
  [Const.RUN_STEP1]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApiWithoutToken( Enpoints.EP_STEP1, credentials, "", commit, (error, result) => {
      credentials.localParams.parameter.pageLoader = false;
      if (!error) {
        credentials.globalParams['transaction_id'] =  result.res_data.transaction_id
        commit(Const.SET_STEP2, credentials.globalParams);
        localStorage.setItem( "step2", JSON.stringify( credentials.globalParams ) );
        credentials.localParams.parameter.$router.replace("/otp-step");
      } else {
        commit(Const.SET_STEP2, {});
        COMMON._messageDisplayFunction( credentials.localParams.parameter, result.res_data, "error" );
      }
    });
  },
  [Const.RUN_STEP2]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApiWithoutToken( Enpoints.EP_STEP2, credentials, "", commit, (error, result) => {
      credentials.localParams.parameter.pageLoader = false;
      if (!error) {
        commit(Const.SET_STEP3, credentials.globalParams );
        localStorage.setItem( "step3", JSON.stringify(credentials.globalParams ) );
        credentials.localParams.parameter.$router.replace("/password-step");
      } else {
        commit(Const.SET_STEP3, {});
        COMMON._messageDisplayFunction( credentials.localParams.parameter, result.res_data, "error" );
      }
    });
  },
  [Const.RUN_RESEND_OTP]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApiWithoutToken( Enpoints.EP_RESEND_OTP, credentials, "", commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          COMMON._messageDisplayFunction( credentials.localParams.parameter, "Otp Resend Successfully", "success" );
        } else {
          commit(Const.SET_STEP3, {});
          COMMON._messageDisplayFunction( credentials.localParams.parameter, result.res_data, "error" );
        }
      }
    );
  },
  [Const.RUN_STEP3]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApiWithoutToken( Enpoints.EP_STEP3, credentials, "", commit, (error, result) => {
      credentials.localParams.parameter.pageLoader = false;
      if (!error) {
        result.res_data.user.loggedIn = true;
        commit(types.SET_STATE, result.res_data.user);
        localStorage.setItem("user", btoa(JSON.stringify(result.res_data.user)) );
        if ( parseInt(result.res_data.user.profile.gAuthenticatorEnabled) == 0 ) {
          credentials.localParams.parameter.$router.replace("/2fa-screen");
        } else {
          credentials.localParams.parameter.$router.replace( "/getting-started-landing-page" );
        }

        COMMON._messageDisplayFunction( credentials.localParams.parameter, "register successfully", "success" );
      } else {
        COMMON._messageDisplayFunction( credentials.localParams.parameter, result.res_data, "error" );
      }
    });
  },
  [Const.RUN_GET_STEP_INFO]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    const _that = credentials.localParams.parameter;
    let user_json = getters[types.GET_USER];
    COMMON._executeApi(
      Enpoints.EP_GET_STEP_INFO,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          if (
            result.res_data.documents &&
            result.res_data.documents.length > 0
          ) {
            commit(types.SET_TICKET_ID, result.res_data.documents[0].ticket_id);
          }
          commit(Const.SET_STEP_INFO, result.res_data);
          switch (parseInt(credentials.localParams.step)) {
            case 2:
              _that.activityFunc(result.res_data.profile.activity_id);
              _that.sub_activity = result.res_data.profile.subactivity_id;
              _that.legal_name = user_json.username;
              _that.registered_country = user_json.country;
              _that.activity = result.res_data.profile.activity_id;
              if (user_json.step == 1) {
                _that.is_same_legal_name =
                  result.res_data.username == result.res_data.profile.brand_name
                    ? '1'
                    : '0';
                _that.brand_name = result.res_data.profile.brand_name;
                _that.website = result.res_data.profile.website_url;
                _that.reg_no = result.res_data.profile.registration_no;
                _that.src_of_funds = result.res_data.profile.src_of_funds;
                _that.address1 = result.res_data.profile.address1;
                _that.address2 = result.res_data.profile.address2;
                _that.town_city = result.res_data.profile.city;
                _that.state = result.res_data.profile.state;
                _that.Country = result.res_data.profile.country;
                _that.zip_code = result.res_data.profile.zip_code;
                _that.payin = result.res_data.profile.monthly_payin;
                _that.monthly_payout = result.res_data.profile.monthly_payout;
                _that.transaction_volume =
                  result.res_data.profile.transaction_volume;
              }
              break;
            case 3:
              if (
                user_json.step == 2 &&
                Object.keys(result.res_data.representive).length > 0
              ) {
                _that.fname = result.res_data.representive.first_name;
                _that.lname = result.res_data.representive.last_name;
                _that.nationality = result.res_data.representive.nationality;
                _that.dob = moment(result.res_data.representive.dob).format(
                  "YYYY-MM-DD"
                );
              }
              break;
            case 4:
              break;
          }
        } else {
          commit(Const.SET_STEP_INFO, {});
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },
  [Const.RUN_ADD_LEGAL_ENTITY](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_ADD_LEGAL_ENTITY,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          _localStateStorageUpdateFunc(getters, credentials, commit);
          // credentials.localParams.parameter.$router.replace('/corporate-step2')
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
  [Const.RUN_ADD_REPRESENTATIVE](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_ADD_REPRESENTATIVE,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          _localStateStorageUpdateFunc(getters, credentials, commit);
          credentials.localParams.parameter.submitted = false;
          credentials.localParams.parameter.fname = "";
          credentials.localParams.parameter.lname = "";
          credentials.localParams.parameter.nationality = "";
          credentials.localParams.parameter.dob = "";
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
  [Const.RUN_ADD_BENEFICIAL](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_ADD_BENEFICIAL,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          if(credentials.localParams.lead_type){
            credentials.localParams.parameter.representFuncCall(result.res_data.insertId)
          }else{
            credentials.localParams.parameter.reset("add");
            COMMON._messageDisplayFunction(
              credentials.localParams.parameter,
              "Beneficiary Details Added Successfully",
              "success"
            );
          }
          

          // _localStateStorageUpdateFunc(getters, credentials, commit)
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
  [Const.RUN_UPDATE_BENEFICIAL](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_UPDATE_BENEFICIAL,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.reset("update");
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            "Beneficiary Detail Updated Successfully",
            "success"
          );
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
  [Const.RUN_DELETE_BENEFICIAL](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_DELETE_BENEFICIAL,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            "Beneficiary Detail Deleted Successfully",
            "success"
          );
          credentials.localParams.parameter.reset("");
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
  [Const.RUN_ADD_DOC]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    
    COMMON._executeApi(
      Enpoints.EP_ADD_DOC,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
       
        if (!error) {
          credentials.localParams.parameter.reset();
          credentials.localParams.parameter.getStepInfoFunc();
          
        } else {
          credentials.localParams.parameter.reset();
          credentials.localParams.parameter.getStepInfoFunc();
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },
  [Const.RUN_GET_DOC]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_GET_DOC,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
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
  [Const.RUN_DEL_DOC]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_DEL_DOC,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.getStepInfoFunc();
          credentials.localParams.parameter.reset();
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
  [Const.RUN_FINISH_REGISTERATION](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_FINISH_REGISTERATION,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          dispatch(notificationConst.RUN_GET_NOTIFICATION_LIST, {
            globalParams: {  },
            localParams: { parameter: credentials.localParams.parameter },
          });
          _localStateStorageUpdateFunc(getters, credentials, commit);
          // credentials.localParams.parameter.$router.replace('/corporate-step4')
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
};

function _localStateStorageUpdateFunc(getters, credentials, commit) {
  let user_json = getters[types.GET_USER];
  let user = localStorage.getItem("user");
  user = atob(user);
  user = JSON.parse(user);
  user_json.step = credentials.globalParams.step;
  user.step = credentials.globalParams.step;

  if (parseInt(credentials.globalParams.step) == 5) {
    user_json.is_registered = 1;
    user.is_registered = 1;
  }

  commit(types.SET_STATE, user_json);
  localStorage.setItem("user", btoa(JSON.stringify(user)));
}
