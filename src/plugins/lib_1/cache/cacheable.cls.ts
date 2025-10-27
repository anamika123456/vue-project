import { ICacheable } from "./icacheable.ifc";

export class Cacheable implements ICacheable {
  /** @Override */
  public key:any                // unique identifier in cache
  /** @Override */
  public item:any               // the object to cache
  /** @Override */
  public ts:number              // timestamp of last validation in ms
  /** @Override */
  public maxAge:number          // maximum lifetime in ms
  /** @Override */
  public error:boolean = false  // error occured when itm was last refreshed 
  
  /**
   * Constructor detail
   * @param key 
   * @param item 
   * @param ts 
   * @param maxAge 
   */
  constructor(key:any, item:any, ts:number, maxAge:number) {
    this.key = key
    this.item = item
    this.ts = ts
    this.maxAge = maxAge
  }
}