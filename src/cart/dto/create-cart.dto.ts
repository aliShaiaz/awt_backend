import { IsNumber, IsObject } from 'class-validator';
import { Buyer } from 'src/buyer/entities/buyer.entity'; // Import the Buyer entity here

export class CreateCartDto {
  @IsNumber()
  buyer_id: number;

  @IsObject()
  buyer: Buyer;

  // Add any other properties from the Cart entity that you want to include in the DTO
}
