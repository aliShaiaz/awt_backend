import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsObject,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { Brand } from 'src/brand/entities/brand.entity';

export class CreateProductDto {

  @IsNotEmpty()
  @IsString()
  Name: string;

  @IsNotEmpty()
  @IsString()
  Description: string;

  @IsNotEmpty()
  @IsNumber()
  Price: number;

  ProductImage: string;

  @IsNotEmpty()
  @IsObject()
  Category: Category;

  @IsNotEmpty()
  @IsObject()
  Brand: Brand;

  @IsNumber()
  @Min(1, { message: 'ProductRating must be at least 1' })
  @Max(10, { message: 'ProductRating cannot be more than 10' })
  ProductRating: number;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'AvailableQuantity must be at least 1' })
  @Max(1000, { message: 'AvailableQuantity cannot be more than 1000' })
  AvailableQuantity: number;
}
