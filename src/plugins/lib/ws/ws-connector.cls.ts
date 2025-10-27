import { Process } from "../process/process.cls";
import { Loggeable } from "../common/loggeable.cls";
import { IProcess } from "../process/iprocess.ifc";

/**
 * Basic implementation for a WebSocket wrapper
 */
export class WsConnector extends Process implements IProcess {

  // name of the websocket
  private static TAG:string = 'WsConnector'

  // HTML5 WebSocket
  private ws:WebSocket = null

  // saves the timeout state - pause between re-connects
  private timeoutTrigger = null


  private timeoutTriggerStatus = null

  private timeoutStatusInterval = 10000

  private timeoutTriggerDisconnect = null

  // current number of retries to connect to the websocket
  private currentRetry:number = 0

  // default handlers
  private onopen = (ev:Event) => { this.log(WsConnector.TAG, 'DEF open...', ev)}
  private onclose = (ev:CloseEvent) => { this.log(WsConnector.TAG, 'DEF close...', ev)}
  private onconnecting = () => { this.log(WsConnector.TAG, 'DEF connecting...')}
  private onmessage = (ev:MessageEvent) => { this.log(WsConnector.TAG, 'DEF onmessage...', ev)}
  private onerror = (event:ErrorEvent) => this.handleError 

  constructor() {
    super(null)
    this.log(WsConnector.TAG, this.settings)
  }
  
  /**
   * start process thread
   * used by caches and providers and mains to start all 
   * registered providers and caches
   * @param params 
   */
  start(params:any):void {
    // console.log(WsConnector.TAG, 'start', params)
    this.settings = params
    // overide handlers from config
    this.onopen = this.settings.onopen || this.onopen
    this.onclose = this.settings.onclose || this.onclose
    this.onconnecting = this.settings.onconnecting || this.onconnecting
    this.onmessage = this.settings.onmessage || this.onmessage
    // connect websocket
    this.connect()
  }
  
  /**
   * stop process thread
   * used by caches and providers and mains to stop all 
   * registered providers and caches
   * @param params 
   */
  stop(params?:any):void {
    this.log(WsConnector.TAG, 'stopping websocket...')
    this.close()
  }
  
  /**
   * authenticate
   * @param params must contain credentials in case auth is needed
   */
  auth(params:any):void {}

  /**
   * build query in case there are request params 
   * in the configuration
   */
  private buildQuery() {
    let q = '' // optional query string
    if ( !Object.prototype.hasOwnProperty.call(this.settings, 'query') ) {
      return q
    }
    if ('query' in this.settings) {
      for (const key in this.settings.query) {
        q += key+'='+this.settings.query[key] + '&'  
      }
    }
    q = (q.length>1) ? '?' + q.substring(0, q.length-1) : ''
    return q
  }

  /**
   * connect websocket
   */
  public connect = () => {
    try {
      // if websocket is already connected - close it
      this.stop()

      // construct full url t owebsocket
      const wsurl = this.settings.ENDPOINT + this.buildQuery()

      this.onconnecting()
      // init webocket
      this.ws = new WebSocket(wsurl)
      // overide handlers
      this.ws.onopen = this.onopen
      this.ws.onmessage = this.onmessage
      this.ws.onerror = (event:ErrorEvent) => {
        this.handleError(event)    
      }
      this.checkStatus()
    }
    catch (ex) {
      this.handleError(ex)    
    }        
  }

  //checkStatus
  private checkStatus = () =>{
      const _her = this

      if (this.timeoutTriggerStatus !== null) { // clear timeout
        clearTimeout(this.timeoutTriggerStatus)
        this.timeoutTriggerStatus = null
      }        
      this.timeoutTriggerStatus =  setInterval(() => {
        if(_her.ws){
          if(_her.ws.readyState == 2 || _her.ws.readyState == 3){
          
            _her.connect()
            _her.timeoutStatusInterval = 10000
            _her.checkStatus()
            // _her.handleDisconnect()
          } else if(_her.ws.readyState == 0){
            
            _her.timeoutStatusInterval = 20000
            _her.checkStatus()
          }
          else if(_her.ws.readyState == 1){
            _her.timeoutStatusInterval = 500
            _her.checkStatus()
          }
        }
        
        
      }, _her.timeoutStatusInterval)      
  }

