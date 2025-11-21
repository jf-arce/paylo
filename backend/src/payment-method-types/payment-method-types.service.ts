import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentMethodTypeDto } from './dto/create-payment-method-type.dto';
import { UpdatePaymentMethodTypeDto } from './dto/update-payment-method-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethodType } from './entities/payment-method-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentMethodTypesService {
  constructor(
    @InjectRepository(PaymentMethodType)
    private readonly paymentMethodTypeRepository: Repository<PaymentMethodType>,
  ) {}

  async create(
    createPaymentMethodTypeDto: CreatePaymentMethodTypeDto,
  ): Promise<PaymentMethodType> {
    const name = createPaymentMethodTypeDto.name;

    await this.ensureNameIsUnique(name);

    const paymentMethodType = this.paymentMethodTypeRepository.create({
      name,
    });

    return this.paymentMethodTypeRepository.save(paymentMethodType);
  }

  async findAll(): Promise<PaymentMethodType[]> {
    return this.paymentMethodTypeRepository.find();
  }

  async findOne(id: number): Promise<PaymentMethodType> {
    const paymentMethodType = await this.paymentMethodTypeRepository.findOne({
      where: { id },
    });

    if (!paymentMethodType) {
      throw new NotFoundException(
        `Payment method type with ID ${id} not found`,
      );
    }

    return paymentMethodType;
  }

  async findOneByName(name: string): Promise<PaymentMethodType> {
    const paymentMethodType = await this.paymentMethodTypeRepository.findOne({
      where: { name },
    });

    if (!paymentMethodType) {
      throw new NotFoundException(
        `Payment method type with name ${name} not found`,
      );
    }

    return paymentMethodType;
  }

  async update(
    id: number,
    updatePaymentMethodTypeDto: UpdatePaymentMethodTypeDto,
  ): Promise<PaymentMethodType> {
    const paymentMethodType = await this.findOne(id);

    if (
      updatePaymentMethodTypeDto.name &&
      updatePaymentMethodTypeDto.name !== paymentMethodType.name
    ) {
      const name = updatePaymentMethodTypeDto.name;
      await this.ensureNameIsUnique(name);
    }

    const updatedPaymentMethodType = Object.assign(
      paymentMethodType,
      updatePaymentMethodTypeDto,
    );

    return this.paymentMethodTypeRepository.save(updatedPaymentMethodType);
  }

  async remove(id: number): Promise<void> {
    const result = await this.paymentMethodTypeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Payment method type with ID ${id} not found`,
      );
    }
  }

  private async ensureNameIsUnique(name: string): Promise<void> {
    const paymentMethodType = await this.paymentMethodTypeRepository.findOne({
      where: { name },
    });

    if (paymentMethodType) {
      throw new ConflictException(
        `Payment method type with name ${name} already exists`,
      );
    }
  }
}
