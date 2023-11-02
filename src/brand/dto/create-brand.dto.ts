import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  Name: string;
}
