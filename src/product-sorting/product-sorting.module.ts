import { Module } from '@nestjs/common';
import { ProductSortingService } from './product-sorting.service';
import { ProductSortingController } from './product-sorting.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/seller/entities/product/product.entity';
import { Brand } from 'src/seller/entities/product/brand.entity';
import { Category } from 'src/seller/entities/product/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category])],
  controllers: [ProductSortingController],
  providers: [ProductSortingService],
})
export class ProductSortingModule {}
