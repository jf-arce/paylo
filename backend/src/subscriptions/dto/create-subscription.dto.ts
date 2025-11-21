import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { SubscriptionStatusEnum } from '../entities/subscription.entity';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  customerName: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  customerEmail: string;

  @IsEnum(SubscriptionStatusEnum)
  @IsOptional()
  status?: SubscriptionStatusEnum;

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
