import { IProcess } from "../process/iprocess.ifc";

/**
 * basic provider with flat cache and 
 * single scheduled patching of all items.
 * no maxAge checking on cached items
 */
export interface IFlatProvider extends IProcess {
  // saves the interval or timeout state
  intervalMonitor:any
  // IE11 does not support function names for constructor
  // so we need to set it manually on implementation level 
  // for class initialization from config.json in the 
  // store mutations
  constructorName:string 
  // the cache to use - here simple object
  iCache:any
  // get the vuex store
  getStore():any 
  // add an item with new data
  addItem(key:any, newItem:any):void
  // add listof items with new data
  addItems(mappings:any):void
  // notify if an item in the cache was updated
  heartbeat(params?:any):void
  // prepare scheduler
  startScheduler(params?:any):void
  // stop scheduler
  stopScheduler(params?:any):void
  // execute
  execute(params?:any):void
}
