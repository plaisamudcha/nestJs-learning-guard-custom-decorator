import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { RoleGuard } from './auth/role.guard';

@Module({
  imports: [ProductsModule, AuthModule],
  // this will make sure that AuthGuard is a singleton
  // and will be used as a global guard
  // but dependency injection will work here
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard }
  ]
})
export class AppModule {}
