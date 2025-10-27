import shortId from 'shortid'
import { IProvider } from '../provider/iprovider.ifc';
import { Loggeable } from '../common/loggeable.cls';

export class Process extends Loggeable {
  
  /**
   * @Override
   * settings for this process
   */
  public settings:any = {}

  /**
   * @Override
   * managing provider for this process
   * when set to null this is the main provider.
   * initializes the IProvider for all descending classes
   */
  iProvider:IProvider

  constructor(iProvider) {
    super()
    this.iProvider = iProvider
    this.settings.pid = this.generateProcessId()
  }

  /**
   * generate a unique process id fpr classes 
   * implementing the IProcess interface
   * @see IProcess
   */
  protected generateProcessId():string {
    return shortId.generate()
  }
}