import { HttpStatus } from '@nestjs/common';
import { ApiException } from './api.exception';
import { ERROR_CODE, ErrorCode } from './error-code.constant';

export class ValidationException extends ApiException {
  readonly errorCode: ErrorCode = ERROR_CODE.VALIDATION_ERROR;
  readonly statusCode: HttpStatus = HttpStatus.BAD_REQUEST;

  constructor(detail?: unknown) {
    super('validation failed', detail);
  }
}
