//addAvailableQualityOfAProductDto
import { IsAlphanumeric, MaxLength, IsEmail, IsPositive, IsInt, Min, Max, Contains, NotContains, IsUrl, Matches } from "class-validator";

import { IsNotEmpty } from "class-validator";
import { Product } from "src/seller/entities/product/product.entity";

export class CreateAvailableQualityOfAProductDto{
    
  id ? : number;

    @IsNotEmpty()
    quality: string; // eta thaktei hobe .. .. 

    //product er id jevabe add korbo 🟢🟢
    //productId ? :number; // // This property is used to associate the quality with a product
    productId ? :number;
  }