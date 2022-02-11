import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { authErrors } from '@modules/auth/auth.errors';
import { ResponseObj } from '../interceptors/response.interceptor';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter<T> implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost): ResponseObj<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    return response
    .status(status)
    .json({ ...authErrors['1004'], ...{ statusCode: HttpStatus.FORBIDDEN, success: 0 }  });
  }
}
