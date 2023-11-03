import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({message:'title can not be null'})
    @IsString({message:'title should be string'})
    title:string;

    @IsNotEmpty({message:'description can not be null'})
    @IsString({message:'description should be string'})
    description:string;
}
