import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { Brand } from 'src/brand/entities/brand.entity';

export class ProductDto {

  @IsNotEmpty()
  @IsString()
  Name: string;

  @IsNotEmpty()
  @IsString()
  Description: string;

  @IsNotEmpty()
  @IsNumber()
  Price: number;

  @IsNotEmpty()
  @IsObject()
  Category: Category;

  @IsNotEmpty()
  @IsObject()
  Brand: Brand;
}
