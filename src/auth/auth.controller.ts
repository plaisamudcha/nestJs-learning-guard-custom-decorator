import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  // POST /auth/login
  @Post('login')
  login() {}
}
