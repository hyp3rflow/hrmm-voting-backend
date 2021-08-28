import { Param } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BallotService } from 'src/ballot/ballot.service';
import { CandidateService } from 'src/candidate/candidate.service';
import { UserService } from 'src/user/user.service';
import { VoteService } from 'src/vote/vote.service';
import { AdminAuthGuard } from './admin-auth.guard';

interface CreateUserBody {
  studentNumber: string;
  userId: string;
  password: string;
}

interface CreateVoteBody {
  name: string;
  description: string;
  startTimestamp: Date;
  endTimestamp: Date;
  isSuspended?: boolean;
}

interface CreateCandidateBody {
  name: string;
  description: string;
  voteId: number;
}

@Controller('admin')
export class AdminController {
  constructor(
    private userService: UserService,
    private voteService: VoteService,
    private candidateService: CandidateService,
    private ballotService: BallotService,
  ) {}

  @UseGuards(AdminAuthGuard)
  @Post('createUser')
  async createUser(@Body() body: CreateUserBody) {
    return await this.userService.createUser(
      body.userId,
      body.studentNumber,
      body.password,
    );
  }

  @UseGuards(AdminAuthGuard)
  @Post('createVote')
  async createVote(@Body() body: CreateVoteBody) {
    return await this.voteService.createVote(
      body.name,
      body.description,
      body.startTimestamp,
      body.endTimestamp,
      body.isSuspended,
    );
  }

  @UseGuards(AdminAuthGuard)
  @Post('createCandidate')
  async createCandidate(@Body() body: CreateCandidateBody) {
    return await this.candidateService.createCandidate(
      body.name,
      body.description,
      body.voteId,
    );
  }

  @UseGuards(AdminAuthGuard)
  @Get('getUserByStudentNumber/:studentNumber')
  async getUserByStudentNumber(@Param('studentNumber') studentNumber: string) {
    return await this.userService.getUserByStudentNumber(studentNumber);
  }

  @UseGuards(AdminAuthGuard)
  @Post('createBallot')
  async createBallot(
    @Body('userId') userId: number,
    @Body('voteId') voteId: number,
  ) {
    return await this.ballotService.createBallot(userId, voteId);
  }
}
