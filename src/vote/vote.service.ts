import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
  ) {}

  async createVote(
    name: string,
    description: string,
    startTimestamp: Date,
    endTimestamp: Date,
    isSuspended?: boolean,
  ) {
    const vote = this.voteRepository.create({
      name,
      description,
      startTimestamp,
      endTimestamp,
      isSuspended,
    });
    return this.voteRepository.save(vote);
  }

  async getVoteList() {
    const votes = await this.voteRepository.find();
    return votes.sort((first, second) => {
      const isFirstVoteOpened = this.getVoteOpened(first);
      const isSecondVoteOpened = this.getVoteOpened(second);
      if (isFirstVoteOpened === isSecondVoteOpened) {
        return second.endTimestamp.getTime() - first.endTimestamp.getTime();
      } else {
        return isFirstVoteOpened ? 1 : -1;
      }
    });
  }

  async isVoteOpened(voteId: number) {
    const currentVote = await this.voteRepository.findOne(voteId);
    return this.getVoteOpened(currentVote);
  }

  async setVoteSuspendStatus(voteId: number, isSuspended: boolean) {
    return this.voteRepository.update(voteId, { isSuspended: isSuspended });
  }

  private getVoteOpened(vote: Vote) {
    const currentTimestamp = new Date();
    if (
      vote.startTimestamp < currentTimestamp &&
      currentTimestamp < vote.endTimestamp
    ) {
      return true;
    }
    return false;
  }
}
