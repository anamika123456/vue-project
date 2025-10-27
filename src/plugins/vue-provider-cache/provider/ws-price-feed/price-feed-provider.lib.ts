import Vue from 'vue'
// remote requests to load config json-file and against the data warehouse
import axios from 'axios'
// date library
import moment from 'moment'

import { Const, STORE_MODULE_NAME, REF } from '../../const.mod'
import { IProvider } from '../../../lib/provider/iprovider.ifc'
import { IItemValidator } from '../../../lib/provider/iitem-validator.ifc'
import { ISeeder } from '../../../lib/seeder/iseeder.ifc'
import { ICacheable } from '../../../lib/cache/icacheable.ifc'
import { PriceFeedSeeder } from './seeder/price-feed-seeder.cls'
import { Process } from '../../../lib/process/process.cls'
import { ICache } from '../../../lib/cache/icache.ifc'
import { NSCaches } from './cache'
import { NSPatchers } from './patcher'
import { NSSeeders } from './seeder'
import { FifoItemValidator } from './cache/fifo-item-validator.cls'
import { IPatcher } from '../../../lib/patcher/ipatcher.ifc'
import { SecurityMasterPatcher } from './patcher/security-master-patcher.cls'

/**
 * price feed provider implementation
 */
export class PriceFeedProvider extends Process implements IProvider {

  // log tag
  private static TAG = 'PriceFeedProvider'

  /**
   * @Override
   * IE11 does not support function names for constructor
   * so we need to set it manually on implementation level 
   * for class initialization from config.json in the 
   * store mutations
   */
  public constructorName: string = PriceFeedProvider.TAG

  /** 
   * @Override
   * elements' validator for this provider
   */
  public itemValidator: IItemValidator = null
  /** 
   * @Override
   * all seeders registered with this provider
   */
  public seeders: any = {}

  /** 
   * @Override
   * all patchers registered with this provider
   */
  public patchers: any = {}

  // the cache to use
  public iCache: ICache = null

  public vuexStore: any = null

  constructor(vuexStore: any) {
    super(null)
    this.vuexStore = vuexStore
    //this.log(PriceFeedProvider.TAG, 'pid', this.settings.pid)
  }

  /**
   * @Override
   * start process thread
   * start all registered componennts
   * params must be received from some vuex-mutation 
   * and must contain the current jwt
   * @param params 
   */
  start(params: any): void {
    //this.log(PriceFeedProvider.TAG, 'start', params)
    this.settings = params
    //this.log(PriceFeedProvider.TAG, 'start', this.settings)
    try {
      // start provider components
      this.initCache(params['cache']) // just one cache per provider
      this.initSeeders(params['seeders']) // multiple seeders
      this.initPatchers(params['patchers']) // multiple patchers
    } catch (ex) {
      //this.log(PriceFeedProvider.TAG, 'start', ex)
    }
  }

  /**
   * inject the JWT into all component settings
   * @param params list of component settings
   * @param token JWT
   */
  protected injectToken(params: any, token: string) {
    for (const p in params) {
      params[p]['token'] = token
    }
  }

  /**
   * @Override
   * stop process thread
   * used by caches and providers and mains to stop all 
   * registered providers and caches
   * @param params 
   */
  stop(params?: any): void {
    try {
      this.iCache.stop()
    } catch (ex) {
      //this.log(PriceFeedProvider.TAG, 'stop cache [ex]', ex)
    }
    for (const p in this.seeders) {
      try {
        this.seeders[p].stop(params)
        delete this.seeders[p]
      } catch (ex) {
        //this.log(PriceFeedProvider.TAG, 'stop seeder [p, ex]', {p, ex})
      }
    }
    for (const p in this.patchers) {
      try {
        this.patchers[p].stop(params)
        delete this.patchers[p]
      } catch (ex) {
        //this.log(PriceFeedProvider.TAG, 'stop decorator [p, ex]', {p, ex})
      }
    }
    //this.log(PriceFeedProvider.TAG, 'stop done')
  }

