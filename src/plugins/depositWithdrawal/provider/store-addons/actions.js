import { Const } from "../lib/const.cls";
import * as types from "@/types";
import * as RxFactory from "@/api/rx-factory";
import * as Enpoints from "@/api/endpoints";
import * as COMMON from "../../../../store/commomFunction";
import moment from "moment";
export const actions = {
  
  [Const.RUN_FIAT_WITHDRAWAL_REQUEST](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_RUN_FIAT_WITHDRAWAL_REQUEST,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.ticket_id =  result.res_data.ticket_id;
          credentials.localParams.parameter.modal =
            "confirm_withdrawal_success";
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
  //deposit list
  [Const.RUN_GET_DEPOSIT_LIST](
    { commit, state, getters, dispatch },
    credentials
  ) {
    if (credentials.localParams.pageFlag == "download") {
      credentials.localParams.parameter.$parent.downloadPageLoader = true;
    } else {
      credentials.localParams.parameter.pageLoader = true;
    }
    COMMON._executeApi(
      Enpoints.EP_GET_DEPOSIT_LIST,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        if (credentials.localParams.pageFlag == "download") {
          credentials.localParams.parameter.$parent.downloadPageLoader = false;
        } else {
          credentials.localParams.parameter.pageLoader = false;
        }
        if (!error) {
          if (credentials.localParams.pageFlag == "download") {
            if (result.res_data.records.length > 0) {
              for (let i = 0; i <= result.res_data.records.length - 1; i++) {
                delete result.res_data.records[i].user_id;
                delete result.res_data.records[i].account_id;
                delete result.res_data.records[i].platform;
                delete result.res_data.records[i].conversion_rate;
                delete result.res_data.records[i].deposit_type;
                delete result.res_data.records[i].deposit_method;
                delete result.res_data.records[i].payment_status;

                delete result.res_data.records[i].note;
                delete result.res_data.records[i].payment_date;
                delete result.res_data.records[i].modified;
                if (i == result.res_data.records.length - 1) {
                  credentials.localParams.parameter.$parent.downloadTransactions(
                    result.res_data,
                    "deposits"
                  );
                }
              }
            } else {
              credentials.localParams.parameter.$parent.downloadTransactions(
                result.res_data,
                "deposits"
              );
            }
          } else {
            commit(Const.SET_DEPOSIT_LIST, result.res_data);
          }
        } else {
          if (credentials.localParams.pageFlag == "download") {
            credentials.localParams.parameter.$parent.downloadTransactions(
              {},
              "deposits"
            );
          } else {
            commit(Const.SET_DEPOSIT_LIST, {});
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
  [Const.RUN_GET_WITHDRAWAL_LIST](
    { commit, state, getters, dispatch },
    credentials
  ) {
    if (credentials.localParams.pageFlag == "download") {
      credentials.localParams.parameter.$parent.downloadPageLoader = true;
    } else {
      credentials.localParams.parameter.pageLoader = true;
    }
    COMMON._executeApi(
      Enpoints.EP_GET_WITHDRAWAL_LIST,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        if (credentials.localParams.pageFlag == "download") {
          credentials.localParams.parameter.$parent.downloadPageLoader = false;
        } else {
          credentials.localParams.parameter.pageLoader = false;
        }
        if (!error) {
          if (credentials.localParams.pageFlag == "download") {
            if (result.res_data.records.length > 0) {
              for (let i = 0; i <= result.res_data.records.length - 1; i++) {
                delete result.res_data.records[i].user_id;
                delete result.res_data.records[i].withdrawal_type;
                result.res_data.records[i]['Transaction Hash'] = result.res_data.records[i].crypto_tx_id
                delete result.res_data.records[i].withdrawal_status;
                delete result.res_data.records[i].ticket_id;
                delete result.res_data.records[i].txn_web;
                delete result.res_data.records[i].created;
                delete result.res_data.records[i].modified;
                delete result.res_data.records[i].withdrawal_method
                
                delete result.res_data.records[i].created_by
                delete result.res_data.records[i].crypto_tx_id
                if (i == result.res_data.records.length - 1) {
                  credentials.localParams.parameter.$parent.downloadTransactions(
                    result.res_data,
                    "withdrawals"
                  );
                }
              }
            } else {
              credentials.localParams.parameter.$parent.downloadTransactions(
                result.res_data,
                "withdrawals"
              );
            }
          } else {
            commit(Const.SET_WITHDRAWAL_LIST, result.res_data);
          }
        } else {
          if (credentials.localParams.pageFlag == "download") {
            credentials.localParams.parameter.$parent.downloadTransactions(
              {},
              "withdrawals"
            );
          } else {
            commit(Const.SET_WITHDRAWAL_LIST, {});
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

  [Const.RUN_GET_ORDER_LIST1](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_COMPLETED_ORDER_LIST,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
        } else {
          // commit(Const.SET_DEPOSIT_LIST, {})
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },

  [Const.RUN_GENERATE_WALLET_ADDRESS](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_GENERATE_WALLET_ADDRESS,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.generateWalletAddress1 = result.res_data.address
          commit(Const.SET_GENERATE_WALLET_ADDRESS, result.res_data.address);
          if (
            credentials.localParams.parameter.$route.name == "crypto_deposit"
          ) {
            credentials.localParams.parameter.regulerDetails();
          }
        } else {
          commit(Const.SET_GENERATE_WALLET_ADDRESS, "");
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },

  [Const.RUN_DEMO_DEPOSIT]({ commit, state, getters, dispatch }, credentials) {
    COMMON._executeApi(
      Enpoints.EP_DEMO_DEPOSIT,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        if (!error) {
          credentials.localParams.parameter.reset();
          if (credentials.localParams.page == "man_account") {
            credentials.localParams.parameter.fund_msz = "fund_msz";
            credentials.localParams.parameter.fund_msz_type = "success";
          } else {
            COMMON._messageDisplayFunction(
              credentials.localParams.parameter,
              "suceessMsz17",
              "success"
            );
          }
        } else {
          if (credentials.localParams.page == "man_account") {
            credentials.localParams.parameter.fund_msz = result.res_data;
            credentials.localParams.parameter.fund_msz_type = "error";
          } else {
            COMMON._messageDisplayFunction(
              credentials.localParams.parameter,
              result.res_data,
              "error"
            );
          }
        }
      }
    );
  },
  [Const.RUN_TRANS_LIMIT_CURRENCY](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_TRANS_LIMIT_CURRENCY,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          if (
            parseInt(
              result.res_data[credentials.localParams.parameter.get_method_id]
                .MONTHLY
            ) == 0
          ) {
            credentials.localParams.parameter.raised_max_limit_msg =
              "you have raised max limit of transaction per month";
          } else {
            credentials.localParams.parameter.raised_max_limit_msg = "";
          }
          credentials.localParams.parameter.responseTransLimitData =
            result.res_data;
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
  [Const.RUN_GET_USER_CAN_DEPOSIT](
    { commit, state, getters, dispatch },
    credentials
  ) {
    COMMON._executeApi(
      Enpoints.EP_GET_USER_CAN_DEPOSIT,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        if (!error) {
          commit(Const.SET_DEPOSIT_LIMIT, result.res_data);
        } else {
          commit(Const.SET_DEPOSIT_LIMIT, []);
          //COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,'error')
        }
      }
    );
  },
  [Const.RUN_CREDIT_CARD_DEPOSIT](
    { commit, state, getters, dispatch },
    credentials
  ) {
    COMMON._executeApi(
      Enpoints.EP_CREDIT_CARD_DEPOSIT,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        if (!error) {
          if (result.res_data.url) {
            window.open(result.res_data.url, "_self");
          } else {
            credentials.localParams.parameter.transaction_id =
              result.res_data.transaction_id;
            credentials.localParams.parameter.submitPay(
              result.res_data.transaction_id
            );
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

  [Const.RUN_GET_WITHDRAWAL_METHODS](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_GET_WITHDRAWAL_METHODS,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          //withdrawalMethodResponse
          commit(Const.SET_WITHDRAWAL_METHOD_RESPONSE, result.res_data);
          let json = {},
            count = 0;
          for (var key in result.res_data) {
            count++;
            json[key] = {};
            let count1 = 0;
            for (var innerkey in result.res_data[key]) {
              count1++;
              json[key][result.res_data[key][innerkey].id] =
                result.res_data[key][innerkey];
              if (count1 == Object.keys(result.res_data[key]).length) {
               
              }
            }
            if (count == Object.keys(result.res_data).length) {
              commit(Const.SET_WITHDRAWAL_METHOD_RESPONSE_DEP, json);
              commit(Const.SET_WITHDRAWAL_METHOD_RESPONSE, json);
            }
          }
        } else {
          commit(Const.SET_WITHDRAWAL_METHOD_RESPONSE_DEP, {});
          commit(Const.SET_WITHDRAWAL_METHOD_RESPONSE, {});
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
        }
      }
    );
  },
  [Const.RUN_WITHDRAWAL_CHECK_OTP](
    { commit, state, getters, dispatch },
    credentials
  ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi(
      Enpoints.EP_WITHDRAWAL_CHECK_OTP,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          // if(credentials.localParams.params){
          //     credentials.localParams.parameter.success = true
          //     //credentials.localParams.parameter.msg = result.res_data.msg
          // }else{
          credentials.localParams.parameter.ticket_id =  result.res_data.ticket_id;
          credentials.localParams.parameter.showPopup = 3;
          // }
        } else {
          // if(credentials.localParams.params){
          //     credentials.localParams.parameter.success = false
          //     credentials.localParams.parameter.msg = result.res_data
          //     COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,'error')
          // }else{
          COMMON._messageDisplayFunction(
            credentials.localParams.parameter,
            result.res_data,
            "error"
          );
          // }
        }
      }
    );
  },
  [Const.RUN_GET_WITHDRAWAL_DESC](
    { commit, state, getters, dispatch },
    credentials
  ) {
    COMMON._executeApi(
      Enpoints.EP_GET_WITHDRAWAL_DESC,
      credentials,
      getters.GET_TOKEN,
      commit,
      (error, result) => {
        if (!error) {
          credentials.localParams.parameter.free_margin =
            result.res_data.margin_detail.freeMargin;
          let currencyIcon = {
            EUR: "€",
            USD: "$",
            GBP: "£",
            CHF: "CHF",
            JPY: "¥",
            AUD: "$",
          };
          credentials.localParams.parameter.free_margin_currency =
            result.res_data.margin_detail.freeMargin +
            " " +
            currencyIcon[credentials.localParams.parameter.currencyData];
          if (Object.keys(result.res_data.allowedWithdrawal).length > 0) {
            credentials.localParams.parameter.allowedWithdrawal =
              result.res_data.allowedWithdrawal;
          } else {
            let json = {},
              count = 0;
            let get_withdrawal_method =
              getters[Const.GET_WITHDRAWAL_METHOD_RESPONSE_DEP];
            for (var key in get_withdrawal_method) {
              count++;

              json[key] = {};
              let count1 = 0;
              for (var innerkey in get_withdrawal_method[key]) {
                count1++;
                json[key][innerkey] = {};
                json[key][innerkey][
                  credentials.localParams.parameter.currencyData
                ] = result.res_data.margin_detail.freeMargin;

                if (parseInt(key) != 5) {
                  json[key][innerkey]["allowed"] = "1";
                }
              }

              if (count == Object.keys(get_withdrawal_method).length) {
                credentials.localParams.parameter.allowedWithdrawal = json;
                credentials.localParams.parameter.showBalPanel = false;
              }
            }
          }

          credentials.localParams.parameter.pay_option = "";
          credentials.localParams.parameter.amount = "";
          credentials.localParams.parameter.avalBalance = "";
          credentials.localParams.parameter.account_number = "";
          credentials.localParams.parameter.submitted = false;
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
  [Const.RUN_GET_WITH_DEPO_CUR_LIST](
    { commit, state, getters, dispatch },
    credentials
  ) {
    let result = {
      walletCurrencyList: [
        { currency_name: "Bitcoin", symbol: "BTC", keyType: "" },
        { currency_name: "Litecoin", symbol: "LTC", keyType: "" },
        { currency_name: "Tether", symbol: "USDT", keyType: "ERC20" },
        { currency_name: "Ethereum", symbol: "ETH", keyType: "ERC20" },
        { currency_name: "USD Coin ", symbol: "USDC", keyType: "ERC20" },
        { currency_name: "TRX USDT", symbol: "TRXUSDT", keyType: "TRC20" },
        { currency_name: "TRX USDC", symbol: "TRXUSDC", keyType: "TRC20" },
        {
          currency_name: "United States dollar",
          symbol: "USD",
          keyType: "FIAT",
        },
        { currency_name: "Dogecoin", symbol: "DOGE", keyType: "" },
        { currency_name: "Dai", symbol: "DAI", keyType: "ERC20" },
        { currency_name: "TRON", symbol: "TRX", keyType: "" },
        { currency_name: "Wrapped Bitcoin", symbol: "WBTC", keyType: "ERC20" },
        { currency_name: "Chainlink ", symbol: "LINK", keyType: "ERC20" },
      ],
    };
    commit(Const.SET_WITH_DEPO_CUR_LIST, result.walletCurrencyList);
    // COMMON._executeApi(Enpoints.EP_GET_WITH_DEPO_CUR_LIST, credentials, getters.GET_TOKEN, commit, (error, result) => {
    //     if (!error) {
    //         commit(Const.SET_WITH_DEPO_CUR_LIST, result.walletCurrencyList)
    //     } else {
    //         commit(Const.SET_WITH_DEPO_CUR_LIST, [])
    //         COMMON._messageDisplayFunction(credentials.localParams.parameter, result.res_data, 'error')
    //     }
    // })
  },
};
