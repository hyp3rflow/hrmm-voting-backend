import { Vote } from 'src/vote/vote.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Vote, (vote) => vote.id)
  vote: Vote;

  @Column({ default: 0 })
  voteCount: number;
}
