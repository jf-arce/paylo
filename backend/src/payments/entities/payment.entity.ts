import { CustomBaseEntity } from '@/shared/entities/custom-base.entity';
import { Subscription } from '@/subscriptions/entities/subscription.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum PaymentStatusEnum {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity({ name: 'payments' })
export class Payment extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  amount: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  method: string;

  @Column({
    type: 'simple-enum',
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.PENDING,
  })
  status: PaymentStatusEnum;

  @Column()
  transactionId: string;

  @ManyToOne(() => Subscription, (subscription) => subscription.payments, {
    onDelete: 'CASCADE',
  })
  subscription: Subscription;
}
