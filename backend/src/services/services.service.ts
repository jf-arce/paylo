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
    return this.serviceRepository.find();
  }

  async findOne(id: string): Promise<Service> {
    const serviceFound = await this.serviceRepository.findOne({
      where: { id },
    });

    if (!serviceFound) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return serviceFound;
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const serviceFound = await this.findOne(id);

    if (!serviceFound) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    const serviceUpdated = Object.assign(serviceFound, updateServiceDto);
    return this.serviceRepository.save(serviceUpdated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.serviceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
  }
}
