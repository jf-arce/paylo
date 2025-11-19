import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersModule } from './providers/providers.module';
import { ServicesModule } from './services/services.module';
import { PlansModule } from './plans/plans.module';
import { sqliteConnection } from './config/database/sqlite.connection';
import { envs } from './config/envs';
import { PlanPricesModule } from './plan-prices/plan-prices.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PaymentsModule } from './payments/payments.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { PaymentMethodTypesModule } from './payment-method-types/payment-method-types.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      ...sqliteConnection,
      autoLoadEntities: true,
      synchronize: envs.nodeEnv !== 'production',
    }),
    ProvidersModule,
    ServicesModule,
    PlansModule,
    PlanPricesModule,
    SubscriptionsModule,
    PaymentsModule,
    PaymentMethodsModule,
    PaymentMethodTypesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
