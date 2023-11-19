import { IsInt, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  buyerId: number;

  @IsInt()
  productId: number;

  @IsString()
  reviewText: string;

  @IsInt()
  rating: number;

  reviewImage: string[];
}
