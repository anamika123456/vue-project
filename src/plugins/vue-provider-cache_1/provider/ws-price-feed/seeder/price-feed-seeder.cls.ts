import { ISeeder } from "../../../../lib/seeder/iseeder.ifc"
import { ICacheable } from "../../../../lib/cache/icacheable.ifc"
import { Process } from "../../../../lib/process/process.cls"
import { WsConnector } from "../../../../lib/ws/ws-connector.cls"
import { IProvider } from "../../../../lib/provider/iprovider.ifc";

import { Const } from '../../../../trading/provider/lib/const.cls'

const Buffer = require('buffer').Buffer;
const zlib = require('zlib');

export class PriceFeedSeeder extends Process implements ISeeder {

  private static TAG = 'PriceFeedSeeder'
  public watchlistCalled = false

  /**
   * HTML5 WebSocket wrapper
   */
  private wsConnector: WsConnector = null

  constructor(iProvider: IProvider) {
    super(iProvider)
  }

  public sendMessage(jsonMsg: any) {
    try {
      let obj = Object.keys(jsonMsg)[0]
      if (jsonMsg[obj].localParams != undefined) {
        var localParams = jsonMsg[obj].localParams
        delete jsonMsg[obj].localParams
        this.wsConnector.send(JSON.stringify(jsonMsg), localParams)
        // console.log('return sendmessage',this.wsConnector.send(JSON.stringify(jsonMsg), localParams))
      } else {
        // alert(JSON.stringify(jsonMsg))
        this.wsConnector.send(JSON.stringify(jsonMsg), undefined)
        // this.wsConnector.send(JSON.stringify(jsonMsg), undefined)
        console.log('return sendmessage',this.wsConnector.send(JSON.stringify(jsonMsg), localParams))
      }
    } catch (ex) {
      this.log(PriceFeedSeeder.TAG, 'sendMessage EXC', { jsonMsg, ex: ex.message })
    }
  }

  /**
   * @Override
   * authenticate using the credentials inside params
   * @param params 
   */
  public auth(params: any) {
    try {
      this.sendMessage(params)
    } catch (ex) {
      this.log(PriceFeedSeeder.TAG, 'auth [ex]', ex.message)
    }
  }

  /**
   * @Override
   * subscribe tp a resource
   * @param ids either an array of ids or a key -> objecr mapping
   */
  public subscribe(ids: any): void {
    alert('subscribe in')
    console.log('subscibe in ',JSON.stringify(ids))
    ids = (ids instanceof Array) ? ids : this.mapping2keys(ids)
    this.sendMessage({ subscribe: ids })
    this.iProvider.heartbeat()
  }
  
  public watchlist(ids: any): void {alert('watchlist',JSON.stringify(ids))
    if(!this.watchlistCalled){
      ids = (ids instanceof Array) ? ids : this.mapping2keys(ids)
      this.sendMessage({ watchlist: ids })
      this.iProvider.heartbeat()
      this.iProvider.getStore().commit(Const.SET_WATCH_LIST_PAIRS, ids)
      this.watchlistCalled = true
    }
  }

  /**
   * @Override
   * authenticate using the credentials inside params
   * @param params 
   */
  public unsubscribe(ids: any) {
    ids = (ids instanceof Array) ? ids : this.mapping2keys(ids)
    this.sendMessage({ unsubscribe: ids })
    this.iProvider.patchItems(ids, true)
  }


  /**
   * @Override
   * authenticate using the credentials inside params
   * @param params 
   */
  public placeOrder(ids: any) {
    this.sendMessage({ placeOrder: ids })
    // this.iProvider.patchItems(ids, true)
    this.iProvider.heartbeat()
  }
  public cancelOrder(ids: any) {
    this.sendMessage({ cancelOrder: ids })
    // this.iProvider.patchItems(ids, true)
    this.iProvider.heartbeat()
  }




  public onopen = (ev: Event) => {
    // this.log(PriceFeedSeeder.TAG, 'open connection at url' + 
    //   this.settings.ENDPOINT) 
    try {
      this.auth({ auth: this.iProvider.settings.token, defaults: this.settings.defaultIsinIds })
      if(this.iProvider.getStore().getters[Const.GET_WATCH_LIST_PAIRS].length > 0){
        this.watchlist(this.iProvider.getStore().getters[Const.GET_WATCH_LIST_PAIRS])
      }
    } catch (ex) { console.log(ex) }
  }

