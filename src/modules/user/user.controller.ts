import { Controller, Get, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserService } from '@modules/user/user.service';
import { ResponseObj } from '@shared/interceptors/response.interceptor';
import { GetUserRes } from '@modules/user/models/get-user-dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { userConstants } from '@modules/user/user.constants';
import { LogService } from '@common/modules/logger/services';
import { userErrors } from '@modules/user/user.errors';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService,
              private logService: LogService) {}
  
  @Get(':id')
  @ApiResponse({ status: 200, type: GetUserRes, description: 'Fetches user by id.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') userId: string, @Req() req: Request): Promise<ResponseObj<GetUserRes>> {
    try {
      const fetchedUser = await this.userService.getUserById(userId, req.reqId);
      return {
        ...userConstants.responseMessages.userFetched,
        ...{ data: fetchedUser ? fetchedUser: {} }
      }
    }
    catch (error) {
      this.logService.error(req.reqId, `An error occurred finding user with id: ${userId}. Error: ${error}`)
      return {...userErrors['2003'], ...{ statusCode: HttpStatus.INTERNAL_SERVER_ERROR } }
    }
  }
}
