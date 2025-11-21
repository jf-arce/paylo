import { Payment } from '@/payments/entities/payment.entity';
import { PlanPrice } from '@/plan-prices/entities/plan-price.entity';
import { CustomBaseEntity } from '@/shared/entities/custom-base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum SubscriptionStatusEnum {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  PAUSED = 'paused',
}

@Entity({ name: 'subscriptions' })
export class Subscription extends CustomBaseEntity {
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

  @ManyToOne(() => PlanPrice, (planPrice) => planPrice.subscriptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'plan_price_id' })
  planPrice: PlanPrice;

  @OneToMany(() => Payment, (payment) => payment.subscription)
  payments?: Payment[];
}
