import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpException, HttpStatus, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('imageFile'))
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ): Promise<Product> {
    if (!imageFile) {
      throw new HttpException('Image file is required.', HttpStatus.BAD_REQUEST);
    }

    return this.productService.createProduct(createProductDto, imageFile);
  }

  

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }



  @Patch(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('imageFile'))
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    try {
      return await this.productService.update(id, updateProductDto, imageFile);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
