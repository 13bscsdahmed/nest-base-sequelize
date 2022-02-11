import { Injectable } from '@nestjs/common';
import { LogService } from '@common/modules/logger/services';
import { User } from '@entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
              @InjectModel(User)
              private readonly userModel: typeof User,
              private logService: LogService) {}

  async getUserById(userId: string, reqId: string): Promise<any> {
    this.logService.info(reqId, `Finding user with id: ${userId}`)
    return await this.userModel.findOne({
      where: { id: +(userId)},
      raw: true
    })
  }
}
