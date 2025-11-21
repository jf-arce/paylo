import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePaymentMethodTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
