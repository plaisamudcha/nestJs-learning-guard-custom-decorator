import { HttpStatus } from '@nestjs/common';
import { ApiException } from './api.exception';
import { ERROR_CODE, ErrorCode } from './error-code.constant';

export class PrismaException extends ApiException {
  readonly errorCode: ErrorCode = ERROR_CODE.DATABASE_ERROR;
  readonly statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

  constructor(detail?: unknown) {
    super('A database error occurred', detail);
  }
}
