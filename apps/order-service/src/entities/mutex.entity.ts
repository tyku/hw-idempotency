import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  Entity,
  Index,
} from 'typeorm';

@Entity('mutexes')
export class MutexEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index('request_id', { unique: true })
  request_id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
