import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
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

  async createProduct(createProductDto: CreateProductDto, imageFile): Promise<Product> {
    const productImage = imageFile.filename;
    const product = new Product();
    product.product_name = createProductDto.Name;
    product.product_description = createProductDto.Description;
    product.product_price = createProductDto.Price;
    product.product_rating = createProductDto.ProductRating;
    product.quantity = createProductDto.AvailableQuantity;

    // Find the brand and category entities
    const brand = await this.brandRepository.findOne({where: { BrandName: createProductDto.Brand.BrandName }});
    const category = await this.categoryRepository.findOne({ where: { CategoryName: createProductDto.Category.CategoryName } });

    if (!brand || !category) {
      throw new HttpException('Brand or Category not found', HttpStatus.BAD_REQUEST);
    }

    product.brand = brand;
    product.category = category;
    product.product_image = productImage.toString();

    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOne({where:{id}});
  }

  async update(id: number, updateProductDto: UpdateProductDto, imageFile: Express.Multer.File): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({where:{id}});

      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      // Update product fields
      product.product_name = updateProductDto.Name;
      product.product_description = updateProductDto.Description;
      product.product_price = updateProductDto.Price;
      product.product_rating = updateProductDto.ProductRating;
      product.quantity = updateProductDto.AvailableQuantity;

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
      console.error(error);
      throw new HttpException('Failed to update product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async productByBrand(brand: string): Promise<Product[]> {
    const brandEntity = await this.brandRepository.findOne({ where: { BrandName: brand } });

    if (brandEntity) {
      const products = await this.productRepository.find({ where: { brand: { BrandName: brand } } });
      if (products.length === 0) {
        throw new HttpException('No products found in the specified brand', HttpStatus.NOT_FOUND);
      } else {
        return products;
      }
    } else {
      throw new HttpException('Brand not found', HttpStatus.BAD_REQUEST);
    }
  }

  async productByCategory(category: string): Promise<Product[]> {
    const categoryEntity = await this.categoryRepository.findOne({ where: { CategoryName: category } });

    if (categoryEntity) {
      const products = await this.productRepository.find({ where: { category: { CategoryName: category } } });

      if (products.length === 0) {
        throw new HttpException('No products found in the specified category', HttpStatus.NOT_FOUND);
      } else {
        return products;
      }
    } else {
      throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
    }
  }

  async searchProduct(productName: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { product_name: ILike(`%${productName}%`) },
      });

      if (!product) {
        throw new HttpException('No products found', HttpStatus.NOT_FOUND);
      }

      return product;
    } catch (error) {
      throw new HttpException('An error occurred while searching for the product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
