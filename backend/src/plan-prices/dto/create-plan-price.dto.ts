import { IsNotEmpty, IsNumber, IsEnum, IsString, Min } from 'class-validator';
import { PlanPriceIntervalEnum } from '../entities/plan-price.entity';

export class CreatePlanPriceDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsEnum(PlanPriceIntervalEnum)
  @IsNotEmpty()
  interval: PlanPriceIntervalEnum;

  @IsString()
  @IsNotEmpty()
  planId: string;
}
