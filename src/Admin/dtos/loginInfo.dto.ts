import { IsNotEmpty } from "class-validator";

export class LoginInfo{
    @IsNotEmpty()
    adminId: string;
    @IsNotEmpty()
    password: string;
}