import { Plan } from '@/plans/entities/plan.entity';
import { Subscription } from '@/subscriptions/entities/subscription.entity';
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

export enum PlanPriceIntervalEnum {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  ONE_TIME = 'one-time',
}

@Entity({ name: 'plan_prices' })
export class PlanPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  price: number;

  @Column({
    type: 'simple-enum',
    enum: PlanPriceIntervalEnum,
  })
  interval: PlanPriceIntervalEnum;

  @Column({ name: 'plan_id' })
  planId: string;

  @CreateDateColumn({ name: 'created_at', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'text' })
  updatedAt: Date;

  @ManyToOne(() => Plan, (plan) => plan.prices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @OneToMany(() => Subscription, (subscription) => subscription.planPrice)
  subscriptions?: Subscription[];
}
