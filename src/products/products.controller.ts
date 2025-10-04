import { Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/auth/role.guard';

const Role = (...roles: ('admin' | 'user')[]) => SetMetadata('ROLE_KEY', roles);

@Role('user')
@Controller('products')
export class ProductsController {
  // POST /products
  // AuthGuard will check before RoleGuard
  // if AuthGuard fails, RoleGuard will not be executed
  // @UseGuards(AuthGuard, RoleGuard)
  @UseGuards(RoleGuard)
  @Role('admin')
  @Post()
  createProduct() {
    return 'Product created';
  }

  @Get()
  findAllProducts() {
    return 'get all products';
  }
}
