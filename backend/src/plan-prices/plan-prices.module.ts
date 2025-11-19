import { Module } from '@nestjs/common';
import { PlanPricesService } from './plan-prices.service';
import { PlanPricesController } from './plan-prices.controller';
import { PlanPrice } from './entities/plan-price.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PlanPrice])],
  controllers: [PlanPricesController],
  providers: [PlanPricesService],
})
export class PlanPricesModule {}
