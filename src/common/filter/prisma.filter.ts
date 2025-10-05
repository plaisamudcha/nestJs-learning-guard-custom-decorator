import { Catch, ExceptionFilter } from '@nestjs/common';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError
} from '@prisma/client/runtime/library';
import { PrismaException } from 'src/exceptions/prisma.exception';

@Catch(
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
  PrismaClientValidationError
)
export class PrismaFilter implements ExceptionFilter {
  catch() {
    // you should implement your own PrismaException class
    // that extends the base Exception class
    // and provides meaningful error messages
    throw new PrismaException();
  }
}
