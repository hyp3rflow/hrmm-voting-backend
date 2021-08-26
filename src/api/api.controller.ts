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
import { UserService } from 'src/user/user.service';
import { VoteService } from 'src/vote/vote.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('api')
export class ApiController {
  constructor(
    private userService: UserService,
    private voteService: VoteService,
    private candidateService: CandidateService,
    private ballotService: BallotService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Request() req) {
    return await this.userService.getUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('votes')
  async getVoteList(@Request() req) {
    const ballots = await this.ballotService.getBallotList(req.user.id);
    return await this.voteService.getVoteListByIds(
      ballots.reduce((prev, ballot) => [...prev, ballot.vote.id], []),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('candidates/:id')
  async getCandidateList(@Request() req, @Param('id') voteId: number) {
    const isExist = await this.ballotService.getBallotExist(
      req.user.id,
      voteId,
    );
    if (!isExist) {
      throw new HttpException('NO_BALLOT', HttpStatus.FORBIDDEN);
    }
    const isVoted = await this.ballotService.getIsVoted(req.user.id, voteId);
    if (isVoted) {
      throw new HttpException('ALREADY_VOTED', HttpStatus.FORBIDDEN);
    }
    const isOpened = await this.voteService.isVoteOpened(voteId);
    if (!isOpened) {
      throw new HttpException('CLOSED_VOTE', HttpStatus.FORBIDDEN);
    }
    return await this.candidateService.getCandidateList(voteId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('vote')
  async getVote(@Request() req, @Body('voteId') voteId: number) {
    const isExist = await this.ballotService.getBallotExist(
      req.user.id,
      voteId,
    );
    if (!isExist) {
      throw new HttpException('NO_BALLOT', HttpStatus.FORBIDDEN);
    }
    const isVoted = await this.ballotService.getIsVoted(req.user.id, voteId);
    if (isVoted) {
      throw new HttpException('ALREADY_VOTED', HttpStatus.FORBIDDEN);
    }
    const isOpened = await this.voteService.isVoteOpened(voteId);
    if (!isOpened) {
      throw new HttpException('CLOSED_VOTE', HttpStatus.FORBIDDEN);
    }
    return await this.voteService.getVote(voteId);
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
    if (!isExist) {
      throw new HttpException('NO_BALLOT', HttpStatus.FORBIDDEN);
    }
    const isVoted = await this.ballotService.getIsVoted(req.user.id, voteId);
    if (isVoted) {
      throw new HttpException('ALREADY_VOTED', HttpStatus.FORBIDDEN);
    }
    const isOpened = await this.voteService.isVoteOpened(voteId);
    if (!isOpened) {
      throw new HttpException('CLOSED_VOTE', HttpStatus.FORBIDDEN);
    }
    return await this.ballotService.voteBallot(
      req.user.id,
      voteId,
      candidateId,
    );
  }
}
