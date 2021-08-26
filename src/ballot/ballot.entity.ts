import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Vote } from 'src/vote/vote.entity';
import { Candidate } from 'src/candidate/candidate.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Ballot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isVoted: boolean;

  @ManyToOne(() => Vote, (vote) => vote.id)
  vote: Vote;

  @ManyToOne(() => Candidate, (candidate) => candidate.id, { nullable: true })
  candidate: Candidate;

  @ManyToOne(() => User, (user) => user.id)
  voter: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastModifiedAt: Date;
}
