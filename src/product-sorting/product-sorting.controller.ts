import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ProductSortingService } from './product-sorting.service';

@Controller('seller/product-sorting')
export class ProductSortingController {
  constructor(private readonly productSortingService: ProductSortingService) {}

  /**
   * 1. sort products by price range 🟢
   *        -> /product-sorting/price-range?min=100&max=200 
   *        -> /product-sorting/price-range?min=100 // max is 100000 by default
   *        -> /product-sorting/price-range?max=200 // min is 0 by default
   
   * 1. sort products by brand
   *      -> /product-sorting/brand?brand="samsung"
   * 2. sort produts by category 
   *      -> /product-sorting/category?category="electronics"
   * 
   *  -> /product-sorting/category?category="electronics"&brand="samsung"
   * 
   * 3. sort products by price range
   *    -> /product-sorting/price-range?min=100&max=200
   * 
   * 4. sort products by 
   * 
   */


  @Get('price-range-l') // 🔴 same route rakha jabe na ?
    sortAllByMinPriceRange(@Query('min', ParseIntPipe) min: number) {
    return this.productSortingService.sortByMinPriceRange(min);
  }
  @Get('price-range-h') // 🔴 same route rakha jabe na 
  sortAllByMaxPriceRange(@Query('max', ParseIntPipe) max: number) {
    return this.productSortingService.sortAllByMaxPriceRange(max);
  }

  @Get('price-range')
  sortAllByMinAndMaxPriceRange(@Query('min', ParseIntPipe) min: number,@Query('max', ParseIntPipe) max: number) {
    return this.productSortingService.sortAllByMinAndMaxPriceRange(min, max);
  }


  @Get('brand')
  sortProductByBrand(@Query('brand') brand: string) {
    
    return this.productSortingService.sortProductByBrand(brand);
  }
  
  @Get('category')
  sortProductByCategory(@Query('category') category: string) {
    return this.productSortingService.sortProductByCategory(category);
  }

}
