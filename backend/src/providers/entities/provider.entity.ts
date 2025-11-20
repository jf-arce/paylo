import { PaymentMethod } from '@/payment-methods/entities/payment-method.entity';
import { Service } from '@/services/entities/service.entity';
import { CustomBaseEntity } from '@/shared/entities/custom-base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'providers' })
export class Provider extends CustomBaseEntity {
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
  deletedAt: string | null;

  @OneToMany(() => Service, (service) => service.provider)
  services: Service[];

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.provider)
  paymentMethods: PaymentMethod[];
}
