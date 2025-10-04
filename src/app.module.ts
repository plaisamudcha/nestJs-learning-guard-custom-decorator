import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ProductsModule],
  // this will make sure that AuthGuard is a singleton
  // and will be used as a global guard
  // but dependency injection will work here
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }]
})
export class AppModule {}
