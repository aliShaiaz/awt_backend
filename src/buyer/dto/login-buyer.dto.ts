import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class BuyerLoginDto {
    static BuyerEmail: any;
    static BuyerPassword(BuyerPassword: any, buyerPassword: any) {
      throw new Error('Method not implemented.');
    }
    @IsNotEmpty()
    @IsEmail()
    BuyerEmail : string;

    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    @Matches(/^(?=(.*[A-Za-z]){2})(?=.*\d)(?=(.*[^A-Za-z0-9\s]){2})[A-Za-z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\-]+$/, {
        message : 'The password contains at least 2 Alphabets, 1 number, and 2 special characters.',
    })
    BuyerPassword : string;
}