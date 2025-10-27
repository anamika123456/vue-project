import { Loggeable } from '../common/loggeable.cls';

export class Task extends Loggeable {

  /**
   * log tag
   */
  protected TAG:string = 'Task'
 
  /**
   * @Override ITask
   * config settings for this task
   * must contain at minimum
   * {
   *  refreshInterval: [interval-time-in-milliseconds],
   * }
   */
  settings:any = null 

  /**
   * @Override ITask
   * saves the interval state
   */
  intervalMonitor:any = null
  
  /**
   * Contructor detail
   */
  constructor() {
    super()
  }

  /**
   * start process thread
   * used by caches and providers and mains to start all 
   * registered providers and caches
   * @param params 
   */
  start(params?:any): void {
    // this.log(this.TAG, 'start...')
    this.settings = params
    if (! ('refreshInterval' in this.settings)) {
      throw new Error("Missing settings property: 'refreshInterval'")
    }
    if (! ('endpoint' in this.settings)) {
      throw new Error("Missing settings property: 'endpoint'")
    }
  }

  /**
   * stop process thread
   * used by caches and providers and mains to stop all 
   * registered providers and caches
   * @param params 
   */
  stop(params?: any): void {
    // this.log(this.TAG, 'stop...')
    if (this.intervalMonitor!==null) {
      clearInterval(this.intervalMonitor)
      this.intervalMonitor = null
    }
  }

}