import { Provider } from '@/providers/entities/provider.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  accountId: string;

  @ManyToOne(() => Provider, (provider) => provider.paymentMethods, {
    onDelete: 'CASCADE',
  })
  provider: Provider;
}
