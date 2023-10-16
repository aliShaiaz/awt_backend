import { PartialType } from '@nestjs/mapped-types';
import { CreateSellerDto } from './create-seller.dto';

export class UpdateSellerDto extends PartialType(CreateSellerDto) {
  id  : number; // ok
  sellerName ? : string; // ok 
  sellerEmailAddress ? :string; // ok 
  sellerPassword ? : string; // ok 
  sellerPhoneNumber?: string; //🔴 not ok 
  sellerDescription?: string;//ok
  shopName?: string; // ok 
  shopDescription?: string; // ok
  status?: string; // ok 
}
