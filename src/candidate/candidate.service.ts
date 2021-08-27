import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './candidate.entity';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) {}

  async createCandidate(name: string, description: string, voteId: number) {
    const candidate = await this.candidateRepository.create({
      name,
      description,
      vote: { id: voteId },
    });
    return this.candidateRepository.save(candidate);
  }

  async getCandidateList(voteId: number) {
    return this.candidateRepository.find({
      where: { vote: { id: voteId } },
      select: ['id', 'name', 'description'],
      order: { id: 'ASC' },
    });
  }

  async increaseCandidateVoteCount(candidateId: number) {
    return this.candidateRepository.increment(
      { id: candidateId },
      'voteCount',
      1,
    );
  }
}
