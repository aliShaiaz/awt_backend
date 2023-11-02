import { IsNumber, IsString } from 'class-validator';

export class CreateOrderStatusDto {
  @IsNumber()
  order_status_id: number;

  @IsString()
  status_name: string;
}
