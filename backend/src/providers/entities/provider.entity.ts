import { PaymentMethod } from '@/payment-methods/entities/payment-method.entity';
import { Service } from '@/services/entities/service.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'providers' })
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({ type: 'varchar', length: 128 })
  password: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  phone: string | null;

  @Column({ type: 'text', nullable: true, name: 'deleted_at' })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'text' })
  updatedAt: Date;

  @OneToMany(() => Service, (service) => service.provider)
  services: Service[];

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.provider)
  paymentMethods: PaymentMethod[];
}
