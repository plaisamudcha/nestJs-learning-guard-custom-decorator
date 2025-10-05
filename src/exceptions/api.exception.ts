import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-code.constant';

export abstract class ApiException extends Error {
  abstract readonly errorCode: ErrorCode;
  abstract readonly statusCode: HttpStatus;

  constructor(
    message: string,
    public readonly detail?: unknown
  ) {
    super(message);
  }
}
