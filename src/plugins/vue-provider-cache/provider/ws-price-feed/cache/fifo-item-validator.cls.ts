import moment from 'moment'

import { IItemValidator } from "../../../../lib/provider/iitem-validator.ifc";
import { ICacheable } from "../../../../lib/cache/icacheable.ifc";
import { IProvider } from "../../../../lib/provider/iprovider.ifc";
import { Process } from '../../../../lib/process/process.cls';
import { Loggeable } from '../../../../lib/common/loggeable.cls';

export class FifoItemValidator extends Loggeable implements IItemValidator {
  
  // log tag
  private static TAG:string = 'ItemValidator'
  
  /**
   * @Override  
   * provider used for refreshing of cachded items
   */ 
  iProvider:IProvider

  /**
   * Contructor detail
   * save reference to provider
   * @param iProvider 
   */
  constructor(iProvider:IProvider) {
    super()
    this.iProvider = iProvider
  }

  /**
   * @Override
   * 
   * patch an expired item with new data
   * @param iCacheable the item to validate
   */
  patchItem(oldItem:ICacheable, newItem:any):void {

    const old = oldItem.item;


    let buy_increase_staus = 1;

    if(old.buy_increase_staus!=='undefined'){
        buy_increase_staus = old.buy_increase_staus
    }

    if(parseFloat(old.B) > parseFloat(newItem.B)){
       buy_increase_staus = 0
    }
    if(parseFloat(old.B) < parseFloat(newItem.B)){
        buy_increase_staus = 1
    }

    
    let sell_increase_staus = 1;

    if(old.sell_increase_staus!=='undefined'){
        sell_increase_staus = old.sell_increase_staus
    }

    if(parseFloat(old.A) > parseFloat(newItem.A)){
       sell_increase_staus = 0
    }
    if(parseFloat(old.A) < parseFloat(newItem.A)){
        sell_increase_staus = 1
    }


    newItem.A = parseFloat(newItem.A).toString()
    newItem.B = parseFloat(newItem.B).toString()


    newItem.SPREAD = ((parseFloat(newItem.A) - parseFloat(newItem.B)).toFixed(8)).toString()

    newItem.SPREAD = parseFloat(newItem.SPREAD).toString()
    
    newItem.buy_increase_staus = buy_increase_staus
    newItem.sell_increase_staus = sell_increase_staus
    
    oldItem.item = {...old, ...newItem}
  }

  /**
   * @Override
   * 
   * validate a single cached item, 
   * gets invoked by the ICache implementations
   * @param iCacheable the item to validate
   */
  public validate = (iCacheable:ICacheable):void => {
    this.log(FifoItemValidator.TAG, 'validate ', iCacheable)
    if ((iCacheable.maxAge + iCacheable.ts) <= this.getNowMs()) {
      this.iProvider.refresh(iCacheable)
    }
  }

  // get current timestamp in milliseconds
  public getNowMs():number {
    return moment().utc().valueOf()
  } 
}