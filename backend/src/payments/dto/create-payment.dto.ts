import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { PaymentStatusEnum } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Min(0)
  amount: number;

  @IsString()
  @IsNotEmpty()
  method: string;

  @IsEnum(PaymentStatusEnum)
  @IsOptional()
  status?: PaymentStatusEnum;

  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @IsNotEmpty()
  subscriptionId: string;
}
