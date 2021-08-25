import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminStrategy } from './admin.strategy';
import { JWT_SECRET } from 'src/constants';
import { CandidateModule } from 'src/candidate/candidate.module';
import { UserModule } from 'src/user/user.module';
import { VoteModule } from 'src/vote/vote.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    UserModule,
    VoteModule,
    CandidateModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AdminStrategy],
  controllers: [AdminController],
})
export class AdminModule {}
