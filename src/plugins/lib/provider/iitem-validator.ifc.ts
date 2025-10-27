import { ICacheable } from "../cache/icacheable.ifc";
import { IProvider } from "./iprovider.ifc";

export interface IItemValidator {
  // the provider to allow refreshing of cached items
  iProvider:IProvider
  // validate a single cached item
  validate(iCacheable:ICacheable):void
  // patch an expired item with new data
  patchItem(oldItem:ICacheable, newItem:any):void
  // get current timestamp in milliseconds
  getNowMs():number
}