import { PriceFeedProviderConst } from "../price-feed-provider.lib";
import { IPatcher } from "../../../../lib/patcher/ipatcher.ifc";
import { Process } from "../../../../lib/process/process.cls";
import { ICacheable } from "../../../../lib/cache/icacheable.ifc";
import { IProvider } from "../../../../lib/provider/iprovider.ifc";

export class SecurityMasterPatcher extends Process implements IPatcher {

  private static TAG:string = 'SecurityMasterPatcher' 
  
  /**
   * @Override
   * start process thread
   * used by caches and providers and mains to start all 
   * registered providers and caches
   * @param params 
   */
  start(params:any):void {
    this.log(SecurityMasterPatcher.TAG, 'start', params)
    this.settings = params
  }
  
  /**
   * @Override
   * stop process thread
   * used by caches and providers and mains to stop all 
   * registered providers and caches
   * @param params 
   */
  stop(params?:any):void {
    this.log(SecurityMasterPatcher.TAG, "stop done")
  }
  
  /**
   * @Override
   * authenticate
   * uses the credentials inside params in case auth is needed
   * @param params 
   */
  auth(params:any):void {}

  // vuex store to make remote api calls
  private vuexStore:any = null

  constructor(iProvider:IProvider) {
    super(iProvider)
    this.vuexStore = iProvider.getStore()
    this.log(SecurityMasterPatcher.TAG, 'pid', this.settings.pid)
  }

  /**
   * decorate an expired cache item
   * @param iCacheable 
   */
  public decorate(iCacheable:ICacheable):void {
    this.vuexStore.dispatch(
      PriceFeedProviderConst.RUN_LOAD_PATCH, 
      {
        // to patch the right provider via mutation 
        cacheItemTag: this.iProvider.settings.cacheItemTag,
        // remote endpount
        target: this.settings.DW_HOST + this.settings.DW_EP_CLOSE_PRICE,
        // date format to compute yesterday
        dateformat:this.settings.DW_EP_CLOSE_PRICE_DF,
        // cache id
        key:iCacheable.key
      })
  } 

}