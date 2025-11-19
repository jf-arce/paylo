import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanPricesService } from './plan-prices.service';
import { CreatePlanPriceDto } from './dto/create-plan-price.dto';
import { UpdatePlanPriceDto } from './dto/update-plan-price.dto';

@Controller('plan-prices')
export class PlanPricesController {
  constructor(private readonly planPricesService: PlanPricesService) {}

  @Post()
  create(@Body() createPlanPriceDto: CreatePlanPriceDto) {
    return this.planPricesService.create(createPlanPriceDto);
  }

  @Get()
  findAll() {
    return this.planPricesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planPricesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanPriceDto: UpdatePlanPriceDto) {
    return this.planPricesService.update(+id, updatePlanPriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planPricesService.remove(+id);
  }
}
