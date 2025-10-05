import { HttpStatus } from '@nestjs/common';
import { ApiException } from './api.exception';
import { ERROR_CODE, ErrorCode } from './error-code.constant';

export class EmailAlreadyExistsException extends ApiException {
  readonly errorCode: ErrorCode = ERROR_CODE.EMAIL_ALREADY_EXISTS;
  readonly statusCode: HttpStatus = HttpStatus.CONFLICT;

  constructor(detail?: unknown) {
    super('email already exists', detail);
  }
}
