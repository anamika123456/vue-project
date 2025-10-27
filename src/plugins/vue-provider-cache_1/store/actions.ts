// remote requests to load config json-file and against the data warehouse
import axios from 'axios'
// date library
import * as moment from 'moment'

import { Const } from '../const.mod'
import { IProvider } from '../../lib/provider/iprovider.ifc';
import { ICache } from '../../lib/cache/icache.ifc';

/**
 * actions extension for store module
 */
export const actions = {

  ////////////////////////// general standard methods 
  ////////////////////////// for registering plugins
  ////////////////////////// and heartbeats ////////////////////////////////
  
  /**
   * load vue plugin configuration from 
   * price feed websocket facade.
   * @param providers Array<IProvider> list of initialized providers 
   * with a reference to the vuex store.
   */
  [Const.RUN_REGISTER_PROVIDERS]: ({commit, state, getters}, 
    providers:Array<IProvider>) => {

      /*const token = getters['GET_TOKEN']
      const resp = {"token":token, "TraderTransactionsProvider":{"pid":"P_TT","cacheItemTag":"traderTransactions","refreshInterval":100},"PriceFeedProvider":{"pid":"P_PF","cacheItemTag":"priceFeed","seeders":{"PriceFeedSeeder":{"pid":"S_PF_PF","defaultIsinIds":[1,2],"ENDPOINT":"wss://pricefeed.capitalwallet.com/price-feed","reconnectInterval":5000,"maxRetries":0,"restartDelay":30000}},"patchers":{"SecurityMasterPatcher":{"pid":"D_PF_SM","DW_HOST":"https://localhost:4000","DW_EP_CLOSE_PRICE":"/api/sec_master","DW_EP_CLOSE_PRICE_DF":"YYYYMMDD"}},"cache":{"className":"FifoCache","pid":"C_PF_FF","refreshInterval":45000,"maxAge":30000,"restartDelay":30000}}}
      

      commit(Const.SET_REGISTER_PROVIDERS, { providers,  response:{"data":resp}})*/
      // get curent user's jwt from state. 
      const token = getters['GET_TOKEN']
      // set auth header
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      axios.get(
        Const.WS_PRICE_FEED_DOMAIN.HOST +
        Const.WS_PRICE_FEED_DOMAIN.EP_API_CONFIG
      )
      .then(response => {
          // patch jwt if there is none already
          const configToken = response.data.data['token']
          response.data.data['token'] = (configToken != undefined) 
            ? configToken : token

          commit(Const.SET_REGISTER_PROVIDERS, { providers, response:response.data })
        }).catch(e => {
          //console.log('RUN_REGISTER_PROVIDERS [e]', e)
        })
  },
  /**
   * update the heartbeat of a single provider.
   * needs to be run as action to update the state
   */
  [Const.RUN_HERARTBEAT]: ({commit, state}, 
    params:any) => {
      commit(Const.SET_HEARTBEAT, params)
  }
 
}