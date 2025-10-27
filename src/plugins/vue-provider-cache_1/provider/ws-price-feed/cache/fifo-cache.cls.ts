import { ICache } from "../../../../lib/cache/icache.ifc";
import { IItemValidator } from "../../../../lib/provider/iitem-validator.ifc";
import { ICacheable } from "../../../../lib/cache/icacheable.ifc";
import { IProvider } from "../../../../lib/provider/iprovider.ifc";
import { Cacheable } from "../../../../lib/cache/cacheable.cls";
import { Process } from "../../../../lib/process/process.cls";

export class FifoCache extends Process implements ICache {

  // log tag
  private static TAG: string = 'FifoCache'

  /**
   * @Override
   * tracks interval state
   */
  intervalMonitor: any

  /**
   * @Override
   * key object mappings of the cache
   */
  cacheEntries: any = {}

  /**
  * Constructor detail
  * @param iProvider 
  * @param config 
  * config param must be passed in as object: 
  *  {
  *    refreshInterval: 120000,
  *    maxAge: 30000,
  *    restartDelay: 30000
  *  } 
  */
  constructor(iProvider: IProvider) {
    super(iProvider)
    this.log(FifoCache.TAG, 'pid', this.settings.pid)
  }

  /**
   * @Override
   * start process thread
   * used by caches and providers and mains to start all 
   * registered providers and caches
   * @param params 
   */
  public start(params: any): void {
    this.log(FifoCache.TAG, 'start', params)
    this.settings = params
    try {
      // make sure we're stopped
      this.stop()
      this.intervalMonitor =
        setInterval(this.revalidateCache, this.settings.refreshInterval)
    } catch (ex) {
      this.log(FifoCache.TAG, 'error starting cache', ex.message)
      let st = setTimeout(() => {
        clearTimeout(st)
      }, this.settings.restartDelay)
    }
  }

  /**
   * @Override
   * revalidate all cachd items
   */
  public revalidateCache = (): void => {
    this.log(FifoCache.TAG, 'revalidate', this.cacheEntries)
    const validator = this.iProvider.itemValidator
    try {
      for (let key in this.cacheEntries) {
        try {
          validator.validate(this.cacheEntries[key])
        } catch (ex) {
          this.log(FifoCache.TAG, 'revalidate EX', ex)
        }
      }
    } catch (exo) {
      this.log(FifoCache.TAG, 'revalidate EXO', exo)
    }
  }

  /**
   * @Override
   * stop process thread
   * used by caches and providers and mains to stop all 
   * registered providers and caches
   * @param params 
   */
  public stop(params?: any): void {
    try {
      if (this.intervalMonitor !== null) {
        clearInterval(this.intervalMonitor)
        this.intervalMonitor = null
      }
      this.log(FifoCache.TAG, "stop done")
    } catch (ex) {
      this.log(FifoCache.TAG, 'error stopping cache', ex.message)
    }
  }

  /**
   * @Override
   * return key -> object mapping of the whole cache
   */
  public getItems(): any {
    return this.cacheEntries
  }

  /** 
   * @Override
   * return key -> object mapping of the whole cache
   * @param key
   */
  public getItem(key: any): ICacheable {
    if (!this.cacheEntries.hasOwnProperty(key)) {
      return null
    } else {
      return this.cacheEntries[key]
    }
  }

  /**
   * @Override
   * add a new entry to the cache with or without associated object
   * and optional expiration time.
   * if the key already exists the itemValidator will patch it
   * @param key 
   * @param item new data or not provided so we create a default 
   * @param maxAge
   */
  public addItem(key: any, item?: any, maxAge?: number) {
    maxAge = (typeof maxAge !== 'undefined') ? maxAge : this.settings.maxAge
    item = (typeof item === 'undefined') ? { i: key } : item
    if (item) {
      if (!this.cacheEntries.hasOwnProperty(key)) {
        this.cacheEntries[key] =
          new Cacheable(
            key,
            item,
            this.iProvider.itemValidator.getNowMs(), maxAge)
        this.iProvider.refresh(this.cacheEntries[key])
      } else {
        // const allPrices = this.cacheEntries
        // let baseCurrency = key.split("-")[1]

        // const baseUsdPrice = allPrices[baseCurrency + "-USD"]
        // const reversebaseUsdPrice = allPrices["USD-" + baseCurrency]

        // if (baseCurrency == 'USD') {
        //   item.priceInUsd = (item.B).toFixed(3)
        // }
        // else if (baseUsdPrice) {
        //   item.priceInUsd = (item.B * baseUsdPrice.item.B).toFixed(3)
        // }
        // else if (reversebaseUsdPrice) {
        //   item.priceInUsd = (item.B / baseUsdPrice.item.B).toFixed(3)
        // } else {
        //   item.priceInUsd = ''
        // }
        this.iProvider.itemValidator.
          patchItem(this.cacheEntries[key], item)
      }
    }
  }

