import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Manager } from 'src/manager/entities/manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Manager])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
