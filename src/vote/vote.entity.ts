import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  @Index()
  startTimestamp: Date;

  @Column()
  @Index()
  endTimestamp: Date;

  @Column({ default: false })
  isSuspended: boolean;
}
