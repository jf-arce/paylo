import { Module } from '@nestjs/common';
import { PlanPricesService } from './plan-prices.service';
import { PlanPricesController } from './plan-prices.controller';
import { PlanPrice } from './entities/plan-price.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansModule } from '@/plans/plans.module';

@Module({
  imports: [TypeOrmModule.forFeature([PlanPrice]), PlansModule],
  controllers: [PlanPricesController],
  providers: [PlanPricesService],
  exports: [PlanPricesService],
})
export class PlanPricesModule {}
