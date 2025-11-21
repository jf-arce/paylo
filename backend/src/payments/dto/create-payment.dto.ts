import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { PaymentStatusEnum } from '../entities/payment.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Min(0)
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  method: string;

  @ApiProperty({ required: false })
  @IsEnum(PaymentStatusEnum)
  @IsOptional()
  status?: PaymentStatusEnum;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  subscriptionId: string;
}
