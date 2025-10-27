/**
 * give descendents the ability to log
 */
export class Loggeable {  
   constructor() {}
   /**
    * log method provided to all descending classes
    */
  protected log(tag:string, msg:string, data?:any) {
    if(typeof(console) !== 'undefined') {
      //console.log.apply(console, arguments);
      return "";
    }
  }

  protected mapping2keys(mapping:any) {
    const res:Array<any> = []
    for (const p in mapping) {
      res.push(p)
    }
    return res
  }
}