import { Plan } from '@/plans/entities/plan.entity';
import { Provider } from '@/providers/entities/provider.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'provider_id' })
  providerId: string;

  @CreateDateColumn({ name: 'created_at', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'text' })
  updatedAt: Date;

  @ManyToOne(() => Provider, (provider) => provider.services, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @OneToMany(() => Plan, (plan) => plan.service)
  plans: Plan[];
}
