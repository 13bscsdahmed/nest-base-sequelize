import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Secret } from '@entities/secret.entity';
import { ConfigService } from '@nestjs/config';
import { LogService } from '../../logger/services';

@Injectable()
export class SeedService {
  constructor(@InjectModel(Secret)
              private readonly secretModel: typeof Secret,
              private configService: ConfigService,
              private logService: LogService) {
  }

  /**
   * Seed db data
   */
  async seedAuthKey(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const secret = await this.secretModel.findOne({});
        console.log('hello', secret);
        if (secret) {
          console.log(1);
          process.env.SESSION_SECRET = secret.session_secret;
          resolve();
        } else {
          console.log(2);
          const secretString = uuidv4();
          process.env.SESSION_SECRET = secretString;
          await this.secretModel.create({
            session_secret: secretString,
          })
          resolve();
        }
      } catch (error) {
        reject(error);
        this.logService.error(undefined, `Failed to seed data in DB. Error: ${error}`);
      }
    })
  }
}
