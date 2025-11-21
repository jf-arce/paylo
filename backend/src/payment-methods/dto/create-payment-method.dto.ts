import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  method: string;

  @IsString()
  @IsNotEmpty()
  accountId: string;

  @IsUUID()
  @IsNotEmpty()
  providerId: string;
}
