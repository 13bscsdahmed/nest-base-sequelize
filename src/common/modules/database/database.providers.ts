import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const DB_PROVIDERS =  [
  SequelizeModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    console.log('db', configService.get('DB_NAME'));
    return {
      dialect: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get<number>('DB_PORT'),
      database: 'test',
      autoLoadModels: true,
      synchronize: true,
    }
  },
  inject: [ConfigService],
  })
];
