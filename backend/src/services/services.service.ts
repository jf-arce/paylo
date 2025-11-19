import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from '@/services/dto/create-service.dto';
import { UpdateServiceDto } from '@/services/dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from '@/services/entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = this.serviceRepository.create(createServiceDto);
    return this.serviceRepository.save(service);
  }

  async findAll(): Promise<Service[]> {
    const services = await this.serviceRepository.find();

    if (services.length === 0) {
      throw new NotFoundException('No services found');
    }

    return services;
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.serviceRepository.findOne({
      where: { id },
    });

    if (!service) {
      throw new Error(`Service with ID ${id} not found`);
    }

    return service;
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    await this.serviceRepository.update(id, updateServiceDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.serviceRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Service with ID ${id} not found`);
    }
  }
}
