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
    const provider = this.providerRepository.create(createProviderDto);
    return this.providerRepository.save(provider);
  }

  async findAll(): Promise<Provider[]> {
    const providers = await this.providerRepository.find();

    if (providers.length === 0) {
      throw new NotFoundException('No providers found');
    }

    return providers;
  }

  async findOne(id: string): Promise<Provider> {
    const provider = await this.providerRepository.findOne({
      where: { id },
    });

    if (!provider) {
      throw new Error(`Provider with ID ${id} not found`);
    }

    return provider;
  }

  async update(
    id: string,
    updateProviderDto: UpdateProviderDto,
  ): Promise<Provider> {
    await this.providerRepository.update(id, updateProviderDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.providerRepository.softDelete(id);
    if (result.affected === 0) {
      throw new Error(`Provider with ID ${id} not found`);
    }
  }
}
