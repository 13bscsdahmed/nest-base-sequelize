import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginReq } from './models/user-login-dto';
import { InjectModel } from '@nestjs/sequelize';
import { User, UsersModel } from '@entities/user.entity';
import { LogService } from '@common/modules/logger/services';
import { ErrorResModel } from '@common/modules/shared';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
              @InjectModel(User)
              private readonly userModel: typeof User,
              private jwtService: JwtService,
              private logService: LogService,
              private configService: ConfigService
  ) {}
  async login(user: UserLoginReq, reqId: string): Promise<ErrorResModel | string> {
    this.logService.info(reqId, `Logging in user with id: ${user.id}`)
    const foundUser =  await this.userModel.findOne({
      where: { id: user.id }
    })
    if (foundUser) {
      return (this.generateToken(foundUser));
    } else {
      return null;
    }
  }
  generateToken(user: UsersModel): string {
    return this.jwtService.sign( {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
    }, {
      secret: this.configService.get<string>('SESSION_SECRET')
    });
  }
}
