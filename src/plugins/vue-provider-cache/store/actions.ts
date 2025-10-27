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
  [Const.RUN_REGISTER_PROVIDERS]: ({ commit, state, getters },
    providers: Array<IProvider>) => {
      // console.log( '===import.meta======',import.meta.env)
    const token = getters['GET_TOKEN'] || ''
   
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

        // console.log('response====',response.data)
        commit(Const.SET_REGISTER_PROVIDERS, { providers, response:response.data })
      }).catch(e => {
        //console.log('RUN_REGISTER_PROVIDERS [e]', e)
      })
  },
  /**
   * update the heartbeat of a single provider.
   * needs to be run as action to update the state
   */
  [Const.RUN_HERARTBEAT]: ({ commit, state },
    params: any) => {
    commit(Const.SET_HEARTBEAT, params)
  }

}