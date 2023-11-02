import { IsDate, IsDecimal, IsNumber, IsArray, IsObject } from 'class-validator';
import { Buyer } from 'src/buyer/entities/buyer.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';

export class CreateOrderDto {
  @IsNumber()
  order_id: number;

  @IsObject()
  buyer: Buyer;

  @IsDate()
  order_date: Date;

  @IsDecimal()
  total_price: number;
  
  @IsArray()
  orderItems: OrderItem[];
}
