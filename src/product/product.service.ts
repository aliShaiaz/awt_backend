import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { extname, join } from 'path';
import * as fs from 'fs';
import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) {}
  

  //✅✅Create Product✅✅
  async createProduct(createProductDto: CreateProductDto, imageFile): Promise<Product> {

    const productImage = imageFile.filename;
    const product = new Product();
    product.product_name = createProductDto.Name;
    product.product_description = createProductDto.Description;
    product.product_price = createProductDto.Price;
    product.product_rating = createProductDto.ProductRating;
    product.quantity = createProductDto.AvailableQuantity;
    product.category = createProductDto.Category;
    product.brand = createProductDto.Brand;
    product.product_image = productImage.toString();

    return await this.productRepository.save(product);
  }

  //❌❌Create Product❌❌


  //✅✅Find all product ✅✅

  async findAll() : Promise<Product[]> {
    return await this.productRepository.find();
  }

  //❌❌Find all product ❌❌


  //✅✅Find products by ID ✅✅

  async findOne(id: number) : Promise<Product> {
    return await this.productRepository.findOne({ where: { id } });
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



  // ✅✅Serch product by Brand ✅✅

  async productByBrand(brand: string): Promise<Product[]> {
    // Find the brand using its name
    //const brandEntity = await this.brandRepository.findOne({ where: { BrandName: brand } });
    const brandEntity = await this.brandRepository
      .createQueryBuilder('brand')
      .where('LOWER(brand.BrandName) ILIKE LOWER(:brand)', { brand: brand})
      .getOne();
    
    if (brandEntity) {
      // Find products by the brand
      const products = await this.productRepository.find({ where: { brand: brandEntity } });
      if (products.length === 0) {
        throw new HttpException('No products found in the specified brand', HttpStatus.NOT_FOUND);
      } else {
        return products;
      }
      

    } else {
      // Handle the case where the brand is not found
      throw new HttpException('Not found the specified brand', HttpStatus.BAD_REQUEST);
    }
  }

   // ❌❌Serch product by Brand ❌❌





    // ✅✅Serch product by Category ✅✅



  async productByCategory(category: string): Promise<Product[]> {
    // Perform a case-insensitive search for the category
    const categoryEntity = await this.categoryRepository
      .createQueryBuilder('category')
      .where('LOWER(category.CategoryName) ILIKE LOWER(:category)', { category: `%${category}%` })
      .getOne();
  
    if (categoryEntity) {
      // Find products by the category
      const products = await this.productRepository.find({ where: { category: categoryEntity } });
  
      if (products.length === 0) {
        throw new HttpException('No products found in the specified category', HttpStatus.NOT_FOUND);
      } else {
        return products;
      }
    } else {
      // Handle the case where the category is not found
      throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
    }
  }


  // ❌❌Serch product by Category ❌❌
}
