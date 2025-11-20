import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanPriceDto } from './dto/create-plan-price.dto';
import { UpdatePlanPriceDto } from './dto/update-plan-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanPrice } from './entities/plan-price.entity';
import { Repository } from 'typeorm';
import { PlansService } from '@/plans/plans.service';

@Injectable()
export class PlanPricesService {
  constructor(
    @InjectRepository(PlanPrice)
    private readonly planPriceRepository: Repository<PlanPrice>,
    private readonly plansService: PlansService,
  ) {}

  async create(createPlanPriceDto: CreatePlanPriceDto): Promise<PlanPrice> {
    const { planId, ...planPriceData } = createPlanPriceDto;

    await this.plansService.findOne(planId);

    const newPlanPrice = this.planPriceRepository.create({
      price: planPriceData.price,
      interval: planPriceData.interval,
      planId: planId,
    });

    return this.planPriceRepository.save(newPlanPrice);
  }

  async findAll(): Promise<PlanPrice[]> {
    return this.planPriceRepository.find({
      relations: ['plan'],
    });
  }

  async findOne(id: string): Promise<PlanPrice> {
    const planPriceFound = await this.planPriceRepository.findOne({
      where: { id },
      relations: ['plan'],
    });

    if (!planPriceFound) {
      throw new NotFoundException(`Plan Price with ID ${id} not found`);
    }

    return planPriceFound;
  }

  async update(
    id: string,
    updatePlanPriceDto: UpdatePlanPriceDto,
  ): Promise<PlanPrice> {
    const planPriceFound = await this.findOne(id);

    await this.plansService.findOne(planPriceFound.planId);

    const planPriceUpdated = Object.assign(planPriceFound, updatePlanPriceDto);
    return this.planPriceRepository.save(planPriceUpdated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.planPriceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Plan Price with ID ${id} not found`);
    }
  }
}
