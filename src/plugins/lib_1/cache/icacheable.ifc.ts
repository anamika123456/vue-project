/**
 * interface for items in a cache
 */
export interface ICacheable {
  key:any       // unique identifier in cache
  item:any      // the object to cache
  ts:number     // timestamp of last validation in ms
  maxAge:number // maximum lifetime in ms
  error:boolean // error occured when itm was last refreshed 
}