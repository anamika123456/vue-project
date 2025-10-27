import { notificationConst } from "../lib/const.cls";
import * as types from "@/types";
import * as RxFactory from "@/api/rx-factory";
import * as Enpoints from "@/api/endpoints";
import * as COMMON from "../../../../store/commomFunction";
import moment from "moment";
export const actions = {
  [notificationConst.RUN_GET_NOTIFICATION_LIST]({commit, state, getters, dispatch },credentials) {
    // credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_GET_NOTIFICATION_LIST, credentials, getters.GET_TOKEN, commit, (error, result) => {
      // credentials.localParams.parameter.pageLoader = false;
      if (!error) {
        let unreadData={'records':[], 'totalRecords':0}, readData={'records':[], 'totalRecords':0} ; 
        
        commit(notificationConst.SET_NOTIFICATION_LIST, result.res_data);
        if(result.res_data.records.length > 0){
          for(let i=0 ; i<=result.res_data.records.length-1 ; i++){
            if(parseInt(result.res_data.records[i].read) == 1){
              readData.records.push(result.res_data.records[i])
            }

            if(parseInt(result.res_data.records[i].read) == 0){
              unreadData.records.push(result.res_data.records[i])
            }

            if(i==result.res_data.records.length-1){
              readData.totalRecords = readData.records.length
              unreadData.totalRecords = unreadData.records.length

              commit(notificationConst.SET_UNREAD_NOTIFICATION_DATA, unreadData );
              commit(notificationConst.SET_READ_NOTIFICATION_DATA, readData);
            }
          }
        }else{
          commit(notificationConst.SET_UNREAD_NOTIFICATION_DATA, unreadData);
          commit(notificationConst.SET_READ_NOTIFICATION_DATA, readData);
        }
      } else {
        COMMON._messageDisplayFunction( credentials.localParams.parameter, result.res_data, "error" );
      }
    });
  },
  [notificationConst.RUN_READ_UNREAD_NOTIFICATION](
    { commit, state, getters, dispatch },
    credentials
  ) {
    // credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_READ_UNREAD_NOTIFICATION,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        // credentials.localParams.parameter.pageLoader = false;
        if (!error) {
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

  [notificationConst.RUN_GET_ACTIVITY_LIST]({ commit, state, getters, dispatch },credentials) {
    // credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_GET_ACTIVITY_LIST,credentials,getters.GET_TOKEN,commit,(error, result) => {
        // credentials.localParams.parameter.pageLoader = false;
        if (!error) { 
          let unreadData = [] ;
          commit(notificationConst.SET_ACTIVITY_LIST, result.res_data );
          if(result.res_data.records.length > 0){
            for(let i=0 ; i<=result.res_data.records.length-1 ; i++){
              if(parseInt(result.res_data.records[i].is_read) == 0){
                unreadData.push(result.res_data.records[i]._id)
              }

              if(i==result.res_data.records.length-1 && unreadData.length > 0 && credentials.localParams.calling_from == undefined){
                credentials.localParams.parameter.markAsRead(unreadData)
              }
            }
          }
        } else {
          commit(notificationConst.SET_ACTIVITY_LIST, { totalRecords: 0, records: [] } );
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },
  [notificationConst.RUN_MARK_ACTIVITY_AS_READ]({ commit, state, getters, dispatch },credentials) {
    // credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_MARK_ACTIVITY_AS_READ,credentials,getters.GET_TOKEN,commit,(error, result) => {
        // credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.listing('calling_from_mark_as_read')
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },

  // [notificationConst.RUN_NOTIFICATION_SETTINGS](
  //   { commit, state, getters, dispatch },
  //   credentials
  // ) {
  //   credentials.localParams.parameter.pageLoader = true;
  //   COMMON._executeApi(
  //     Enpoints.EP_NOTIFICATION_SETTINGS,
  //     credentials,
  //     getters.GET_TOKEN,
  //     commit,
  //     (error, result) => {
  //       credentials.localParams.parameter.pageLoader = false;
  //       if (!error) {
  //         COMMON._messageDisplayFunction(
  //           credentials.localParams.parameter,
  //           "Enable Notification Successfully",
  //           "success"
  //         );
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

  // [notificationConst.RUN_NOTIFICATION_GET_SETTINGS](
  //   { commit, state, getters, dispatch },
  //   credentials
  // ) {
  //   credentials.localParams.parameter.pageLoader = true;
  //   COMMON._executeApi(
  //     Enpoints.EP_NOTIFICATION_GET_SETTINGS,
  //     credentials,
  //     getters.GET_TOKEN,
  //     commit,
  //     (error, result) => {
  //       credentials.localParams.parameter.pageLoader = false;
  //       if (!error) {
  //         commit(
  //           notificationConst.SET_NOTIFICATION_GET_SETTINGS,
  //           result.res_data
  //         );
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

  // [notificationConst.RUN_NOTIFICATION_ENABLE_GET_SETTINGS](
  //   { commit, state, getters, dispatch },
  //   credentials
  // ) {
  //   credentials.localParams.parameter.pageLoader = true;
  //   COMMON._executeApi(
  //     Enpoints.EP_NOTIFICATION_ENABLE_GET_SETTINGS,
  //     credentials,
  //     getters.GET_TOKEN,
  //     commit,
  //     (error, result) => {
  //       credentials.localParams.parameter.pageLoader = false;
  //       if (!error) {
  //         const data = getters[notificationConst.GET_NOTIFICATION_GET_SETTINGS];
  //         commit(
  //           notificationConst.SET_NOTIFICATION_ENABLE_GET_SETTINGS,
  //           result.res_data
  //         );
  //         if (result.res_data.length > 0) {
  //           if (data.length) {
  //             data.forEach((val) => {
  //               result.res_data.forEach((item) => {
  //                 if (item.id == val.id) {
  //                   credentials.localParams.parameter.notification_vmodel[
  //                     item.id
  //                   ] = 1;
  //                 }
  //               });
  //             });
  //           } else {
  //             result.res_data.forEach((item) => {
  //               credentials.localParams.parameter.notification_vmodel[
  //                 item.id
  //               ] = 0;
  //             });
  //           }
  //         }
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
};
