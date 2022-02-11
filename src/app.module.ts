import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@shared/shared.module';
import { UserModule } from '@modules/user/user.module';
import { DatabaseModule } from '@common/modules/database/database.module';
import { AuthModule } from '@modules/auth/auth.module';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    SharedModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.argv.length > 2 && process.argv[2]  === 'prod' ? '.env' : '.env.dev'
    }),
    RateLimiterModule.register({
      for: 'Express',
      type: 'Memory',
      points: 100, // No more than 100 request per min from same ip
      duration: 60,
      blockDuration: 3600, // Block for 1 hour
      errorMessage: 'Rate limit exceeded',
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class AppModule {}
