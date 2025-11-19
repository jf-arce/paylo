import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Service } from '@/services/entities/service.entity';
import { PlanPrice } from '@/plan-prices/entities/plan-price.entity';
import { CustomBaseEntity } from '@/shared/entities/custom-base.entity';

@Entity({ name: 'plans' })
export class Plan extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 50,
  })
  name: string;

  @ManyToOne(() => Service, (service) => service.plans, { onDelete: 'CASCADE' })
  service: Service;

  @OneToMany(() => PlanPrice, (planPrice) => planPrice.plan)
  prices: PlanPrice[];
}
