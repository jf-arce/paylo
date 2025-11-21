import { IsNotEmpty, IsNumber, IsEnum, Min, IsUUID } from 'class-validator';
import { PlanPriceIntervalEnum } from '../entities/plan-price.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanPriceDto {
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsEnum(PlanPriceIntervalEnum)
  @IsNotEmpty()
  interval: PlanPriceIntervalEnum;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  planId: string;
}
