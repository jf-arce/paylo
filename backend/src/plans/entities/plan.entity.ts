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
import { Service } from '@/services/entities/service.entity';
import { PlanPrice } from '@/plan-prices/entities/plan-price.entity';

@Entity({ name: 'plans' })
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({ name: 'service_id' })
  serviceId: string;

  @CreateDateColumn({ name: 'created_at', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'text' })
  updatedAt: Date;

  @ManyToOne(() => Service, (service) => service.plans, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @OneToMany(() => PlanPrice, (planPrice) => planPrice.plan)
  prices: PlanPrice[];
}
