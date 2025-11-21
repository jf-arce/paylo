import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  customerName: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  customerEmail: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsUUID()
  @IsNotEmpty()
  planPriceId: string;
}
