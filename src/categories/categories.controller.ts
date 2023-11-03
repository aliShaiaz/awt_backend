import { Controller, Get, Post, Body, Patch, Param, Delete, Session, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  @UseGuards(AuthGuard('session'))
  async create(@Body() createCategoryDto: CreateCategoryDto, @Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    const currentManager = session.manager;
    return await this.categoriesService.create(createCategoryDto,currentManager);
  }

  @Get('all')
  @UseGuards(AuthGuard('session'))
  findAll(@Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('session'))
  findOne(@Param('id') id: string, @Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    return this.categoriesService.findOne(+id);
  }



  @Delete(':id')
  @UseGuards(AuthGuard('session'))
  remove(@Param('id') id: string, @Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    return this.categoriesService.remove(+id);
  }
}
