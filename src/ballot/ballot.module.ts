import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Ballot } from './ballot.entity';
import { BallotService } from './ballot.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ballot])],
  providers: [BallotService],
  exports: [BallotService],
})
export class BallotModule {}
