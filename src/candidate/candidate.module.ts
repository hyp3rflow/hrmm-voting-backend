import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Candidate } from './candidate.entity';
import { CandidateService } from './candidate.service';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate])],
  providers: [CandidateService],
  exports: [CandidateService],
})
export class CandidateModule {}