  /**
   * handle message from webocket
   */
  heartbeat: number = 0
  public onmessage = (ev: MessageEvent) => {
    try {
      const _that = this
      var responseBuffer = new Buffer(ev.data, 'base64');
      // const responseBuffer = new Buffer(ev.data, 'binary');
      zlib.unzip(responseBuffer, function (err, buffer) {
        if (!err) {
          const jsonMsg = JSON.parse(buffer.toString())

          const vuexStore = _that.iProvider.getStore()

          if (Object.keys(jsonMsg).length != 0) {
            // this.log(PriceFeedSeeder.TAG, 'onmessage', jsonMsg)
            if ('isins' in jsonMsg) { // on auth, su
              if ('subscribe' in jsonMsg) {
                // add the array of isin-ids to the cache
                _that.iProvider.addItems(jsonMsg)
                return
              }
              else if ('unsubscribe' in jsonMsg) {
                // remove the array of isin-ids from the cache
                _that.iProvider.patchItems(jsonMsg, false)
              }
              return
            }
            else if ('message' in jsonMsg) {
              //fecth order id
              if('tempOrderId' in jsonMsg.message){
                if (localStorage.getItem('orderMessage')) {
                  localStorage.removeItem('orderMessage');
                }
                localStorage.setItem('orderMessage', JSON.stringify(jsonMsg.message));
              }
              if ('orderupdate' in jsonMsg.message) {
                // console.log("orderupdate",jsonMsg.message.orderupdate)
                // console.log('orderupdate', jsonMsg.orderupdate)
                // console.log(jsonMsg
                // orderList here we have 3 object
                // 1 open orders
                // 2 filled
                // 3 Rejected
                const orderUpdateData = jsonMsg.message.orderupdate
                const orderList = vuexStore.getters[Const.GET_ORDER_LIST]
                // console.log('orderupdate--',orderUpdateData,orderList)

                // if(orderUpdateData.Status == "CREATED"){

                /* order update data
                  AccountID: 561
                  Lifetime: "GTC"
                  OpenTime: "2021-02-01T03:07:50.416925000"
                  OrderID: 766826505
                  OrderSide: 1
                  OrderType: "M"
                  Price: null
                  Quantity: 1
                  QuantityRemaining: 1
                  Status: "CREATED"
                  StopPrice: null
                  Symbol: "ADA-BTC"
                Triggered: "Y"*/
                let tempOldValue = ''
                const allOrderList = orderList.records
                const orderId = orderUpdateData.OrderID
                for (var key in allOrderList) {
                  if (allOrderList[key].OrderId == orderId) {
                    tempOldValue = allOrderList[key]
                    delete allOrderList[key]
                  }
                }

                let temp = {}

                if (orderUpdateData.Status == "CREATED") {
                  temp = {
                    "Lifetime": orderUpdateData.Lifetime,
                    "Opened": orderUpdateData.OpenTime,
                    "OrderId": orderUpdateData.OrderID,
                    "OrderSide": orderUpdateData.OrderSide,
                    "OrderType": orderUpdateData.OrderType,
                    "Price": orderUpdateData.Price,
                    "Quantity": orderUpdateData.Quantity,
                    "QuantityRemaining": orderUpdateData.QuantityRemaining,
                    "StopPrice": orderUpdateData.Lifetime,
                    "Symbol": orderUpdateData.Symbol,
                    "Status": 'CREATED'
                  }
                  if ("Commission" in orderUpdateData) {
                    temp['Commission'] = orderUpdateData.Commission
                  } else {
                    temp['Commission'] = (orderUpdateData.QuantityFilled * 0.50) / 100
                  }
                }

                if (orderUpdateData.Status == "FILLED") {
                  // console.log("FILLED",orderUpdateData)
                  /*AccountID: 1710
                    Lifetime: "GTC"
                    OpenTime: "2021-05-01T08:09:23.482287000"
                    OrderID: 913402830
                    OrderSide: 1
                    OrderType: "L"
                    Price: 0.00002317
                    Quantity: 0.005
                    QuantityRemaining: 0.005
                    Status: "CREATED"
                    StopPrice: null
                    Symbol: "ADA-BTC"
                  Triggered: "Y"*/

                  /*{      upcoming data
                    "AccountID": 1023,
                    "Commission": 0.00002028776978328,
                    "CommissionAccount": 1023,
                    "CommissionCurrency": "BTC",
                    "ExtCommission": 0,
                    "Lifetime": "GTC",
                    "OpenTime": "2022-05-26T06:58:03.321183000",
                    "OrderID": 944460661,
                    "OrderSide": 1,
                    "OrderType": "M",
                    "Price": null,
                    "PriceFilled": 0.00000282,
                    "Quantity": 71.94244604,
                    "QuantityFilled": 71.94244604,
                    "QuantityRemaining": 0,
                    "Status": "FILLED",
                    "StopPrice": null,
                    "Symbol": "ABBC-BTC",
                    "Triggered": "Y"
                  }*/
                  if(tempOldValue != ''){
                    if ("Commission" in orderUpdateData) {
                      tempOldValue['Commission'] = orderUpdateData.Commission
                    } else {
                      tempOldValue['Commission'] = (orderUpdateData.QuantityFilled * 0.50) / 100
                    }
                    tempOldValue['QuantityFilled'] = parseFloat(orderUpdateData.QuantityFilled).toFixed(8)
                    tempOldValue['QuantityRemaining'] = parseFloat(orderUpdateData.QuantityRemaining).toFixed(8)
                    tempOldValue['PriceFilled'] = parseFloat(orderUpdateData.PriceFilled).toFixed(8)
                    tempOldValue['Closed'] = new Date();
                    tempOldValue['Status'] = orderUpdateData.Status
                  }else{
                    orderUpdateData['OrderId'] = orderUpdateData.OrderID
                    orderUpdateData['sortDate'] = orderUpdateData.OpenTime
                    tempOldValue = orderUpdateData
                  }
                  temp = tempOldValue

                  // console.log("temp order=======>", temp)
                }

                if (orderUpdateData.Status == "CANCELED") {
                  temp = tempOldValue
                  temp['Status'] = 'CANCELED'
                }
                if(orderUpdateData.Status == "CREATED" && temp['OrderType'] == 'SL'){
                  let stop = JSON.parse(JSON.stringify(temp))
                  let limit = JSON.parse(JSON.stringify(temp))
                  stop['OrderType'] = 'S'
                  stop['Price'] = 0
                  limit['OrderType'] = 'L'
                  limit['StopPrice'] = 0
                  orderList.records.unshift(stop)
                  orderList.records.unshift(limit)
                }else{
                  orderList.records.unshift(temp)
                }
                // vuexStore.commit(Const.SET_ORDER_LIST, orderList)

                var openlist = orderList.records.filter(val => val.Status == 'CREATED')
                var canclelist = orderList.records.filter(val => val.Status == 'CANCELED')
                var filledlist = orderList.records.filter(val => val.Status == 'FILLED')
                let stateData = {
                  records: orderList.records,
                  totalRecords: { 'open': openlist.length, 'cancel': canclelist.length, 'filled': filledlist.length }
                }
                vuexStore.commit(Const.SET_ORDER_LIST, stateData)
              }
            }

            else if ('notification' in jsonMsg) {
              vuexStore.commit(Const.SET_NOTIFICATION_LIST, jsonMsg)
              // vuexStore.getters[Const.SET_NOTIFICATIONS] = 'set here' 
              //compueted vuexStore.getters[Const.GET_NOTIFICATIONS] //
            }
            else {
              // console.log(jsonMsg);

              _that.iProvider.patchItems(jsonMsg)
            }
          }
        } else {
          console.error(err)
        }
      })
    } catch (exo) {
      this.log(PriceFeedSeeder.TAG, 'onmessage EXC', exo)
    }
  }

