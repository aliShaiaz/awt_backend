// product.module.ts
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { Brand } from '../brand/entities/brand.entity'; // Import the Brand entity
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category])], // Include both Product and Brand entities
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
