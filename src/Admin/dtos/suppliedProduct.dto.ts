import { IsNotEmpty } from "class-validator";

export class SuppliedProductInfo{
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    category:string;
    
}