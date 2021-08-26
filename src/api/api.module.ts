import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/constants';
import { BallotModule } from 'src/ballot/ballot.module';
import { CandidateModule } from 'src/candidate/candidate.module';
import { VoteModule } from 'src/vote/vote.module';
import { ApiController } from './api.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    VoteModule,
    CandidateModule,
    BallotModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtStrategy],
  controllers: [ApiController],
})
export class ApiModule {}
