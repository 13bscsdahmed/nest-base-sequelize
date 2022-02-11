import { ArgumentsHost, Catch, ExceptionFilter, BadRequestException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ResponseObj } from '../interceptors/response.interceptor';

@Catch(BadRequestException)
export class BadRequestExceptionFilter<T> implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost): ResponseObj<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const jsonRes: ResponseObj<any> = {};
    // Check added to transform route validation error messages
    if (exception.getResponse()['error'] === 'Bad Request') {
      jsonRes.code = 1000;
    } else {
      jsonRes.code = exception.getResponse()['code'];
    }
    jsonRes.message = exception.getResponse()['message'];
    const status = exception.getStatus();
    return response
    .status(status)
    .json({ ...jsonRes, ...{ statusCode: HttpStatus.BAD_REQUEST, success: 0 }  });
  }
}
