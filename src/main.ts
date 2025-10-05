import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from './exceptions/validation.exception';
import { ApiFilter } from './common/filter/api.filter';
import { NotFoundFilter } from './common/filter/not-found.filter';
import { PrismaFilter } from './common/filter/prisma.filter';

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
      validateCustomDecorators: true,
      exceptionFactory(errors) {
        throw new ValidationException(errors);
      }
    })
  );

  app.useGlobalFilters(
    new PrismaFilter(),
    new ApiFilter(),
    new NotFoundFilter()
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

// we can use this in interceptor also
// type successResponse<T> = {
//   success: true;
//   message: string;
//   data?: T;
//   meta?: {
//     totalItems: number;
//     limit: number;
//     currentPage: number;
//     totalPages: number;
//   };
// };
