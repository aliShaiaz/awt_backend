import { IsInt, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  review_id: number;

  @IsInt()
  buyerId: number;

  @IsInt()
  productId: number;

  @IsString()
  review_text: string;

  @IsInt()
  rating: number;
}