  /**
   * handle errors and invoke re-ceonncting if configured 
   * and we haven't reached number of max retries
   */
  private handleError = (event:ErrorEvent) => {
    try {
      if (this.settings.maxRetries == 0 
          || this.currentRetry < this.settings.maxRetries) { // less than max-retries?
        this.currentRetry++
        this.log(WsConnector.TAG, '[' + this.currentRetry + 'of' + 
          this.settings.maxRetries + '] try again in handle error' + this.settings.reconnectInterval + ' ms')
        if (this.timeoutTrigger!==null) { // clear timeout
          clearTimeout(this.timeoutTrigger)
          this.timeoutTrigger = null
        }
        // set new timeout before next re-connect	
        this.timeoutTrigger = setTimeout(() => {
          this.connect()	
        }, this.settings.reconnectInterval)
      } else { // already reached max
        this.log(WsConnector.TAG, 'failed to connect websocket after in handle error' +  
          this.settings.maxRetries + ' tries')
          try {                   
            this.stop() 
        } catch (fini) {
          this.log(WsConnector.TAG, 'websocket closing')
          // final chutdown of websocket
        }
      }
    } catch (exo) {
      this.log(WsConnector.TAG, 'handleError', exo)
      this.onerror(exo)
    }
  }

  private handleDisconnect = () => {
    try {
      if (this.settings.maxRetries == 0 
          || this.currentRetry < this.settings.maxRetries) { // less than max-retries?
        this.currentRetry++
        
        this.log(WsConnector.TAG, '[' + this.currentRetry + 'of' + 
          this.settings.maxRetries + '] try again in ' + this.settings.reconnectInterval + ' ms')
        
        // set new timeout before next re-connect 
        this.connect()

      } else { // already reached max
        this.log(WsConnector.TAG, 'failed to connect websocket after' +  
          this.settings.maxRetries + ' tries')
          try {                   
            this.stop() 
        } catch (fini) {
          this.log(WsConnector.TAG, 'websocket closing')
          // final chutdown of websocket
        }
      }
    } catch (exo) {
      this.log(WsConnector.TAG, 'handleError', exo)
      this.onerror(exo)
    }
  }

  /**
   * ssend data message to websocket
   * @param data 
   */
  public send(data: any, localParams: any) {
    if (this.ws.readyState === 1) {
      if (localParams !== undefined) { localParams.successWs() }
  
      return this.ws.send(data)

    }
    else {
      this.waitForSocketConnection(this.ws, data, (data) => {
        try {
          if (this.ws.readyState === 1) {
            if (localParams !== undefined) { localParams.successWs() }
            this.log(WsConnector.TAG, 'send',{ endpoint: this.settings.ENDPOINT, data })
            
            return this.ws.send(data)
          } else {
            if (localParams !== undefined) { localParams.failedWs() }
            // console.log("this.ws.readyState", this.ws.readyState)
            // this.connect()
          }
        } catch (ex) {
          if (localParams !== undefined) { localParams.failedWs() }
          this.log(WsConnector.TAG, 'send', ex.message)
        }
      })
    }

  }

  protected waitForSocketConnection = (socket, data, callback) => {
    setTimeout(() => {
      try {
        
        if (socket.readyState === 1) {
          if(callback != null){
            callback(data)
          }
          return
        } else {
          
          this.waitForSocketConnection(socket, data, callback)
        }
      } catch (ex) {
        this.waitForSocketConnection(socket, data, callback)
      }
    }, 5)
  }  

  /**
   * close websocket
   */
  protected close():void {
    try {
      this.ws.close()
      this.ws = null
    } catch (ex) {
      this.ws = null
    }
    this.log(WsConnector.TAG, 'stopping websocket ... done')
  }
}
