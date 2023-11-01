import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";


export class AdminInfo{
    @IsNotEmpty()
    adminId: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    gmail: string;
    @MinLength(4)
    password: string;
    pic: string;

}