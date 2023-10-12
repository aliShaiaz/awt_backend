import { Module } from '@nestjs/common';
import { ProductSortingService } from './product-sorting.service';
import { ProductSortingController } from './product-sorting.controller';

@Module({
  controllers: [ProductSortingController],
  providers: [ProductSortingService],
})
export class ProductSortingModule {}
