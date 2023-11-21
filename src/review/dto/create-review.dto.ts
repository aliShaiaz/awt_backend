import { IsNotEmpty, IsString } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty({message:'title can not be null'})
    @IsString({message:'title should be string'})
    buyer:string;

    @IsNotEmpty({message:'product can not be null'})
    @IsString({message:'product should be string'})
    product:string;

    @IsNotEmpty({message:'review can not be null'})
    @IsString({message:'review should be string'})
    review:string;
}
