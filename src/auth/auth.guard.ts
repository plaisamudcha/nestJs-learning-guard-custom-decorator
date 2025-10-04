import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
// execution context is an interface that provides methods to access details about the current request being processed.
// observable is a type that represents a stream of data that can be observed over time.
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('auth guard executed');
    return false; // throw new ForbiddenException('Forbidden resource');
  }
}
