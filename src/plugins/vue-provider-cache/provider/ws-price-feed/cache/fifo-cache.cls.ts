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
      const st = setTimeout(() => {
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
      for (const key in this.cacheEntries) {
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
    if (!Object.prototype.hasOwnProperty.call(this.cacheEntries, key)) {
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
    if (!Object.prototype.hasOwnProperty.call(this.cacheEntries, key)) {
      this.cacheEntries[key] =
        new Cacheable(
          key,
          item,
          this.iProvider.itemValidator.getNowMs(), maxAge)
      this.iProvider.refresh(this.cacheEntries[key])
    } else {
      this.iProvider.itemValidator.
        patchItem(this.cacheEntries[key], item)
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
    for (const p in mappings) {
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

    for (const p in cacheEn) {

      if (p == mappings) {
        res.push(cacheEn[p].item)
        return res[0]
      }
      else if (p == mappingsReverse) {
        cacheEn[p].item.B = 1 / cacheEn[p].item.B
        res.push(cacheEn[p].item)
        return res[0]
      } else {
        res.push(cacheEn[p].item)
        return undefined
      }
    }

  }
  public getTopGainerNew(mappings?: any): Array<ICacheable> {
    const res: any = {}

    mappings = mappings || this.cacheEntries
    for (const p in mappings) {
      if ("topGainer" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topGainer == 1) { res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item }
    }
    return res
  }
  public getTopLooserNew(mappings?: any): Array<ICacheable> {
    const res: any = {}

    mappings = mappings || this.cacheEntries
    for (const p in mappings) {
      if ("topLooser" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topLooser == 1) { res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item }
    }
    return res
  }
  public asKeysArray(mappings?: any): Array<any> {
    const res = []
    mappings = mappings || this.cacheEntries
    for (const p in mappings) {
      res.push(p)
    }
    return res
  }
  public getTrendingIsins(mappings?: any): Array<ICacheable> {
    const res: any = {}
    let allIsins :any = {}
    //Major
    let major: any = Object.values(this.getMajorAll());
      major.sort((a: any,b: any) => {
        return parseFloat(b.CS) - parseFloat(a.CS)
      })
      let fMajor: any = {'gainer' : {},'looser':{}}
      if(parseFloat(major[0].CS) > 0 ) {
        fMajor['gainer'][major[0].other.isinid] = major[0]
      } else {
        fMajor['looser'][major[major.length -1].other.isinid] = major[major.length -1]
      }
      fMajor['looser'][major[major.length -1].other.isinid] = major[major.length -1]
      allIsins = Object.assign(allIsins,fMajor['gainer'])
      allIsins = Object.assign(allIsins,fMajor['looser'])
      //Minor
      let minor: any = Object.values(this.getMinorAll());
      minor.sort((a: any,b: any) => {
        return parseFloat(b.CS) - parseFloat(a.CS)
      })
      let fMinor: any = {'gainer' : {},'looser':{}}
      if(parseFloat(minor[0].CS) > 0 ) {
        fMinor['gainer'][minor[0].other.isinid] = minor[0]
      } else {
        fMinor['looser'][minor[minor.length -1].other.isinid] = minor[minor.length -1]
      }
      fMinor['looser'][minor[minor.length -1].other.isinid] = minor[minor.length -1]
      allIsins = Object.assign(allIsins,fMinor['gainer'])
      allIsins = Object.assign(allIsins,fMinor['looser'])

      //Exotic
      let exotic: any = Object.values(this.getExoticAll());
      exotic.sort((a: any,b: any) => {
        return parseFloat(b.CS) - parseFloat(a.CS)
      })
      let fExotic: any = {'gainer' : {},'looser':{}}
      if(parseFloat(exotic[0].CS) > 0 ) {
        fExotic['gainer'][exotic[0].other.isinid] = exotic[0]
      } else {
        fExotic['looser'][exotic[exotic.length -1].other.isinid] = exotic[exotic.length -1]
      }
      fExotic['looser'][exotic[exotic.length -1].other.isinid] = exotic[exotic.length -1]
      allIsins = Object.assign(allIsins,fExotic['gainer'])
      allIsins = Object.assign(allIsins,fExotic['looser'])
      
      //Crypto
      let crypto: any = Object.values(this.getCryptosAll());
      crypto.sort((a: any,b: any) => {
        return parseFloat(b.CS) - parseFloat(a.CS)
      })
      let fCrypto: any = {'gainer' : {},'looser':{}}
      if(parseFloat(crypto[0].CS) > 0 ) {
        fCrypto['gainer'][crypto[0].other.isinid] = crypto[0]
      } else {
        fCrypto['looser'][crypto[crypto.length -1].other.isinid] = crypto[crypto.length -1]
      }
      fCrypto['looser'][crypto[crypto.length -1].other.isinid] = crypto[crypto.length -1]
      allIsins = Object.assign(allIsins,fCrypto['gainer'])
      allIsins = Object.assign(allIsins,fCrypto['looser'])

      //Commodities
      let commodities: any = Object.values(this.getCommodityAll());
      commodities.sort((a: any,b: any) => {
        return parseFloat(b.CS) - parseFloat(a.CS)
      })
      let fCommodity: any = {'gainer' : {},'looser':{}}
      if(parseFloat(commodities[0].CS) > 0 ) {
        fCommodity['gainer'][commodities[0].other.isinid] = commodities[0]
      } else {
        fCommodity['looser'][commodities[commodities.length -1].other.isinid] = commodities[commodities.length -1]
      }
      fCommodity['looser'][commodities[commodities.length -1].other.isinid] = commodities[commodities.length -1]
      allIsins = Object.assign(allIsins,fCommodity['gainer'])
      allIsins = Object.assign(allIsins,fCommodity['looser'])

      //Indices
      let indices: any = Object.values(this.getIndicesAll());
      indices.sort((a: any,b: any) => {
        return parseFloat(b.CS) - parseFloat(a.CS)
      })
      let fIndices: any = {'gainer' : {},'looser':{}}
      if(parseFloat(indices[0].CS) > 0 ) {
        fIndices['gainer'][indices[0].other.isinid] = indices[0]
      } else {
        fIndices['looser'][indices[indices.length -1].other.isinid] = indices[indices.length -1]
      }
      fIndices['looser'][indices[indices.length -1].other.isinid] = indices[indices.length -1]
      allIsins = Object.assign(allIsins,fIndices['gainer'])
      allIsins = Object.assign(allIsins,fIndices['looser'])

      return allIsins


    //  mappings = mappings || this.cacheEntries
    //  for (const p in mappings) {

    //    if (("higestVolume" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.higestVolume == 0) && ("topGainer" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topGainer == 1)) {
    //      //Price Rising
    //      res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item
    //    } else if (("higestVolume" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.higestVolume == 0) && ("topLooser" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topLooser == 1)) {
    //      //Price falling
    //      res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item
    //    } else if (("higestVolume" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.higestVolume == 1) && ("topGainer" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topGainer == 1)) {
    //      //Volume Rising and Price Rising
    //      res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item
    //    } else if (("higestVolume" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.higestVolume == 1) && ("topLooser" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topLooser == 1)) {
    //      //Volume Rising and Price falling
    //      res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item
    //    } else if (("higestVolume" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.higestVolume == 1) && ("topLooser" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topLooser == 0) && ("topGainer" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topGainer == 0)) {
    //      //Volume Rising
    //      res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item
    //    }
      
    // }
    //return res
  }
  public getTrendingIsinsHome(mappings?: any): Array<ICacheable> {
    const res: any = {}

    // mappings = mappings || this.cacheEntries
    // for (const p in mappings) {

      // if (("higestVolume" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.higestVolume == 0) && ("topGainer" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topGainer == 1)) {
      //   //Price Rising
      //   res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item
      // } else if (("higestVolume" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.higestVolume == 0) && ("topLooser" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topLooser == 1)) {
      //   //Price falling
      //   res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item
      // } else if (("higestVolume" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.higestVolume == 1) && ("topGainer" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topGainer == 1)) {
      //   //Volume Rising and Price Rising
      //   res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item
      // } else if (("higestVolume" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.higestVolume == 1) && ("topLooser" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topLooser == 1)) {
      //   //Volume Rising and Price falling
      //   res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item
      // } else if (("higestVolume" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.higestVolume == 1) && ("topLooser" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topLooser == 0) && ("topGainer" in this.cacheEntries[p].item.other && this.cacheEntries[p].item.other.topGainer == 0)) {
      //   //Volume Rising
      //   res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item
      // }
      
    //}

      //new logic

      //major,minor
      let major: any = Object.values(this.getMajorAll());
      let minor: any = Object.values(this.getMinorAll());
      let combinedData: any = Object.values(major).concat(Object.values(minor))
      combinedData.sort((a: any,b: any) => {
        return parseFloat(b.CS) - parseFloat(a.CS)
      })
      let fCurr: any = {}
      if(parseFloat(combinedData[0].CS) > 0.5 ) {
        fCurr[combinedData[0].other.isinid] = combinedData[0]
      } else {
        fCurr[combinedData[combinedData.length -1].other.isinid] = combinedData[combinedData.length -1]
      }
      //crypto
      let crypto: any = Object.values(this.getCryptosAll());
      crypto.sort((a: any,b: any) => {
        return parseFloat(b.CS) - parseFloat(a.CS)
      })
      let fCrypto: any = {}
      if(parseFloat(crypto[0].CS) > 0 ) {
        fCrypto[crypto[0].other.isinid] = crypto[0]
      } else {
        fCrypto[crypto[crypto.length -1].other.isinid] = crypto[crypto.length -1]
      }
      //indices
      let indices: any = Object.values(this.getIndicesAll());
      indices.sort((a: any,b: any) => {
        return parseFloat(b.CS) - parseFloat(a.CS)
      })
      let fIndices: any = {}
      if(parseFloat(indices[0].CS) > 0 ) {
        fIndices[indices[0].other.isinid]  = indices[0]
      } else {
        fIndices[indices[indices.length-1].other.isinid]  = indices[indices.length -1]
      }
      //commodities
      let commodity: any = Object.values(this.getCommodityAll());
      commodity.sort((a: any,b: any) => {
        return parseFloat(b.CS) - parseFloat(a.CS)
      })
      let fCommodity: any = {}
      if(parseFloat(commodity[0].CS) > 0 ) {
        fCommodity[commodity[0].other.isinid]  = commodity[0]
      } else {
        fCommodity[commodity[commodity.length-1].other.isinid]  = commodity[commodity.length -1]
      }
    return { ...fCurr,...fCrypto,...fIndices,...fCommodity }
  }

  /**
   * @Override
   * return all cached objects as array
   * @param mappings
   */
  public asObjectArray(mappings?: any): Array<ICacheable> {
    const res = []
    mappings = mappings || this.cacheEntries
    for (const p in mappings) {
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
    const mainIsin: any = [mappings.send.currency + '-' + mappings.recive]
    const mainIsinReverse = [mainIsin[0].split("-")[1] + "-" + mainIsin[0].split("-")[0]]
    const cacheMappings = this.cacheEntries

    const qtyAsked = mappings.free_Margin
    let qtyRemaining = qtyAsked
    const qtyFilled = []
    const qtyFilledPrice = []
    const weigthedAvg = []
    let maxBuy = 0
    let orderBookSell = []
    const qtyArr = []
    let isThisSell = 0
    for (const p in cacheMappings) {
      if (mainIsin.indexOf(p) != -1) {
        // res[p] = this.cacheEntries[p].item
        orderBookSell = this.cacheEntries[p].item.DPB
      }
      else if (mainIsinReverse.indexOf(p) != -1) {
        // res[p] = this.cacheEntries[p].item
        orderBookSell = this.cacheEntries[mainIsinReverse[0]].item.DPS
        this.cacheEntries[mainIsinReverse[0]].item.B = 1 / this.cacheEntries[mainIsinReverse[0]].item.B
        res['B'] = this.cacheEntries[mainIsinReverse[0]].item.B
        isThisSell = 1
      }

      for (let i = 0; i < orderBookSell.length; i++) {
        maxBuy = maxBuy + orderBookSell[i].Quantity
        qtyArr.push(orderBookSell[i].Quantity)

        if (isThisSell) {
          orderBookSell[i].Rate = 1 / orderBookSell[i].Rate
        }
        if (qtyRemaining > orderBookSell[i].Quantity) {

          qtyRemaining = Math.abs(orderBookSell[i].Quantity - qtyRemaining)
          qtyFilled.push(orderBookSell[i].Quantity)
          qtyFilledPrice.push(orderBookSell[i].Rate)
          weigthedAvg.push(orderBookSell[i].Quantity * orderBookSell[i].Rate)

        }

        if (qtyRemaining < orderBookSell[i].Quantity) {
          qtyFilled.push(qtyRemaining)
          qtyFilledPrice.push(orderBookSell[i].Rate)
          weigthedAvg.push(qtyRemaining * orderBookSell[i].Rate)
          qtyRemaining = 0

        }
        else if (qtyRemaining == orderBookSell[i].Quantity) {
          qtyFilled.push(qtyRemaining)
          qtyFilledPrice.push(orderBookSell[i].Rate)
          // qtyRemaining = qtyRemaining
          weigthedAvg.push(qtyRemaining * orderBookSell[i].Rate)
        }
      }

      // if(mappings.freeMargin > maxBuy){
      //   mappings.free_Margin = maxBuy
      // }

      res['B'] = weigthedAvg.reduce((a, b) => a + b, 0)
      res['MAX'] = maxBuy
      if (isThisSell) {
        res['MAX'] = maxBuy
      }

    }
    return res

  }

   public asKeysValueArray(mappings?: any): Array<ICacheable> {
    const res: any = {};
    const mainIsin: any = [mappings.send.currency + "-" + mappings.recive];
    const mainIsinReverse = [
      mainIsin[0].split("-")[1] + "-" + mainIsin[0].split("-")[0],
    ];
    const cacheMappings = this.cacheEntries;

    var qtyAsked = 1;
    var qtyRemaining = qtyAsked;
    var qtyFilled = [];
    var qtyFilledPrice = [];
    var weigthedAvg = [];
    var maxBuy = 0;
    let orderBookSell = [];
    let qtyArr = [];
    let isThisSell = 0;
    for (let p in cacheMappings) {
      // console.log("It's normal over here", this.cacheEntries[p].item)

      if (mainIsin.indexOf(p) != -1) {
        // res[p] = this.cacheEntries[p].item
        res["B"] = this.cacheEntries[p].item.B;
        res["A"] = this.cacheEntries[p].item.A;
        orderBookSell = this.cacheEntries[p].item.DPS;
      } else if (mainIsinReverse.indexOf(p) != -1) {
        // res[p] = this.cacheEntries[p].item

        orderBookSell = this.cacheEntries[mainIsinReverse[0]].item.DPB;
        const price = 1 / this.cacheEntries[mainIsinReverse[0]].item.B;
        res["B"] = price;
        const price1 = 1 / this.cacheEntries[mainIsinReverse[0]].item.A;
        res["A"] = price1;
        isThisSell = 1;
      }

      // console.log(res);

      for (var i = 0; i < orderBookSell.length; i++) {
        maxBuy = maxBuy + orderBookSell[i].Quantity;
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
        maxBuy = maxBuy * this.cacheEntries[mainIsinReverse[0]].item.B;
      }

      res["MAX"] = maxBuy * 10;
    }
    return res;
  }

  public asKeysValueArrayAll(mappings?: any): Array<ICacheable> {
    const res: any = {}

    mappings = mappings || this.cacheEntries
    for (const p in mappings) {
      if (this.cacheEntries[p].item.other.type == 'INDICIES') res[this.cacheEntries[p].item.other.mn] = this.cacheEntries[p].item
      else res[p] = this.cacheEntries[p].item
    }
    return res
  }

  public getCryptoCurrency(mappings?: any): Array<ICacheable> {
    const res: any = {}
    const mainIsin: any = [mappings.send.currency + '-' + mappings.recive]
    const mainIsinReverse = [mainIsin[0].split("-")[1] + "-" + mainIsin[0].split("-")[0]]
    const cacheMappings = this.cacheEntries

    const qtyAsked = 1
    const qtyRemaining = qtyAsked
    const qtyFilled = []
    const qtyFilledPrice = []
    const weigthedAvg = []
    const maxBuy = 0
    let orderBookSell = []
    const qtyArr = []
    for (const p in cacheMappings) {
      if (mainIsin.indexOf(p) != -1) {
        // res[p] = this.cacheEntries[p].item
        orderBookSell = this.cacheEntries[p].item.DPS
      }
      else if (mainIsinReverse.indexOf(p) != -1) {
        // res[p] = this.cacheEntries[p].item
        orderBookSell = this.cacheEntries[mainIsinReverse[0]].item.DPB
        this.cacheEntries[mainIsinReverse[0]].item.B = 1 / this.cacheEntries[mainIsinReverse[0]].item.B
        res['B'] = this.cacheEntries[mainIsinReverse[0]].item.B
      }
    }
    return res['orderBook'] = orderBookSell
  }
  public getStocks(mappings?: any): Array<ICacheable> {
    const res: any = {}
    const mainIsin: any = ["A", "AA", "ABBV", "AAL", "AAPL"]


    mappings = mappings || this.cacheEntries
    for (const p in mappings) {
      if (mainIsin.indexOf(p) != -1) {

        res[p] = this.cacheEntries[p].item
      }
    }
    return res
  }
  public getStocksAll(mappings?: any): Array<ICacheable> {
    const res: any = {}
    mappings = mappings || this.cacheEntries

    for (const p in mappings) {
      if (this.cacheEntries[p].item.other.type == 'stocks') res[p] = this.cacheEntries[p].item
    }
    return res
  }
  public getCryptosAll(mappings?: any): Array<ICacheable> {
    const res: any = {}
    mappings = mappings || this.cacheEntries

    for (const p in mappings) {
      if (this.cacheEntries[p].item.other.type == 'crypto') res[p] = this.cacheEntries[p].item

    }
    return res
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

    for (const p in mappings) {

      if (this.cacheEntries[p].item.other.type == 'Commodities') res[p] = this.cacheEntries[p].item

    }
    return res
  }

  public getCommodityAll(mappings?: any): Array<ICacheable> {
    const res: any = {}
    mappings = mappings || this.cacheEntries

    for (const p in mappings) {

      if (this.cacheEntries[p].item.other.type == 'Commodities') res[p] = this.cacheEntries[p].item

    }
    return res
  }

  public getCryptoDepth(mappings?: any): Array<ICacheable> {
    const res: any = {}
    mappings = mappings || this.cacheEntries

    for (const p in mappings) {

      if (p == 'depth') res[p] = this.cacheEntries[p].item

    }
    return res
  }


  public getForexHeader(mappings?: any): Array<ICacheable> {
    const res: any = {}
    const mainIsin: any = ["EURUSD", "USDCAD", "GBPUSD", "USDJPY", "AUDUSD", "USDJPY"]


    mappings = mappings || this.cacheEntries
    for (const p in mappings) {

      if (mainIsin.indexOf(p) != -1) {

        res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item
      }
    }
    return res
  }

  public getIndices(mappings?: any): Array<ICacheable> {
    const res: any = {}
    const mainIsin: any = ["SPXUSD", "D30EUR", "100GBP", "H50HKD", "U30USD"]


    mappings = mappings || this.cacheEntries
    for (const p in mappings) {

      if (mainIsin.indexOf(p) != -1) {

        res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item
      }
    }
    return res
  }

  public getIndicesAll(mappings?: any): Array<ICacheable> {
    const res: any = {}
    mappings = mappings || this.cacheEntries

    for (const p in mappings) {
      if (this.cacheEntries[p].item.other.type == 'INDICIES') res[this.cacheEntries[p].item.other.isinid] = this.cacheEntries[p].item

    }
    return res
  }



  public getMajorAll(mappings?: any): Array<ICacheable> {
    const res: any = {}
    mappings = mappings || this.cacheEntries

    for (const p in mappings) {
      if (this.cacheEntries[p].item.other.category == 'MAJOR') res[p] = this.cacheEntries[p].item

    }
    return res
  }
  public getMinorAll(mappings?: any): Array<ICacheable> {
    const res: any = {}
    mappings = mappings || this.cacheEntries

    for (const p in mappings) {
      if (this.cacheEntries[p].item.other.category == 'MINOR') res[p] = this.cacheEntries[p].item

    }
    return res
  }
  public getExoticAll(mappings?: any): Array<ICacheable> {
    const res: any = {}
    mappings = mappings || this.cacheEntries

    for (const p in mappings) {
      if (this.cacheEntries[p].item.other.category == 'EXOTIC') res[p] = this.cacheEntries[p].item

    }
    return res
  }
  public getCurrencies(mappings?: any): Array<ICacheable> {
    const res: any = {}
    mappings = mappings || this.cacheEntries

    for (const p in mappings) {
      if (this.cacheEntries[p].item.other.type == 'currencies') res[p] = this.cacheEntries[p].item

    }
    return res
  }

  public getSegmentType(mappings?: any): Array<ICacheable> {
    const res: any = {}
    mappings = mappings || this.cacheEntries

    for (const p in mappings) {
      res[p] = this.cacheEntries[p].item.other.type
    }
    return res
  }

  public getAllcurrency(mappings?: any): Array<ICacheable> {
    const res = []
    mappings = mappings || this.cacheEntries

    for (const p in mappings) {
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