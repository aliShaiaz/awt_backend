import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ProductModule } from 'src/product/product.module';

@Module({
  // imports: [ProductModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
