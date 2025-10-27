import { Const } from '../const.mod'

/**
 * getters extension for store module
 */
export const getters = {

  /** 
   * return current heartbeats for all providers
   */ 
  [Const.GET_HEARTBEATS]: (state) => {
    return state.heartbeats
  },
  /** 
   * return all providers
   */ 
  [Const.GET_PROVIDERS]: (state) => {
    return state.providers
  }
}