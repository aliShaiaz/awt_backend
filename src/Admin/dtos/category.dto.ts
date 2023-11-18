import { IsNotEmpty } from "class-validator";

export class CategoryInfo{
    @IsNotEmpty()
    title: string;
    
    description: string;
    
    createdAt: Date;

}