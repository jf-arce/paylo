import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
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
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  customerName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  customerEmail: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  planPriceId: string;
}