  /** 
   * @Override
   * add an item with new data
   */
  public addItem(key: any, newItem?: any): void {
    this.iCache.addItem(key, newItem)
    this.heartbeat()
  }

  /** 
   * @Override
   * add listof items with new data
   */
  public addItems(mappings: any): void {
    for (const p in mappings) {
      this.addItem(mappings[p].other.isinid, mappings[p])
    }
  }

  /**
   * @Override
   * delegate method to patch an item with new data. 
   * The ICache will handle the patching by either 
   * adding it or using the IItemValidator to patch it.
   *  if 2nd arg is not provided 
   * the ICache will remove the entry
   * @param key unique cache key
   * @param data new date for item 
   */
  patchItem(key: any, newItem?: any): void {
    if (typeof newItem === 'undefined') {
      this.iCache.removeItem(key)
    } else {
      // add or patch through iCache's itemvalidator
      this.iCache.addItem(key, newItem)
    }
  }

  /**
   * @Override
   * patch items with new data 
   * or remove them from cache if 2nd arg is provided
   */
  patchItems(mappings: any, remove?: any): void {
    for (const p in mappings) {
      if (remove) {
        this.patchItem(mappings[p])
      } else {
        if (mappings[p].other) {
          this.patchItem(mappings[p].other.isinid, mappings[p])
        } else {
          if (p) {
            if (p == 'depth') {
              this.patchItem(p, mappings[p]['0'])
            } else {
              this.patchItem(p, mappings[p])
            }

          } else {
          }
        }

      }
      this.heartbeat()
    }
  }

  /** 
   * @Override
   * refresh a single cached item
   */
  public refresh(iCacheable: ICacheable): void {
    for (const d in this.patchers) {
      try {
        this.patchers[d].decorate(iCacheable)
        this.heartbeat()
      } catch (ex) {
        console.log(ex)
      }
    }
  }

  /** 
   * @Override
   * notify if an item in the cache was updated
   * @param params object that was updated
   */
  public heartbeat(params?: any): void {
    params = params || { cacheItemTag: this.settings.cacheItemTag }
    this.vuexStore.dispatch(Const.RUN_HERARTBEAT, params)
  }

  /**
   * @Override
   * authenticate using the credentials inside params
   * @param params 
   */
  public auth(params: any) {
    try {
    } catch (ex) {
      console.log(ex)
      //this.log(PriceFeedProvider.TAG, 'auth [ex]', ex.message)
    }
  }

  /**
   * @Override
   * initialize the cache
   * @param params optional arguments 
   */
  initCache(params: any): void {
    this.itemValidator = new FifoItemValidator(this)
    try {
      this.iCache = new NSCaches[params['className']](this)
      delete params['className']
      // further start operations muse be handled by implementation 
      this.iCache.start(params)
    } catch (ex) {
      //this.log(PriceFeedProvider.TAG, 'init cache [ex]', ex)
    }
  }

  /**
   * @Override
   * @param params optional arguments 
   * start all seeders registered with this provider
   */
  initSeeders(params: any): void {
    for (const p in params) {
      try {
        const seeder = new NSSeeders[p](this)

        // further start operations muse be handled by implementation 
        seeder.start(params[p])
        //this.log(PriceFeedProvider.TAG, 'initSeeders seeder pid', seeder.settings.pid)
        // add seeder under seeder's pid
        this.seeders[seeder.settings.pid] = seeder
      } catch (ex) {
        //this.log(PriceFeedProvider.TAG, 'init seeders [ex]', ex)
      }
    }
  }

  /**
   * @Override
   * start all patchers registered with this provider
   * @param params  
   */
  initPatchers(params: any): void {
    for (const p in params) {
      try {
        const patcher = new NSPatchers[p](this)
        patcher.start(params[p])
        // add decorator under decorator's pid
        this.patchers[patcher.settings.pid] = patcher
      } catch (ex) {
        //this.log(PriceFeedProvider.TAG, 'init patchers [ex]', ex)
      }
    }
  }

