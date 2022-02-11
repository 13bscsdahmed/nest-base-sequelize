import { Logger } from 'winston';
import { Injectable } from '@nestjs/common';

import { WinstonHelper } from '../helpers';

@Injectable()
export class LogService {
  private logger: Logger;

  constructor(winstonHelper: WinstonHelper) {
    this.logger = winstonHelper.getLogger();
  }
  
  /**
   * Helper function to write logs
   * @param {string} [msg] - Message to print
   * @param {string} [level] - Log level
   */
  private writeLog (msg: any, level: string): void {
    this.logger[level](msg);
  }
  
  /**
   * Helper func to write info logs
   * @param {string} [reqId] - Req id
   * @param {string} [msg] - Message to print
   */
  info(reqId: string, msg: string): void {
    this.writeLog((`${reqId ? `ReqId: [${reqId}]:` : ''}`
      + `${msg ? ` ${msg}` : ''}`), 'info');
  }
  
  /**
   * Helper func to write debug logs
   * @param {string} [reqId] - Req id
   * @param {string} [msg] - Message to print
   */
  debug(reqId: string, msg: string): void {
    this.writeLog((`${reqId ? `ReqId: [${reqId}]:` : ''}`
      + `${msg ? ` ${msg}` : ''}`), 'debug');
  }
  
  /**
   * Helper func to write error logs
   * @param {string} [reqId] - Req id
   * @param {string} [msg] - Message to print
   */
  error(reqId: string, msg: string): void {
    this.writeLog((`${reqId ? `ReqId: [${reqId}]:` : ''}`
      + `${msg ? ` ${msg}` : ''}`), 'error');
  }
}
