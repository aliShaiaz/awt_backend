import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class BuyerInfo{
    id: number;
 
  @IsNotEmpty()
  buyerFirstName: string;
 
  @IsNotEmpty()
  buyerLastName: string;
 
 
  @IsNotEmpty()
  @IsEmail()
  buyerEmail: string;
 
  buyerDateOfBirth: Date;
 
  @IsNotEmpty()
  buyerPhoneNo: string;
 
  @IsNotEmpty()
  buyerGender: string;
 
  @IsNotEmpty()
  buyerAddresses: string;
 
  buyerimage: string;
}