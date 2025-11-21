import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { SubscriptionsService } from '@/subscriptions/subscriptions.service';
import { PaymentMethodTypesService } from '@/payment-method-types/payment-method-types.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly subscriptionService: SubscriptionsService,
    private readonly paymentMethodTypeService: PaymentMethodTypesService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { subscriptionId, method, ...paymentData } = createPaymentDto;

    await this.subscriptionService.findOne(subscriptionId);

    await this.paymentMethodTypeService.findOneByName(method);

    const newPayment = this.paymentRepository.create({
      ...paymentData,
      method,
      subscriptionId,
    });

    return this.paymentRepository.save(newPayment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find({
      relations: ['subscription'],
    });
  }

  async findOne(id: string): Promise<Payment> {
    const paymentFound = await this.paymentRepository.findOne({
      where: { id },
      relations: ['subscription'],
    });

    if (!paymentFound) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return paymentFound;
  }

  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const paymentFound = await this.findOne(id);

    if (
      updatePaymentDto.subscriptionId &&
      updatePaymentDto.subscriptionId !== paymentFound.subscriptionId
    ) {
      await this.subscriptionService.findOne(updatePaymentDto.subscriptionId);
    }

    if (
      updatePaymentDto.method &&
      updatePaymentDto.method !== paymentFound.method
    ) {
      const method = updatePaymentDto.method;
      await this.paymentMethodTypeService.findOneByName(method);
    }

    const paymentUpdated = Object.assign(paymentFound, updatePaymentDto);
    return this.paymentRepository.save(paymentUpdated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.paymentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }
}
