import { PartialType } from '@nestjs/mapped-types';
import { CreateSellerDto } from './create-seller.dto';

export class UpdateSellerDto extends PartialType(CreateSellerDto) {
  id  : number;
  name ? : string;
  description ? :string;
  status ?: string;
  shopName ?: string;
}
