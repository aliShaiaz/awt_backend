import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { ManagerSignInDto } from "./manager-signin.dto";

export class ManagerSignUpDto extends ManagerSignInDto{
     @IsNotEmpty({message:'Name can not be null'})
     @IsString({message:'Name shoud be string'})
     @Matches(/^[a-zA-Z. -]+$/, { message: 'Name must be only alphanumeric characters, spaces, dots, or hyphens' })
    name:string;

    image: string;

}