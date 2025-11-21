import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PaymentMethodTypesService } from './payment-method-types.service';
import { CreatePaymentMethodTypeDto } from './dto/create-payment-method-type.dto';
import { UpdatePaymentMethodTypeDto } from './dto/update-payment-method-type.dto';

@Controller('payment-method-types')
export class PaymentMethodTypesController {
  constructor(
    private readonly paymentMethodTypesService: PaymentMethodTypesService,
  ) {}

  @Post()
  create(@Body() createPaymentMethodTypeDto: CreatePaymentMethodTypeDto) {
    return this.paymentMethodTypesService.create(createPaymentMethodTypeDto);
  }

  @Get()
  findAll() {
    return this.paymentMethodTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentMethodTypesService.findOne(id);
  }

  @Get('name/:name')
  findOneByName(@Param('name') name: string) {
    return this.paymentMethodTypesService.findOneByName(name);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentMethodTypeDto: UpdatePaymentMethodTypeDto,
  ) {
    return this.paymentMethodTypesService.update(
      id,
      updatePaymentMethodTypeDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentMethodTypesService.remove(id);
  }
}
