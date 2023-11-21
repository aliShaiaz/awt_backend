import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateSellerDto {
    @IsNotEmpty({message:'title can not be null'})
    @IsString({message:'title should be string'})
    buyer:string;

    @IsNotEmpty({message:'email can not be null'})
    @IsString({message:'email should be string'})
    @IsEmail({},{message: 'Please provite a valid email address'})
    email:string;

    @IsNotEmpty({message:'address can not be null'})
    @IsString({message:'addressshould be string'})
    address:string;
}
