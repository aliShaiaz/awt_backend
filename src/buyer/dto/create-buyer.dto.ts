import { Transform, Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength, Matches, matches, IsOptional } from "class-validator";

export class CreateBuyerDto {
    @IsOptional()
    id: number;


    @IsString()
    @IsNotEmpty()
    BuyerFirstName: string;

    @IsString()
    @IsNotEmpty()
    BuyerLastName: string;

    @IsNotEmpty()
    @IsEmail()
    BuyerEmail : string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^01\d{9}$/, 
        {message : 'Phone number must be start by 01 and it contain 11 degit'})
    BuyerPhoneNo : string;

    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    @Matches(/^(?=(.*[A-Za-z]){2})(?=.*\d)(?=(.*[^A-Za-z0-9\s]){2})[A-Za-z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\-]+$/, {
        message : 'The password contains at least 2 Alphabets, 1 number, and 2 special characters.',
    })
    BuyerPassword : string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date) // Use class-transformer's Type decorator to specify Date type
    @Transform(({ value }) => {
        if (value instanceof Date) {
        return value; // If it's already a Date, no transformation is needed
        }
        return new Date(value);
    })
    BuyerDateOfBirth: Date;

    @IsNotEmpty()
    @IsString()
    BuyerAddress : string;

    @IsNotEmpty()
    @IsString()
    BuyerGender : string;
  
}
