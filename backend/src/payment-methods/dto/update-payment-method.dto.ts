import { PartialType } from '@nestjs/swagger';
import { CreatePaymentMethodDto } from './create-payment-method.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePaymentMethodDto extends PartialType(
  CreatePaymentMethodDto,
) {
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
