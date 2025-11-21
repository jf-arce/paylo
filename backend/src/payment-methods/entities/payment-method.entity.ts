import { Provider } from '@/providers/entities/provider.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payment_methods' })
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  method: string;

  @Column({ default: true })
  active: boolean;

  @Column({ name: 'account_id' })
  accountId: string;

  @Column({ name: 'provider_id' })
  providerId: string;

  @CreateDateColumn({ name: 'created_at', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'text' })
  updatedAt: Date;

  @ManyToOne(() => Provider, (provider) => provider.paymentMethods, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;
}
