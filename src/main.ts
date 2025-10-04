import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // this guard will be applied to all routes in the application
  // this method for AuthGuard has no dependency injection
  // app.useGlobalGuards(new AuthGuard());

  // we can inject authguard in appmodule

  // @Body, @Query, @Param will be automatically validated
  // if validation decorators are used in the dto classes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      validateCustomDecorators: true
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
