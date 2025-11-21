import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment-method.entity';
import { Repository } from 'typeorm';
import { ProvidersService } from '@/providers/providers.service';
import { PaymentMethodTypesService } from '@/payment-method-types/payment-method-types.service';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
    private readonly providerService: ProvidersService,
    private readonly paymentMethodTypesService: PaymentMethodTypesService,
  ) {}

  async create(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const { providerId, accountId, method } = createPaymentMethodDto;

    await this.providerService.findOne(providerId);

    await this.paymentMethodTypesService.findOneByName(method);

    const paymentMethod = this.paymentMethodRepository.create({
      method,
      accountId,
      providerId,
    });

    return this.paymentMethodRepository.save(paymentMethod);
  }

  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.find({
      relations: ['provider'],
    });
  }

  async findOne(id: string): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: { id },
      relations: ['provider'],
    });

    if (!paymentMethod) {
      throw new NotFoundException(`Payment method with ID ${id} not found`);
    }

    return paymentMethod;
  }

  async update(
    id: string,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const paymentMethod = await this.findOne(id);

    if (
      updatePaymentMethodDto.providerId &&
      updatePaymentMethodDto.providerId !== paymentMethod.providerId
    ) {
      const providerId = updatePaymentMethodDto.providerId;
      await this.providerService.findOne(providerId);
    }

    if (
      updatePaymentMethodDto.method &&
      updatePaymentMethodDto.method !== paymentMethod.method
    ) {
      const method = updatePaymentMethodDto.method;
      await this.paymentMethodTypesService.findOneByName(method);
    }

    const updatedPaymentMethod = Object.assign(
      paymentMethod,
      updatePaymentMethodDto,
    );

    return this.paymentMethodRepository.save(updatedPaymentMethod);
  }

  async remove(id: string): Promise<void> {
    const result = await this.paymentMethodRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Payment method with ID ${id} not found`);
    }
  }
}
