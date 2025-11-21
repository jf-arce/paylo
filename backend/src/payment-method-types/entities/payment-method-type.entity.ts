import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payment_method_types' })
export class PaymentMethodType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: 'varchar',
    length: 100,
  })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'text' })
  updatedAt: Date;
}
