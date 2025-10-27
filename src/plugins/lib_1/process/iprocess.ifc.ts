import { IProvider } from "../provider/iprovider.ifc";

/**
 * base interface for main classes, proveiders and caches
 */
export interface IProcess {
  
  /**
   * managing provider for this process
   * when set to null this is the main provider
   */
  iProvider:IProvider

  /**
   * config settings for this process
   */
  settings:any

  /**
   * start process thread
   * used by caches and providers and mains to start all 
   * registered providers and caches
   * @param params 
   */
  start(params:any):void
  
  /**
   * stop process thread
   * used by caches and providers and mains to stop all 
   * registered providers and caches
   * @param params 
   */
  stop(params?:any):void
  
  /**
   * authenticate
   * @param params must contain credentials in case auth is needed
   */
  auth(params:any):void

}