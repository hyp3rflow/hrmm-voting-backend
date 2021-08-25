import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vote } from 'src/vote/vote.entity';
import { Candidate } from 'src/candidate/candidate.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Ballot {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vote, (vote) => vote.id)
  vote: Vote;

  @ManyToOne(() => Candidate, (candidate) => candidate.id)
  candidate: Candidate;

  @ManyToOne(() => User, (user) => user.id)
  voter: User;

  @CreateDateColumn()
  timestamp: Date;
}
