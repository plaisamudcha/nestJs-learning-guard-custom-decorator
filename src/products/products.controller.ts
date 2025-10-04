import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('products')
export class ProductsController {
  // POST /products
  // AuthGuard will check before RoleGuard
  // if AuthGuard fails, RoleGuard will not be executed
  // @UseGuards(AuthGuard, RoleGuard)
  @Post()
  createProduct() {
    return 'Product created';
  }

  @Get()
  findAllProducts() {
    return 'get all products';
  }
}
