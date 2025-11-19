import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentMethodTypesService } from './payment-method-types.service';
import { CreatePaymentMethodTypeDto } from './dto/create-payment-method-type.dto';
import { UpdatePaymentMethodTypeDto } from './dto/update-payment-method-type.dto';

@Controller('payment-method-types')
export class PaymentMethodTypesController {
  constructor(private readonly paymentMethodTypesService: PaymentMethodTypesService) {}

  @Post()
  create(@Body() createPaymentMethodTypeDto: CreatePaymentMethodTypeDto) {
    return this.paymentMethodTypesService.create(createPaymentMethodTypeDto);
  }

  @Get()
  findAll() {
    return this.paymentMethodTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentMethodTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentMethodTypeDto: UpdatePaymentMethodTypeDto) {
    return this.paymentMethodTypesService.update(+id, updatePaymentMethodTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentMethodTypesService.remove(+id);
  }
}
