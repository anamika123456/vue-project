export interface ITask {

  /**
   * config settings for this task
   * must contain at minimum
   * {
   *  refreshInterval: [interval-time-in-milliseconds],
   * }
   */
  settings:any

  /**
   * saves the interval state
   */
  intervalMonitor:any
  
  /**
   * prepare schedule
   * @param params 
   */
  prepare(params?:any):void

  /**
   * start process thread
   * used by caches and providers and mains to start all 
   * registered providers and caches
   * @param params 
   */
  start(params?:any):void
  
  /**
   * stop process thread
   * used by caches and providers and mains to stop all 
   * registered providers and caches
   * @param params 
   */
  stop(params?:any):void
  
  /**
   * run task once
   */
  execute():void
  
}