  /**
   * @Override
   * stop all seeders registered with this provider
   * @param params
   */
  stopSeeders(params?: any): void {
    for (const p in this.seeders) {
      try {
        this.seeders[p].stop(params)
      } catch (ex) {
        //this.log(PriceFeedProvider.TAG, 'stop seeders [ex]', ex.message)
      }
    }
  }

  /**
   * @Override
   * stop all patchers registered with this provider
   * @param params optional arguments 
   */
  stopPatchers(params?: any): void {
    for (const p in this.patchers) {
      try {
        this.patchers[p].stop(params)
      } catch (ex) {
        //this.log(PriceFeedProvider.TAG, 'stop patchers [ex]', ex.message)
      }
    }
  }

  /**
   * @Override
   * stop the cache registered with this provider
   */
  stopCache(params?: any): void {
    try {
      this.iCache.stop(params)
    } catch (ex) {
      //this.log(PriceFeedProvider.TAG, 'stop cache [ex]', ex.message)
    }
  }

  /**
   * @Override
   * get the vuex store
   */
  getStore(): any {
    return this.vuexStore
  }

}

/**
 * constants for this provider
 */
export const PriceFeedProviderConst = {

  ///////////// actions //////////////////////

  // load security master data for one isin
  RUN_LOAD_PATCH:
    STORE_MODULE_NAME + '/' + REF +
    '/RUN_LOAD_PATCH',

  // search by result key(i.e. 'mn' for mnemonics) 
  // and param in the isin cache
  RUN_SEARCH_BY:
    STORE_MODULE_NAME + '/' + REF +
    '/RUN_SEARCH_BY',

  ///////////// mutations //////////////////////

  // update single patch for single provider
  SET_LOAD_PATCH:
    STORE_MODULE_NAME + '/' + REF +
    '/SET_LOAD_PATCH',

  // commit search result
  SET_SEARCH_BY:
    STORE_MODULE_NAME + '/' + REF +
    '/SET_SEARCH_BY',

  //////////////////// getters //////////////////////////////

  // get all search results
  GET_SEARCH_BY:
    STORE_MODULE_NAME + '/' + REF +
    '/GET_SEARCH_BY'

}
/**
 * store contributions for this provider
 */
export const PriceFeedProviderStore = {
  state: {
    searchResults: {}   // reactive properties for the search results
  },
  actions: {
    /**
     * @param params expects 'rk' for item prperty to search and 
     * and 'p' for value
     */
    [PriceFeedProviderConst.RUN_SEARCH_BY]: ({ commit, state, getters },
      params: any) => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + getters['GET_TOKEN']
      axios.get(
        Const.WS_PRICE_FEED_DOMAIN.HOST +
        Const.WS_PRICE_FEED_DOMAIN.EP_API_SEARCH_BY,
        {
          params
        }
      )
        .then(response => {

          const Subscribed_isins = getters[Const.GET_PROVIDERS]['priceFeed'].iCache.asKeysArray()


          // console.log("this will be subscribed isin", Subscribed_isins)

          for (let i = 0; i < response.data.data.m.length; i++) {
            if (Subscribed_isins.indexOf(response.data.data.m[i].i) != -1) {
              response.data.data.m[i].subscribed = 1;
            }
            else {
              response.data.data.m[i].subscribed = 0;
            }
          }
          commit(PriceFeedProviderConst.SET_SEARCH_BY, response.data.data)


        }).catch(e => {
          console.log('RUN_SEARCH_BY [e]', e)
        })
    },

    /**
     * for a single isin
     * load yesterday's close price and other security_master data
     * from data warehouse service
     * @param params 
     * {
     *    isinId: array of isins-ids,
     *    callback: callback function for response
     *  } 
     */
    [PriceFeedProviderConst.RUN_LOAD_PATCH]: ({ commit, state, getters }, params) => {
      if (isNaN(params['key'])) {
        return
      } else {
        const cacheItemTag = params['cacheItemTag']
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + getters['GET_TOKEN']
        axios.get(params['target'], {
          params: {
            i: params['key'],
            d: moment().format(params['dateformat'])
          }
        }).then(response => {
          commit(PriceFeedProviderConst.SET_LOAD_PATCH, { cacheItemTag, response: response.data.data })
        }).catch(e => {
          console.log('RUN_LOAD_PATCH [ex]')
        })
      }
    }
  },
  mutations: {
    /** 
     * update search result data in the state
     */
    [PriceFeedProviderConst.SET_SEARCH_BY]: (state, params) => {
      try {
        for (const key in params) {
          state.searchResults[key] = params[key]
        }
      } catch (ex) {
        console.log('SET_SEARCH_BY [ex]')
      }
    },
    /** 
     * update security_master data for a 
     * single cache entry
     */
    [PriceFeedProviderConst.SET_LOAD_PATCH]: (state, data) => {
      const cacheItemTag = data['cacheItemTag']
      const patches = data.response
      for (const p in patches) {
        // patch items in cache
        state.providers[cacheItemTag].patchItem(p, patches[p])
        const hb = state.heartbeats[cacheItemTag]
        try {
          state.heartbeats[cacheItemTag]++
        } catch (ex) {
          state.heartbeats[cacheItemTag] = 0
        }
      }
    }
  },
  getters: {
    /** 
     * return all current search results 
     * against the price feed cache
     */
    [PriceFeedProviderConst.GET_SEARCH_BY]: (state) => {
      return state.searchResults
    }
  }
}
/**
 * component mixins for this provider
 */
