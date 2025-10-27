import { Const, STORE_MODULE_NAME, REF } from './const.mod'

// price feed provider
import { PriceFeedProvider, PriceFeedProviderConst,
  PriceFeedProviderMixins, PriceFeedProviderStore } 
    from './provider/ws-price-feed/price-feed-provider.lib'

// trader transactions provider
// import { TraderTransactionsProvider, TraderTransactionsProviderConst, 
//   TraderTransactionsProviderMixins, TraderTransactionsProviderStore } 
//     from './provider/poll-trader-transactions/trader-transactions-provider.lib'

// main store module contributions  
import { actions } from './store/actions'
import { state } from './store/state'
import { mutations } from './store/mutations'
import { getters } from './store/getters'

// create main store module and merge provider store contributions
const vueProviderStore = {
  state: { // merge state properties
    ...state, // main store state
    // ...TraderTransactionsProviderStore.state, // trader transactions store state
    ...PriceFeedProviderStore.state // price feed store state
  },
  actions: { // merge actions properties
    ...actions,
    // ...TraderTransactionsProviderStore.actions,
    ...PriceFeedProviderStore.actions
  } ,
  mutations: { // merge mutations properties
    ...mutations,
    // ...TraderTransactionsProviderStore.mutations,
    ...PriceFeedProviderStore.mutations
  },
  getters: { // merge getters properties
    ...getters,
    // ...TraderTransactionsProviderStore.getters,
    ...PriceFeedProviderStore.getters
  }
}

/**
 * init all providers injectinf vuex store instance 
 */
const initProviders = (store:any) => {
  return [
     new PriceFeedProvider(store),
     // new TraderTransactionsProvider(store)
    ]
}

/**
 *  component mixins
 */
export const ProviderCacheMixins = {
  created() {
    // dynamically extend store with price feed store module
    const _store = this.$store
    if (!(_store && _store.state && _store.state[STORE_MODULE_NAME])) { 
      this.$store.registerModule(STORE_MODULE_NAME, vueProviderStore)
    }
  }, 
  computed: { // merge provider mixin computed properties
    // ...TraderTransactionsProviderMixins.computed,
    ...PriceFeedProviderMixins.computed
  },
  mounted() {
    window.onunload = () => {
      const providers = this.$store.getters[Const.GET_PROVIDERS]
      for (let p in providers) {
        providers[p].stop()
        delete providers[p] 
      }
    }
    // emote request to data ware house 
    // therefor why we go over the facade
    this.$store.dispatch(Const.RUN_REGISTER_PROVIDERS, 
        initProviders(this.$store)) 
  },
  beforeDestroy() {
    const providers = this.$store.getters[Const.GET_PROVIDERS]
    for (let p in providers) {
      providers[p].stop()
      delete providers[p] 
    }
  },
  methods: {  // merge provider mixin methods
    // ...TraderTransactionsProviderMixins.methods,
    ...PriceFeedProviderMixins.methods 
  } 
}


