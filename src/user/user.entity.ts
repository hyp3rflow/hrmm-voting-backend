import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  studentNumber: string;

  @Column({ unique: true })
  userId: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  level: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastModifiedAt: Date;
}
