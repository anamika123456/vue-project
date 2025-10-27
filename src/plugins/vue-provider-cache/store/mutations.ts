import Vue from 'vue'
import { Const } from '../const.mod'
import { ICache } from '../../lib/cache/icache.ifc';

/**
 * mutations extension for store module
 */
export const mutations = {

  
  /**
   * pass config to providers, 
   * start providers and register with state
   * @param data { providers:<Array<IProvider>, response:any}
   */ 
  [Const.SET_REGISTER_PROVIDERS]: (state, data) => {
    const token = data.response.data.token
    data.providers.map(p => {
      try {
        // retrieve classname from object member
        const className = p.constructorName
        // retrieve provider configuration with cache, seeders, patchers, etc.
        const config = data.response.data[className] 
        const cacheItemTag = config.cacheItemTag
        if (cacheItemTag!=='undefined') {
          // inject token
          config['token'] = token
          // add hearbeat property fpr this provider
          state.heartbeats[cacheItemTag] = 1
          // add to state providers
          state.providers[cacheItemTag] = p
          // start the provider
          p.start(config)
        }
      } catch (ex) {
       // console.log('SET_REGISTER_PROVIDERS [ex]', ex)
      }
      
    })
  },
  /**
   * update heartbeat for single provider
   */ 
  [Const.SET_HEARTBEAT]: (state, params) => {
    const cacheTag = params.cacheItemTag
    try {
      state.heartbeats[cacheTag]++
    } catch (ex) {
     // console.log('SET_HEARTBEAT [ex]', ex)
      state.heartbeats[cacheTag] = 0
    }
  }
}