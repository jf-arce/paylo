import { Subscription } from '@/subscriptions/entities/subscription.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PaymentStatusEnum {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity({ name: 'payments' })
export class Payment {
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

  @Column({ name: 'transaction_id' })
  transactionId: string;

  @Column({ name: 'subscription_id' })
  subscriptionId: string;

  @CreateDateColumn({ name: 'created_at', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'text' })
  updatedAt: Date;

  @ManyToOne(() => Subscription, (subscription) => subscription.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;
}
