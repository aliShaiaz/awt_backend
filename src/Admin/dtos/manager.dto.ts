import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class ManagerInfo{
    @IsNotEmpty()
    managerId: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    gmail:string;
    //@IsNotEmpty()
    birthDay: string | null;
    //@IsNotEmpty()
    bloodGroup: string | null;
    //@IsNotEmpty()
    address: string | null;
    @IsNotEmpty()
    @MinLength(4)
    password: string;
}