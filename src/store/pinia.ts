import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import * as API from "@/api/rx-factory";
import * as ENDPOINTS from "@/api/endpoints";
import router from "@/router";
import moment from "moment";
import axios from "axios";

const toast = useToast();

export const useMainStore = defineStore("main", {
  persist: {
    key: "storekey",
    storage: window.localStorage,
    paths: ["user"],
  },
  state: () => ({
    faqs_list: {},
    faqs_search_list: [],
    top_traders: [],
    all_traders: [],
    tradeIdeasList: [],
    loading: false,
    user: {},
    userFeedsList: {},
    feedsList: {},
    eu_country_list: {
      AT: '"Austria"',
      BE: '"Belgium"',
      BG: '"Bulgaria"',
      CY: '"Cyprus"',
      CZ: '"Czechia"',
      DE: '"Germany"',
      DK: '"Denmark"',
      EE: '"Estonia"',
      ES: '"Spain"',
      FI: '"Finland"',
      FR: '"France"',
      GR: '"Greece"',
      HR: '"Croatia"',
      HU: '"Hungary"',
      IE: '"Ireland"',
      IT: '"Italy"',
      LT: '"Lithuania"',
      LU: '"Luxembourg"',
      LV: '"Latvia"',
      MT: '"Malta"',
      NL: '"Netherlands"',
      PL: '"Poland"',
      PT: '"Portugal"',
      RO: '"Romania"',
      SE: '"Sweden"',
      SI: '"Slovenia"',
      SK: '"Slovakia"',
      CH: '"Switzerland"',
      GB: '"United Kingdom"',
    },
    isEU: false,
  }),
  getters: {
    client_url() {
      return this.isEU ? "" : "";
    },
    firstPath() {
      return this.isEU ? "" : "global.";
    },
  },
  actions: {
    // CourseCategory(params = {}, loader = false){
    //     if (loader) { this.loading = true; }
    //   return new Promise((resolve, reject) => {
    //     API.post(ENDPOINTS.EP_GET_COURSE_CATEGORY, params).then(response => {
    //         if(response != ''){
    //           this.loading = false;
    //           resolve(response)
    //         }else{ return; }
    //     }).catch(error => {
    //         this.loading = false
    //         reject(error)
    //     })
    //   })
    // },
    // CourseDetail(params = {}, loader = false){
    //     if (loader) { this.loading = true; }
    //   return new Promise((resolve, reject) => {
    //     API.post(ENDPOINTS.EP_GET_COURSE_DETAILS, params).then(response => {
    //         if(response != ''){
    //           this.loading = false;
    //           resolve(response)
    //         }else{ return; }
    //     }).catch(error => {
    //         this.loading = false
    //         reject(error)
    //     })
    //   })
    // },
    // articleFeedback(params = {}, loader = false){
    //     if (loader) { this.loading = true; }
    //   return new Promise((resolve, reject) => {
    //     API.post(ENDPOINTS.EP_FAQ_REVIEW,params).then(response => {
    //         if(response != ''){
    //           this.loading = false;
    //           resolve(response)
    //         }else{ return; }
    //     }).catch(error => {
    //         this.loading = false
    //         reject(error)
    //     })
    //   })
    // },
    // getFaqsList(params = {}, loader = false){
    //   if (loader) { this.loading = true; }
    //   return new Promise((resolve, reject) => {
    //     API.post(ENDPOINTS.EP_GET_FAQS,params).then(response => {
    //         if(response != ''){
    //           this.loading = false;
    //           this.faqs_list = response.dataArr
    //           this.faqs_search_list = response.searchArr
    //           resolve(this.faqs_list)
    //         }else{ return; }
    //     }).catch(error => {
    //         this.loading = false
    //         reject(error)
    //     })
    //   })
    // },
    // getCurrentCountry(){
    //   return new Promise((resolve, reject) => {
    //     /*fetch('https://ipapi.co/country?key=WqrqGPQYxfU6ySEZKqlU8bNDk9BgWVez4Uk3L4auzRyosaOWSs').then(response => {*/
    //     fetch('https://expapi.fxview.com/get/geo').then(response => {
    //         if (response.ok) {
    //             return response.text();
    //         } else {
    //             throw new Error('HTTP Error ' + response.status);
    //         }
    //     }).then(country => {
    //         if (country != '') {
    //             if(this.eu_country_list[country]){
    //                 this.isEU= true
    //                 resolve(this.isEU)
    //             }else{
    //                 resolve(this.isEU)
    //             }
    //         }
    //     }).catch(function (error) {
    //         reject(error)
    //     });
    //   })
    // },
    // //==============Login/Register=============//
    // getCalendar(params = {}, loader = false) {
    //     if (loader) { this.loading = true; }
    //     return new Promise((resolve, reject) => {
    //         API.post(ENDPOINTS.EP_GET_CALENDAR, params).then(response => {
    //             if(response != ''){
    //                 this.loading = false;
    //                 let newObj = {}
    //                 response.forEach(v=>{
    //                     let key = moment(v.date).format("dddd, DD MMMM YYYY");
    //                     if(!newObj[key]){
    //                         newObj[key] = []
    //                     }
    //                     newObj[key].push(v)
    //                 })
    //                 resolve(newObj);
    //             }else{return;}
    //         }).catch(error => {
    //             this.loading = false;
    //             reject(error);
    //         })
    //     })
    // },
    // getNews(params = {}, loader = false) {
    //     if (loader) { this.loading = true; }
    //     return new Promise((resolve, reject) => {
    //         API.post(ENDPOINTS.EP_GET_NEWS, params).then(response => {
    //             this.loading = false;
    //             const newData = response.filter(item => item._id !== null )
    //             resolve(newData);
    //         }).catch(error => {
    //             this.loading = false;
    //             reject(error);
    //         })
    //     })
    // },
    // getInsights(params = {}, loader = false) {
    //     if (loader) { this.loading = true; }
    //     return new Promise((resolve, reject) => {
    //         API.post(ENDPOINTS.EP_GET_INSIGHTS, params).then(response => {
    //             this.loading = false;
    //             resolve(response);
    //         }).catch(error => {
    //             this.loading = false;
    //             reject(error);
    //         })
    //     })
    // },
    // getCalendarHistory(params = {}, loader = false) {
    //     if (loader) { this.loading = true; }
    //     return new Promise((resolve, reject) => {
    //         API.post(ENDPOINTS.GET_TICKER_HISTORY, params).then(response => {
    //             this.loading = false;
    //             resolve(response);
    //         }).catch(error => {
    //             this.loading = false;
    //             reject(error);
    //         })
    //     })
    // },
    // getTopTraders(loader = false) {
    //     if (loader) { this.loading = true; }
    //     return new Promise((resolve, reject) => {
    //         if (this.top_traders.length) {
    //             resolve(this.top_traders)
    //         } else {
    //             API.get(ENDPOINTS.EP_GET_TOP_TRADERS).then(response => {
    //                 this.loading = false;
    //                 this.top_traders = response
    //                 resolve(this.top_traders)
    //             }).catch(error => {
    //                 this.loading = false;
    //                 reject(error);
    //             })
    //         }
    //     })
    // },
    // getAllTraders(params = {}, loader = false) {
    //     if (loader) { this.loading = true; }
    //     return new Promise((resolve, reject) => {
    //         if (this.all_traders.length) {
    //             resolve(this.all_traders)
    //         } else {
    //             API.post(ENDPOINTS.EP_GET_ALL_TRADERS, params).then(response => {
    //                 this.loading = false;
    //                 this.all_traders = response
    //                 resolve(this.all_traders)
    //             }).catch(error => {
    //                 this.loading = false;
    //                 reject(error);
    //             })
    //         }
    //     })
    // },
    // getTradersById(id, loader = false) {
    //     if (loader) { this.loading = true; }
    //     return new Promise((resolve, reject) => {
    //         API.get(ENDPOINTS.EP_GET_TRADER_DATA_BY_ID + id + '/search?flavorId=1&accessingFlavorId=1').then(response => {
    //             this.loading = false;
    //             resolve(response);
    //         }).catch(error => {
    //             this.loading = false;
    //             reject(error);
    //         })
    //     })
    // },
    // getTradeList(params = {}, loader = false) {
    //     if (loader) { this.loading = true; }
    //     return new Promise((resolve, reject) => {
    //         if (this.tradeIdeasList.length) {
    //             resolve(this.tradeIdeasList)
    //         } else {
    //             API.post(ENDPOINTS.EP_GET_TRADE_LIST, params).then(response => {
    //                 this.loading = false;
    //                 this.tradeIdeasList = response
    //                 resolve(this.tradeIdeasList)
    //             }).catch(error => {
    //                 this.loading = false;
    //                 reject(error);
    //             })
    //         }
    //     })
    // },
    // contactUs(params = {}, loader = false) {
    //     if (loader) { this.loading = true; }
    //     return new Promise((resolve, reject) => {
    //         API.post(ENDPOINTS.CONTACT_US, params).then(response => {
    //             this.loading = false;
    //             resolve(response);
    //         }).catch(error => {
    //             this.loading = false;
    //             reject(error);
    //         })
    //     })
    // },
  },
});
