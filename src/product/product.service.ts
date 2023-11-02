import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promises } from 'dns';
import { extname, join } from 'path';
import * as fs from 'fs';
import { log } from 'console';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private readonly productRepository : Repository<Product>){

  }

  //✅✅Create Product✅✅
  async createProduct(createProductDto: CreateProductDto, imageFile: Express.Multer.File): Promise<Product> {
    const product = new Product();
    product.product_name = createProductDto.Name;
    product.product_description = createProductDto.Description;
    product.product_price = createProductDto.Price;
    product.product_rating = createProductDto.ProductRating;
    product.quantity = createProductDto.AvailableQuantity;
    product.category = createProductDto.Category;
    product.brand = createProductDto.Brand;


    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const fileExt = extname(imageFile.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExt)) {
      const allowedFormats = allowedExtensions.join(', ');
      throw new HttpException(`Invalid image format. Supported formats: ${allowedFormats}`, HttpStatus.BAD_REQUEST);
    }

    // Save the image to the upload folder and set the product_image field
    const imageFileName = Date.now() + fileExt;
    const imagePath = join('uploads', imageFileName);
    fs.writeFileSync(imagePath, imageFile.buffer);
    product.product_image = imagePath;

    return await this.productRepository.save(product);
  }

  //❌❌Create Product❌❌


  //✅✅Find all product ✅✅

  findAll() : Promise<Product[]> {
    return this.productRepository.find();
  }

  //❌❌Find all product ❌❌


  //✅✅Find products by ID ✅✅

  findOne(id: number) : Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  //❌❌ Find products by ID ❌❌


  //✅✅Update Product details ✅✅

  async update(id: number, updateProductDto: UpdateProductDto, imageFile: Express.Multer.File): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
  
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
  
      // Update product fields
      product.product_name = updateProductDto.Name;
      product.product_description = updateProductDto.Description;
      product.product_price = updateProductDto.Price;
      product.product_rating = updateProductDto.ProductRating;
      product.quantity = updateProductDto.AvailableQuantity;
      product.brand = updateProductDto.Brand;
      product.category = updateProductDto.Category;
  
      // Check if a new image file is provided
      if (imageFile) {
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const fileExt = extname(imageFile.originalname).toLowerCase();
  
        if (!allowedExtensions.includes(fileExt)) {
          const allowedFormats = allowedExtensions.join(', ');
          throw new HttpException(`Invalid image format. Supported formats: ${allowedFormats}`, HttpStatus.BAD_REQUEST);
        }
  
        // Save the new image to the upload folder and set the product_image field
        const imageFileName = Date.now() + fileExt;
        const imagePath = join('uploads', imageFileName);
        fs.writeFileSync(imagePath, imageFile.buffer);
        product.product_image = imagePath;
      }
  
      const updatedProduct = await this.productRepository.save(product);
      return updatedProduct;
    } catch (error) {
      // Log the error for debugging purposes
      console.error(error);
      throw new HttpException('Failed to update product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //❌❌Update Product details ❌❌



  //✅✅Delete Product ✅✅

  remove(id: number) {
    return this.productRepository.delete(id);
  }

  //❌❌Delete Product ❌❌
}
