import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable, of } from 'rxjs';

const cache: Record<string, unknown> = {};

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // GET: products
    console.log('BEFORE: controller logic');
    const request = context.switchToHttp().getRequest<Request>();
    // const response = context.switchToHttp().getResponse<Response>();
    const cachedKey = `${request.method}:${request.path}`;
    if (cache[cachedKey]) {
      //   response.status(200).json(cache[cachedKey]);
      return of(cache[cachedKey]);
    }
    return next.handle().pipe(
      map((data) => {
        console.log('AFTER: controller logic');
        cache[cachedKey] = data;
        return data;
      })
    );
  }
}
