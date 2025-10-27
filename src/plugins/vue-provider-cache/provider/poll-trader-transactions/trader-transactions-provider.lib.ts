import { Const } from '../../const.mod'
import { Process } from "../../../lib/process/process.cls"
import { IFlatProvider } from "../../../lib/provider/iflatprovider.ifc"

/**
 * trader transactions provider implementation
 */
export class TraderTransactionsProvider extends Process implements IFlatProvider {

  private static TAG = 'TraderTransactionsProvider'
  
  /**
   * @Override IFlatProvider
   * IE11 does not support function names for constructor
   * so we need to set it manually on implementation level 
   * for class initialization from config.json in the 
   * store mutations
   */
  public constructorName:string = TraderTransactionsProvider.TAG

  /**
   * @Override IFlatProvider
   * saves the interval or timeout state
   */ 
  intervalMonitor:any = null

  /**
   * @Override IFlatProvider
   * the cache to use - here simple object
   */
  public iCache:any = {}

  public vuexStore:any = null

  constructor(vuexStore:any) {
    super(null)
    this.vuexStore = vuexStore
    this.log(TraderTransactionsProvider.TAG, 'pid', this.settings.pid)
  }

  /**
   * @Override IFlatProvider
   * get the vuex store
   */ 
  getStore():any {
    return this.vuexStore
  } 

  /**
   * @Override IFlatProvider
   * add an item with new data
   */ 
  addItem(key:any, newItem:any):void {
    this.iCache[key] = newItem
    this.heartbeat()
  }

  /**
   * @Override IFlatProvider
   * add listof items with new data
   */ 
  addItems(mappings:any):void {
    for (const p in mappings) {
      this.addItem(p, mappings[p])
    }
  }

  /**
   * @Override IFlatProvider
   * notify if an item in the cache was updated
   */ 
  heartbeat(params?:any):void {
    params = params || {cacheItemTag: this.settings.cacheItemTag}
    this.vuexStore.dispatch(Const.RUN_HERARTBEAT, params)
  }

  /**
   * @Override IFlatProvider
   * prepare scheduler
   */ 
  startScheduler(params?:any):void {
    this.log(TraderTransactionsProvider.TAG, 'startScheduler [sesstings]', this.settings)
    this.stopScheduler(params)
    this.intervalMonitor = setInterval(this.execute, 
      this.settings.refreshInterval)
    this.heartbeat()  
  }

  /**
   * @Override IFlatProvider
   * stop scheduler
   */ 
  stopScheduler(params?:any):void {
    if (this.intervalMonitor!==null) {
      clearInterval(this.intervalMonitor)
    }
    this.intervalMonitor = null
    this.heartbeat()  
  }

  /**
   * @Override IFlatProvider
   * execute
   */ 
  execute = (params?:any):void => {
    // example for scheduled update of cache
    // -> invoke store action to retrieve trader transactions
    // patch cache with data
    this.addItem('a', new Date().getTime())
    this.addItem('b', new Date().getTime())
    this.addItem('c', new Date().getTime())
  }

  /**
   * @Override IProcess
   * start process thread
   * used by caches and providers and mains to start all 
   * registered providers and caches
   * @param params 
   */
  start(params:any):void {
    this.log(TraderTransactionsProvider.TAG, 'start [params]', params)
    this.settings = params
    this.auth(params)
  }
  
  /**
   * @Override IProcess
   * stop process thread
   * used by caches and providers and mains to stop all 
   * registered providers and caches
   * @param params 
   */
  stop(params?:any):void {
    this.log(TraderTransactionsProvider.TAG, 'stop [params]', params)
    this.stopScheduler(params)
  }
  
  /**
   * @Override IProcess
   * authenticate
   * @param params must contain credentials in case auth is needed
   * 
   * @TODO
   * add authentication logic
   */
  auth(params:any):void {
    this.log(TraderTransactionsProvider.TAG, 'auth [params]', params)
    // get sessionId from current user 
    this.startScheduler(params)
  }
}

/**
 * constants for this provider
 */
export const TraderTransactionsProviderConst = {
}
/**
 * vuex store contributions for this provider
 */
export const TraderTransactionsProviderStore = {
  state: {},
  actions: {},
  mutations: {},
  getters: {}
}
/**
 * component mixins for this provider
 */
export const TraderTransactionsProviderMixins = {
  methods: {},
  computed: {
    // return trader transaction list
    traderTransactions() {
      try {
        // just 'feel' the pulse here so we get a reactive response
        // as the cache is not reactive
        this.$store.getters[Const.GET_HEARTBEATS]['traderTransactions']
        return this.$store.getters[Const.GET_PROVIDERS]['traderTransactions'].iCache
      } catch (ex) {
        // console.log('TA-one [ex]', ex)
        return []
      }
    }
  }
}

