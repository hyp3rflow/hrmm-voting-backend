import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Vote } from './vote.entity';
import { VoteService } from './vote.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vote])],
  providers: [VoteService],
  exports: [VoteService],
})
export class VoteModule {}
