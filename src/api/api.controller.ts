import {
  HttpException,
  Param,
  Post,
  Get,
  Controller,
  Request,
  Body,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { BallotService } from 'src/ballot/ballot.service';
import { CandidateService } from 'src/candidate/candidate.service';
import { VoteService } from 'src/vote/vote.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('api')
export class ApiController {
  constructor(
    private voteService: VoteService,
    private candidateService: CandidateService,
    private ballotService: BallotService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('votes')
  async getVoteList() {
    return await this.voteService.getVoteList();
  }

  @UseGuards(JwtAuthGuard)
  @Get('candidates/:id')
  async getCandidateList(@Param('id') voteId: number) {
    return await this.candidateService.getCandidateList(voteId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('vote')
  async vote(
    @Request() req,
    @Body('voteId') voteId: number,
    @Body('candidateId') candidateId: number,
  ) {
    const isExist = await this.ballotService.getBallotExist(
      req.user.id,
      voteId,
    );
    if (isExist) {
      throw new HttpException('ALREADY_VOTED', HttpStatus.FORBIDDEN);
    }
    return await this.ballotService.createBallot(
      req.user.id,
      voteId,
      candidateId,
    );
  }
}
