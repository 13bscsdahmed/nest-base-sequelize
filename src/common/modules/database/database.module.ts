import { Global, Module } from '@nestjs/common';
import { DB_PROVIDERS } from './database.providers';

@Global()
@Module({
  imports: [
    ...DB_PROVIDERS
  ]
})
export class DatabaseModule {}
