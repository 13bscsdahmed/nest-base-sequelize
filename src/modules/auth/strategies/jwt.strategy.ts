import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SeedService } from '@common/modules/database/seed/seed.service';
import { LogService } from '@common/modules/logger/services';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private configService: ConfigService,
    private seedService: SeedService,
    private logService: LogService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: async (req, token, done) => {
        try {
          if (!configService.get('SESSION_SECRET')) {
            await seedService.seedAuthKey();
          }
          done(null, configService.get('SESSION_SECRET'));
        } catch (error) {
          this.logService.error(undefined, `An error occurred seeding auth data. Error: ${error}`)
        }
      }
    });
  }
  
  async validate(payload: any): Promise<any> {
    try {
      const data = await this.userModel.findOne({
        where: {id: payload.id}
      });
      if (data) {
        return data;
      } else {
        return new UnauthorizedException();
      }
    } catch(error){
      return new UnauthorizedException();
    }
  }
}
