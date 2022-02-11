import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { authErrors } from '@modules/auth/auth.errors';
import { ResponseObj } from '../interceptors/response.interceptor';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  
  catch(exception: UnauthorizedException, host: ArgumentsHost): ResponseObj<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    return response
    .status(status)
    .json({ ...authErrors['1003'], ...{ statusCode: HttpStatus.UNAUTHORIZED, success: 0 }  });
  }
}
