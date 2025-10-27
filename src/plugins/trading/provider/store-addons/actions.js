import { Const}from "../lib/const.cls";
import * as types from "@/types";
import * as RxFactory from "@/api/rx-factory";
import * as Enpoints from "@/api/endpoints";
import * as COMMON from "../../../../store/commomFunction";
import moment from "moment";
export const actions = {
  [Const.RUN_TRADING_ACCOUNT]({commit,state,getters,dispatch}, credentials) { // inuse in deposit
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_TRADING_ACCOUNT, credentials, getters.GET_TOKEN, commit,(error, result) => {
      // if(credentials.localParams.page && (credentials.localParams.page == 'conversion' || credentials.localParams.page == 'Wallet')){
      //   credentials.localParams.parameter.pageLoader = true;
      // }else{
        credentials.localParams.parameter.pageLoader = false;
      // }
      if (!error) {
        if (result.res_data.length > 0) {
          commit(Const.SET_TRADING_ACCOUNT, result.res_data);
          if(credentials.localParams.page ){
            let json = { globalParams: { account_id: result.res_data[0].account_id }, localParams: {parameter: credentials.localParams.parameter, page: credentials.localParams.page}}
            json.localParams.page = credentials.localParams.page
            dispatch(Const.GET_MARGIN_INFO, json);
          }
        } else {
          commit(Const.SET_TRADING_ACCOUNT, []);
        }
      } else {
        commit(Const.SET_TRADING_ACCOUNT, []);
        COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
      }
    });
  },
  [Const.RUN_GET_WALLETS]({commit,state,getters,dispatch}, credentials) {  // inuse in deposit
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_GET_WALLETS, credentials, getters.GET_TOKEN, commit,
      (error, result) => {
        // if(credentials.localParams.page && (credentials.localParams.page == 'conversion' )){
        //   credentials.localParams.parameter.pageLoader = true;
        // }else{
          credentials.localParams.parameter.pageLoader = false;
        // }
        if (!error) {
          commit(Const.SET_WALLETS, result.res_data);
        } else {
          commit(Const.SET_WALLETS, []);
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
  },
  [Const.ADD_FAVORITE_CURRENCY_LIST]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_ADD_FAVORITE_CURRENCY_LIST, credentials, getters.GET_TOKEN, commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {} else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
  },
  [Const.GET_FAVORITE_CURRENCY_LIST]({commit,state,getters,dispatch}, credentials){
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_GET_FAVORITE_CURRENCY_LIST, credentials, getters.GET_TOKEN, commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
        	result.res_data = [
			        {
			            "_id": "6453506996b5e758a3e25f54",
			            "user_id": 168,
			            "currencies": [
			                "ETH-BTC",
			                "BTC-USD"
			            ]
			        }
			    ]
          if (result.res_data.length > 0 && result.res_data[0].currencies.length > 0) {
            credentials.localParams.parameter.fev_list = result.res_data[0].currencies;
            /*if (credentials.localParams.page == 'home') {
            credentials.localParams.parameter.subscribPairs(result.res_data[0].currencies)
            }*/
          }
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
  },
  [Const.RUN_GET_DEPOSIT_HISTORY]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_DEPOSIT_HISTORY, credentials, getters.GET_TOKEN, commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
  },
  [Const.RUN_GET_WITHDRAWAL_HISTORY]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_WITHDRAWAL_HISTORY, credentials, getters.GET_TOKEN, commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
  },
  [Const.GET_MARGIN_INFO]({commit,state,getters,dispatch}, credentials) { // inuse in deposit
    credentials.localParams.parameter.pageLoader = true;
    if ("page" in credentials.localParams) {
      if (Object.keys(getters[Const.GET_MARGIN]).length > 0) {
        if (credentials.globalParams.is_social == 1) {
          credentials.localParams.parameter.margin_list_social = JSON.parse(JSON.stringify(getters[Const.GET_MARGIN_SOCIAL]));
        }
        credentials.localParams.parameter.margin_list = JSON.parse(JSON.stringify(getters[Const.GET_MARGIN]));
        if (credentials.localParams.page == "home" || credentials.localParams.page == "portfolio") {
          setTimeout(() => {
            credentials.localParams.parameter.changeCurencyUsdValList();
          }, 1000);
        }
      }
    }
    COMMON._executeApi(Enpoints.EP_GET_MARGIN_INFO, credentials, getters.GET_TOKEN, commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          const _that = credentials.localParams.parameter;
          if ("page" in credentials.localParams) {
            credentials.localParams.parameter.margin_list = result.res_data;
            if (credentials.localParams.page == "wallet") {
              credentials.localParams.parameter.walletListFunc();
            }
            if (credentials.globalParams.is_social == 1) {
              commit(Const.SET_MARGIN_SOCIAL, result.res_data);
            }
            commit(Const.SET_MARGIN, result.res_data);
          } else {
            commit(Const.SET_MARGIN, result.res_data);
            credentials.localParams.parameter.freeMargin = result.res_data.amount;
            credentials.localParams.parameter.free_Margin = result.res_data.amount;
            try {
              credentials.localParams.parameter.changeReciveCurr();
            } catch (error) {}
          }
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
  },
  [Const.RUN_CRYPTO_LIST]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    // if (getters[Const.GET_UNIQUE_CRYPTO_LIST].length > 0 && getters[Const.GET_COMBINE_CRYPTO_LIST].length > 0) {
    //   if (credentials.localParams.page && credentials.localParams.page != "exchange") {
    //     credentials.localParams.parameter.subscribe();
    //   }
    //   if (credentials.localParams.page && credentials.localParams.page == "exchange") {
    //     if (credentials.localParams.parameter.recive == "" && credentials.localParams.parameter.send.currency) {
    //       credentials.localParams.parameter.changeReciveCurr();
    //     }
    //   }
    //   return;
    // }
    COMMON._executeApi(Enpoints.EP_CRYPTO_LIST, credentials, getters.GET_TOKEN, commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          commit(Const.SET_CRYPTO_LIST, result.res_data);
          getCrypto(result.res_data,
            (err, res) => {
              if (err) {
                commit(Const.SET_UNIQUE_CRYPTO_LIST, res.unique.sort());
                commit(Const.SET_COMBINE_CRYPTO_LIST, res.combine);
                /*if (credentials.localParams.page && credentials.localParams.page != 'exchange') {
                credentials.localParams.parameter.subscribe()
                }*/
                // if (credentials.localParams.page && credentials.localParams.page == "exchange") {
                //   if (credentials.localParams.parameter.recive == "") {alert('3')
                //     credentials.localParams.parameter.changeReciveCurr();
                //   }
                // }
              } else {
                commit(Const.SET_UNIQUE_CRYPTO_LIST,[]);
                commit(Const.SET_COMBINE_CRYPTO_LIST,[]);
              }
            });
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
  },
  [Const.RUN_GET_ORDER_LIST]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_ORDER_LIST, credentials, getters.GET_TOKEN, commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          // commit(Const.SET_ORDER_LIST, result.res_data)
          let open = [],
            cancle = [],
            filled = [],
            sumData = [];
          if (Array.isArray(result.res_data.open_orders)) {
            result.res_data.open_orders.forEach((val) => {
              let data = val;
              data.Status = 2;
              data["sortDate"] = data.Opened;
              open.push(data);
            });
          }
          if (Array.isArray(result.res_data.filled_orders)) {
            filled = result.res_data.filled_orders.map((val) => {
              let data = val;
              data.Status = 3;
              data["sortDate"] = data.Closed;
              return data;
            });
          }
          if (Array.isArray(result.res_data.cancel_orders)) {
            cancle = result.res_data.cancel_orders.map((val) => {
              let data = val;
              data.Status = 4;
              data["sortDate"] = data.Canceled;
              return data;
            });
          }
          let allData = open.concat(cancle).concat(filled);
          allData.sort((a, b) => {
            return Date.parse(b.sortDate) - Date.parse(a.sortDate);
          });
          var openlist = allData.filter((val) => val.Status == 2);
          var canclelist = allData.filter((val) => val.Status == 4);
          var filledlist = allData.filter((val) => val.Status == 3);
          let stateData = {
            records: allData,
            totalRecords: {
              open: openlist.length,
              cancel: canclelist.length,
              filled: filledlist.length,
            },
          };
          if (credentials.globalParams.is_social == 1) {
            commit(Const.SET_ORDER_LIST_SOCIAL, stateData);
          } else {
            commit(Const.SET_ORDER_LIST, stateData);
          }
          credentials.localParams.parameter.changeTabFunc()
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
  },
  /* Create social trading account steps */
  [Const.RUN_CREATE_ACCOUNT]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_CREATE_ACCOUNT, credentials, getters.GET_TOKEN, commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          dispatch(Const.RUN_TRADING_ACCOUNT, {
            globalParams: {
              is_social: "1"
            },
            localParams: {
              parameter: this
            },
          });
          // dispatch(types.RUN_STATE_LOAD, { 'globalParams': {}, 'localParams': { "parameter": this } })
          commit(types.SET_STATE, Object.assign(getters.GET_USER, {
            social_type: 1,
            social_user: 1
          }));
          credentials.localParams.parameter.step++;
         
        } else {
          credentials.localParams.parameter.error = "Account could not be created. Please try again later";
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
  },
  [Const.RUN_INTERNAL_TRANSFER_VERIFY]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_INTERNAL_TRANSFER_VERIFY, credentials, getters.GET_TOKEN, commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.internalTransferResponse = result.res_data;
          credentials.localParams.parameter.step++;
          if (!credentials.globalParams.topup) {
            commit(types.SET_STATE, Object.assign(getters.GET_USER, {
              social_type: 1,
              social_user: 2,
            }));
          }
          // setTimeout(() => {
          //     dispatch(types.RUN_STATE_LOAD, { 'globalParams': {}, 'localParams': { "parameter": this } })
          // }, 5000)
        } else {
          credentials.localParams.parameter.error = result.res_data;
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
  },
  [Const.RUN_GENERATE_API_KEY]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_GENERATE_API_KEY, credentials, getters.GET_TOKEN, commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          // dispatch(types.RUN_STATE_LOAD, { 'globalParams': {}, 'localParams': { "parameter": this } })
          commit(types.SET_STATE, Object.assign(getters.GET_USER, {
            social_type: 1,
            social_user: 3
          }));
          credentials.localParams.parameter.apiKeyResponse = result.res_data;
          credentials.localParams.parameter.step++;
        } else {
          credentials.localParams.parameter.error = result.res_data;
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
  },
  /* END */
  /** API KEYS */
  [Const.GET_API_KEY]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_GET_API_KEYS, credentials, getters.GET_TOKEN, commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.apiKeyResponse = result.res_data;
          credentials.localParams.parameter.closeModal("gauthModal");
        } else {
          credentials.localParams.parameter.error = "Keys could not be fetched. Please try again later";
          credentials.localParams.parameter.closeModal("gauthModal");
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
  },
  [Const.UPDATE_API_KEY]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_UPDATE_API_KEYS, credentials, getters.GET_TOKEN, commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.apiKeyResponse = result.res_data;
          credentials.localParams.parameter.closeModal("gauthModal");
        } else {
          credentials.localParams.parameter.error = "Keys could not be updated. Please try again later.";
          credentials.localParams.parameter.closeModal("gauthModal");
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
  },
  [Const.DISABLE_API_KEY]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_DISABLE_API_KEYS, credentials, getters.GET_TOKEN, commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          dispatch(types.RUN_STATE_LOAD, {
            globalParams: {},
            localParams: {
              parameter: this
            },
          });
          credentials.localParams.parameter.apiKeyResponse = [];
          credentials.localParams.parameter.closeModal("gauthModal");
        } else {
          credentials.localParams.parameter.error = "Keys could not be disabled. Please try again later.";
          credentials.localParams.parameter.closeModal("gauthModal");
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
  },
  /** END */
  /** PORTFOLIO REPORT */
  [Const.RUN_GET_PORTFOLIO_REPORT]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(Enpoints.EP_PORTFOLIO_REPORT, credentials, getters.GET_TOKEN, commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          commit(Const.SET_PORTFOLIO_REPORT, result.res_data);
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
  },
  /** REVENUE REPORT */
  [Const.RUN_GET_REVENUE_REPORT]({commit,state,getters,dispatch}, credentials) {
    credentials.localParams.parameter.pageLoader = true;
    // function getRandomData() {
    //     let arr = []
    //     for (let i = 15; i >= 1; i--) {
    //         let m = moment()
    //         let obj = {
    //             date: m.subtract(i, 'days').format('YYYY-MM-DD'),
    //             value: (Math.random() * 10000) + (Math.random() * 5000)
    //         }
    //         arr.push(obj)
    //     }
    //     return arr
    // }
    // let data = getRandomData()
    // setTimeout(() => {
    
    //     commit(Const.SET_REVENUE_REPORT, data)
    // }, 2000);
    COMMON._executeApi(Enpoints.EP_REVENUE_REPORT, credentials, getters.GET_TOKEN, commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          if(Object.keys(result.res_data).length > 0 && result.res_data.data && result.res_data.data.length > 0){
            commit(Const.SET_REVENUE_REPORT, result.res_data.data);
            credentials.localParams.parameter.createChart(result.res_data.data);
          }else{
            commit(Const.SET_REVENUE_REPORT, []);
             credentials.localParams.parameter.createChart([]);
          }
        } else {
          commit(Const.SET_REVENUE_REPORT, []);
          credentials.localParams.parameter.createChart([]);
          // COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, "error");
        }
      });
  },
};

function getCrypto(crypto, callback) {
  try {
    var unique = [];
    let combine = crypto.map((item) => {
      let data = item.isinid;
      if (data.includes("-")) {
        unique = unique.concat(data.split("-"));
      } else {
        unique.push(data);
      }
      return data;
    });
    unique = [...new Set(unique)];
    if (unique.length > 0) {
      callback(true, {
        unique: unique,
        combine: combine
      });
    }
  } catch (ex) {
    callback(false, {
      unique: [],
      combine: []
    });
  }
}
