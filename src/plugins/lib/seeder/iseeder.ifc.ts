import { IProcess } from "../process/iprocess.ifc";
import { ICacheable } from "../cache/icacheable.ifc";
import { IProvider } from "../provider/iprovider.ifc";

/**
 * feeder contribute additional data to the 
 * cached elements without validating them.
 * feeders must receive their data from outside 
 * the cache, usually in form of some polling process 
 * or via websocket connections.
 */
export interface ISeeder extends IProcess {
  
  /**
   * callback reference to the provider
   */
  iProvider:IProvider
  
  /**
   * subscribe to a resource
   */
  subscribe(ids:any):void

  /**
   * unsubscribe from a resource
   */
  unsubscribe(ids:any):void
}