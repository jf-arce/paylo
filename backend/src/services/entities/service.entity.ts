import { Plan } from '@/plans/entities/plan.entity';
import { Provider } from '@/providers/entities/provider.entity';
import { CustomBaseEntity } from '@/shared/entities/custom-base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'services' })
export class Service extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Provider, (provider) => provider.services, {
    onDelete: 'CASCADE',
  })
  provider: Provider;

  @OneToMany(() => Plan, (plan) => plan.service)
  plans: Plan[];
}
