import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from "class-validator";

export class CreditCartDTO {
    @IsOptional()
    id: number;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[0-9]{16}$/, {
      message: "Credit card number must be 16 digit",
    })
    CardNumber: string;

    @IsString()
    @IsNotEmpty()
    CardHolderName: string;

    @IsNotEmpty()
    @IsString() // Change to 'IsString' to match the type in the entity
    @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/, {
        message: "Expiration date must be in the format 'MM/YY'",
    })
    ExpDate: string; // Change to lowercase 'string'

    @IsNotEmpty()
    @IsString()
    @Matches(/^[0-9]{3}$/, {
      message: 'CVV code must be a 3-digit number',
    })
    CVC_code: string;
}