  private closeWs(params?: any): void {
    this.watchlistCalled = false
    try {
      this.wsConnector.stop(params)
    } catch (ex) {
      this.log('closing websocket', ex.message)
    }
  }

  public onclose = (ev: CloseEvent) => {
    this.watchlistCalled = false
    this.log(PriceFeedSeeder.TAG, 'onclose...', ev)
  }
  public onerror = (ev: Error) => {
    this.watchlistCalled = false
    this.log(PriceFeedSeeder.TAG, 'onerror...', ev)
  }
  public onconnecting = () => {

    this.log(PriceFeedSeeder.TAG, 'onconnecting...')
  }

  /**
   * start process thread
   * used by caches and providers and mains to start all 
   * registered providers and caches
   * @param params 
   */
  public start(params: any): void {
    this.settings = params
    try {
      this.settings.onopen = this.onopen
      this.settings.onclose = this.onclose
      this.settings.onconnecting = this.onconnecting
      this.settings.onmessage = this.onmessage
      this.wsConnector = new WsConnector()
      this.wsConnector.start(this.settings)

    } catch (ex) {
      this.log(PriceFeedSeeder.TAG, 'start [ex]', ex)
    }
  }

  /**
   * stop process thread
   * used by caches and providers and mains to stop all 
   * registered providers and caches
   * @param params 
   */
  public stop(params?: any): void {
    try {
      this.closeWs(params)
    } catch (ex) {
      this.log(PriceFeedSeeder.TAG, "stop [ex]", ex)
    }
  }

}