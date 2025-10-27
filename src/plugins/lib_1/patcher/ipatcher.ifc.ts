import { ICacheable } from "../cache/icacheable.ifc";
import { IProcess } from "../process/iprocess.ifc";

/**
 * patches cache items without validation.
 * gets invoked when cached items are expired
 */
export interface IPatcher extends IProcess {
  /**
   * patch an expired cache item
   * @param iCacheable 
   */
  decorate(iCacheable:ICacheable):void 
}