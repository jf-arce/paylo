import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodTypeDto } from './dto/create-payment-method-type.dto';
import { UpdatePaymentMethodTypeDto } from './dto/update-payment-method-type.dto';

@Injectable()
export class PaymentMethodTypesService {
  create(createPaymentMethodTypeDto: CreatePaymentMethodTypeDto) {
    return 'This action adds a new paymentMethodType';
  }

  findAll() {
    return `This action returns all paymentMethodTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentMethodType`;
  }

  update(id: number, updatePaymentMethodTypeDto: UpdatePaymentMethodTypeDto) {
    return `This action updates a #${id} paymentMethodType`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentMethodType`;
  }
}
