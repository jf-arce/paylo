import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CustomBaseEntity {
  @CreateDateColumn({ type: 'text' })
  createdAt: string;

  @UpdateDateColumn({ type: 'text' })
  updatedAt: string;
}
