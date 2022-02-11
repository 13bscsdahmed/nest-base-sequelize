import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseObj<t1> {
  statusCode?: number;
  success?: number,
  code?: number,
  message?: string;
  data?: t1;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseObj<any>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseObj<any>> {
    return next
    .handle()
    .pipe(
      map((data: ResponseObj<any>) => (
        {
        statusCode: data.statusCode ? context.switchToHttp().getResponse().statusCode = data.statusCode: 200,
        success: typeof (data.success) === 'undefined' ? 0 : data.success,
        code: data.code,
        message: data.message,
        data: data.data
      })),
    );
  }
}
