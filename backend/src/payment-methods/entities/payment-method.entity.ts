import { Provider } from '@/providers/entities/provider.entity';
import { CustomBaseEntity } from '@/shared/entities/custom-base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'payment_methods' })
export class PaymentMethod extends CustomBaseEntity {
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

  @ManyToOne(() => Provider, (provider) => provider.paymentMethods, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;
}
