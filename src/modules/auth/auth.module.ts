import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeedModule } from '@common/modules/database/seed/seed.module';
import { SeedService } from '@common/modules/database/seed/seed.service';
import { Secret } from '@entities/secret.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Secret]),
    SeedModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, SeedModule],
      useFactory: async (configService: ConfigService, seedService: SeedService) => {
          try {
            if (!configService.get('SESSION_SECRET')) {
              await seedService.seedAuthKey();
            }
            return {
              secret: configService.get('SESSION_SECRET'),
              signOptions: {expiresIn: authConstants.jwtExpiry},
            }
          } catch (error) {
            process.exit(1);
          }
      },
      inject: [ConfigService, SeedService],
    }),
  ],
  providers: [ AuthService, JwtStrategy, SeedService ],
  exports: [ AuthService ],
  controllers: [AuthController],
})
export class AuthModule {}
