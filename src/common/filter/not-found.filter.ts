import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';
import { Request, Response } from 'express';

type ErrorResponse = {
  success: false;
  message: string;
  detail?: unknown;
  code: string;
  statusCode: number;
  path: string;
  timestamp: string;
};

@Catch(HttpException)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();
    const test = exception.getResponse() as { code: string; detail?: unknown };
    const result: ErrorResponse = {
      success: false,
      message: exception.message,
      code: test.code,
      detail: test.detail || null,
      statusCode: exception.getStatus(),
      path: request.url,
      timestamp: new Date().toISOString()
    };
    response.status(result.statusCode).json(result);
  }
}
