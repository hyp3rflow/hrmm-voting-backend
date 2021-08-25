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

  async createCandidate(name: string, voteId: number) {
    const candidate = await this.candidateRepository.create({
      name,
      vote: { id: voteId },
    });
    return this.candidateRepository.save(candidate);
  }

  async getCandidateList(voteId: number) {
    return this.candidateRepository.find({
      where: { vote: { id: voteId } },
      select: ['id', 'name'],
      order: { id: 'ASC' },
    });
  }
}
