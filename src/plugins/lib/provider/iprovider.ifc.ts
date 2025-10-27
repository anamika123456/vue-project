import { IProcess } from "../process/iprocess.ifc";
import { ICacheable } from "../cache/icacheable.ifc";
import { IItemValidator } from "./iitem-validator.ifc";
import { ISeeder } from "../seeder/iseeder.ifc";
import { ICache } from "../cache/icache.ifc";
import { IPatcher } from "../patcher/ipatcher.ifc";

/**
 * provider handle main loading, updateing and 
 * validation of cached items in regard to their 
 * expiration.
 */
export interface IProvider extends IProcess {
  // IE11 does not support function names for constructor
  // so we need to set it manually on implementation level 
  // for class initialization from config.json in the 
  // store mutations
  constructorName:string 
  // the cache to use
  iCache:ICache
  // elements' validator for this provider
  itemValidator:IItemValidator
  // all seeders registered with this provider
  seeders:any
  // all patchers registered with this provider
  patchers:any
  // get the vuex store
  getStore():any 
  // add an item with new data
  addItem(key:any, newItem:any):void
  // add listof items with new data
  addItems(mappings:any):void
  // patch an item with new data. 
  // will remove the entry if 2nd arg is not provided
  patchItem(key:any, newItem?:any):void
  // patch items with new data 
  // or remove them from cache if 2nd arg is provided
  patchItems(mappings:any, remove?:any):void
  // refresh a single cached item
  refresh(iCacheable:ICacheable):void
  // notify if an item in the cache was updated
  heartbeat(params?:any):void
  // initialize the cache
  initCache(params:any):void
  // stop cache registered with this provider
  stopCache(params?:any):void
  // start all seeders registered with this provider
  initSeeders(params:any):void
  // stop all seeders registered with this provider
  stopSeeders(params?:any):void
  // start all patchers registered with this provider
  initPatchers(params:any):void
  // stop all patchers registered with this provider
  stopPatchers(params?:any):void

}
