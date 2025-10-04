import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
// execution context is an interface that provides methods to access details about the current request being processed.
// observable is a type that represents a stream of data that can be observed over time.
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // console.log('auth guard executed');
    // console.log(context.getClass().name);
    // console.log(context.getHandler().name);
    // console.log(context.getType()); // 'ws', 'http', 'rpc'
    // http: Request Object, Response Object, Next Function

    // read metadata from custom decorator to skip auth guard
    // isPublic: true ==> return true
    // isPublic: false ==> verify jwt below
    // const result = this.reflector.getAllAndOverride('ROLE_KEY', [
    //   context.getClass(),
    //   context.getHandler()
    // ]);
    // console.log(result);
    const isPublic = this.reflector.getAllAndOverride<boolean | undefined>(
      'IS_PUBLIC_KEY',
      [context.getHandler(), context.getClass()]
    );
    // console.log(isPublic);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    // Bearer jwt_token
    const jwt = request.headers.authorization?.split(' ')[1];

    if (!jwt) {
      throw new UnauthorizedException('Unauthorized user');
    }

    // verify jwt: jwtService
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        role: 'admin' | 'user';
      }>(jwt);
      request.user = payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException({
          message: 'token expired',
          code: 'TOKEN_EXPIRED'
        });
      }
      throw new UnauthorizedException({
        message: 'Invalid token, please login again',
        code: 'INVALID_TOKEN'
      });
    }

    return true; // throw new ForbiddenException('Forbidden resource');
  }
}

// JWT : Bearer Authentication
// JWT : cookies
