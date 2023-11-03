import { Controller, Get, Post, Body,} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  allCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.allCategory(createCategoryDto);
  }

  
}
