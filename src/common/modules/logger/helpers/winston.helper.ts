import { createLogger, format, transports, Logger } from 'winston';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import 'winston-daily-rotate-file';

import { loggerConstants } from '../constants';

@Injectable()
export class WinstonHelper {
  private logsFilePath: string;
  

  constructor() {
    this.logsFilePath = path.join(loggerConstants.logsDirectory, loggerConstants.logsFileName);

    this.createDirectory();
  }

  private createDirectory(): void {
    if (!fs.existsSync(loggerConstants.logsDirectory)) {
      fs.mkdirSync(loggerConstants.logsDirectory);
    }
  }
  

  getLogger(): Logger {
    const customFormat = format.printf(({ level, message, timestamp, }) => (`${timestamp} ${level}: ${message}`));
    const logger = createLogger({
      format: format.combine(
        format.label(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        customFormat,
      ),
      transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
          filename: `${this.logsFilePath}-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
        }),
      ],
      level: 'debug',
    });

    return logger;
  }
}