  /**
   * @Override
   * add a new entries to the cache with or without associated object
   * and optional expiration time
   * @param mappings
   * @param maxAge
   */
  public addItems(mappings: any, maxAge?: number) {
    maxAge = (typeof maxAge !== 'undefined') ? maxAge : this.settings.maxAge
    for (let p in mappings) {
      this.addItem(p, mappings[p], maxAge)
    }
  }

  /** 
   * @Override
   * remove a single cache entry
   * @param key
   */
  public removeItem(key: any): boolean {
    try {
      delete this.cacheEntries[key]
    } catch (ex) {
      return false
    }
    return true
  }

  /** 
   * @Override
   * remove a list of cache entries
   * @param keys
   */
  public removeItems(keys: Array<any>): boolean {
    keys.map(k => {
      this.removeItem(k)
    })
    return true
  }

  /** 
   * @Override
   * return all cache keys as array
   * @param mappings
   */


  public getConvertedValue(mappings?: any): Array<any> {
    const res = []
    const cacheEn = this.cacheEntries
    const mappingsReverse = mappings.split("-")[1] + "-" + mappings.split("-")[0]

    for (let p in cacheEn) {
      // console.log("find this in simple", p , mappings)
      // console.log("find this in reverse", p , mappingsReverse)

      if (p == mappings) {
        // console.log("find this in simple", p , mappings)
        res.push(cacheEn[p].item)
        return res[0]
      }
      else if (p == mappingsReverse) {
        // console.log("find this in reverse", p , mappingsReverse)
        cacheEn[p].item.B = 1 / cacheEn[p].item.B
        res.push(cacheEn[p].item)
        return res[0]
      } else {
        // console.log("find any other and pass this", p , mappings)
        res.push(cacheEn[p].item)
        return undefined
      }
    }

  }

  public asKeysArray(mappings?: any): Array<any> {
    const res = []
    mappings = mappings || this.cacheEntries
    for (let p in mappings) {
      res.push(p)
    }
    return res
  }

  /**
   * @Override
   * return all cached objects as array
   * @param mappings
   */
  public asObjectArray(mappings?: any): Array<ICacheable> {
    const res = []
    mappings = mappings || this.cacheEntries
    for (let p in mappings) {
      res.push(mappings[p])
    }
    return res
  }

  /**
   * @Override
   * return all cached objects key as symbol name and value as latest price
   * @param mappings
  */

