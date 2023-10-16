import { Module } from '@nestjs/common';
import { ProductSortingService } from './product-sorting.service';
import { ProductSortingController } from './product-sorting.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/seller/entities/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductSortingController],
  providers: [ProductSortingService],
})
export class ProductSortingModule {}
