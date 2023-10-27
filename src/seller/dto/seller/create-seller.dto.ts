import { IsAlphanumeric, MaxLength, IsEmail, IsPositive, IsInt, Min, Max, Contains, NotContains, IsUrl, Matches } from "class-validator";

export class CreateSellerDto {
  
  //@IsPositive()
  id ?: number;
  @MaxLength(4) // working 
  sellerName : string;
  sellerDescription?:string;
  sellerImage ?: string;
  @IsEmail() // working
  sellerEmail ?: string;
  sellerPassword:string;
  @Contains('shop') // working
  @NotContains('Abc') // working
  @NotContains('abc') 
  shopName ?: string;
  shopDescription ?: string;
  shopLogo ?: Buffer;
  // Is Enum()  
  status ?: string;
  // @IsInt()
  // // @Min(-5)
  // @Max(5)
  // @IsPositive()
  
  rating ?: number;
  // Regular expression 
  @Matches(/^[0-9A-Za-z-_ #]+$/)
  offlineShopAddress ?: string;
  @IsUrl() // working
  googleMapLocation ?: string;

  //@Column('bytea', { nullable: true }) // Using 'bytea' type for image data
  //string; // Assuming you store image URLs here
}