  public CheckOrderEligibilty(mappings?: any): Array<ICacheable> {

    const res: any = {}
    const mainIsin: any = [mappings.recive + "-" + mappings.send.currency]
    const mainIsinReverse = [mainIsin[0].split("-")[1] + "-" + mainIsin[0].split("-")[0]]
    const cacheMappings = this.cacheEntries

    let qtyAsked = mappings.free_Margin * mappings.get_depth.B
    let qtyRemaining = qtyAsked
    let qtyFilled = []
    let qtyFilledPrice = []
    let weigthedAvg = []
    let maxBuy = 0
    let orderBookSell = []
    let qtyArr = []
    var isThisSell = 0

    for (let p in cacheMappings) {
      if (mainIsin.indexOf(p) != -1) {
        // res[p] = this.cacheEntries[p].item
        orderBookSell = this.cacheEntries[p].item.DPS
        res['B'] = this.cacheEntries[p].item.B
        isThisSell = 1
      }
      else if (mainIsinReverse.indexOf(p) != -1) {
        // res[p] = this.cacheEntries[p].item
        orderBookSell = this.cacheEntries[mainIsinReverse[0]].item.DPB
        this.cacheEntries[mainIsinReverse[0]].item.B = 1 / this.cacheEntries[mainIsinReverse[0]].item.B
        res['B'] = this.cacheEntries[mainIsinReverse[0]].item.B

      }

      for (var i = 0; i < orderBookSell.length; i++) {
        maxBuy = maxBuy + orderBookSell[i].Quantity
        qtyArr.push(orderBookSell[i].Quantity)

        // if(isThisSell){
        //   // orderBookSell[i].Rate = 1/orderBookSell[i].Rate
        //   orderBookSell[i].Quantity = orderBookSell[i].Quantity * orderBookSell[i].Rate
        //   // qtyRemaining = qtyRemaining * orderBookSell[i].Rate
        // }

        if (qtyRemaining > orderBookSell[i].Quantity) {

          qtyRemaining = Math.abs(orderBookSell[i].Quantity - qtyRemaining)
          qtyFilled.push(orderBookSell[i].Quantity)
          qtyFilledPrice.push(orderBookSell[i].Rate)
          // weigthedAvg.push(orderBookSell[i].Quantity*orderBookSell[i].Rate)
          weigthedAvg.push(orderBookSell[i].Rate)

        }

        if (qtyRemaining < orderBookSell[i].Quantity) {
          qtyFilled.push(qtyRemaining)
          qtyFilledPrice.push(orderBookSell[i].Rate)
          // weigthedAvg.push(qtyRemaining*orderBookSell[i].Rate)
          qtyRemaining = 0

          if (qtyRemaining != 0) {
            weigthedAvg.push(orderBookSell[i].Rate * qtyRemaining)
          }


        }
        else if (qtyRemaining == orderBookSell[i].Quantity) {
          qtyFilled.push(qtyRemaining)
          qtyFilledPrice.push(orderBookSell[i].Rate)
          qtyRemaining = qtyRemaining
          weigthedAvg.push(orderBookSell[i].Rate)
          // weigthedAvg.push(qtyRemaining*orderBookSell[i].Rate)
        }
      }

      // if(mappings.freeMargin > maxBuy){
      //   mappings.free_Margin = maxBuy
      // }

      res['B'] = mappings.weightedMean(qtyFilledPrice, qtyFilled);
      res['MAX'] = maxBuy * 10
      if (isThisSell) {
        res['B'] = 1 / res['B']
      }


    }
    return res

  }



  public asKeysValueArray(mappings?: any): Array<ICacheable> {

    const res: any = {}
    const mainIsin: any = [mappings.send.currency + '-' + mappings.recive]
    const mainIsinReverse = [mainIsin[0].split("-")[1] + "-" + mainIsin[0].split("-")[0]]
    const cacheMappings = this.cacheEntries

    var qtyAsked = 1
    var qtyRemaining = qtyAsked
    var qtyFilled = []
    var qtyFilledPrice = []
    var weigthedAvg = []
    var maxBuy = 0
    let orderBookSell = []
    let qtyArr = []
    let isThisSell = 0
    for (let p in cacheMappings) {

      // console.log("It's normal over here", this.cacheEntries[p].item)


      if (mainIsin.indexOf(p) != -1) {

        // res[p] = this.cacheEntries[p].item
        res['B'] = this.cacheEntries[p].item.B
        res['A'] = this.cacheEntries[p].item.A
        orderBookSell = this.cacheEntries[p].item.DPS
      }
      else if (mainIsinReverse.indexOf(p) != -1) {
        // res[p] = this.cacheEntries[p].item

        orderBookSell = this.cacheEntries[mainIsinReverse[0]].item.DPB
        const price = 1 / this.cacheEntries[mainIsinReverse[0]].item.B
        res['B'] = price
        const price1 = 1 / this.cacheEntries[mainIsinReverse[0]].item.A
        res['A'] = price1
        isThisSell = 1
      }

      // console.log(res);

      for (var i = 0; i < orderBookSell.length; i++) {
        maxBuy = maxBuy + orderBookSell[i].Quantity
        // qtyArr.push(orderBookSell[i].Quantity)
        // if(qtyRemaining > orderBookSell[i].Quantity){
        //   qtyRemaining = Math.abs(orderBookSell[i].Quantity - qtyRemaining)
        //   qtyFilled.push(orderBookSell[i].Quantity)
        //       qtyFilledPrice.push(orderBookSell[i].Rate)
        //       weigthedAvg.push(orderBookSell[i].Quantity*orderBookSell[i].Rate)

        //   } 

        //   if(qtyRemaining < orderBookSell[i].Quantity){
        //   qtyFilled.push(qtyRemaining)
        //       qtyFilledPrice.push(orderBookSell[i].Rate)
        //       weigthedAvg.push(qtyRemaining*orderBookSell[i].Rate)
        //       qtyRemaining = 0

        //   } 
        // else if(qtyRemaining == orderBookSell[i].Quantity){
        //       qtyFilled.push(qtyRemaining)
        //       qtyFilledPrice.push(orderBookSell[i].Rate)
        //       qtyRemaining = qtyRemaining
        //       weigthedAvg.push(qtyRemaining*orderBookSell[i].Rate)
        //   }
      }

      // if(mappings.freeMargin > maxBuy){
      //   mappings.free_Margin = maxBuy
      // }
      if (isThisSell) {
        maxBuy = maxBuy * (this.cacheEntries[mainIsinReverse[0]].item.B)
      }

      res['MAX'] = maxBuy * 10
    }
    return res
  }

