import { Global, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { LogService } from '../logger/services';
import { WinstonHelper } from '../logger/helpers';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Global()
@Module({
  imports: [ LoggerModule ],
  providers: [
    LogService,
    WinstonHelper,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
  ],
  
})
export class SharedModule {}
