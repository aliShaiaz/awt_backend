import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class ManagerSignInDto{
    @IsNotEmpty({message:'Email can not be null'})
    @IsEmail({},{message: 'Please provite a valid email address'})
    email:string;


   @IsNotEmpty({ message: 'Password cannot be null' })
   @MinLength(6, { message: 'Password minimum character should be 6.' })
   @Matches(/^(?=(?:[^a-zA-Z]*[a-zA-Z]){2})(?=[^0-9]*[0-9])(?=[^A-Z]*[A-Z])(?=[^\s]*\W).{6,}$/, {
       message: 'Password should have least 2 alphabets,1 number, 1 uppercase alphabet, 1 special character',
   })
   password: string;
}