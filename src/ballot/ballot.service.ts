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

  async getBallotList(userId: number) {
    return this.ballotRepository.find({
      where: { voter: { id: userId } },
      relations: ['vote'],
    });
  }

  async createBallot(userId: number, voteId: number) {
    const ballot = await this.ballotRepository.create({
      voter: { id: userId },
      vote: { id: voteId },
    });
    return this.ballotRepository.save(ballot);
  }

  async getIsVoted(userId: number, voteId: number) {
    const ballot = await this.ballotRepository.findOne({
      where: {
        voter: { id: userId },
        vote: { id: voteId },
      },
    });
    return ballot.isVoted;
  }

  async voteBallot(userId: number, voteId: number, candidateId: number) {
    const ballot = await this.ballotRepository.findOne({
      where: {
        voter: { id: userId },
        vote: { id: voteId },
        isVoted: false,
      },
    });
    return this.ballotRepository.save({
      ...ballot,
      isVoted: true,
      candidate: { id: candidateId },
    });
  }

  async getBallotExist(userId: number, voteId: number) {
    const ballotCount = await this.ballotRepository.count({
      where: { voter: { id: userId }, vote: { id: voteId } },
    });
    return ballotCount !== 0;
  }
}
