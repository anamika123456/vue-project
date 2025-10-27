import { Const } from "../lib/const.cls";
import * as types from "@/types";
import * as RxFactory from "@/api/rx-factory";
import * as Enpoints from "@/api/endpoints";
import * as COMMON from "../../../../store/commomFunction";
import moment from "moment";
import axios from "axios";
export const actions = {
  
  [Const.RUN_CARD_STATE_CHANGE]({ commit, state, getters, dispatch },credentials ) {
    let card_users_by_id = getters[Const.GET_CARD_USER_BY_ID];
    let currentStep = card_users_by_id.steps;
    // let currentStep = this.card_users_by_id.steps
    if ('tempStep' in card_users_by_id && currentStep < card_users_by_id.tempStep) {
      currentStep = card_users_by_id.tempStep
    }
    if (credentials.localParams.backto <= currentStep) {
      card_users_by_id.tempStep = currentStep
      card_users_by_id.steps = credentials.localParams.backto
      let user_json = card_users_by_id
      commit(Const.SET_CARD_USER_BY_ID, user_json);
    }
  },

  [Const.RUN_GET_NOTIFICATION_EVENTS]({ commit, state, getters, dispatch },credentials ) {
      // const eventSource = new EventSource("https://devapi-cp.capitalwallet.site/notifications/1749", {
      //   'Authorization': 'Bearer ' + getters.GET_TOKEN
      // });
      // console.log('headers===',headers)
      // eventSource.onmessage = (event) => {
      //   const eventData = JSON.parse(event.data);
      //   // this.events.push(eventData);
      // };

      // eventSource.onerror = () => {
      //   console.error("SSE connection error");
      //   eventSource.close();
      // };

      getPromiseResult();
      async function getPromiseResult() {
        const response = await axios({
            method: 'get',
            url: "https://devapi-cp.capitalwallet.site/sse-events/1749",
            headers: {
                'Authorization': 'Bearer ' + getters.GET_TOKEN,  // Add Authorization header,
                'Accept': 'text/event-stream', // or any custom header
            },
            // responseType: 'stream'  
        });
        console.error("SSE connection error not ", response);

        // Pipe the response from the SSE server to the client
        // response.data.pipe(res);
      }
  },

  [Const.RUN_CREATE_CARD_USER]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_CREATE_CARD_USER, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          _localStateStorageUpdateFunc(getters, credentials, commit);
          credentials.localParams.parameter.$parent.userId = result.res_data.userId
          // credentials.localParams.parameter.getAllCardUsersFunc(result.res_data.userId,2)
          credentials.localParams.parameter.$router.push({path : '/card-steps1', query:{userId: result.res_data.userId, getDiv:3}})
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },

  [Const.RUN_GET_CARD_USER]({ commit, state, getters, dispatch },credentials ) {

    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_GET_CARD_ALL_USER, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          commit(Const.SET_CARD_USER, result.res_data);
          commit(Const.SET_CARD_USER_BY_ID, {});
          // localStorage.removeItem("card_users_by_id");
          commit(Const.SET_CARD_USER_BY_ID, {});
        } else {
          commit(Const.SET_CARD_USER, result.res_data)
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },

  [Const.RUN_GET_CARDS]({ commit, state, getters, dispatch },credentials ) {

    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_GET_CARDS, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          if(result.res_data.cards && result.res_data.cards.length > 0){
            for(let i=0 ; i<= result.res_data.cards.length-1 ; i++){
              if(result.res_data.cards[i].id == credentials.localParams.parameter.$route.query.cardId){
                credentials.localParams.parameter.cardImageJson = result.res_data.cards[i]
              }
            }
          }
          credentials.localParams.parameter.getCards = result.res_data;
        } else {
          credentials.localParams.parameter.getCards = {};
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },


  [Const.RUN_GET_CARD_USER_BY_ID]({ commit, state, getters, dispatch },credentials ) {
    // console.log('credentials 00 ----',credentials)
    credentials.localParams.parameter.pageLoader = true;
    const _that = credentials.localParams.parameter;
    COMMON._executeApi( Enpoints.EP_GET_CARD_USER, credentials, getters.GET_TOKEN, commit, (error, result) => {
        // if(credentials.localParams.kycFlag && credentials.localParams.kycFlag == 1){
        //   credentials.localParams.parameter.pageLoader = true;
        // }else{
        //   credentials.localParams.parameter.pageLoader = false;
        // }
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          // console.log('credentials 11 ----',result.res_data)
          commit(Const.SET_CARD_USER_BY_ID, result.res_data);
          if(credentials.localParams.page && credentials.localParams.page == 'card-dashboard'){
            credentials.localParams.parameter.limitFunc('daily')
          }
          switch (parseInt(credentials.localParams.steps)) {
            case 1:
              _that.fname = result.res_data.first_name;
              _that.lname = result.res_data.last_name;
              _that.email = result.res_data.email;
              _that.currency = result.res_data.currency;
              _that.phno = result.res_data.country_code+result.res_data.mobile.toString() ;

              // _that.$parent.email = result.res_data.email
              // _that.$parent.phno = result.res_data.mobile
            break;
            case 2:
              // _that.$parent.email = result.res_data.email
              // _that.$parent.phno = result.res_data.mobile
              _that.email = result.res_data.email;
              _that.phno = result.res_data.country_code+result.res_data.mobile.toString();
              _that.inputKey += 1;
            break;
            case 8:
              // _that.currency = 'BTC'; //result.res_data.currency;
            break;
          }
        } else {
          commit(Const.SET_CARD_USER_BY_ID, {})
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },

  [Const.RUN_VERIFY_CARD_EMAIL]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_VERIFY_CARD_EMAIL, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.innerDiv = ''
          credentials.localParams.parameter.otp = ''
          _localStateStorageUpdateFunc(getters, credentials, commit);
          // _localStateStorageUpdateFunc(getters, credentials, commit);
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },

  [Const.RUN_RESEND_CARD_EMAIL]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_RESEND_CARD_EMAIL, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,'otp resend successfully',"success");
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },

  [Const.RUN_VERIFY_CARD_MOBILE]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_VERIFY_CARD_MOBILE, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          _localStateStorageUpdateFunc(getters, credentials, commit);
          credentials.localParams.parameter.innerDiv = ''
          credentials.localParams.parameter.otp = ''
          // _localStateStorageUpdateFunc(getters, credentials, commit);
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },

  [Const.RUN_RESEND_CARD_MOBILE]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_RESEND_CARD_MOBILE, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,'otp resend successfully',"success");
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },

  [Const.RUN_UPDATE_USER_CARD_ADDRESS]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_UPDATE_USER_CARD_ADDRESS, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          _localStateStorageUpdateFunc(getters, credentials, commit);
          // credentials.localParams.parameter.startKycFunc()
          // _localStateStorageUpdateFunc(getters, credentials, commit);
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },

  [Const.RUN_START_KYC]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_START_KYC, credentials, getters.GET_TOKEN, commit, (error, result) => {
        // if(credentials.localParams.parameter.kycFlag && credentials.localParams.parameter.kycFlag == 1){
        //   credentials.localParams.parameter.pageLoader = true;
        // }else{
        //   credentials.localParams.parameter.pageLoader = false;
        // }
        credentials.localParams.parameter.pageLoader = false;
        
        if (!error) {
          credentials.localParams.parameter.kycLink = result.res_data.verificationLink
          credentials.localParams.parameter.kycToken = result.res_data.token
          credentials.localParams.parameter.launchWebSdk(result.res_data.token)
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },

  [Const.RUN_GET_ALL_CARD_WALLET_BY_USER]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_GET_ALL_CARD_WALLET_BY_USER, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          commit(Const.SET_ALL_CARD_WALLET_BY_USER, result.res_data)
          if(credentials.localParams.page){
            credentials.localParams.parameter.checkEnrichFlag()
          }
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },

  [Const.RUN_GET_ALL_WALLET_BY_ID]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_GET_ALL_WALLET_BY_ID, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.card_wallets1 = result.res_data
          // commit(Const.SET_ALL_CARD_WALLET_BY_USER, result.res_data)
          // if(credentials.localParams.page){
          //   credentials.localParams.parameter.checkEnrichFlag()
          // }
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },

  [Const.RUN_GET_CARD_ADDRESS]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_GET_CARD_ADDRESS, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {            
          if(credentials.localParams.page && credentials.localParams.page == 'card-top-up' && credentials.localParams.currency && credentials.localParams.currency.toLowerCase() == 'eur'){
            credentials.localParams.parameter.bankDetails = result.res_data
          }else if(credentials.localParams.page && credentials.localParams.page == 'card-activation' && credentials.localParams.currency && credentials.localParams.currency.toLowerCase() == 'eur'){
            credentials.localParams.parameter.resetTimer()
            credentials.localParams.parameter.bankDetails = result.res_data
            credentials.localParams.parameter.blockchainDepositAddress = result.res_data.blockchainDepositAddress
            credentials.localParams.parameter.getAllCardWalletByUser()
          }else if(credentials.localParams.page && credentials.localParams.page == 'card-activation' && credentials.localParams.currency && credentials.localParams.currency.toLowerCase() !== 'eur'){
            credentials.localParams.parameter.resetTimer()
            credentials.localParams.parameter.blockchainDepositAddress = result.res_data.blockchainDepositAddress
            credentials.localParams.parameter.getAllCardWalletByUser()
          }else{
            credentials.localParams.parameter.blockchainDepositAddress = result.res_data.blockchainDepositAddress
            credentials.localParams.parameter.getAllCardWalletByUser()
          }
          
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },

  [Const.RUN_CARD_ACTIVATE]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_CARD_ACTIVATE, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.Popup = true ;
          credentials.localParams.parameter.responseId =  result.res_data.id
          // credentials.localParams.parameter.blockchainDepositAddress = result.res_data.blockchainDepositAddress
          // credentials.localParams.parameter.getAllCardWalletByUser()
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },

  [Const.RUN_CARD_TRANSACTIONS]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.transLoader = true;
    COMMON._executeApi( Enpoints.EP_CARD_TRANSACTIONS, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.transLoader = false;
        if (!error) {
          credentials.localParams.parameter.getCardTransactions = result.res_data
          // credentials.localParams.parameter.getAllCardWalletByUser()
        } else {
          credentials.localParams.parameter.getCardTransactions = {'count': 0, 'records': []}
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },
  [Const.RUN_CARD_DETAILS]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_CARD_DETAILS, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.getCardDetails = result.res_data
          if(credentials.localParams.page && credentials.localParams.page == 'card-dashboard'){
            
            credentials.localParams.parameter.getAllCardsofParticularUserFunc()
            credentials.localParams.parameter.getAllCardUsersFunc()
            credentials.localParams.parameter.cardTransactions()
            credentials.localParams.parameter.getChartDataFunc()
            if(result.res_data.status && result.res_data.status.toLowerCase() == 'active'){
              credentials.localParams.parameter.freeze = false
            }else if(result.res_data.status && result.res_data.status.toLowerCase() == 'closed'){
              credentials.localParams.parameter.burn = true
            }else{
              credentials.localParams.parameter.freeze = true
            }
          }else if(credentials.localParams.page && credentials.localParams.page == 'card-manage'){
            credentials.localParams.parameter.getAllCardWalletByUser()
            credentials.localParams.parameter.getAllCardsofParticularUserFunc()
          }else if(credentials.localParams.page && credentials.localParams.page == 'card-top-up'){
            credentials.localParams.parameter.getAllCardsofParticularUserFunc()
          }else if(credentials.localParams.page && credentials.localParams.page == 'upgrade-limit-kyc'){
            credentials.localParams.parameter.getAllCardUsersFunc()
            credentials.localParams.parameter.startKycFunc()
          }

          credentials.localParams.parameter.cardAccountDetails()
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },
  [Const.RUN_CARD_ACCOUNT_DETAILS]({ commit, state, getters, dispatch },credentials ) {

    
    if(credentials.localParams.module && credentials.localParams.module != ''){
      credentials.localParams.parameter.pageLoader = false;
    }else{
      commit(Const.SET_CARD_ACCOUNT_DETAILS, {});
      credentials.localParams.parameter.pageLoader = true;
    }
    COMMON._executeApi( Enpoints.EP_CARD_ACCOUNT_DETAILS, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          commit(Const.SET_CARD_ACCOUNT_DETAILS, result.res_data);
          if(credentials.localParams.module && credentials.localParams.module != ''){
            credentials.localParams.parameter.checkEnrichFlag(credentials.localParams.module)
          }else{
            if(credentials.localParams.page && credentials.localParams.page == 'card-top-up'){
              credentials.localParams.parameter.checkEnrichFlag()
            }
          }
          
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },

  [Const.RUN_MULTI_USER_ROLE_UPDATE]({ commit, state, getters, dispatch },credentials ) {
    // commit(Const.SET_CARD_ACCOUNT_DETAILS, {});
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApiWithoutToken( Enpoints.EP_MULTI_USER_ROLE_UPDATE, credentials, "", commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },

  [Const.RUN_CARD_BLOCK]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_CARD_BLOCK, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.reset()
          credentials.localParams.parameter.cardDetails()
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },
  [Const.RUN_CARD_UNBLOCK]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_CARD_UNBLOCK, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.reset()
          credentials.localParams.parameter.cardDetails()
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },
  [Const.RUN_CARD_BURN]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_CARD_BURN, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.reset()
          if(credentials.localParams.page && credentials.localParams.page == 'card-listing'){
            credentials.localParams.parameter.listing()
          }else{
            credentials.localParams.parameter.$router.replace("/crypto-debit-cards");
            COMMON._messageDisplayFunction(credentials.localParams.parameter,'card burn successfully',"success");
          }
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },
  [Const.RUN_LINK_ACCOUNT]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_LINK_ACCOUNT, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.cardDetails()
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },
  [Const.RUN_CARD_WALLET_CREATE]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_CARD_WALLET_CREATE, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          let json = {} ;
          json['wallets'] = [] ;
          json['wallets'] = [{
            'accounts' : result.res_data.accounts ? result.res_data.accounts : {}
          }]

         

          commit(Const.SET_ALL_CARD_WALLET_BY_USER, json)
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },
  [Const.RUN_EDIT_PASSWORD]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.pageLoader = true;
    COMMON._executeApi( Enpoints.EP_EDIT_PASSWORD, credentials, getters.GET_TOKEN, commit, (error, result) => {
        credentials.localParams.parameter.pageLoader = false;
        if (!error) {
          credentials.localParams.parameter.editPasswordPopup = 2
        } else {
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },
  [Const.RUN_GET_CHART_DATA]({ commit, state, getters, dispatch },credentials ) {
    credentials.localParams.parameter.chartLoader = true;
    COMMON._executeApi( Enpoints.EP_GET_CHART_DATA, credentials, getters.GET_TOKEN, commit, (error, result) => {
        // credentials.localParams.parameter.chartLoader = false;
        if (!error) {
          if(result.res_data.length > 0){
            credentials.localParams.parameter.getChartData = result.res_data
            credentials.localParams.parameter.createChart(result.res_data)
          }else{
            credentials.localParams.parameter.chartLoader = false;
            credentials.localParams.parameter.getChartData = []
          }
        } else {
          credentials.localParams.parameter.chartLoader = false;
          credentials.localParams.parameter.getChartData = []
          COMMON._messageDisplayFunction(credentials.localParams.parameter,result.res_data,"error");
        }
      }
    );
  },
};

function _localStateStorageUpdateFunc(getters, credentials, commit) {
  let user_json = getters[Const.GET_CARD_USER_BY_ID];
  user_json.steps = credentials.localParams.steps;
  commit(Const.SET_CARD_USER_BY_ID, user_json)
}
