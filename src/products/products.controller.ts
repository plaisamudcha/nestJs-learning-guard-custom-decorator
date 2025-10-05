import {
  Controller,
  Get,
  NotFoundException,
  Post,
  SetMetadata,
  UseFilters
  //   UseGuards
} from '@nestjs/common';
import { NotFoundFilter } from 'src/common/filter/not-found.filter';
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

  @UseFilters(NotFoundFilter)
  @SetMetadata('IS_PUBLIC_KEY', true)
  @Get()
  findAllProducts() {
    throw new NotFoundException({
      code: 'PRODUCTS_NOT_FOUND',
      detail: 'No products found'
    });
    return 'get all products';
  }
}
