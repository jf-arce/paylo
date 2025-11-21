import { Payment } from '@/payments/entities/payment.entity';
import { PlanPrice } from '@/plan-prices/entities/plan-price.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum SubscriptionStatusEnum {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  PAUSED = 'paused',
}

@Entity({ name: 'subscriptions' })
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  customerName: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  customerEmail: string;

  @Column({
    type: 'simple-enum',
    enum: SubscriptionStatusEnum,
    default: SubscriptionStatusEnum.ACTIVE,
  })
  status: SubscriptionStatusEnum;

  @Column({
    type: 'text',
    default: () => 'CURRENT_TIMESTAMP',
  })
  startDate: string;

  @Column({
    type: 'text',
  })
  endDate: string;

  @Column({ name: 'plan_price_id' })
  planPriceId: string;

  @CreateDateColumn({ name: 'created_at', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'text' })
  updatedAt: Date;

  @ManyToOne(() => PlanPrice, (planPrice) => planPrice.subscriptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'plan_price_id' })
  planPrice: PlanPrice;

  @OneToMany(() => Payment, (payment) => payment.subscription)
  payments?: Payment[];
}
