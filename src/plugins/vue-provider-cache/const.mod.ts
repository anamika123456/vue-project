/**
 * global runtime constants for the plugin
 */
export const STORE_MODULE_NAME = "vue-provider-cache"
export const REF = 'vpc'
export const PRICE_FEED = import.meta.env.VITE_PRICE_FEED;

export const Const = {
  

  ////////////////////////// globals ////////////////////////////


  /**
   * router config for the remote
   * blockmaze-price-feed-microservice host 
   */
  WS_PRICE_FEED_DOMAIN: { 
    HOST: PRICE_FEED , //'https://stg-pricefeed.capitalwallet.site:10010',  
    EP_API_SEARCH_BY: '/api/ws-price-feed/search-by',
    EP_API_CONFIG: '/api/ws-price-feed/config'
  },


  ////////////////////////// actions ////////////////////////////

  // load global config 
  RUN_REGISTER_PROVIDERS: STORE_MODULE_NAME + '/' + REF + '/RUN_REGISTER_PROVIDERS',

  // run heartbeat for s single cachetag 
  RUN_HERARTBEAT: STORE_MODULE_NAME + '/' + REF + '/RUN_HERARTBEAT',

  //////////////////// mutations //////////////////////////////

  // start and register providers
  SET_REGISTER_PROVIDERS: STORE_MODULE_NAME + '/' + REF + '/SET_REGISTER_PROVIDERS',

  // update heartbeat for single provider
  SET_HEARTBEAT: STORE_MODULE_NAME + '/' + REF + '/SET_HEARTBEAT',

  //////////////////// getters //////////////////////////////

  // get heartbeats from all providers
  GET_HEARTBEATS: STORE_MODULE_NAME + '/' + REF + '/GET_HEARTBEATS',
  // get all providers
  GET_PROVIDERS: STORE_MODULE_NAME + '/' + REF + '/GET_PROVIDERS'
}
export const ConstCache = {

  ////////////////////////// globals ////////////////////////////

  STORE_MODULE_NAME: "vue-provider-cache",
  REF: 'vpc',

  /**
   * router config for the remote
   * blockmaze-price-feed-microservice host 
   */
 


  ////////////////////////// actions ////////////////////////////

  // load global config 
  RUN_REGISTER_PROVIDERS: STORE_MODULE_NAME + '/' + REF + '/RUN_REGISTER_PROVIDERS',

  // run heartbeat for s single cachetag 
  RUN_HERARTBEAT: STORE_MODULE_NAME + '/' + REF + '/RUN_HERARTBEAT',

  //////////////////// mutations //////////////////////////////

  // start and register providers
  SET_REGISTER_PROVIDERS: STORE_MODULE_NAME + '/' + REF + '/SET_REGISTER_PROVIDERS',

  // update heartbeat for single provider
  SET_HEARTBEAT: STORE_MODULE_NAME + '/' + REF + '/SET_HEARTBEAT',

  //////////////////// getters //////////////////////////////

  // get heartbeats from all providers
  GET_HEARTBEATS: STORE_MODULE_NAME + '/' + REF + '/GET_HEARTBEATS',
  // get all providers
  GET_PROVIDERS: STORE_MODULE_NAME + '/' + REF + '/GET_PROVIDERS'
}