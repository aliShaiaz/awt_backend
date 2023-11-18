import { IsNotEmpty, IsEmail } from "class-validator";

export class SupplierProfileInfo{
    @IsNotEmpty()
    name: string;
    @IsEmail()
    @IsNotEmpty()
    gmail: string;
}