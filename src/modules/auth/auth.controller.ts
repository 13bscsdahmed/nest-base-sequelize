import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ResponseObj } from '@shared/interceptors/response.interceptor';
import { AuthService } from './auth.service';
import { UserLoginReq } from './models/user-login-dto';
import { authConstants } from './auth.constants';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogService } from '@common/modules/logger/services';
import { authErrors } from '@modules/auth/auth.errors';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
              private logService: LogService ) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Logs in user' })
  async login(@Body() user: UserLoginReq, @Req() req: Request): Promise<ResponseObj<any>> {
    try {
      const token = await this.authService.login(user, req.reqId);
      if (token) {
        req.res.setHeader('access_token', token as string);
        return {
          ...authConstants.responseMessages.userLoggedIn,
          ... { data: {} }
        }
      } else {
        return {...authErrors['1001'], ...{ statusCode: HttpStatus.BAD_REQUEST } };
      }

    } catch (error) {
      this.logService.error(req.reqId, `An error occurred logging user with id: ${user.id}. Error: ${error}`)
      return {...authErrors['1002'], ...{ statusCode: HttpStatus.INTERNAL_SERVER_ERROR } }
    }
  }
}
