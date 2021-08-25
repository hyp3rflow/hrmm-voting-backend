import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  startTimestamp: Date;

  @Column()
  endTimestamp: Date;

  @Column({ default: false })
  isSuspended: boolean;
}
