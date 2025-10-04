import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // get role from decorator: implement business logic based on role
    const role = this.reflector.getAllAndOverride<
      ('admin' | 'user')[] | undefined
    >('ROLE_KEY', [context.getHandler(), context.getClass()]);
    console.log(role);

    const request = context.switchToHttp().getRequest<Request>();

    if (request.user?.role && role?.includes(request.user?.role)) return true;
    throw new ForbiddenException(
      'you have no permission to access this resource'
    );
  }
}
