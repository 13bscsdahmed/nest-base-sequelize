import { Module, Global } from '@nestjs/common';

import { WinstonHelper } from './helpers';
import { LogService } from './services';

@Global()
@Module({
  providers: [ WinstonHelper, LogService ],
  exports: [ LogService ]
})
export class LoggerModule {}