  public asKeysValueArrayAll(mappings?: any): Array<ICacheable> {
    const res: any = {}

    mappings = mappings || this.cacheEntries
    for (let p in mappings) {
      if (mappings[p].item) {
        if (this.cacheEntries[p].item.other.type == 'INDICIES') res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item
        else res[p] = this.cacheEntries[p].item
      }
    }
    return res
  }

  public getCryptoCurrency(mappings?: any): Array<ICacheable> {
    const res: any = {}
    const mainIsin: any = [mappings.send.currency + '-' + mappings.recive]
    const mainIsinReverse = [mainIsin[0].split("-")[1] + "-" + mainIsin[0].split("-")[0]]
    const cacheMappings = this.cacheEntries

    var qtyAsked = 1
    var qtyRemaining = qtyAsked
    var qtyFilled = []
    var qtyFilledPrice = []
    var weigthedAvg = []
    var maxBuy = 0
    let orderBookSell = []
    let qtyArr = []
    for (let p in cacheMappings) {
      if (mainIsin.indexOf(p) != -1) {
        // res[p] = this.cacheEntries[p].item
        orderBookSell = this.cacheEntries[p].item.DPS
      }
      else if (mainIsinReverse.indexOf(p) != -1) {
        // res[p] = this.cacheEntries[p].item
        orderBookSell = this.cacheEntries[mainIsinReverse[0]].item.DPB
        // this.cacheEntries[mainIsinReverse[0]].item.B = 1/this.cacheEntries[mainIsinReverse[0]].item.B
        res['B'] = this.cacheEntries[mainIsinReverse[0]].item.B
      }
    }
    return res['orderBook'] = orderBookSell
  }
  public getCommodity(mappings?: any): Array<ICacheable> {
    // const res: any = {}
    // const mainIsin: any = ["XAUUSD","XAGUSD","USOUSD","UKOUSD","XNGUSD"]


    // mappings = mappings || this.cacheEntries 
    // for (let p in mappings) {

    //   if(mainIsin.indexOf(p) != -1){

    //     res[p] = this.cacheEntries[p].item
    //   }
    // }
    // return res
    const res: any = {}
    mappings = mappings || this.cacheEntries

    for (let p in mappings) {

      //console.log(this.cacheEntries[p].item.other.type)
      if (this.cacheEntries[p].item.other.type == 'Commodities') res[p] = this.cacheEntries[p].item

    }
    return res
  }

  public getCommodityAll(mappings?: any): Array<ICacheable> {
    const res: any = {}
    mappings = mappings || this.cacheEntries

    for (let p in mappings) {

      //console.log(this.cacheEntries[p].item.other.type)
      if (this.cacheEntries[p].item.other.type == 'Commodities') res[p] = this.cacheEntries[p].item

    }
    return res
  }

