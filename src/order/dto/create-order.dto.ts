
import { IsArray, IsDate, IsDecimal, IsInt, IsObject, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Buyer } from 'src/buyer/entities/buyer.entity';
import { Product } from 'src/product/entities/product.entity';

export class CreateOrderDto {
  @IsInt()
  id: number;

  @IsDate()
  createdAt: Date;

  @IsObject()
  buyer: Buyer;

  @IsArray()
  @IsObject({ each: true })
  products: Product[];

  @IsDecimal({ decimal_digits: '2' })
  totalPrice: number;

  @IsInt()
  quantity: number;

  @IsString()
  status_name: string;
}
