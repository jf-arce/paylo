import { Injectable } from '@nestjs/common';
import { CreatePlanPriceDto } from './dto/create-plan-price.dto';
import { UpdatePlanPriceDto } from './dto/update-plan-price.dto';

@Injectable()
export class PlanPricesService {
  create(createPlanPriceDto: CreatePlanPriceDto) {
    return 'This action adds a new planPrice';
  }

  findAll() {
    return `This action returns all planPrices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planPrice`;
  }

  update(id: number, updatePlanPriceDto: UpdatePlanPriceDto) {
    return `This action updates a #${id} planPrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} planPrice`;
  }
}
