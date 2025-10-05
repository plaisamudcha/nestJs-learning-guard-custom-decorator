import { Controller, Get, Post, Req, Res, SetMetadata } from '@nestjs/common';
import type { Request, Response } from 'express';
import { EmailAlreadyExistsException } from 'src/exceptions/email-already-exists.exception';

const Public = () => SetMetadata('IS_PUBLIC_KEY', true);
// reflect-metadata to change @Contoller('auth') to /auth
@SetMetadata('IS_PUBLIC_KEY', false)
@Controller('auth')
export class AuthController {
  // POST /auth/login
  // custom decorator
  // @Public(true)
  @Public()
  @Post('login')
  login() {}

  @SetMetadata('TEST', 'testtest')
  @Get('refresh')
  refresh(@Req() req: Request, @Res() res: Response) {
    res.status(200).send({ message: 'token refreshed' });
  }

  @Post('register')
  register() {
    throw new EmailAlreadyExistsException();
  }
}
