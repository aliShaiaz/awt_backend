import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CreateNotificationDto {
  @IsNumber()
  notification_id: number;

  @IsNumber()
  buyerId: number;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsDate()
  timestamp: Date;
}
