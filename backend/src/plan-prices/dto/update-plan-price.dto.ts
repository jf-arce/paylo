import { PartialType } from '@nestjs/swagger';
import { CreatePlanPriceDto } from './create-plan-price.dto';

export class UpdatePlanPriceDto extends PartialType(CreatePlanPriceDto) {}
