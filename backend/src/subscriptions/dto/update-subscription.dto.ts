import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionDto } from './create-subscription.dto';
import { SubscriptionStatusEnum } from '../entities/subscription.entity';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
  @IsEnum(SubscriptionStatusEnum)
  @IsOptional()
  status?: SubscriptionStatusEnum;
}
