import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Subscription,
  SubscriptionStatusEnum,
} from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { PlanPricesService } from '@/plan-prices/plan-prices.service';

type SubscriptionCreateAttributes = {
  customerName: string;
  customerEmail: string;
  status?: SubscriptionStatusEnum;
  startDate?: string;
  endDate: string;
  planPriceId: string;
};

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly planPriceService: PlanPricesService,
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const dto = createSubscriptionDto as SubscriptionCreateAttributes;
    const { planPriceId, ...subscriptionData } = dto;

    await this.planPriceService.findOne(planPriceId);

    const newSubscription = this.subscriptionRepository.create({
      ...subscriptionData,
      planPriceId,
    });

    return this.subscriptionRepository.save(newSubscription);
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      relations: ['planPrice', 'planPrice.plan'],
    });
  }

  async findOne(id: string): Promise<Subscription> {
    const subscriptionFound = await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['planPrice', 'planPrice.plan'],
    });

    if (!subscriptionFound) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    return subscriptionFound;
  }

  async update(
    id: string,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<Subscription> {
    const subscriptionFound = await this.findOne(id);

    if (
      updateSubscriptionDto.planPriceId &&
      updateSubscriptionDto.planPriceId !== subscriptionFound.planPriceId
    ) {
      const planPriceId = updateSubscriptionDto.planPriceId;
      await this.planPriceService.findOne(planPriceId);
    }

    const subscriptionUpdated = Object.assign(
      subscriptionFound,
      updateSubscriptionDto,
    );

    return this.subscriptionRepository.save(subscriptionUpdated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.subscriptionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
  }
}
