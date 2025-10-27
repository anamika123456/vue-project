import { IProcess } from "../process/iprocess.ifc";
import { ICacheable } from "./icacheable.ifc";
import { IItemValidator } from "../provider/iitem-validator.ifc";

export interface ICache extends IProcess {

  // saves the interval or timeout state
  intervalMonitor:any

  // key object mappings of the cache
  cacheEntries:any

  // investigate each cached item
  revalidateCache():void

  // return key -> object mapping of the whole cache   
  getItems():any

  // return key -> object mapping of the whole cache   
  getItem(key:any):ICacheable

  // add a new entry to the cache with or without associated object
  // and optional expiration time
  addItem(key:any, item?:any, mayAge?:number)

  // add a new entries to the cache with or without associated object
  // and optional expiration time
  addItems(mappings:any, mayAge?:number)

  // remove a single cache entry
  removeItem(key:any):boolean

  // remove a list of cache entries
  removeItems(keys:Array<any>):boolean

  // return all cache keys as array
  asKeysArray(mappings?:any):Array<any>

  // return all cached objects as array
  asObjectArray(mappings?:any):Array<ICacheable>

}