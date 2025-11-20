import { CustomBaseEntity } from '@/shared/entities/custom-base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payment_method_types' })
export class PaymentMethodType extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: 'varchar',
    length: 100,
  })
  name: string;
}
