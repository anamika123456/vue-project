import { Const } from "../lib/const.cls";
import { notificationConst } from "@/plugins/notifications/provider/lib/const.cls";
import * as types from "@/types";
import * as RxFactory from "@/api/rx-factory";
import * as Enpoints from "@/api/endpoints";
import * as COMMON from "../../../../store/commomFunction";
import moment from "moment";
export const actions = {

  [Const.RUN_GET_TICKET_DOC]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      '',
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          let url = btoa(result.res_data.body.data.reduce((data, byte) => data + String.fromCharCode(byte), ''));

          if(credentials.localParams.getData && credentials.localParams.getData == 'imgShow'){
            credentials.localParams.parameter.blobToImage1(result.res_data.doctype, url)
          }else{
            credentials.localParams.parameter.blobToImage(result.res_data.doctype, url)
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
  [Const.RUN_CREATE_TICKET]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_CREATE_TICKET,
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
          if(credentials.localParams.fromPage && credentials.localParams.fromPage == 'enableWallet'){
            credentials.localParams.parameter.callcurrencyFunction()
          }
          
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            "Ticket created successfully",
            "success"
          );
          credentials.localParams.parameter.$router.push({
            name: "view",
            query: { id: result.res_data.insertId },
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
  [Const.RUN_GET_FAQS_LIST]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_GET_FAQS_LISTING,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          commit(Const.SET_FAQS_LIST, result.res_data.dataArr['getting-started']);
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
  [Const.RUN_TICKET_RESEND_OTP](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;

    // credentials.localParams.parameter.submitted = false
    COMMON._executeApi(
      Enpoints.EP_TICKET_RESEND_OTP,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;

        if (!error) {
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            "Otp has been send to your registered email address.",
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
  [Const.RUN_TICKET_REQUEST_OTP](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    credentials.localParams.parameter.submitted = false;
    COMMON._executeApi(
      Enpoints.EP_TICKET_REQUEST_OTP,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.trans_id = result.res_data.trans_id;
          if (
            credentials.localParams.type &&
            credentials.localParams.type == "pro"
          ) {
            credentials.localParams.parameter.show_step = "";
          }
        } else {
          if (
            credentials.localParams.type &&
            credentials.localParams.type == "pro"
          ) {
            credentials.localParams.parameter.show_step = "";
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
  [Const.RUN_TICKET_CHECK_OTP](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_TICKET_CHECK_OTP,
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
          credentials.localParams.parameter.$router.push({
            name: "view",
            query: { id: result.res_data.insertId },
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
  [Const.RUN_GET_TICKET_LIST](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_GET_TICKET_LIST,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          if (
            credentials.localParams.parameter.$parent.setView != "" &&
            parseInt(credentials.globalParams.status) == 0
          ) {
            let ticket_id = "";
            for (let i = 0; i <= result.res_data.records.length - 1; i++) {
              if (parseInt(result.res_data.records[i].reason) == 91) {
                ticket_id = result.res_data.records[i].id;
              }
              // if(i == result.res_data.records.length-1){
              // 	credentials.localParams.parameter.$router.replace({ name: "view",query:{id:ticket_id}})
              // }
            }
          }
          commit(Const.SET_TICKET_LIST, result.res_data);
        } else {
          commit(Const.SET_TICKET_LIST, []);
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },
  [Const.RUN_GET_TICKET_REASON_LIST](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_GET_TICKET_REASON_LIST,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          let ticketData = _ticketFunction(result.res_data);
          commit(Const.SET_TICKET_DATA, ticketData);
          let count = 0;
          for (var key in result.res_data) {
            count++;
            if (
              result.res_data[key].categories &&
              result.res_data[key].categories != undefined &&
              result.res_data[key].categories.length > 0
            ) {
              let categoriesList = {};
              for (
                let i = 0;
                i <= result.res_data[key].categories.length - 1;
                i++
              ) {
                categoriesList[result.res_data[key].categories[i].id] =
                  result.res_data[key].categories[i];
                if (i == result.res_data[key].categories.length - 1) {
                  delete result.res_data[key].categories;
                  result.res_data[key]["categories"] = categoriesList;
                }
              }
            }
            if (count == Object.keys(result.res_data).length) {
              commit(Const.SET_TICKET_REASON_LIST, result.res_data);
            }
          }
        } else {
          commit(Const.SET_TICKET_REASON_LIST, []);
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },
  [Const.RUN_GET_TICKET_DETAIL](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_GET_TICKET_DETAIL,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.$parent.ticketUpdate = false;
          commit(Const.SET_TICKET_VIEW, result.res_data);
        } else {
          commit(Const.SET_TICKET_VIEW, []);
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },
  [Const.RUN_TICKET_REPLY]({ commit, state, getters, dispatch }, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_TICKET_REPLY,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.ticketDetail();
          credentials.localParams.parameter.clear();
          let user_notify = getters[Const.GET_USER_NOTIFICATIONS];
          let i;
          if (user_notify.length > 0) {
            for (i = 0; i <= user_notify.length - 1; i++) {
              if (
                user_notify[i].notification_type == "TICKET" &&
                user_notify[i].ticket_id == credentials.localParams.tick_id
              ) {
                let user_info = getters[types.GET_USER];
                user_info.unread_notification =
                  user_info.unread_notification - 1;
                commit(types.SET_STATE, user_info);

                var user = localStorage.getItem("user");
                user = atob(user);
                user = JSON.parse(user);
                user.unread_notification = user.unread_notification - 1;
                localStorage.setItem("user", btoa(JSON.stringify(user)));
              }
            }
          }
          //_messageDisplayFunction(credentials.localParams.parameter,'message sent successfully','success')
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

function _ticketFunction(respData) {
  // priority basis keys
  //parent  ['1', '3', '4', '2']
  const getResponseData = respData;
  let keyByPriortity = [];
  let obj = {};
  let count = 0;
  for (var key in getResponseData) {
    const parent_id = getResponseData[key].id;
    keyByPriortity[getResponseData[key].priority] = parent_id;
    obj["-1"] = keyByPriortity;

    let childCount = 0;
    count++;
    const child = getResponseData[key].categories;
   
    if (child) {
      let childPriority = [];
      for (var i = 0; i <= child.length - 1; i++) {
        const children = child[i];
        childPriority[children.priority] = children.id;
        childCount++;
        if (i == child.length - 1) {
          //empty
          var filtered = childPriority.filter(function (el) {
            return el != null && el != "";
          });
          obj[parent_id] = filtered;
        }
        if (
          i == child.length - 1 &&
          count == Object.keys(getResponseData).length
        ) {
          var childfiltered = keyByPriortity.filter(function (el) {
            return el != null && el != "";
          });
          obj["-1"] = childfiltered;
          return obj;
        }
      }
    } else {
      if (count == Object.keys(getResponseData).length) {
        var childfiltered = keyByPriortity.filter(function (el) {
          return el != null && el != "";
        });
        obj["-1"] = childfiltered;
        return obj;
      }
    }
  }
}
