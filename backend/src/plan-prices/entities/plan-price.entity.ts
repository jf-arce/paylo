import { Plan } from '@/plans/entities/plan.entity';
import { CustomBaseEntity } from '@/shared/entities/custom-base.entity';
import { Subscription } from '@/subscriptions/entities/subscription.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PlanPriceIntervalEnum {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  ONE_TIME = 'one-time',
}

@Entity({ name: 'plan_prices' })
export class PlanPrice extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  price: number;

  @Column({
    type: 'simple-enum',
    enum: PlanPriceIntervalEnum,
  })
  interval: PlanPriceIntervalEnum;

  @ManyToOne(() => Plan, (plan) => plan.prices, { onDelete: 'CASCADE' })
  plan: Plan;

  @OneToMany(() => Subscription, (subscription) => subscription.planPrice)
  subscriptions: Subscription[];
}
