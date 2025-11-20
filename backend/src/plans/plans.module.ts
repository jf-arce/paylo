import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { Plan } from './entities/plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesModule } from '@/services/services.module';

@Module({
  imports: [TypeOrmModule.forFeature([Plan]), ServicesModule],
  controllers: [PlansController],
  providers: [PlansService],
  exports: [PlansService],
})
export class PlansModule {}
