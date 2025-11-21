import { Module } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentMethodsController } from './payment-methods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment-method.entity';
import { ProvidersModule } from '@/providers/providers.module';
import { PaymentMethodTypesModule } from '@/payment-method-types/payment-method-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentMethod]),
    ProvidersModule,
    PaymentMethodTypesModule,
  ],
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService],
  exports: [PaymentMethodsService],
})
export class PaymentMethodsModule {}
