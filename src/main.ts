import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // this guard will be applied to all routes in the application
  // this method for AuthGuard has no dependency injection
  // app.useGlobalGuards(new AuthGuard());

  // we can inject authguard in appmodule

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
