import { IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class SellerInfo {

  @IsNotEmpty()
  @IsString()
  sellerName: string;

  @IsNotEmpty()
  @IsEmail()
  sellerEmailAddress: string;

  @IsNotEmpty()
  @IsString()
  sellerPassword: string;

  sellerPhoneNumber?: string;

  sellerDescription?: string;

  sellerImage?: string;

  shopName?: string;

  shopDescription?: string;

  shopLogo?: string;

  status: string;

  rating?: number;

  offlineShopAddress?: string;

  googleMapLocation?: string;
}
