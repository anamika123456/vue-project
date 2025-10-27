import { Const } from "../lib/const.cls";
import * as types from "@/types";
import * as RxFactory from "@/api/rx-factory";
import * as Enpoints from "@/api/endpoints";
import * as COMMON from "../../../../store/commomFunction";
import moment from "moment";
export const actions = {
  [Const.RUN_UNSUBSCRIBE_USER_BY_LINK](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_UNSUBSCRIBE_USER_BY_LINK,credentials,getters.GET_TOKEN,commit,(error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          COMMON._messageDisplayFunction( credentials.localParams.parameter, 'Link unsubscribed successfully', "success" );
        } else {
          COMMON._messageDisplayFunction( credentials.localParams.parameter, result.res_data, "error" );
        }
      }
    );
  },
  [Const.RUN_GET_USER_DATA]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_GET_USER_DATA,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          commit(Const.SET_USER_DATA, result.res_data);
          if (
            result.res_data.documents &&
            result.res_data.documents.length > 0
          ) {
            commit(types.SET_TICKET_ID, result.res_data.documents[0].ticket_id);
          }
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
  //==================================================================================================================================
  [Const.RUN_GET_BANK_DETAILS](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_GET_BANK_DETAILS,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          commit(Const.SET_BANK_DETAILS, result.res_data);
        } else {
          commit(Const.SET_BANK_DETAILS, {});
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },
  [Const.RUN_BANK_AS_PRIMARY](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_UPDATE_PRIMARY_BANK,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.listing()
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            "Bank set primary successfully.",
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
  [Const.RUN_ADD_BANK_DETAILS](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_ADD_BANK_DETAILS,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          if (
            credentials.localParams.pagename &&
            credentials.localParams.pagename == "withdrawalFiat"
          ) {
            credentials.localParams.parameter.$router.push({
              name: "view",
              query: { id: result.res_data.insertId },
            });
          } else {
            COMMON._messageDisplayFunction(
              credentials.localParams.parameter,
              "Bank ticket raised successfully, please wait for document verification.",
              "success"
            );
            credentials.localParams.parameter.reset();
            credentials.localParams.parameter.$parent.addBankModal = false;
            credentials.localParams.parameter.$parent.listing();
          }
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
  [Const.RUN_Edit_BANK_DETAILS](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_Edit_BANK_DETAILS,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.$parent.editBank = {};
          dispatch(Const.RUN_GET_BANK_DETAILS, {
            globalParams: {},
            localParams: { parameter: credentials.localParams.parameter },
          });
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            "Payment Method Updated Successfully",
            "success"
          );
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
  [Const.RUN_DELETE_PAYMENT_METHOD](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_RUN_DELETE_PAYMENT_METHOD,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.$parent.deleteBank = {};
          credentials.localParams.parameter.$parent.listing();
          // dispatch(Const.RUN_GET_BANK_DETAILS, { 'globalParams': {}, 'localParams': { 'parameter': credentials.localParams.parameter }});
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            "Payment Method Deleted Successfully",
            "success"
          );
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
  //==================================================================================================================================
  [Const.RUN_GET_IP_DETAILS](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_GET_IP_DETAILS,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          commit(Const.SET_IP_DETAILS, result.res_data);
        } else {
          commit(Const.SET_IP_DETAILS, {'records' : [], 'totalRecords' : 0});
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },
  [Const.RUN_ADD_IP_DETAILS](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_ADD_IP_DETAILS,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          if (credentials.globalParams.trans_id) {
            COMMON._messageDisplayFunction(
              credentials.localParams.parameter,
              "Add IP Successfully",
              "success"
            );
            credentials.localParams.parameter.reset();
          } else {
            credentials.localParams.parameter.trans_id =
              result.res_data.trans_id;
          }
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
  [Const.RUN_EDIT_IP_DETAILS](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_EDIT_IP_DETAILS,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          dispatch(Const.RUN_GET_IP_DETAILS, {
            globalParams: {},
            localParams: { parameter: credentials.localParams.parameter },
          });
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            "Delete IP Successfully",
            "success"
          );
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
  //==================================================================================================================================
  [Const.RUN_GET_SUB_USERS]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_GET_SUB_USERS,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          commit(Const.SET_SUB_USERS, result.res_data);
        } else {
          commit(Const.SET_SUB_USERS, []);
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },
  [Const.RUN_DELETE_SUB_USERS](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_DELETE_SUB_USERS,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            "Delete Sub User Successfully",
            "success"
          );
          credentials.localParams.parameter.getSubUserFunc();
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

  [Const.RUN_GET_PENDING_INVITES](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_GET_PENDING_INVITES,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          commit(Const.SET_PENDING_INVITES, result.res_data);
        } else {
          commit(Const.SET_PENDING_INVITES, []);
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },
  [Const.RUN_CANCEL_INVITES](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_CANCEL_INVITES,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            "Cancel Invite Successfully",
            "success"
          );
          
          if(credentials.localParams.page &&  credentials.localParams.page == 'cards'){
            credentials.localParams.parameter.listing();
          }else{
            credentials.localParams.parameter.getPendingInvitesFunc();
          }
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
  [Const.RUN_RESEND_INVITES](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_RESEND_INVITES,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            "Resend Invite Successfully",
            "success"
          );
          if(credentials.localParams.page &&  credentials.localParams.page == 'cards'){
            credentials.localParams.parameter.listing();
          }else{
            credentials.localParams.parameter.getPendingInvitesFunc();
          }
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

  [Const.RUN_SEND_INVITES]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_SEND_INVITES,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          
          
          if(credentials.localParams.page &&  credentials.localParams.page == 'team_card_send_invite'){
            credentials.localParams.parameter.popup = true
          }else{
            COMMON._messageDisplayFunction(
              credentials.localParams.parameter,
              "Send Invite Successfully",
              "success"
            );
            credentials.localParams.parameter.reset();
          }
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
  [Const.RUN_REGISTER_USER_BY_INVITE_LINK](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApiWithoutToken(
      Enpoints.EP_REGISTER_USER_BY_INVITE_LINK,
      credentials,
      "",
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          result.res_data.user.loggedIn = true;
          commit(types.SET_STATE, result.res_data.user);
          localStorage.setItem(
            "user",
            btoa(JSON.stringify(result.res_data.user))
          );
          credentials.localParams.parameter.$router.replace("/2fa-screen");
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
  [Const.RUN_GET_INVITATION_DATA](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    let API_LINK = Enpoints.EP_GET_INVITATION_DATA ;
     if(credentials.localParams.page &&  credentials.localParams.page == 'RoleInvite'){
        API_LINK = Enpoints.EP_GET_INVITATION_DATA_ROLE;
      }
    COMMON._executeApiWithoutToken(
      API_LINK,
      credentials,
      "",
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.entity_name =
            result.res_data.first_name + " " + result.res_data.last_name;
          credentials.localParams.parameter.email = result.res_data.email;
          commit(Const.SET_INVITATION_DATA, result.res_data);
          if(credentials.localParams.page &&  credentials.localParams.page == 'RoleInvite'){
            //credentials.localParams.parameter.invitationRoleFunc()
          }
        } else {
          commit(Const.SET_INVITATION_DATA, {});
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },

  [Const.RUN_GET_ROLES]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_GET_ROLES,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          commit(Const.SET_ROLES, result.res_data);
        } else {
          commit(Const.SET_ROLES, []);
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },
  //==================================================================================================================================
  // [Const.RUN_GET_API_KEYS]({ commit, state, getters, dispatch }, credentials) {
  //   credentials.localParams.parameter.pageLoader = true;
  //   COMMON._executeApi( Enpoints.EP_GET_API_KEYS, credentials, getters.GET_TOKEN, commit, (error, result) => {
  //       credentials.localParams.parameter.pageLoader = false;
  //       if (!error) {
          
  //         if(credentials.localParams.mode != '' && credentials.localParams.mode != 'update'){
  //           credentials.localParams.parameter.addModal = {}
  //           credentials.localParams.parameter.showMoreModal = credentials.localParams.mode
  //           credentials.localParams.parameter.keysData = result.res_data
  //         }else{
  //           commit(Const.SET_API_KEYS, result.res_data);
  //         }
  //       } else {
  //         commit(Const.SET_API_KEYS, []);
  //         COMMON._messageDisplayFunction( credentials.localParams.parameter, result.res_data, "error" );
  //       }
  //     }
  //   );
  // },
  // [Const.RUN_ADD_API_KEYS]({ commit, state, getters, dispatch }, credentials) {
  //   credentials.localParams.parameter.pageLoader = true;
  //   COMMON._executeApi(
  //     Enpoints.EP_UPDATE_API_KEYS,
  //     credentials,
  //     getters.GET_TOKEN,
  //     commit,
  //     (error, result) => {
  //       credentials.localParams.parameter.pageLoader = false;
  //       if (!error) {
  //         COMMON._messageDisplayFunction(
  //           credentials.localParams.parameter,
  //           "Update API Key Successfully",
  //           "success"
  //         );
  //         credentials.localParams.parameter.reset();
  //         credentials.localParams.parameter.listing();
  //       } else {
  //         COMMON._messageDisplayFunction(
  //           credentials.localParams.parameter,
  //           result.res_data,
  //           "error"
  //         );
  //       }
  //     }
  //   );
  // },
  // [Const.RUN_DISABLE_API_KEYS](
  //   { commit, state, getters, dispatch },
  //   credentials
  // ) {
  //   credentials.localParams.parameter.pageLoader = true;
  //   COMMON._executeApi(
  //     Enpoints.EP_DISABLE_API_KEYS,
  //     credentials,
  //     getters.GET_TOKEN,
  //     commit,
  //     (error, result) => {
  //       credentials.localParams.parameter.pageLoader = false;
  //       if (!error) {
  //         COMMON._messageDisplayFunction(
  //           credentials.localParams.parameter,
  //           "Disable API key Successfully",
  //           "success"
  //         );
  //         credentials.localParams.parameter.reset();
  //         credentials.localParams.parameter.listing();
  //       } else {
  //         COMMON._messageDisplayFunction(
  //           credentials.localParams.parameter,
  //           result.res_data,
  //           "error"
  //         );
  //       }
  //     }
  //   );
  // },
  [Const.RUN_GET_API_KEYS]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_GET_API_KEYS, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          
          if(credentials.localParams.mode != '' && (credentials.localParams.mode == 'keys' || credentials.localParams.mode == 'merchantId')){
            credentials.localParams.parameter.addModal = {}
            credentials.localParams.parameter.showMoreModal = credentials.localParams.mode
            credentials.localParams.parameter.keysData = result.res_data
            if(result.res_data.length > 0 && result.res_data[0].allowed_ips !='' && result.res_data[0].allowed_ips != null){
              if(result.res_data[0].allowed_ips.includes(",")) {
                credentials.localParams.parameter.allowed_ips = result.res_data[0].allowed_ips.split(",");
              }else{
                credentials.localParams.parameter.allowed_ips.push(result.res_data[0].allowed_ips);
              } 
            }
          }else{
            commit(Const.SET_API_KEYS, result.res_data);
          }
          
        } else {
          commit(Const.SET_API_KEYS, []);
          COMMON._messageDisplayFunction( credentials.localParams.parameter, result.res_data, "error" );
        }
      }
    );
  },
  [Const.RUN_ADD_API_KEYS]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_ADD_API_KEYS1,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            "Update IP Address Successfully",
            "success"
          );
          credentials.localParams.parameter.reset();
          credentials.localParams.parameter.listing();
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
  [Const.RUN_UPDATE_API_KEYS]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_UPDATE_API_KEYS,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          let message = (credentials.localParams.mode == 'createApiKey') ? "Create API Key Successfully" : "Update API Key Successfully" ;
          if(credentials.localParams.mode == 'createApiKey'){
            let user_json = getters[types.GET_USER];
            let user = localStorage.getItem("user");
            user = atob(user);
            user = JSON.parse(user);
            user_json.api_status = 1;
            user.api_status = 1;
            commit(types.SET_STATE, user_json);
            localStorage.setItem("user", btoa(JSON.stringify(user)));
          }

          COMMON._messageDisplayFunction( credentials.localParams.parameter,message,"success" );
          credentials.localParams.parameter.reset();
          credentials.localParams.parameter.listing();
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
  [Const.RUN_DISABLE_API_KEYS]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_DISABLE_API_KEYS,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            "Disable API key Successfully",
            "success"
          );
          credentials.localParams.parameter.reset();
          credentials.localParams.parameter.listing();
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

  [Const.RUN_GET_WEBHOOK]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_GET_WEBHOOK,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          commit(Const.SET_WEBHOOK, result.res_data);
        } else {
          commit(Const.SET_WEBHOOK, []);
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },
  [Const.RUN_ADD_WEBHOOK]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_ADD_WEBHOOK,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            "Add Webhook Successfully",
            "success"
          );
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

  [Const.RUN_UPDATE_WEBHOOK]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_UPDATE_WEBHOOK, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            "Update Webhook Successfully",
            "success"
          );
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
};
