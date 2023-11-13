import { IsAlpha, IsAlphanumeric, IsDecimal, IsInt, IsNotEmpty, IsPositive, MaxLength, MinLength } from "class-validator";

export class CreateReviewDto{
  reviewId ?: number;

  reviewCategory : string;
  @MinLength(4)
  reviewDetails : string;
 @IsDecimal()
 //@IsAlphanumeric()
 @IsNotEmpty()
 
  productId : number;
  // replies ?: any[];  // 🔴😥 sure na ..
  /**
   * replies hobe na .. karon review create 
   * korar shomoy replies exist e kore na ..
   * i mean create hoy na  
   * */ 
}