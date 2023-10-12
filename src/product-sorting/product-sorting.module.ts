import { Module } from '@nestjs/common';
import { ProductSortingService } from './product-sorting.service';
import { ProductSortingController } from './product-sorting.controller';
import { ProductSorting } from './entities/product-sorting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSorting])],
  controllers: [ProductSortingController],
  providers: [ProductSortingService],
})
export class ProductSortingModule {}
