import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from '@/providers/dto/create-provider.dto';
import { UpdateProviderDto } from '@/providers/dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from '@/providers/entities/provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  async create(createProviderDto: CreateProviderDto): Promise<Provider> {
    const newProvider = this.providerRepository.create(createProviderDto);
    return this.providerRepository.save(newProvider);
  }

  async findAll(): Promise<Provider[]> {
    return this.providerRepository.find();
  }

  async findOne(id: string): Promise<Provider> {
    const providerFound = await this.providerRepository.findOne({
      where: { id },
    });

    if (!providerFound) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }

    return providerFound;
  }

  async update(
    id: string,
    updateProviderDto: UpdateProviderDto,
  ): Promise<Provider> {
    const providerFound = await this.findOne(id);

    const providerUpdated = Object.assign(providerFound, updateProviderDto);
    return this.providerRepository.save(providerUpdated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.providerRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }
  }
}