export const PriceFeedProviderMixins = {
  methods: {
    /**
         * subscribe to ISIN-id(s)
         * @param ids array of ISIN-ids to subscribe to
         */
    subscribe(ids: Array<any>) {
      this.$store.getters[Const.GET_PROVIDERS]['priceFeed']
        .seeders['S_PF_PF'].subscribe(ids)
    },
    /**
     * unsubscribe from ISIN-id(s)
     * @param ids array of ISIN-ids to unsubscribe from
     */
    unsubscribe(ids: Array<any>) {
      this.$store.getters[Const.GET_PROVIDERS]['priceFeed']
        .seeders['S_PF_PF'].unsubscribe(ids)
    },
    /**
      * Place limit order

    */
    // placeOrder(ids:Array<any>) {
    //   this.$store.getters[Const.GET_PROVIDERS]['priceFeed']
    //     .seeders['S_PF_PF'].placeOrder(ids)
    // },
    /**
     * search provder cache for item attributes
     * @param rk name of the attribute, i.e. 'm' for mnemonics 
     * @param p value to search for
     */
    searchCache(rk, p) {
      this.$store.dispatch(PriceFeedProviderConst.RUN_SEARCH_BY, { rk, p })
    }

  },
  computed: {
    searchCacheResults() {
      return this.$store.getters[PriceFeedProviderConst.GET_SEARCH_BY]['m']
    },
    instruments() {
      try {
        // just 'feel' the pulse here so we get a reactive response
        // as the cache is not reactive  
        this.$store.getters[Const.GET_HEARTBEATS]['priceFeed']
        return this.$store.getters[Const.GET_PROVIDERS]['priceFeed']
          .iCache.asObjectArray()
      } catch (ex) {
        // console.log('OO-one [ex]', ex)
        return []
      }
    },
    user_isins() {
      try {
        // just 'feel' the pulse here so we get a reactive response
        // as the cache is not reactive  
        this.$store.getters[Const.GET_HEARTBEATS]['priceFeed']
        return this.$store.getters[Const.GET_PROVIDERS]['priceFeed']
          .iCache.asKeysValueArray()
      } catch (ex) {
        // console.log('OO-one [ex]', ex)
        return []
      }
    },
    get_crypto() {
      try {
        // just 'feel' the pulse here so we get a reactive response
        // as the cache is not reactive  
        this.$store.getters[Const.GET_HEARTBEATS]['priceFeed']
        return this.$store.getters[Const.GET_PROVIDERS]['priceFeed']
          .iCache.getCryptoCurrency()
      } catch (ex) {
        // console.log('OO-one [ex]', ex)
        return []
      }

    },

    get_crypto_depth() {
      try {
        // just 'feel' the pulse here so we get a reactive response
        // as the cache is not reactive  
        this.$store.getters[Const.GET_HEARTBEATS]['priceFeed']
        return this.$store.getters[Const.GET_PROVIDERS]['priceFeed']
          .iCache.getCryptoDepth()
      } catch (ex) {
        // console.log('OO-one [ex]', ex)
        return []
      }

    },


    get_currencies() {
      try {
        // just 'feel' the pulse here so we get a reactive response
        // as the cache is not reactive  
        this.$store.getters[Const.GET_HEARTBEATS]['priceFeed']
        return this.$store.getters[Const.GET_PROVIDERS]['priceFeed']
          .iCache.getCurrencies()
      } catch (ex) {
        // console.log('OO-one [ex]', ex)
        return []
      }

    },
    all_currencies_price() {
      try {
        // just 'feel' the pulse here so we get a reactive response
        // as the cache is not reactive  
        this.$store.getters[Const.GET_HEARTBEATS]['priceFeed']
        return this.$store.getters[Const.GET_PROVIDERS]['priceFeed']
          .iCache.asKeysValueArrayAll()
      } catch (ex) {
        // console.log('OO-one [ex]', ex)
        return []
      }

    },

    all_instruments_key() {
      try {
        // just 'feel' the pulse here so we get a reactive response
        // as the cache is not reactive  
        this.$store.getters[Const.GET_HEARTBEATS]['priceFeed']
        return this.$store.getters[Const.GET_PROVIDERS]['priceFeed']
          .iCache.getSegmentType()
      } catch (ex) {
        // console.log('OO-one [ex]', ex)
        return []
      }
    },
    get_Indices() {
      try {
        // just 'feel' the pulse here so we get a reactive response
        // as the cache is not reactive  
        this.$store.getters[Const.GET_HEARTBEATS]['priceFeed']
        return this.$store.getters[Const.GET_PROVIDERS]['priceFeed']
          .iCache.getIndices()
      } catch (ex) {
        // console.log('OO-one [ex]', ex)
        return []
      }
    },
    get_Indices_all() {
      try {
        // just 'feel' the pulse here so we get a reactive response
        // as the cache is not reactive  
        this.$store.getters[Const.GET_HEARTBEATS]['priceFeed']
        return this.$store.getters[Const.GET_PROVIDERS]['priceFeed']
          .iCache.getIndicesAll()
      } catch (ex) {
        // console.log('OO-one [ex]', ex)
        return []
      }
    },
    get_commodity() {
      try {
        // just 'feel' the pulse here so we get a reactive response
        // as the cache is not reactive  
        this.$store.getters[Const.GET_HEARTBEATS]['priceFeed']
        return this.$store.getters[Const.GET_PROVIDERS]['priceFeed']
          .iCache.getCommodity()
      } catch (ex) {
        // console.log('OO-one [ex]', ex)
        return []
      }
    },
    get_Commodity_All() {
      try {
        // just 'feel' the pulse here so we get a reactive response
        // as the cache is not reactive  
        this.$store.getters[Const.GET_HEARTBEATS]['priceFeed']
        return this.$store.getters[Const.GET_PROVIDERS]['priceFeed']
          .iCache.getCommodityAll()
      } catch (ex) {
        // console.log('OO-one [ex]', ex)
        return []
      }
    },

    get_all_currencies() {

      try {
        // just 'feel' the pulse here so we get a reactive response
        // as the cache is not reactive  
        this.$store.getters[Const.GET_HEARTBEATS]['priceFeed']
        return this.$store.getters[Const.GET_PROVIDERS]['priceFeed']
          .iCache.getAllcurrency()
      } catch (ex) {
        return []
      }
    }


  }
}
