import {
  Controller,
  Get,
  Post,
  SetMetadata,
  UseFilters,
  UseInterceptors
  //   UseGuards
} from '@nestjs/common';
import { NotFoundFilter } from 'src/common/filter/not-found.filter';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
// import { RoleGuard } from 'src/auth/role.guard';
import { CurrentUserDto } from 'src/dtos/current-user.dto';
import { CurrentUser } from 'src/types/current-user.decorator';

// const Role = (...roles: ('admin' | 'user')[]) => SetMetadata('ROLE_KEY', roles);

// @Role('user')
@Controller('products')
export class ProductsController {
  // POST /products
  // AuthGuard will check before RoleGuard
  // if AuthGuard fails, RoleGuard will not be executed
  // @UseGuards(AuthGuard, RoleGuard)
  // @UseGuards(RoleGuard)
  // @Role('admin')
  @Post()
  createProduct(@CurrentUser() user: CurrentUserDto) {
    return user;
  }

  @UseInterceptors(TransformInterceptor)
  @UseFilters(NotFoundFilter)
  @SetMetadata('IS_PUBLIC_KEY', true)
  @Get()
  findAllProducts() {
    // throw new NotFoundException({
    //   code: 'PRODUCTS_NOT_FOUND',
    //   detail: 'No products found'
    // });
    console.log('inside controller');
    return 'get all products';
  }
}
