import { Controller, Get, Post, Body, Patch, Param, Delete, Session, HttpException, HttpStatus, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('session'))
  async create(@Body() createBrandDto: CreateBrandDto, @Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    const currentManager = session.manager;
    return await this.brandService.create(createBrandDto,currentManager);
  }

  @Get('all')
  @UseGuards(AuthGuard('session'))
  findAll(@Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    return this.brandService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('session'))
  findOne(@Param('id') id: string, @Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    return this.brandService.findOne(+id);
  }

  @Patch('update/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('session'))
  async update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto, @Session() session) {
    return await this.brandService.updateBrand(+id, updateBrandDto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('session'))
  remove(@Param('id') id: string, @Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    return this.brandService.remove(+id);
  }
}
