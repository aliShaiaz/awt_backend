import { Controller, Get, Post, Body, Patch, Param, UseInterceptors, UploadedFile, HttpException, HttpStatus,  UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from './entities/product.entity';
import { diskStorage } from 'multer';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  // @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('ProductImage', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(jpg|png|jpeg)$/)) {
          cb(null, true);
        } else {
          cb(new HttpException('Invalid image format', HttpStatus.BAD_REQUEST), false);
        }
      },
      limits: { fileSize: 3000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    })
  )
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ): Promise<Product> {
    try {
      return this.productService.createProduct(createProductDto, imageFile);
    } catch (error) {
      throw new HttpException('Error creating buyer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  //------------------------------------------------------------------------------------------



  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }



  //------------------------------------------------------------------------------------------



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



  //------------------------------------------------------------------------------------------


  @Get('by-brand/:brand')
  async productByBrand(@Param('brand') brand: string) {
    const products = await this.productService.productByBrand(brand);
    return products;
  }



  //------------------------------------------------------------------------------------------


  @Get('by-category/:category')
  async productByCategory(@Param('category') category: string) {
    const products = await this.productService.productByCategory(category);
    return products;
  }
}
