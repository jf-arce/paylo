import { Module } from '@nestjs/common';
import { PaymentMethodTypesService } from './payment-method-types.service';
import { PaymentMethodTypesController } from './payment-method-types.controller';
import { PaymentMethodType } from './entities/payment-method-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethodType])],
  controllers: [PaymentMethodTypesController],
  providers: [PaymentMethodTypesService],
  exports: [PaymentMethodTypesService],
})
export class PaymentMethodTypesModule {}
