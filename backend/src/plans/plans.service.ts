import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from '@/plans/entities/plan.entity';
import { Repository } from 'typeorm';
import { ServicesService } from '@/services/services.service';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    private readonly serviceService: ServicesService,
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const { serviceId, ...planData } = createPlanDto;

    await this.serviceService.findOne(serviceId);

    const newPlan = this.planRepository.create({
      name: planData.name,
      serviceId: serviceId,
    });

    return this.planRepository.save(newPlan);
  }

  async findAll(): Promise<Plan[]> {
    return this.planRepository.find({
      relations: ['service', 'prices'],
    });
  }

  async findOne(id: string): Promise<Plan> {
    const planFound = await this.planRepository.findOne({
      where: { id },
      relations: ['service', 'prices'],
    });

    if (!planFound) {
      throw new NotFoundException(`Plan with ID ${id} not found`);
    }

    return planFound;
  }

  async update(id: string, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    const planFound = await this.findOne(id);

    await this.serviceService.findOne(planFound.serviceId);

    const planUpdated = Object.assign(planFound, updatePlanDto);
    return this.planRepository.save(planUpdated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.planRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Plan with ID ${id} not found`);
    }
  }
}
