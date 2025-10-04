import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'mySecretKey',
      signOptions: { expiresIn: 60 }
    })
  ],
  controllers: [AuthController],
  exports: [JwtModule]
})
export class AuthModule {}
