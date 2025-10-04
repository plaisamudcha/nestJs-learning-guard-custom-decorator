import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products')
export class ProductsController {
  // POST /products
  @UseGuards(AuthGuard)
  @Post()
  createProduct() {
    return 'Product created';
  }

  @Get()
  findAllProducts() {
    return 'get all products';
  }
}
