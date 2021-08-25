import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ballot } from './ballot.entity';

@Injectable()
export class BallotService {
  constructor(
    @InjectRepository(Ballot)
    private ballotRepository: Repository<Ballot>,
  ) {}

  async createBallot(userId: number, voteId: number, candidateId: number) {
    const ballot = await this.ballotRepository.create({
      voter: { id: userId },
      vote: { id: voteId },
      candidate: { id: candidateId },
    });
    return this.ballotRepository.save(ballot);
  }

  async getBallotExist(userId: number, voteId: number) {
    const ballotCount = await this.ballotRepository.count({
      where: { voter: { id: userId }, vote: { id: voteId } },
    });
    return ballotCount !== 0;
  }
}
