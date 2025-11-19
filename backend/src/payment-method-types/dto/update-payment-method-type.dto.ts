import { PartialType } from '@nestjs/swagger';
import { CreatePaymentMethodTypeDto } from './create-payment-method-type.dto';

export class UpdatePaymentMethodTypeDto extends PartialType(CreatePaymentMethodTypeDto) {}
