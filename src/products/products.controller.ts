import { Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/auth/role.guard';
import { CurrentUserDto } from 'src/dtos/current-user.dto';
import { CurrentUser } from 'src/types/current-user.decorator';

const Role = (...roles: ('admin' | 'user')[]) => SetMetadata('ROLE_KEY', roles);

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

  @Get()
  findAllProducts() {
    return 'get all products';
  }
}