   public getTopGainerNew(mappings?:any):Array<ICacheable> {
    const res: any = {}
    
    mappings = mappings || this.cacheEntries 
    for (const p in mappings) {
      if("topGainer" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topGainer==1) {res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item}
    }
    return res
  }
  public getTopLooserNew(mappings?:any):Array<ICacheable> {
    const res: any = {}
    
    mappings = mappings || this.cacheEntries 
    for (const p in mappings) {
      if("topLooser" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topLooser==1) {res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item}
    }
    return res
  }
  public getMostTraded(mappings?:any):Array<ICacheable> {
    const res: any = {}
    
    mappings = mappings || this.cacheEntries 
    for (const p in mappings) {
      if("higestVolume" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.higestVolume==1) {res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item}
    }
    return res
  }

   public getHotTredning(mappings?:any):Array<ICacheable> {
    const res: any = {}
    let countTopG = 0
    let countTopL = 0
    let countTopV = 0 

    mappings = mappings || this.cacheEntries 
    for (const p in mappings) {
      if("topGainer" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topGainer==1 && countTopG < 2) { res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item; countTopG++}
      if("higestVolume" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.higestVolume==1 && countTopV < 2) { res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item; countTopV++}
      if("topLooser" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topLooser==1 && countTopL < 2) { res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item; countTopL++}
    }
    return res
  }

  public getCryptoDepth(mappings?: any): Array<ICacheable> {
    const res: any = {}
    mappings = mappings || this.cacheEntries

    for (let p in mappings) {

      // console.log(this.cacheEntries[p])
      if (p == 'depth') res[p] = this.cacheEntries[p].item

    }
    return res
  }

  public getCategoryPairs(mappings?: any): Array<ICacheable> {
    const res: any = {}
    const mainIsin: any = ['DOGE-BTC', 'AAVE-ETH', 'ALGO-USDT', 'BCH-BTC', 'HNS-ETH']


    mappings = mappings || this.cacheEntries
    for (let p in mappings) {

      if (mainIsin.indexOf(p) != -1) {

        res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item
      }
    }
    return res
  }


  public getIndices(mappings?: any): Array<ICacheable> {
    const res: any = {}
    //const mainIsin: any = ["SPXUSD","D30EUR","100GBP","H50HKD","U30USD"]
    const mainIsin: any = ['BTC-USD', 'ETH-USD', 'LTC-USD', 'BCH-USDT', 'ADA-USD', 'EOS-USD']


    mappings = mappings || this.cacheEntries
    for (let p in mappings) {

      if (mainIsin.indexOf(p) != -1) {

        res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item
      }
    }
    return res
  }

  public getIndicesAll(mappings?: any): Array<ICacheable> {
    const res: any = {}
    mappings = mappings || this.cacheEntries

    for (let p in mappings) {
      if (this.cacheEntries[p].item.other.type == 'INDICIES') res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item

    }
    return res
  }



  public getCurrencies(mappings?: any): Array<ICacheable> {
    const res: any = {}
    mappings = mappings || this.cacheEntries

    for (let p in mappings) {
      if (this.cacheEntries[p].item.other.type == 'currencies') res[p] = this.cacheEntries[p].item

    }
    return res
  }

  public getSegmentType(mappings?: any): Array<ICacheable> {
    const res: any = {}
    mappings = mappings || this.cacheEntries

    for (let p in mappings) {
      res[p] = this.cacheEntries[p].item.other.type
    }
    return res
  }

  public getAllcurrency(mappings?: any): Array<ICacheable> {
    const res = []
    mappings = mappings || this.cacheEntries

    for (let p in mappings) {
      if (this.cacheEntries[p].item.other.type == 'currencies') {
        if (res.indexOf(this.cacheEntries[p].key.substring(0, 3)) == -1) res.push(this.cacheEntries[p].key.substring(0, 3))
        if (res.indexOf(this.cacheEntries[p].key.substring(3, 6)) == -1) res.push(this.cacheEntries[p].key.substring(3, 6))
      }

    }
    return res
  }







  /**
   * @Override
   * authenticate using the credentials from params
   * @param params must contain credentials in case process needs auth
   */
  public auth(params: any) { }

}