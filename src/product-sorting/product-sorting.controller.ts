import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductSortingService } from './product-sorting.service';
import { CreateProductSortingDto } from './dto/create-product-sorting.dto';
import { UpdateProductSortingDto } from './dto/update-product-sorting.dto';

@Controller('product-sorting')
export class ProductSortingController {
  constructor(private readonly productSortingService: ProductSortingService) {}

  /**
   * 1. sort products by price range
   *        -> /product-sorting/price-range?min=100&max=200 
   *        -> /product-sorting/price-range?min=100 // max is 100000 by default
   *        -> /product-sorting/price-range?max=200 // min is 0 by default
   * 2. sort products by price range and category
   *        -> /product-sorting/price-range?min=100&max=200&category="electronics"
   *        -> /product-sorting/price-range?min=100&category="electronics"
   *        -> /product-sorting/price-range?max=200&category="electronics"
   *        -> /product-sorting/price-range?category="electronics"
   *        -> /product-sorting/price-range?min=100&max=200&category="electronics"&sort="asc"
   *        -> /product-sorting/price-range?min=100&max=200&category="electronics"&sort="dsc"&limit=10 // limit is for pagination
   *          //decending order by default
   * 3. sort products by category
   *        -> /product-sorting/category?category="electronics"
   *        -> /product-sorting/category?category="electronics"&sort="asc"
   *        -> /product-sorting/category?category="electronics"&sort="dsc"&limit=10 // limit is for pagination 
   * 
   * 4. sort products by category and brand
   *        -> /product-sorting/category?category="electronics"&brand="samsung"
   *       -> /product-sorting/category?category="electronics"&brand="samsung"&sort="asc"
   *      -> /product-sorting/category?category="electronics"&brand="samsung"&sort="dsc"&limit=10 // limit is for pagination
   * 5. sort products by brand
   *      -> /product-sorting/brand?brand="samsung"
   * 
   * 
   * 
   * 
   * 
   */

  @Post()
  create(@Body() createProductSortingDto: CreateProductSortingDto) {
    return this.productSortingService.create(createProductSortingDto);
  }

  @Get()
  findAll() {
    return this.productSortingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSortingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductSortingDto: UpdateProductSortingDto) {
    return this.productSortingService.update(+id, updateProductSortingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSortingService.remove(+id);
  }
}
